-- GestiónEscolar — Acceso con Google + aprobación de administrador + RLS
-- Ejecutar en: Supabase Dashboard → SQL Editor
--
-- ⚠️ IMPORTANTE: al activar RLS, la versión ANTIGUA de la app (login con clave propia,
--    acceso anónimo) deja de poder leer datos. Ejecuta este script justo antes de
--    publicar la versión nueva (rama auth-google) o pruébalo primero en otro proyecto Supabase.
--
-- ANTES de ejecutar: reemplaza los dos correos de administradores (sección 5).

-- 1. Tabla de accesos (solicitudes y permisos) ------------------------------------------
create table if not exists accesos (
  email text primary key,                      -- correo de Google, en minúsculas
  nombre text,
  rol text not null default 'viewer' check (rol in ('admin','viewer','collab','alumno')),
  alum_id text,                                -- alumno asociado (opcional)
  estado text not null default 'pendiente' check (estado in ('pendiente','aprobado','rechazado','bloqueado')),
  solicitado_en timestamptz not null default now(),
  resuelto_por text,
  resuelto_en timestamptz
);
alter table accesos enable row level security;

-- 2. Funciones auxiliares ---------------------------------------------------------------
create or replace function public.mi_email() returns text
language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;

create or replace function public.es_aprobado() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from accesos where email = mi_email() and estado = 'aprobado')
$$;

create or replace function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from accesos where email = mi_email() and estado = 'aprobado' and rol = 'admin')
$$;

-- 3. Funciones que usa la app -----------------------------------------------------------
-- Registra la solicitud la primera vez que alguien entra con Google (queda 'pendiente')
create or replace function public.solicitar_acceso(p_nombre text) returns accesos
language plpgsql security definer set search_path = public as $$
declare v accesos; e text := mi_email();
begin
  if e = '' then raise exception 'Sin sesión'; end if;
  insert into accesos (email, nombre) values (e, nullif(trim(p_nombre), ''))
  on conflict (email) do nothing;
  select * into v from accesos where email = e;
  return v;
end $$;

-- Un administrador aprueba, rechaza, bloquea o cambia el rol de un acceso
create or replace function public.resolver_acceso(p_email text, p_estado text, p_rol text default null, p_alum_id text default null)
returns accesos
language plpgsql security definer set search_path = public as $$
declare v accesos;
begin
  if not es_admin() then raise exception 'Solo administradores'; end if;
  if lower(p_email) = mi_email() then raise exception 'No puedes modificar tu propio acceso'; end if;
  if p_estado not in ('pendiente','aprobado','rechazado','bloqueado') then raise exception 'Estado inválido'; end if;
  if p_rol is not null and p_rol not in ('admin','viewer','collab','alumno') then raise exception 'Rol inválido'; end if;
  update accesos set
    estado = p_estado,
    rol = coalesce(p_rol, rol),
    alum_id = case when p_rol is not null then nullif(p_alum_id, '') else alum_id end,
    resuelto_por = mi_email(),
    resuelto_en = now()
  where email = lower(p_email)
  returning * into v;
  if v.email is null then raise exception 'Solicitud no encontrada'; end if;
  return v;
end $$;

revoke all on function public.solicitar_acceso(text) from public, anon;
revoke all on function public.resolver_acceso(text, text, text, text) from public, anon;
grant execute on function public.solicitar_acceso(text) to authenticated;
grant execute on function public.resolver_acceso(text, text, text, text) to authenticated;

-- 4. Reglas de acceso (RLS) -------------------------------------------------------------
-- accesos: cada persona ve solo su fila; los admins ven todas. Escribir solo vía funciones.
drop policy if exists "ver_propio_o_admin" on accesos;
create policy "ver_propio_o_admin" on accesos for select to authenticated
  using (email = mi_email() or es_admin());

-- Datos: leer = usuarios aprobados; escribir = solo administradores
do $$
declare t text;
begin
  foreach t in array array['alumnos','tipos','actividades','participacion','encuestas','configuracion'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "leer_aprobados" on %I', t);
    execute format('drop policy if exists "escribir_admin" on %I', t);
    execute format('create policy "leer_aprobados" on %I for select to authenticated using (es_aprobado())', t);
    execute format('create policy "escribir_admin" on %I for all to authenticated using (es_admin()) with check (es_admin())', t);
  end loop;
end $$;

-- Las claves antiguas ya no se usan: borrarlas de configuración y bloquear la tabla de cuentas
delete from configuracion where clave = 'claves';
alter table if exists cuentas_alumnos enable row level security;   -- sin políticas = nadie accede
-- Cuando confirmes que todo funciona, elimina la tabla con claves en texto plano:
-- drop table if exists cuentas_alumnos;

-- 5. Primeros administradores (REEMPLAZA los correos por los de Google reales) ---------------
insert into accesos (email, nombre, rol, estado, resuelto_por, resuelto_en) values
  ('renenrique@gmail.com',     'René Lillo',     'admin', 'aprobado', 'setup', now()),
  ('cparrajorquera@gmail.com', 'Carolina Parra', 'admin', 'aprobado', 'setup', now())
on conflict (email) do update set rol = 'admin', estado = 'aprobado';
