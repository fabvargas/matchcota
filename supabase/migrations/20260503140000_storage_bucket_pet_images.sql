
-- Storage bucket para fotos de mascotas

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'pet_images',
  'pet_images',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- RLS en storage.objects lectura puublica, escritura con anon key 

drop policy if exists "pet_images_public_read" on storage.objects;
create policy "pet_images_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'pet_images');

drop policy if exists "pet_images_insert" on storage.objects;
create policy "pet_images_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'pet_images');

drop policy if exists "pet_images_update_own" on storage.objects;
create policy "pet_images_update_own"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'pet_images')
  with check (bucket_id = 'pet_images');

drop policy if exists "pet_images_delete_own" on storage.objects;
create policy "pet_images_delete_own"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'pet_images');
