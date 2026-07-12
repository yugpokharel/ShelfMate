import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockDeals, mockProducts } from '@/data/mockData'
import { Zap, Clock } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/Button'
import { useNotification } from '@/context/NotificationContext'

interface DealWithProduct {
  deal: typeof mockDeals[0]
  product: typeof mockProducts[0]
}

export default function Deals() {
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()
  const [deals, setDeals] = useState<DealWithProduct[]>([])
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({})

  useEffect(() => {
    const dealsWithProducts = mockDeals.map((deal) => ({
      deal,
      product: mockProducts.find((p) => p.id === deal.productId)!,
    }))
    setDeals(dealsWithProducts)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, string> = {}
      deals.forEach((item) => {
        const expiresAt = new Date(item.deal.expiresAt).getTime()
        const now = Date.now()
        const diff = expiresAt - now

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          newTimeLeft[item.deal.id] = `${hours}h ${minutes}m`
        } else {
          newTimeLeft[item.deal.id] = 'Expired'
        }
      })
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [deals])

  const handleQuickAdd = (product: typeof mockProducts[0]) => {
    dispatch(addToCart({ product, quantity: 1 }))
    addNotification(`${product.name} added to cart!`, 'success')
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold">Hot Deals</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Limited-time offers on your favorite products. Hurry, these deals won't last long!
          </p>
        </div>

        {/* Featured Deals */}
        {deals.filter((d) => d.deal.featured).length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {deals
                .filter((d) => d.deal.featured)
                .map(({ deal, product }) => (
                  <Link key={deal.id} to={`/product/${product.id}`}>
                    <div className="relative bg-white rounded-lg border-2 border-red-500 overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-30" />

                      <div className="relative p-8 grid grid-cols-2 gap-6 items-center">
                        {/* Image */}
                        <div className="flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>

                        {/* Details */}
                        <div>
                          <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                            -{deal.discount}%
                          </span>
                          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>

                          {/* Price */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-accent">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            <p className="text-green-600 font-semibold">Save ₹{(product.originalPrice || product.price) - product.price}</p>
                          </div>

                          {/* Timer */}
                          {timeLeft[deal.id] && (
                            <div className="flex items-center gap-2 text-sm font-semibold mb-4 text-red-600">
                              <Clock className="w-4 h-4" />
                              {timeLeft[deal.id]}
                            </div>
                          )}

                          {/* Action */}
                          <Button
                            onClick={(e) => {
                              e.preventDefault()
                              handleQuickAdd(product)
                            }}
                            className="w-full"
                          >
                            Quick Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* All Deals */}
        <section>
          <h2 className="text-2xl font-bold mb-8">All Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map(({ deal, product }) => (
              <Link key={deal.id} to={`/product/${product.id}`}>
                <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow h-full">
                  {/* Badge */}
                  <div className="relative aspect-square bg-secondary overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                      -{deal.discount}%
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between h-48">
                    <div>
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="font-bold text-lg text-accent">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Timer */}
                    {timeLeft[deal.id] && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-red-600 mb-3">
                        <Clock className="w-3 h-3" />
                        {timeLeft[deal.id]}
                      </div>
                    )}

                    {/* Quick Add */}
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault()
                        handleQuickAdd(product)
                      }}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
