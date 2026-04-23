
-- OTP de segundo factor (login por correo)

create table public.auth_login_otp (
  id_otp uuid primary key default gen_random_uuid(),
  auth_id uuid not null references public.auth(auth_id) on delete cascade,
  codigo_hash varchar(255) not null,
  fecha_expiracion timestamptz not null,
  fecha_consumo timestamptz,
  fecha_creacion timestamptz not null default now()
);

create index idx_auth_login_otp_auth_fecha_exp
  on public.auth_login_otp (auth_id, fecha_expiracion desc);

create index idx_auth_login_otp_fecha_exp
  on public.auth_login_otp (fecha_expiracion);
