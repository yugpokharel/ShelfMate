import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Cart } from '@/types'
import { apiFetch } from '@/utils/api'
import { mapBackendProductToFrontend } from '@/utils/mappings'

interface CartState {
  cart: Cart
  isLoading: boolean
  error: string | null
}

const initialState: CartState = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  isLoading: false,
  error: null,
}

// Maps backend cart items back to the format the frontend expects
const mapBackendCartToFrontend = (backendCart: any): Cart => {
  const items = (backendCart.items || []).map((item: any) => {
    const product = item.product ? mapBackendProductToFrontend(item.product) : null
    return {
      id: item._id,
      productId: item.product?._id || item.product,
      quantity: item.quantity,
      price: item.price,
      product,
    }
  })

  return {
    items,
    total: backendCart.totals?.subtotal || 0,
    itemCount: backendCart.totals?.itemCount || 0,
  }
}

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/cart')
      return mapBackendCartToFrontend(response.data)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch cart')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item: { product: { id: string }; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          productId: item.product.id,
          quantity: item.quantity,
        }),
      })
      return mapBackendCartToFrontend(response.data)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to add item to cart')
    }
  }
)

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async (
    payload: { productId: string; quantity: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { cart: CartState }
      const cartItem = state.cart.cart.items.find((item) => item.productId === payload.productId)

      if (!cartItem) {
        throw new Error('Item not found in cart')
      }

      if (payload.quantity <= 0) {
        const response = await apiFetch(`/cart/item/${cartItem.id}`, {
          method: 'DELETE',
        })
        return mapBackendCartToFrontend(response.data)
      } else {
        const response = await apiFetch(`/cart/item/${cartItem.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ quantity: payload.quantity }),
        })
        return mapBackendCartToFrontend(response.data)
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update quantity')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: CartState }
      const cartItem = state.cart.cart.items.find((item) => item.productId === productId)

      if (!cartItem) {
        throw new Error('Item not found in cart')
      }

      const response = await apiFetch(`/cart/item/${cartItem.id}`, {
        method: 'DELETE',
      })
      return mapBackendCartToFrontend(response.data)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to remove item')
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/cart/clear', {
        method: 'DELETE',
      })
      return mapBackendCartToFrontend(response.data)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to clear cart')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false
      state.cart = action.payload
      state.error = null
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // addToCart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false
      state.cart = action.payload
      state.error = null
    })
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // updateQuantity
    builder.addCase(updateQuantity.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.isLoading = false
      state.cart = action.payload
      state.error = null
    })
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // removeFromCart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false
      state.cart = action.payload
      state.error = null
    })
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // clearCart
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.isLoading = false
      state.cart = action.payload
      state.error = null
    })
    builder.addCase(clearCart.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})

export default cartSlice.reducer
