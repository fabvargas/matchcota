create extension if not exists pgcrypto;

-- =========================================================
-- LIMPIEZA OPCIONAL
-- =========================================================
-- Úsalo solo si vas a partir desde cero en un proyecto nuevo.
-- Si no quieres borrar todo, comenta este bloque.

drop table if exists public.notificacion cascade;
drop table if exists public.solicitud_adopcion cascade;
drop table if exists public.favorito cascade;
drop table if exists public.imagen_mascota cascade;
drop table if exists public.mascota cascade;
drop table if exists public.usuario_rol cascade;
drop table if exists public.refugio_profile cascade;
drop table if exists public.usuario_profile cascade;
drop table if exists public.rol cascade;
drop table if exists public.estado_adopcion cascade;
drop table if exists public.estado_mascota cascade;
drop table if exists public.raza cascade;
drop table if exists public.tipo_mascota cascade;
drop table if exists public.comuna cascade;
drop table if exists public.auth cascade;

-- =========================================================
-- AUTH PROPIA
-- =========================================================

create table if not exists public.auth (
  id_auth uuid primary key default gen_random_uuid(),
  email varchar(150) not null unique,
  password_hash varchar(255) not null,
  role varchar(50) not null,
  verified boolean not null default false,
  two_factor_enabled boolean not null default false,
  auth_provider varchar(30) not null default 'local',
  estado_cuenta varchar(20) not null default 'activo',
  fecha_creacion timestamptz not null default now(),
  fecha_actualizacion timestamptz
);

-- =========================================================
-- TABLAS CATÁLOGO
-- =========================================================

create table if not exists public.comuna (
  id_comuna bigint generated always as identity primary key,
  nombre varchar(100) not null,
  region varchar(100) not null
);

create table if not exists public.tipo_mascota (
  id_tipo_mascota bigint generated always as identity primary key,
  nombre varchar(30) not null unique
);

create table if not exists public.raza (
  id_raza bigint generated always as identity primary key,
  nombre varchar(100) not null,
  descripcion text,
  id_tipo_mascota bigint not null references public.tipo_mascota(id_tipo_mascota)
);

create table if not exists public.estado_mascota (
  id_estado_mascota bigint generated always as identity primary key,
  nombre varchar(30) not null unique
);

create table if not exists public.estado_adopcion (
  id_estado_adopcion bigint generated always as identity primary key,
  nombre varchar(30) not null unique
);

create table if not exists public.rol (
  id_rol bigint generated always as identity primary key,
  nombre varchar(50) not null unique
);

-- =========================================================
-- PERFILES
-- =========================================================

create table if not exists public.usuario_profile (
  id_usuario uuid primary key references public.auth(id_auth) on delete cascade,
  nombre varchar(100) not null,
  telefono varchar(20) not null,
  direccion varchar(250),
  foto_perfil_url varchar(250),
  bio text,
  fecha_actualizacion timestamptz default now(),
  id_comuna bigint references public.comuna(id_comuna)
);

create table if not exists public.refugio_profile (
  id_refugio uuid primary key default gen_random_uuid(),
  nombre varchar(150) not null,
  direccion varchar(250),
  telefono varchar(20) not null,
  descripcion text,
  codigo_postal varchar(20),
  verificada boolean not null default false,
  id_comuna bigint references public.comuna(id_comuna),
  auth_user_id uuid not null unique references public.auth(id_auth) on delete cascade
);

create table if not exists public.usuario_rol (
  auth_user_id uuid not null references public.auth(id_auth) on delete cascade,
  id_rol bigint not null references public.rol(id_rol),
  primary key (auth_user_id, id_rol)
);

-- =========================================================
-- NÚCLEO DEL DOMINIO
-- =========================================================

create table if not exists public.mascota (
  id_mascota uuid primary key default gen_random_uuid(),
  nombre varchar(100) not null,
  edad integer not null check (edad >= 0),
  sexo varchar(20) not null,
  tamanio varchar(20) not null,
  nivel_energia varchar(20),
  caracter varchar(100),
  descripcion text,
  fecha_publicacion timestamptz not null default now(),
  fecha_actualizacion timestamptz,
  id_refugio uuid not null references public.refugio_profile(id_refugio) on delete cascade,
  id_tipo_mascota bigint not null references public.tipo_mascota(id_tipo_mascota),
  id_raza bigint not null references public.raza(id_raza),
  id_estado_mascota bigint not null references public.estado_mascota(id_estado_mascota),
  id_comuna bigint not null references public.comuna(id_comuna)
);

create table if not exists public.imagen_mascota (
  id_imagen uuid primary key default gen_random_uuid(),
  url varchar(250) not null,
  es_principal boolean not null default false,
  orden_visualizacion integer not null default 1,
  id_mascota uuid not null references public.mascota(id_mascota) on delete cascade
);

