import { customAlphabet } from 'nanoid';

const ALPHABET = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
const nano4 = customAlphabet(ALPHABET, 4);

export const SHOP_ORDER_ID_PATTERN = /^SHOP-\d{8}-[0-9A-Za-z]{4}$/;

export function generateShopOrderId(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `SHOP-${y}${m}${d}-${nano4()}`;
}
