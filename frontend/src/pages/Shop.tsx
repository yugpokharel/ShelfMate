import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setProducts,
  setSearchFilter,
  setCategoryFilter,
  setPriceFilter,
  resetFilters,
} from '@/store/slices/productsSlice'
import { mockProducts } from '@/data/mockProducts'
import { Button } from '@/components/ui/Button'
import { Filter, X, Search } from 'lucide-react'

const categories = ['All', 'Vegetables', 'Fruits', 'Bread & Bakery', 'Dairy', 'Beverages', 'Oils & Condiments']

export default function Shop() {
  const dispatch = useAppDispatch()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRangeState] = useState<[number, number]>([0, 500])
  const [searchValue, setSearchValue] = useState('')

  const filteredProducts = useAppSelector((state) => state.products.filteredProducts)
  const filters = useAppSelector((state) => state.products.filters)

  useEffect(() => {
    dispatch(setProducts(mockProducts))
  }, [dispatch])

  const handleSearch = (value: string) => {
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

  const handlePriceChange = (max: number) => {
    setPriceRangeState([0, max])
    dispatch(setPriceFilter([0, max]))
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shop Groceries</h1>
          <p className="text-muted-foreground">Browse our fresh selection of products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`lg:col-span-1 ${
              showFilters ? 'block' : 'hidden lg:block'
            } bg-secondary rounded-lg p-6 h-fit`}
          >
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <div className="flex items-center bg-white border border-border rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="ml-2 flex-1 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedCategory === category
                        ? 'bg-accent text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
              <div className="space-y-2">
                {[100, 250, 500].map((price) => (
                  <button
                    key={price}
                    onClick={() => handlePriceChange(price)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      priceRange[1] === price
                        ? 'bg-accent text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    Up to ₹{price}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {(selectedCategory !== 'All' || searchValue || priceRange[1] < 500) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  dispatch(resetFilters())
                  setSelectedCategory('All')
                  setPriceRangeState([0, 500])
                  setSearchValue('')
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            )}
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Show Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="relative aspect-square overflow-hidden bg-secondary">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                        {product.discount && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold truncate">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-lg font-bold">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-accent">{product.rating}★</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>
                          {!product.inStock && (
                            <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found</p>
                <Button onClick={() => {
                  dispatch(resetFilters())
                  setSelectedCategory('All')
                  setPriceRangeState([0, 500])
                  setSearchValue('')
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
