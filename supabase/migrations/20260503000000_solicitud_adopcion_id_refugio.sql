

alter table public.solicitud_adopcion
  add column if not exists id_refugio uuid references public.refugio_profile (id_refugio) on delete cascade;

update public.solicitud_adopcion s
set id_refugio = m.id_refugio
from public.mascota m
where s.id_mascota = m.id_mascota
  and s.id_refugio is null
  and m.id_refugio is not null;

create index if not exists idx_solicitud_refugio
  on public.solicitud_adopcion (id_refugio);