create table if not exists public.favorito (
  id_fav uuid primary key default gen_random_uuid(),
  fecha_creacion timestamptz not null default now(),
  id_mascota uuid not null references public.mascota(id_mascota) on delete cascade,
  auth_user_id uuid not null references public.auth(id_auth) on delete cascade,
  unique (id_mascota, auth_user_id)
);

create table if not exists public.solicitud_adopcion (
  id_solicitud uuid primary key default gen_random_uuid(),
  mensaje_postulacion text,
  fecha_solicitud timestamptz not null default now(),
  fecha_actualizacion timestamptz,
  id_mascota uuid not null references public.mascota(id_mascota) on delete cascade,
  id_estado_adopcion bigint not null references public.estado_adopcion(id_estado_adopcion),
  auth_user_id uuid not null references public.auth(id_auth) on delete cascade
);

create table if not exists public.notificacion (
  id_notificacion uuid primary key default gen_random_uuid(),
  tipo varchar(50) not null,
  titulo varchar(150) not null,
  mensaje text not null,
  leida boolean not null default false,
  fecha_creacion timestamptz not null default now(),
  auth_user_id uuid not null references public.auth(id_auth) on delete cascade
);

-- =========================================================
-- ÍNDICES
-- =========================================================

create index if not exists idx_auth_email on public.auth (email);
create index if not exists idx_auth_role on public.auth (role);

create index if not exists idx_raza_id_tipo_mascota on public.raza (id_tipo_mascota);

create index if not exists idx_usuario_profile_id_comuna on public.usuario_profile (id_comuna);

create index if not exists idx_refugio_profile_id_comuna on public.refugio_profile (id_comuna);
create index if not exists idx_refugio_profile_auth_user_id on public.refugio_profile (auth_user_id);

create index if not exists idx_usuario_rol_auth_user_id on public.usuario_rol (auth_user_id);
create index if not exists idx_usuario_rol_id_rol on public.usuario_rol (id_rol);

create index if not exists idx_mascota_id_refugio on public.mascota (id_refugio);
create index if not exists idx_mascota_id_tipo_mascota on public.mascota (id_tipo_mascota);
create index if not exists idx_mascota_id_raza on public.mascota (id_raza);
create index if not exists idx_mascota_id_estado_mascota on public.mascota (id_estado_mascota);
create index if not exists idx_mascota_id_comuna on public.mascota (id_comuna);

create index if not exists idx_imagen_mascota_id_mascota on public.imagen_mascota (id_mascota);

create index if not exists idx_favorito_id_mascota on public.favorito (id_mascota);
create index if not exists idx_favorito_auth_user_id on public.favorito (auth_user_id);

create index if not exists idx_solicitud_adopcion_id_mascota on public.solicitud_adopcion (id_mascota);
create index if not exists idx_solicitud_adopcion_id_estado_adopcion on public.solicitud_adopcion (id_estado_adopcion);
create index if not exists idx_solicitud_adopcion_auth_user_id on public.solicitud_adopcion (auth_user_id);

create index if not exists idx_notificacion_auth_user_id on public.notificacion (auth_user_id);

-- =========================================================
-- RLS
-- =========================================================
-- Se deja activado porque el esquema public está expuesto por la API.
-- Pero las policies NO usan auth.uid(), porque su auth es propia.

alter table public.auth enable row level security;
alter table public.comuna enable row level security;
alter table public.tipo_mascota enable row level security;
alter table public.raza enable row level security;
alter table public.estado_mascota enable row level security;
alter table public.estado_adopcion enable row level security;
alter table public.rol enable row level security;

alter table public.usuario_profile enable row level security;
alter table public.refugio_profile enable row level security;
alter table public.usuario_rol enable row level security;

alter table public.mascota enable row level security;
alter table public.imagen_mascota enable row level security;
alter table public.favorito enable row level security;
alter table public.solicitud_adopcion enable row level security;
alter table public.notificacion enable row level security;

-- =========================================================
-- POLICIES PÚBLICAS DE SOLO LECTURA
-- =========================================================
-- Estas tablas sí se pueden exponer con la publishable key si quieren.

create policy "comuna_select_public"
on public.comuna
for select
using (true);

create policy "tipo_mascota_select_public"
on public.tipo_mascota
for select
using (true);

create policy "raza_select_public"
on public.raza
for select
using (true);

create policy "estado_mascota_select_public"
on public.estado_mascota
for select
using (true);

create policy "estado_adopcion_select_public"
on public.estado_adopcion
for select
using (true);

create policy "rol_select_public"
on public.rol
for select
using (true);

create policy "refugio_profile_select_public"
on public.refugio_profile
for select
using (true);

create policy "mascota_select_public"
on public.mascota
for select
using (true);

create policy "imagen_mascota_select_public"
on public.imagen_mascota
for select
using (true);
