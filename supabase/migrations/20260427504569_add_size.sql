
create table public.size (
  id_size smallint primary key,
  nombre varchar(50) not null unique
);

insert into public.size (id_size, nombre) values
  (1, 'Pequeño'),
  (2, 'Mediano'),
  (3, 'Grande')
on conflict (id_size) do nothing;

alter table public.mascota
  add column if not exists id_size int references public.size (id_size);

update public.mascota
set id_size = 2
where id_size is null;

