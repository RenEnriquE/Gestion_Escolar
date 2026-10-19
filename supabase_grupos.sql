-- GestiónEscolar — Grupos de usuarios (habilitar/deshabilitar ramos y actividades por grupo)
-- Ejecutar en: Supabase Dashboard → SQL Editor (una sola vez, antes de publicar esta versión)
--
-- Los grupos y las reglas por contenido se guardan en la tabla `configuracion` (clave 'grupos').
-- Aquí solo se agrega a cada acceso la lista de grupos a los que pertenece.

alter table accesos add column if not exists grupos text[] not null default '{}';

-- Un administrador asigna los grupos de una persona
create or replace function public.asignar_grupos(p_email text, p_grupos text[])
returns accesos
language plpgsql security definer set search_path = public as $$
declare v accesos;
begin
  if not es_admin() then raise exception 'Solo administradores'; end if;
  update accesos set grupos = coalesce(p_grupos, '{}')
  where email = lower(p_email)
  returning * into v;
  if v.email is null then raise exception 'Acceso no encontrado'; end if;
  return v;
end $$;

revoke all on function public.asignar_grupos(text, text[]) from public, anon;
grant execute on function public.asignar_grupos(text, text[]) to authenticated;
