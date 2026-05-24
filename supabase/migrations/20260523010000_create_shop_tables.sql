-- Shop MVP — products + orders tables (1-of-1 model)

create type shop_category as enum
  ('calligraphy', 'photography', 'painting', 'luxury');

create type shop_product_status as enum
  ('on_sale', 'sold', 'hidden');

create type shop_payment_status as enum
  ('pending', 'paid', 'failed', 'cancelled', 'refunded');

create table shop_products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  artist        text not null,
  category      shop_category not null,
  description   text,
  price_krw     integer not null check (price_krw > 0),
  shipping_fee  integer not null default 0 check (shipping_fee >= 0),
  images        text[] not null default '{}',
  status        shop_product_status not null default 'on_sale',
  sold_at       timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index shop_products_browse_idx
  on shop_products (status, category, created_at desc);

create table shop_orders (
  id                   uuid primary key default gen_random_uuid(),
  order_id             text not null unique,
  product_id           uuid not null references shop_products(id),
  user_id              text not null,
  buyer_name           text not null,
  buyer_email          text not null,
  buyer_phone          text not null,
  ship_zip             text not null,
  ship_address         text not null,
  ship_address_detail  text not null,
  ship_memo            text,
  amount               integer not null check (amount > 0),
  payment_status       shop_payment_status not null default 'pending',
  payment_key          text,
  paid_amount          integer,
  paid_at              timestamptz,
  payment_method       text,
  created_at           timestamptz not null default now()
);

-- Enforce 1-of-1: at most one pending/paid order per product
create unique index shop_orders_product_active_unique
  on shop_orders (product_id)
  where payment_status in ('pending', 'paid');

create index shop_orders_user_idx
  on shop_orders (user_id, created_at desc);

-- updated_at trigger for products
create or replace function shop_products_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger shop_products_set_updated_at_trg
  before update on shop_products
  for each row execute function shop_products_set_updated_at();
