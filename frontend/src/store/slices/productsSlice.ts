import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types'

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
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
  filters: {
    category: undefined,
    priceRange: [0, 1000],
    search: '',
    inStockOnly: false,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
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
