import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartItem, Product } from '@/types'

interface CartState {
  cart: Cart
  isLoading: boolean
}

const initialState: CartState = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  isLoading: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload
      const existingItem = state.cart.items.find((item) => item.productId === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cart.items.push({
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          quantity,
          price: product.price,
          product,
        })
      }

      state.cart.itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
      state.cart.total = state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart.items = state.cart.items.filter((item) => item.productId !== action.payload)
      state.cart.itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
      state.cart.total = state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const item = state.cart.items.find((item) => item.productId === productId)

      if (item) {
        if (quantity <= 0) {
          state.cart.items = state.cart.items.filter((item) => item.productId !== productId)
        } else {
          item.quantity = quantity
        }
      }

      state.cart.itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
      state.cart.total = state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    clearCart: (state) => {
      state.cart.items = []
      state.cart.total = 0
      state.cart.itemCount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
