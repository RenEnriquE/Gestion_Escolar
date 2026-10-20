-- GestiónEscolar — Nuevo rol "directivo"
-- Ejecutar en: Supabase Dashboard → SQL Editor (una sola vez, antes de publicar esta versión)

-- 1. Permitir el rol en la tabla de accesos
alter table accesos drop constraint if exists accesos_rol_check;
alter table accesos add constraint accesos_rol_check
  check (rol in ('admin','viewer','collab','alumno','directivo'));

-- 2. La función que usa el administrador para aprobar/cambiar roles debe aceptarlo
create or replace function public.resolver_acceso(p_email text, p_estado text, p_rol text default null, p_alum_id text default null)
returns accesos
language plpgsql security definer set search_path = public as $$
declare v accesos;
begin
  if not es_admin() then raise exception 'Solo administradores'; end if;
  if lower(p_email) = mi_email() then raise exception 'No puedes modificar tu propio acceso'; end if;
  if p_estado not in ('pendiente','aprobado','rechazado','bloqueado') then raise exception 'Estado inválido'; end if;
  if p_rol is not null and p_rol not in ('admin','viewer','collab','alumno','directivo') then raise exception 'Rol inválido'; end if;
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

-- Nota: el directivo lee los datos con las mismas reglas de los demás usuarios aprobados
-- (lectura sí, escritura no: solo los administradores pueden escribir).
