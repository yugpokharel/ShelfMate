// Product Types
export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  inStock: boolean
  quantity?: number
  sku?: string
  tags?: string[]
}

// Cart Types
export interface CartItem extends Product {
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  delivery: number
  total: number
}

// User Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault?: boolean
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: CartItem[]
  shippingAddress: Address
  billingAddress: Address
  subtotal: number
  tax: number
  delivery: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  trackingNumber?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

// Smart List Types
export interface SmartList {
  id: string
  userId: string
  name: string
  description?: string
  items: SmartListItem[]
  suggestions?: string[]
  isShared: boolean
  createdAt: string
  updatedAt: string
}

export interface SmartListItem {
  id: string
  productId?: string
  name: string
  quantity: number
  unit?: string
  isChecked: boolean
  addedAt: string
}

// Wishlist Types
export interface Wishlist {
  id: string
  userId: string
  items: Product[]
  createdAt: string
  updatedAt: string
}

// Preferences Types
export interface UserPreferences {
  userId: string
  theme: 'light' | 'dark' | 'system'
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  deliveryPreference: 'fastest' | 'standard' | 'scheduled'
  paymentMethod: string
  defaultAddress: string
}

// Review Types
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: number
  createdAt: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
