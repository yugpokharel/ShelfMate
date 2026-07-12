'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'
import ProductCard from '@/components/products/ProductCard'
import { Search, Filter } from 'lucide-react'

// Mock data - replace with API call
const mockProducts = [
  {
    id: '1',
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 3.99,
    originalPrice: 5.99,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: '2',
    name: 'Fresh Broccoli',
    category: 'Vegetables',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1577640643308-d39e65051dcd?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: '3',
    name: 'Whole Milk',
    category: 'Dairy',
    price: 3.29,
    originalPrice: 3.99,
    image: 'https://images.unsplash.com/photo-1608270861620-7aec3d1ca58f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 245,
    inStock: true,
  },
  {
    id: '4',
    name: 'Organic Eggs',
    category: 'Dairy',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1585985947529-ddd5dbb29fe7?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: '5',
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1589521470516-37d3e50c3a92?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 178,
    inStock: true,
  },
  {
    id: '6',
    name: 'Cherry Tomatoes',
    category: 'Vegetables',
    price: 2.99,
    originalPrice: 4.49,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 92,
    inStock: true,
  },
  {
    id: '7',
    name: 'Blueberries',
    category: 'Fruits',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1447597337323-e3e2d66d4e21?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 201,
    inStock: true,
  },
  {
    id: '8',
    name: 'Greek Yogurt',
    category: 'Dairy',
    price: 4.49,
    originalPrice: 5.49,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 134,
    inStock: false,
  },
]

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Pantry']

export default function ShopPage() {
  const [cartCount, setCartCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleAddToCart = (productId: string) => {
    setCartCount((prev) => prev + 1)
    // TODO: Integrate with cart state management
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation cartCount={cartCount} />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-card border-b border-border py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Shop</h1>
            <p className="text-muted-foreground">
              Browse our selection of fresh produce, dairy, and pantry items
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Categories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} products
                </p>
              </div>

              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={wishlist.has(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All')
                    }}
                    className="text-accent hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
