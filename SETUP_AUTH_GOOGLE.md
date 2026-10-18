# Acceso con Google + aprobación de administrador

Rama: `auth-google`. La app ya no usa usuario/clave propios: cada persona entra con su cuenta de
Google, queda como **solicitud pendiente** y un administrador la aprueba en *Usuarios → Solicitudes*.
Las reglas de seguridad (RLS) de Supabase impiden leer datos a quien no esté aprobado.

## 1. Google Cloud (una vez)
1. https://console.cloud.google.com → crear proyecto (p. ej. "GestionEscolar").
2. *APIs y servicios → Pantalla de consentimiento OAuth*: tipo **Externo**, nombre de la app, correo de soporte.
3. *Credenciales → Crear credenciales → ID de cliente OAuth* → tipo **Aplicación web**.
4. En **URI de redireccionamiento autorizados** agrega:
   `https://hnoooloxrbpovvcaxdhr.supabase.co/auth/v1/callback`
5. Copia el **ID de cliente** y el **Secreto**.

## 2. Supabase
1. *Authentication → Providers → Google*: activar y pegar ID de cliente y secreto.
2. *Authentication → URL Configuration*:
   - Site URL: `https://gestion-escolar-ten.vercel.app`
   - Redirect URLs: agrega esa misma URL (y la URL de preview de Vercel si quieres probar la rama).
3. *SQL Editor*: abrir `supabase_auth_setup.sql`, **reemplazar los dos correos de administrador**
   (sección 5) por los correos de Google reales y ejecutarlo.

> ⚠️ El SQL activa RLS: la versión antigua de la app (en `main`) deja de poder leer datos.
> Ejecútalo justo antes de publicar esta rama, o pruébalo primero en otro proyecto de Supabase.

## 3. Publicar
1. Haz merge de `auth-google` a `main` (o despliega la rama como preview).
2. Entra con el correo de administrador → *Usuarios* → aprueba las solicitudes que lleguen.

## Cómo funciona
- Primer ingreso: se crea una fila `pendiente` en la tabla `accesos`.
- Admin: *Aprobar* (elige rol: administrador, solo vista, colaboraciones o alumno, y alumno asociado), *Rechazar*, *Bloquear*, *Editar*.
- Solo los administradores pueden escribir datos; el resto lee según su rol y las "Secciones visibles".
- Al elegir cuenta, Google siempre muestra el selector de cuentas (`prompt=select_account`).

## Pendiente / límites
- `Colaboraciones` y créditos manuales se guardan solo en el navegador (localStorage), no en Supabase, así que no están protegidos por RLS.
- Cuando todo funcione, borra la tabla antigua con claves: `drop table if exists cuentas_alumnos;`
- Las claves antiguas (`rene26`, etc.) estuvieron en el historial de git: ya no sirven, pero no las reutilices en otros sitios.
