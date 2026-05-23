import type { SupabaseClient } from '@supabase/supabase-js';
import type { ShopCategory } from './constants';

export interface ShopProductRow {
  id: string;
  slug: string;
  title: string;
  artist: string;
  category: ShopCategory;
  description: string | null;
  price_krw: number;
  shipping_fee: number;
  images: string[];
  status: 'on_sale' | 'sold' | 'hidden';
  sold_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function listOnSaleProducts(
  client: SupabaseClient,
  category?: ShopCategory
): Promise<ShopProductRow[]> {
  let q = client
    .from('shop_products')
    .select('*')
    .eq('status', 'on_sale')
    .order('created_at', { ascending: false });
  if (category) q = q.eq('category', category);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as ShopProductRow[];
}

export async function getProductBySlug(
  client: SupabaseClient,
  slug: string
): Promise<ShopProductRow | null> {
  const { data, error } = await client
    .from('shop_products')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return data as ShopProductRow;
}

export async function getProductById(
  client: SupabaseClient,
  id: string
): Promise<ShopProductRow | null> {
  const { data, error } = await client
    .from('shop_products')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data as ShopProductRow;
}
