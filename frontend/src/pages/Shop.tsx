import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setSearchFilter,
  setCategoryFilter,
  setPriceFilter,
  resetFilters,
} from '@/store/slices/productsSlice'
import { addToCart } from '@/store/slices/cartSlice'
import { useNotification } from '@/context/NotificationContext'

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Bakery', 'Pantry', 'Beverages', 'Oils & Condiments', 'Seafood']

export default function Shop() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(50)
  const [searchValue, setSearchValue] = useState('')
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)

  const filteredProducts = useAppSelector((state) => state.products.filteredProducts)
  const user = useAppSelector((state) => state.auth.user)

  // Sync category state from Redux (e.g. if navigated from home category cards)
  const reduxCategory = useAppSelector((state) => state.products.filters.category)
  useEffect(() => {
    if (reduxCategory) {
      setSelectedCategory(reduxCategory)
    } else {
      setSelectedCategory('All')
    }
  }, [reduxCategory])

  // Sync search state from Redux
  const reduxSearch = useAppSelector((state) => state.products.filters.search)
  useEffect(() => {
    if (reduxSearch) {
      setSearchValue(reduxSearch)
    }
  }, [reduxSearch])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    dispatch(setSearchFilter(value))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      dispatch(setCategoryFilter(undefined))
    } else {
      dispatch(setCategoryFilter(category))
    }
  }

  const handlePriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value)
    setMaxPrice(price)
    dispatch(setPriceFilter([0, price]))
  }

  const handleDietToggle = (diet: string) => {
    if (selectedDiet === diet) {
      setSelectedDiet(null)
      dispatch(setSearchFilter(''))
    } else {
      setSelectedDiet(diet)
      dispatch(setSearchFilter(diet))
    }
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      addNotification('Please log in to add items to your cart', 'error')
      navigate('/login')
      return
    }
    dispatch(addToCart({ product, quantity: 1 }))
    addNotification(`${product.name} was added to your Cart.`, 'success')
  }

  const handleReset = () => {
    dispatch(resetFilters())
    setSelectedCategory('All')
    setMaxPrice(50)
    setSearchValue('')
    setSelectedDiet(null)
    setInStockOnly(false)
  }

  // Frontend filter for stock check since slice doesn't have custom filter for it
  const finalDisplayProducts = filteredProducts.filter((product) => {
    if (inStockOnly && !product.inStock) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen text-on-surface select-none font-body-lg">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-[280px] p-lg border-r border-outline-variant bg-surface-container-lowest sticky top-16 h-auto md:h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar">
        <div className="space-y-xl">
          {/* Search within */}
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Search Groceries</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                className="w-full pl-xl pr-sm py-xs border border-outline-variant rounded-lg focus:border-primary focus:ring-0 text-body-sm bg-surface-container-low outline-none"
                placeholder="Filter items..."
                type="text"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Category</h3>
            <div className="space-y-xs max-h-60 overflow-y-auto pr-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-sm cursor-pointer group py-1">
                  <input
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="text-primary focus:ring-primary h-4 w-4 border-outline-variant"
                    name="cat"
                    type="radio"
                  />
                  <span className={`text-body-sm group-hover:text-primary transition-colors ${selectedCategory === cat ? 'font-bold text-primary' : ''}`}>
                    {cat === 'All' ? 'All Products' : cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between mb-sm">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase">Price Range</h3>
              <span className="text-body-sm font-semibold text-primary">${maxPrice}</span>
            </div>
            <input
              className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              max="50"
              min="0"
              step="0.5"
              type="range"
              value={maxPrice}
              onChange={handlePriceSliderChange}
            />
          </div>

          {/* Dietary Chips */}
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Dietary</h3>
            <div className="flex flex-wrap gap-xs">
              {['Organic', 'Vegan', 'Healthy', 'Premium'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => handleDietToggle(diet)}
                  className={`px-sm py-xs rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors ${
                    selectedDiet === diet
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-outline-variant'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Show In Stock Only */}
          <div className="pt-sm border-t border-outline-variant">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-body-sm font-semibold">Show In Stock Only</span>
              <div className="relative inline-block w-10 h-6">
                <input
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-full h-full bg-outline-variant rounded-full peer peer-checked:bg-primary transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
              </div>
            </label>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'All' || searchValue || maxPrice < 50 || selectedDiet || inStockOnly) && (
            <button
              onClick={handleReset}
              className="w-full bg-surface-container-high text-on-surface font-button text-button py-sm rounded-lg hover:bg-outline-variant transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-lg overflow-x-hidden">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-xs text-on-surface-variant font-label-caps text-label-caps mb-sm">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary">{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
          <div>
            <h1 className="font-headline-lg text-headline-lg mb-xs">{selectedCategory === 'All' ? 'Fresh Groceries' : selectedCategory}</h1>
            <p className="text-on-surface-variant text-body-sm">
              Showing {finalDisplayProducts.length} results
              {searchValue && <span> for <span className="font-bold text-on-surface">"{searchValue}"</span></span>}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {finalDisplayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            {finalDisplayProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white p-md rounded-2xl border border-outline-variant elevation-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden mb-md relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <button className="absolute top-sm right-sm w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-secondary hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-error text-on-error text-label-caps px-md py-xs rounded-full">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-xs">
                    {product.badge && (
                      <span className="text-primary font-label-caps text-label-caps capitalize">{product.badge}</span>
                    )}
                    <h4 className="font-headline-md text-[16px] leading-[22px] font-semibold text-on-surface leading-tight truncate">{product.name}</h4>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">{product.category}</p>
                    <div className="flex items-center gap-xs">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className={`material-symbols-outlined text-sm ${s <= Math.round(product.rating) ? 'text-yellow-400' : 'text-surface-container-high'}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                      <span className="text-on-surface-variant text-[11px] font-body-sm">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-sm mt-4 border-t border-surface-container">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  {product.inStock && (
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-10 h-10 bg-surface-container text-primary rounded-lg flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant p-2xl rounded-xl shadow-sm text-center flex flex-col items-center justify-center min-h-[360px]">
            <div className="relative w-32 h-32 mb-lg">
              <div className="absolute inset-0 bg-secondary-container/20 rounded-full"></div>
              <span className="material-symbols-outlined text-[64px] text-secondary absolute inset-0 flex items-center justify-center">search_off</span>
            </div>
            <div>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">No results found</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mb-xl max-w-sm mx-auto">We couldn't find any products matching your filters. Try checking spelling or reset filters.</p>
            </div>
            <button
              onClick={handleReset}
              className="bg-primary text-on-primary px-lg py-md rounded-xl font-button text-button hover:opacity-90 transition-all active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
