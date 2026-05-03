-- =========================================================
-- EXTENSION
-- =========================================================
create extension if not exists pgcrypto;

-- =========================================================
-- DROP
-- =========================================================
drop table if exists public.favorito cascade;
drop table if exists public.imagen_mascota cascade;
drop table if exists public.mascota_caracter cascade;
drop table if exists public.solicitud_adopcion cascade;
drop table if exists public.mascota cascade;
drop table if exists public.usuario_profile cascade;
drop table if exists public.refugio_profile cascade;
drop table if exists public.auth cascade;
drop table if exists public.rol cascade;
drop table if exists public.provider cascade;
drop table if exists public.estado_adopcion cascade;
drop table if exists public.estado_mascota cascade;
drop table if exists public.raza cascade;
drop table if exists public.tipo_mascota cascade;
drop table if exists public.caracter cascade;
drop table if exists public.sexo cascade;
drop table if exists public.comuna cascade;
drop table if exists public.region cascade;

-- =========================================================
-- BASE
-- =========================================================

create table public.region (
id_region serial primary key,
nombre varchar(100) not null unique
);

create table public.comuna (
id_comuna serial primary key,
id_region int references public.region(id_region),
nombre varchar(100) not null
);

create table public.rol (
id_rol serial primary key,
nombre varchar(50) not null unique
);

create table public.provider (
id_provider serial primary key,
nombre varchar(50) not null unique
);

create table public.tipo_mascota (
id_tipo_mascota serial primary key,
nombre varchar(50) not null
);

create table public.estado_mascota (
id_estado_mascota serial primary key,
nombre varchar(50) not null
);

create table public.estado_adopcion (
id_estado_adopcion serial primary key,
nombre varchar(50) not null
);

create table public.raza (
id_raza serial primary key,
nombre varchar(100) not null,
id_tipo_mascota int references public.tipo_mascota(id_tipo_mascota),
unique(nombre, id_tipo_mascota)
);

create table public.caracter (
id_caracter serial primary key,
nombre varchar(50) not null
);

create table public.sexo (
id_sexo serial primary key,
nombre varchar(20) not null
);

-- =========================================================
-- AUTH
-- =========================================================

create table public.auth (
auth_id uuid primary key default gen_random_uuid(),
email varchar(150) not null unique,
password_hash varchar(255) not null,
verified boolean default false,
two_factor_enabled boolean default false,
fecha_creacion timestamptz not null default now(),
fecha_actualizacion timestamptz,
id_auth_provider int references public.provider(id_provider),
id_rol int references public.rol(id_rol)
);

-- =========================================================
-- PERFILES
-- =========================================================

create table public.usuario_profile (
id_usuario uuid primary key references public.auth(auth_id) on delete cascade,
nombre varchar(100),
telefono varchar(20),
direccion varchar(200),
imagen_url varchar(255),
descripcion text,
fecha_actualizacion timestamptz default now(),
id_comuna int references public.comuna(id_comuna)
);

create table public.refugio_profile (
id_refugio uuid primary key default gen_random_uuid(),
nombre varchar(150),
direccion varchar(200),
telefono varchar(20),
descripcion text,
imagen_url varchar(255),
fecha_actualizacion timestamptz default now(),
codigo_postal varchar(50),
id_comuna int references public.comuna(id_comuna),
auth_id uuid unique references public.auth(auth_id) on delete cascade
);

-- =========================================================
-- MASCOTA
-- =========================================================

create table public.mascota (
id_mascota uuid primary key default gen_random_uuid(),
nombre varchar(100),
edad int check (edad >= 0),
nivel_energia int check (nivel_energia between 1 and 5),
descripcion text,
descripcion_salud text,
fecha_publicacion timestamptz not null default now(),
fecha_actualizacion timestamptz,
id_refugio uuid references public.refugio_profile(id_refugio) on delete cascade,
id_tipo_mascota int references public.tipo_mascota(id_tipo_mascota),
id_raza int references public.raza(id_raza),
id_estado_mascota int references public.estado_mascota(id_estado_mascota),
id_comuna int references public.comuna(id_comuna),
id_sexo int references public.sexo(id_sexo)
);

create table public.mascota_caracter (
id_mascota uuid references public.mascota(id_mascota) on delete cascade,
id_caracter int references public.caracter(id_caracter),
primary key (id_mascota, id_caracter)
);

