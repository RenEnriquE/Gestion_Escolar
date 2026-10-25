-- Última conexión por usuario (visible solo para administradores en Usuarios)
-- Ejecutar una vez en el SQL Editor de Supabase.

alter table accesos add column if not exists ultima_conexion timestamptz;

-- Se vuelve a definir solicitar_acceso (se llama cada vez que alguien abre la app con sesión)
-- para dejar registrada la conexión. Se actualiza como máximo una vez por minuto.
create or replace function public.solicitar_acceso(p_nombre text) returns accesos
language plpgsql security definer set search_path = public as $$
declare v accesos; e text := mi_email();
begin
  if e = '' then raise exception 'Sin sesión'; end if;
  insert into accesos (email, nombre) values (e, nullif(trim(p_nombre), ''))
  on conflict (email) do nothing;
  update accesos set ultima_conexion = now()
   where email = e and (ultima_conexion is null or ultima_conexion < now() - interval '1 minute');
  select * into v from accesos where email = e;
  return v;
end $$;
