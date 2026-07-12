// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Product Categories
export const PRODUCT_CATEGORIES = [
  'All',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Bakery',
  'Pantry',
  'Beverages',
  'Snacks',
  'Meat & Seafood',
  'Frozen',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

// Delivery Options
export const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard (3-5 days)', price: 4.99 },
  { id: 'express', label: 'Express (1-2 days)', price: 9.99 },
  { id: 'same-day', label: 'Same Day', price: 19.99 },
] as const

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'apple-pay', label: 'Apple Pay' },
  { id: 'google-pay', label: 'Google Pay' },
] as const

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  pending: 'text-yellow-600 bg-yellow-100',
  confirmed: 'text-blue-600 bg-blue-100',
  shipped: 'text-purple-600 bg-purple-100',
  delivered: 'text-green-600 bg-green-100',
  cancelled: 'text-red-600 bg-red-100',
} as const

// Rating Display
export const RATING_LEVELS = {
  5: 'Excellent',
  4: 'Good',
  3: 'Average',
  2: 'Poor',
  1: 'Very Poor',
} as const

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const DEFAULT_PAGE = 1

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'shelfmate_cart',
  WISHLIST: 'shelfmate_wishlist',
  USER: 'shelfmate_user',
  AUTH_TOKEN: 'shelfmate_auth_token',
  PREFERENCES: 'shelfmate_preferences',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Item added to cart!',
  REMOVED_FROM_CART: 'Item removed from cart.',
  ADDED_TO_WISHLIST: 'Item added to wishlist!',
  REMOVED_FROM_WISHLIST: 'Item removed from wishlist.',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LIST_CREATED: 'Smart list created!',
} as const

// Feature Flags
export const FEATURES = {
  SMART_LISTS: false, // Coming soon
  STREAMLINE_DELIVERY: false, // Coming soon
  PRODUCT_RECOMMENDATIONS: true,
  WISHLIST: true,
  REVIEWS: true,
} as const