-- =========================================================
-- SOLICITUD ADOPCIÓN
-- =========================================================

create table public.solicitud_adopcion (
id_solicitud uuid primary key default gen_random_uuid(),
mensaje_postulacion text,
fecha_solicitud timestamptz not null default now(),
fecha_actualizacion timestamptz,
id_mascota uuid references public.mascota(id_mascota) on delete cascade,
id_estado_adopcion int references public.estado_adopcion(id_estado_adopcion),
auth_id uuid references public.auth(auth_id) on delete cascade
);

-- =========================================================
-- IMAGEN
-- =========================================================

create table public.imagen_mascota (
id_imagen uuid primary key default gen_random_uuid(),
url varchar(255),
orden_visualizacion int default 1,
id_mascota uuid references public.mascota(id_mascota) on delete cascade
);

-- =========================================================
-- FAVORITO
-- =========================================================

create table public.favorito (
id_favorito uuid primary key default gen_random_uuid(),
fecha_creacion timestamptz not null default now(),
id_mascota uuid references public.mascota(id_mascota) on delete cascade,
auth_id uuid references public.auth(auth_id) on delete cascade,
unique (id_mascota, auth_id)
);

-- =========================================================
-- DATOS BASE
-- =========================================================

-- REGIONES
insert into public.region (nombre) values
('Metropolitana'),
('Valparaíso'),
('Biobío'),
('Los Lagos');

-- COMUNAS (dinámico, sin hardcode)
insert into public.comuna (nombre, id_region) values
('Puerto Montt', (select id_region from region where nombre = 'Los Lagos')),
('Puerto Varas', (select id_region from region where nombre = 'Los Lagos')),
('Castro', (select id_region from region where nombre = 'Los Lagos')),
('Ancud', (select id_region from region where nombre = 'Los Lagos')),

('Santiago', (select id_region from region where nombre = 'Metropolitana')),
('Maipú', (select id_region from region where nombre = 'Metropolitana')),
('Puente Alto', (select id_region from region where nombre = 'Metropolitana')),
('La Florida', (select id_region from region where nombre = 'Metropolitana')),

('Valparaíso', (select id_region from region where nombre = 'Valparaíso')),
('Viña del Mar', (select id_region from region where nombre = 'Valparaíso')),
('Quilpué', (select id_region from region where nombre = 'Valparaíso')),

('Concepción', (select id_region from region where nombre = 'Biobío')),
('Chillán', (select id_region from region where nombre = 'Biobío')),
('Coronel', (select id_region from region where nombre = 'Biobío')),
('Hualpén', (select id_region from region where nombre = 'Biobío'));

-- ROLES
insert into public.rol (nombre) values ('ADOPTANTE'), ('REFUGIO');

-- PROVIDERS
insert into public.provider (nombre) values ('EMAIL'), ('GOOGLE');

-- TIPOS
insert into public.tipo_mascota (nombre) values ('Perro'), ('Gato');

-- SEXO
insert into public.sexo (nombre) values ('Macho'), ('Hembra');

-- ESTADOS
insert into public.estado_mascota (nombre) values ('Disponible'), ('Adoptado');

insert into public.estado_adopcion (nombre) values ('Pendiente'), ('Aprobado'), ('Rechazado');

-- CARACTER
insert into public.caracter (nombre) values
('Amigable'), ('Juguetón'), ('Tranquilo'), ('Curioso'), ('Tímido'),
('Activo'), ('Cariñoso'), ('Protector'), ('Sociable');

-- RAZA
insert into public.raza (nombre, id_tipo_mascota) values
('Labrador Retriever', 1),
('Pastor Alemán', 1),
('Golden Retriever', 1),
('Bulldog Inglés', 1),
('Poodle', 1),
('Beagle', 1),
('Rottweiler', 1),
('Yorkshire Terrier', 1),
('Boxer', 1),
('Dachshund', 1),
('Chihuahua', 1),
('Border Collie', 1),
('Husky Siberiano', 1),
('Shih Tzu', 1),
('Cocker Spaniel', 1),
('Siamés', 2),
('Persa', 2),
('Maine Coon', 2),
('Bengalí', 2),
('Sphynx', 2),
('Ragdoll', 2),
('British Shorthair', 2),
('Scottish Fold', 2),
('Abisinio', 2),
('Azul Ruso', 2);
