-- Shop product images: public read, writes go through server route (no client INSERT).

insert into storage.buckets (id, name, public)
values ('shop-product-images', 'shop-product-images', true)
on conflict (id) do nothing;

-- Read: anyone
create policy "shop_product_images_public_read"
  on storage.objects for select
  using (bucket_id = 'shop-product-images');

-- Writes blocked from client; admin route uses service role and bypasses RLS.
-- No INSERT/UPDATE/DELETE policies — default deny.
