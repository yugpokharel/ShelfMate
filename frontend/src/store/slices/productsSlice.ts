import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types'
import { apiFetch } from '@/utils/api'
import { mapBackendProductToFrontend } from '@/utils/mappings'

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
  error: string | null
  filters: {
    category?: string
    priceRange: [number, number]
    search: string
    inStockOnly: boolean
  }
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  filters: {
    category: undefined,
    priceRange: [0, 1000],
    search: '',
    inStockOnly: false,
  },
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/products?limit=100')
      const items = response.data.items || []
      return items.map((p: any) => mapBackendProductToFrontend(p))
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch products')
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      applyFilters(state)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      applyFilters(state)
    },
    setCategoryFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.category = action.payload
      applyFilters(state)
    },
    setPriceFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload
      applyFilters(state)
    },
    setInStockFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.inStockOnly = action.payload
      applyFilters(state)
    },
    resetFilters: (state) => {
      state.filters = {
        category: undefined,
        priceRange: [0, 1000],
        search: '',
        inStockOnly: false,
      }
      state.filteredProducts = state.products
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload
      applyFilters(state)
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})

function applyFilters(state: ProductsState) {
  let filtered = state.products

  if (state.filters.search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(state.filters.search.toLowerCase())
    )
  }

  if (state.filters.category) {
    filtered = filtered.filter((p) => p.category === state.filters.category)
  }

  filtered = filtered.filter(
    (p) => p.price >= state.filters.priceRange[0] && p.price <= state.filters.priceRange[1]
  )

  if (state.filters.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock)
  }

  state.filteredProducts = filtered
}

export const {
  setProducts,
  setLoading,
  setSearchFilter,
  setCategoryFilter,
  setPriceFilter,
  setInStockFilter,
  resetFilters,
} = productsSlice.actions
export default productsSlice.reducer
