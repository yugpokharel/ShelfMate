export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
  discount?: number
  tags: string[]
  badge?: string
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  addresses: Address[]
  defaultAddressId?: string
}

export interface Address {
  id: string
  label: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string
  estimatedDelivery?: string
  address: Address
}

export interface Deal {
  id: string
  productId: string
  discount: number
  expiresAt: string
  featured: boolean
}

export interface SmartList {
  id: string
  name: string
  items: SmartListItem[]
  createdAt: string
  frequency?: 'weekly' | 'biweekly' | 'monthly'
}

export interface SmartListItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface NotificationContext {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}
