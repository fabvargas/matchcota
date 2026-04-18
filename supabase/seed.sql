-- =========================================================
-- LIMPIEZA DE DATOS
-- =========================================================
/*
delete from public.notificacion;
delete from public.solicitud_adopcion;
delete from public.favorito;
delete from public.imagen_mascota;
delete from public.mascota;
delete from public.usuario_rol;
delete from public.refugio_profile;
delete from public.usuario_profile;
delete from public.auth;
delete from public.rol;
delete from public.estado_adopcion;
delete from public.estado_mascota;
delete from public.raza;
delete from public.tipo_mascota;
delete from public.comuna;

alter sequence if exists public.comuna_id_comuna_seq restart with 1;
alter sequence if exists public.tipo_mascota_id_tipo_mascota_seq restart with 1;
alter sequence if exists public.raza_id_raza_seq restart with 1;
alter sequence if exists public.estado_mascota_id_estado_mascota_seq restart with 1;
alter sequence if exists public.estado_adopcion_id_estado_adopcion_seq restart with 1;
alter sequence if exists public.rol_id_rol_seq restart with 1;
*/
-- =========================================================
-- CATÁLOGOS
-- =========================================================

insert into public.comuna (nombre, region) values
('Macul', 'Región Metropolitana'),
('Ñuñoa', 'Región Metropolitana'),
('Santiago', 'Región Metropolitana');

insert into public.tipo_mascota (nombre) values
('Perro'),
('Gato');

insert into public.raza (nombre, descripcion, id_tipo_mascota) values
('Labrador', 'Perro mediano/grande', 1),
('Mestizo Perro', 'Raza mixta', 1),
('Siames', 'Gato de pelo corto', 2),
('Mestizo Gato', 'Raza mixta', 2);

insert into public.estado_mascota (nombre) values
('Disponible'),
('Reservada'),
('Adoptada');

insert into public.estado_adopcion (nombre) values
('Pendiente'),
('Aprobada'),
('Rechazada');

insert into public.rol (nombre) values
('adoptante'),
('refugio'),
('admin');

-- =========================================================
-- AUTH
-- =========================================================
-- Los password_hash son demo. Reemplázalos por bcrypt reales si vas a validar login.

insert into public.auth (
  id_auth,
  email,
  password_hash,
  role,
  verified,
  two_factor_enabled,
  auth_provider,
  estado_cuenta,
  fecha_creacion,
  fecha_actualizacion
) values
(
  '11111111-1111-1111-1111-111111111111',
  'admin@matchcota.cl',
  '$2b$10$admin_hash_demo',
  'admin',
  true,
  false,
  'local',
  'activo',
  now(),
  now()
),
(
  '22222222-2222-2222-2222-222222222222',
  'refugio@matchcota.cl',
  '$2b$10$refugio_hash_demo',
  'refugio',
  true,
  false,
  'local',
  'activo',
  now(),
  now()
),
(
  '33333333-3333-3333-3333-333333333333',
  'adoptante@matchcota.cl',
  '$2b$10$adoptante_hash_demo',
  'adoptante',
  true,
  false,
  'local',
  'activo',
  now(),
  now()
);

-- =========================================================
-- PERFILES
-- =========================================================

insert into public.usuario_profile (
  id_usuario,
  nombre,
  telefono,
  direccion,
  foto_perfil_url,
  bio,
  fecha_actualizacion,
  id_comuna
) values
(
  '33333333-3333-3333-3333-333333333333',
  'Lucas Adoptante',
  '+56911111111',
  'Los Olmos 123',
  'https://placehold.co/300x300?text=Adoptante',
  'Busco adoptar responsablemente.',
  now(),
  2
);

insert into public.refugio_profile (
  id_refugio,
  nombre,
  direccion,
  telefono,
  descripcion,
  codigo_postal,
  verificada,
  id_comuna,
  auth_user_id
) values
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Refugio Patitas Felices',
  'Av. Siempre Viva 742',
  '+56912345678',
  'Refugio dedicado al rescate y adopción de mascotas.',
  '7810000',
  true,
  1,
  '22222222-2222-2222-2222-222222222222'
);

insert into public.usuario_rol (auth_user_id, id_rol) values
('11111111-1111-1111-1111-111111111111', 3),
('22222222-2222-2222-2222-222222222222', 2),
('33333333-3333-3333-3333-333333333333', 1);

-- =========================================================
-- MASCOTAS
-- =========================================================

insert into public.mascota (
  id_mascota,
  nombre,
  edad,
  sexo,
  tamanio,
  nivel_energia,
  caracter,
  descripcion,
  fecha_publicacion,
  fecha_actualizacion,
  id_refugio,
  id_tipo_mascota,
  id_raza,
  id_estado_mascota,
  id_comuna
) values
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'Firulais',
  3,
  'Macho',
  'Mediano',
  'Alto',
  'Juguetón',
  'Perro muy amigable y sociable.',
  now(),
  now(),
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  1,
  1,
  1,
  1
),
(
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'Mishi',
  2,
  'Hembra',
  'Pequeño',
  'Medio',
  'Cariñosa',
  'Gatita tranquila y regalona.',
  now(),
  now(),
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  2,
  3,
  1,
  1
);

insert into public.imagen_mascota (
  id_imagen,
  url,
  es_principal,
  orden_visualizacion,
  id_mascota
) values
(
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'https://placehold.co/600x400?text=Firulais',
  true,
  1,
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
),
(
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'https://placehold.co/600x400?text=Mishi',
  true,
  1,
  'cccccccc-cccc-cccc-cccc-cccccccccccc'
);

-- =========================================================
-- FAVORITOS
-- =========================================================

insert into public.favorito (
  id_fav,
  fecha_creacion,
  id_mascota,
  auth_user_id
) values
(
  'ffffffff-ffff-ffff-ffff-ffffffffffff',
  now(),
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '33333333-3333-3333-3333-333333333333'
);

-- =========================================================
-- SOLICITUDES DE ADOPCIÓN
-- =========================================================

insert into public.solicitud_adopcion (
  id_solicitud,
  mensaje_postulacion,
  fecha_solicitud,
  fecha_actualizacion,
  id_mascota,
  id_estado_adopcion,
  auth_user_id
) values
(
  '99999999-9999-9999-9999-999999999999',
  'Hola, me interesa adoptar a Firulais. Tengo espacio y tiempo para cuidarlo.',
  now(),
  now(),
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  1,
  '33333333-3333-3333-3333-333333333333'
);

-- =========================================================
-- NOTIFICACIONES
-- =========================================================

insert into public.notificacion (
  id_notificacion,
  tipo,
  titulo,
  mensaje,
  leida,
  fecha_creacion,
  auth_user_id
) values
(
  '12121212-1212-1212-1212-121212121212',
  'solicitud',
  'Nueva solicitud recibida',
  'Has recibido una nueva solicitud de adopción para Firulais.',
  false,
  now(),
  '22222222-2222-2222-2222-222222222222'
);