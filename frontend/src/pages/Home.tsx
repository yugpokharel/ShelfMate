import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setProducts } from '@/store/slices/productsSlice'
import { mockProducts, mockDeals } from '@/data/mockProducts'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, Sparkles, Leaf, Zap, ArrowRight } from 'lucide-react'

export default function Home() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.filteredProducts).slice(0, 8)

  useEffect(() => {
    dispatch(setProducts(mockProducts))
  }, [dispatch])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Smart Grocery Shopping Made Simple
              </h1>
              <p className="text-xl text-white/90 mb-8">
                AI-powered Smart Lists and premium delivery for busy urban professionals. Save time, save money, eat fresh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button variant="secondary" size="lg">
                    Start Shopping
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/smart-lists">
                  <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <ShoppingBag className="w-48 h-48 text-white/80" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ShelfMate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-border">
              <Sparkles className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Smart Lists</h3>
              <p className="text-muted-foreground">
                AI-powered recommendations based on your preferences and past purchases. Save your favorite items and reorder with one click.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-border">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Premium delivery service with real-time tracking and flexible scheduling. Get groceries when you need them.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-border">
              <Leaf className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Fresh & Organic</h3>
              <p className="text-muted-foreground">
                Curated selection of fresh produce and organic products. Direct from farms to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Hot Deals Today</h2>
            <Link to="/deals" className="text-accent hover:underline font-semibold flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer">
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
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-sm font-semibold text-accent">{product.rating}★</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Our Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">₹{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-sm font-semibold text-accent">{product.rating}★</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Shopping?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of busy professionals saving time with ShelfMate. Get your first order delivered today!
          </p>
          <Link to="/shop">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
