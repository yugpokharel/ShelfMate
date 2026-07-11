// common.types.ts — ShelfMate
// Shared types used across multiple features

export type DietaryTag =
  | 'organic'
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'nut-free'
  | 'low-sugar';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'card' | 'apple_pay' | 'google_pay';

export type UserRole = 'user' | 'admin';

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  isDefault: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}
