-- Alumno fuera del curso asociado a un acceso (ej.: apoderado/directivo con un hijo/a que no es del 3° C).
-- Se guarda solo el nombre; sus grupos de estudio se asignan igual que a cualquier usuario (asignar_grupos).
-- Ejecutar una vez en el SQL Editor de Supabase.

alter table accesos add column if not exists alumno_externo text;

create or replace function public.asignar_alumno_externo(p_email text, p_nombre text)
returns accesos
language plpgsql security definer set search_path = public as $$
declare v accesos;
begin
  if not es_admin() then raise exception 'Solo administradores'; end if;
  update accesos set alumno_externo = nullif(trim(p_nombre), '')
  where email = lower(p_email)
  returning * into v;
  if v.email is null then raise exception 'Acceso no encontrado'; end if;
  return v;
end $$;

revoke all on function public.asignar_alumno_externo(text, text) from public, anon;
grant execute on function public.asignar_alumno_externo(text, text) to authenticated;
