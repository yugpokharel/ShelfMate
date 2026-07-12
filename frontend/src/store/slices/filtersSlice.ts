import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  category: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'
  searchQuery: string
}

const initialState: FiltersState = {
  category: [],
  priceRange: [0, 1000],
  rating: 0,
  inStock: false,
  sortBy: 'relevance',
  searchQuery: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload
    },
    setInStock: (state, action: PayloadAction<boolean>) => {
      state.inStock = action.payload
    },
    setSortBy: (state, action: PayloadAction<'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'>) => {
      state.sortBy = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const {
  setCategory,
  setPriceRange,
  setRating,
  setInStock,
  setSortBy,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
