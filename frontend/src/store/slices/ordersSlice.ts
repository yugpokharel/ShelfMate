import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '@/types'
import { apiFetch } from '@/utils/api'

interface OrdersState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
}

const mapBackendOrderToFrontend = (o: any): Order => {
  return {
    id: o._id || o.id,
    total: o.total,
    status: o.status === 'out_for_delivery' ? 'shipped' : o.status, // Match frontend's 'pending' | 'confirmed' | 'shipped' | 'delivered'
    createdAt: o.createdAt,
    estimatedDelivery: o.createdAt,
    address: {
      id: 'ord-addr',
      label: o.address?.line2 || 'Delivery Address',
      street: o.address?.line1 || '',
      city: o.address?.city || '',
      state: '',
      zipCode: o.address?.postcode || '',
      country: '',
      isDefault: false,
    },
    items: (o.items || []).map((item: any, idx: number) => ({
      id: `ord-item-${idx}`,
      productId: item.product?._id || item.product,
      quantity: item.quantity,
      price: item.price,
      product: {
        id: item.product?._id || item.product,
        name: item.name,
        price: item.price,
        image: item.product?.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop',
        category: 'Pantry',
        rating: 4.5,
        reviews: 10,
        description: '',
        inStock: true,
        tags: [],
      },
    })),
  }
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/orders')
      const orders = response.data || []
      return orders.map((o: any) => mapBackendOrderToFrontend(o))
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch orders')
    }
  }
)

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (
    payload: {
      address: { line1: string; line2: string; city: string; postcode: string }
      deliverySlot: string
      paymentMethod: string
      deliveryFee?: number
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      return mapBackendOrderToFrontend(response.data)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to place order')
    }
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload
    },
  },
  extraReducers: (builder) => {
    // fetchOrders
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders = action.payload
      state.error = null
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // createOrder
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders.unshift(action.payload)
      state.currentOrder = action.payload
      state.error = null
    })
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})

export const { setCurrentOrder } = ordersSlice.actions
export default ordersSlice.reducer
