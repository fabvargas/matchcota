

alter table public.mascota
  alter column id_size type smallint using id_size::smallint;

-- Se asigna "Mediano" como valor por defecto a registros antiguos que
-- hayan quedado sin tamaño

update public.mascota
set id_size = 2
where id_size is null;

alter table public.mascota
alter column id_size set not null;



-- Evita que un mismo usuario postule más de una vez a la misma mascota
-- Esta regla conviene dejarla en BD porque protege la consistencia aunque
-- el error venga desde frontend o back o manualmente

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'uq_solicitud_unica_por_usuario_mascota'
  ) then
    alter table public.solicitud_adopcion
      add constraint uq_solicitud_unica_por_usuario_mascota
      unique (id_mascota, auth_id);
  end if;
end $$;


-- Evita que una mascota tenga dos imágenes usando el mismo orden visual

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'uq_orden_imagen_por_mascota'
  ) then
    alter table public.imagen_mascota
      add constraint uq_orden_imagen_por_mascota
      unique (id_mascota, orden_visualizacion);
  end if;
end $$;



-- C) ÍNDICES PARA RELACIONES Y FILTROS HABITUALES


create index if not exists idx_comuna_region
on public.comuna (id_region);

create index if not exists idx_raza_tipo_mascota
on public.raza (id_tipo_mascota);

create index if not exists idx_auth_rol
on public.auth (id_rol);

create index if not exists idx_auth_provider
on public.auth (id_auth_provider);

create index if not exists idx_usuario_profile_comuna
on public.usuario_profile (id_comuna);

create index if not exists idx_refugio_profile_comuna
on public.refugio_profile (id_comuna);

create index if not exists idx_refugio_profile_auth
on public.refugio_profile (auth_id);

create index if not exists idx_mascota_refugio
on public.mascota (id_refugio);

create index if not exists idx_mascota_tipo
on public.mascota (id_tipo_mascota);

create index if not exists idx_mascota_raza
on public.mascota (id_raza);

create index if not exists idx_mascota_comuna
on public.mascota (id_comuna);

create index if not exists idx_mascota_estado
on public.mascota (id_estado_mascota);

create index if not exists idx_mascota_size
on public.mascota (id_size);

create index if not exists idx_mascota_sexo
on public.mascota (id_sexo);

create index if not exists idx_solicitud_mascota
on public.solicitud_adopcion (id_mascota);

create index if not exists idx_solicitud_auth
on public.solicitud_adopcion (auth_id);

create index if not exists idx_solicitud_estado
on public.solicitud_adopcion (id_estado_adopcion);

create index if not exists idx_imagen_mascota
on public.imagen_mascota (id_mascota);

create index if not exists idx_favorito_auth
on public.favorito (auth_id);

create index if not exists idx_favorito_mascota
on public.favorito (id_mascota);


-- D) ACTUALIZACIÓN AUTOMÁTICA DE FECHA_ACTUALIZACION
-- Esta función actualiza fecha_actualizacion cada vez que se modifica
-- un registro en tablas relevantes.


create or replace function public.actualizar_fecha_modificacion()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.fecha_actualizacion := now();
  return new;
end;
$$;


-- AUTH
drop trigger if exists trg_auth_actualizar_fecha_modificacion on public.auth;

create trigger trg_auth_actualizar_fecha_modificacion
before update on public.auth
for each row
execute function public.actualizar_fecha_modificacion();


-- PERFIL DE USUARIO
drop trigger if exists trg_usuario_profile_actualizar_fecha_modificacion on public.usuario_profile;

create trigger trg_usuario_profile_actualizar_fecha_modificacion
before update on public.usuario_profile
for each row
execute function public.actualizar_fecha_modificacion();


-- PERFIL DE REFUGIO
drop trigger if exists trg_refugio_profile_actualizar_fecha_modificacion on public.refugio_profile;

create trigger trg_refugio_profile_actualizar_fecha_modificacion
before update on public.refugio_profile
for each row
execute function public.actualizar_fecha_modificacion();


-- MASCOTA
drop trigger if exists trg_mascota_actualizar_fecha_modificacion on public.mascota;

create trigger trg_mascota_actualizar_fecha_modificacion
before update on public.mascota
for each row
execute function public.actualizar_fecha_modificacion();


-- SOLICITUD DE ADOPCIÓN
drop trigger if exists trg_solicitud_adopcion_actualizar_fecha_modificacion on public.solicitud_adopcion;

create trigger trg_solicitud_adopcion_actualizar_fecha_modificacion
before update on public.solicitud_adopcion
for each row
execute function public.actualizar_fecha_modificacion();

