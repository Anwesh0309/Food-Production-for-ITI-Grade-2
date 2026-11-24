import {
  ChefHat, Users, Shirt, HandHeart, Utensils, Carrot, ShoppingBasket,
  Snowflake, Flame, Croissant, Wheat, Siren, ShieldAlert, Salad,
  type LucideIcon,
} from 'lucide-react';

/* ============================================================
   Food Production design system — warm, kitchen-appropriate
   palettes per topic, one per Food Production subject
   system so both modules feel like one family of platforms.
   ============================================================ */

export interface FoodTheme { key: string; accent: string; accent2: string; Icon: LucideIcon; label: string }

export const FOOD_THEMES: Record<string, FoodTheme> = {
  kitchen:      { key: 'kitchen',      accent: '#ea580c', accent2: '#f59e0b', Icon: ChefHat,       label: 'Kitchen' },
  organization: { key: 'organization', accent: '#d97706', accent2: '#84cc16', Icon: Users,         label: 'Kitchen Brigade' },
  uniform:      { key: 'uniform',      accent: '#2563eb', accent2: '#38bdf8', Icon: Shirt,         label: 'Chef Uniform' },
  hygiene:      { key: 'hygiene',      accent: '#0891b2', accent2: '#22c55e', Icon: HandHeart,     label: 'Hygiene' },
  equipment:    { key: 'equipment',    accent: '#6366f1', accent2: '#06b6d4', Icon: Utensils,      label: 'Equipment' },
  cuts:         { key: 'cuts',         accent: '#15803d', accent2: '#22c55e', Icon: Carrot,        label: 'Tools & Cuts' },
  commodity:    { key: 'commodity',    accent: '#ca8a04', accent2: '#f59e0b', Icon: ShoppingBasket, label: 'Commodities' },
  storage:      { key: 'storage',      accent: '#0284c7', accent2: '#38bdf8', Icon: Snowflake,     label: 'Storage' },
  cooking:      { key: 'cooking',      accent: '#dc2626', accent2: '#f97316', Icon: Flame,         label: 'Cooking' },
  bakery:       { key: 'bakery',       accent: '#c2410c', accent2: '#fbbf24', Icon: Croissant,     label: 'Bakery' },
  dough:        { key: 'dough',        accent: '#b45309', accent2: '#eab308', Icon: Wheat,         label: 'Dough & Batter' },
  firstaid:     { key: 'firstaid',     accent: '#dc2626', accent2: '#f59e0b', Icon: Siren,         label: 'Safety & First-Aid' },
  safety:       { key: 'safety',       accent: '#e11d48', accent2: '#f59e0b', Icon: ShieldAlert,   label: 'Food Safety' },
  plating:      { key: 'plating',      accent: '#db2777', accent2: '#f59e0b', Icon: Salad,         label: 'Plating' },
};

export function withAlpha(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
