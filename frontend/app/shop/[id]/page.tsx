'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'
import { Star, Heart, ShoppingCart, Share2 } from 'lucide-react'

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Organic Bananas (Fair Trade)',
  category: 'Fruits',
  price: 3.99,
  originalPrice: 5.99,
  rating: 4.8,
  reviews: 156,
  inStock: true,
  image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
  images: [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
  ],
  description:
    'Fresh, organic bananas sourced directly from fair trade farms. Rich in potassium and natural energy, perfect for smoothies, baking, or eating on the go.',
  specifications: {
    weight: '1 lb (3-4 bananas)',
    origin: 'Ecuador',
    certification: 'USDA Organic, Fair Trade',
    shelfLife: '3-5 days',
  },
  benefits: [
    'Rich in potassium',
    'Good source of vitamin B6',
    'Contains natural fiber',
    'Fair trade certified',
    'Organic certified',
  ],
  reviews: [
    {
      rating: 5,
      title: 'Great quality!',
      comment: 'Always fresh and delicious',
      author: 'Sarah M.',
      date: '2 days ago',
    },
    {
      rating: 4,
      title: 'Good value',
      comment: 'Fair price for organic',
      author: 'John D.',
      date: '1 week ago',
    },
  ],
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation cartCount={1} />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/shop" className="hover:text-accent transition">
              Shop
            </Link>
            <span>/</span>
            <Link href={`/shop?category=${mockProduct.category}`} className="hover:text-accent transition">
              {mockProduct.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{mockProduct.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="bg-secondary rounded-lg overflow-hidden mb-4">
                <img
                  src={mockProduct.image}
                  alt={mockProduct.name}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {mockProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    className="aspect-square bg-secondary rounded-lg overflow-hidden hover:border-2 hover:border-accent transition"
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  {mockProduct.category}
                </p>
                <h1 className="text-4xl font-bold mb-4">{mockProduct.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold">{mockProduct.rating}</span>
                  <span className="text-muted-foreground">({mockProduct.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold">${mockProduct.price}</span>
                  {mockProduct.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${mockProduct.originalPrice}
                    </span>
                  )}
                  <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm font-bold">
                    -33%
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8">{mockProduct.description}</p>

              {/* Quantity & Actions */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Quantity</label>
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-3 border border-border rounded-lg p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 hover:text-accent transition"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 hover:text-accent transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setIsInWishlist(!isInWishlist)}
                    className="p-3 border-2 border-border rounded-lg hover:bg-secondary transition"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isInWishlist ? 'currentColor' : 'none'}
                      color={isInWishlist ? '#059669' : 'currentColor'}
                    />
                  </button>
                  <button className="p-3 border-2 border-border rounded-lg hover:bg-secondary transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div className="border-t border-border pt-6">
                <h3 className="font-bold mb-4">Specifications</h3>
                <dl className="space-y-3 text-sm">
                  {Object.entries(mockProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-muted-foreground capitalize">{key}:</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Benefits */}
              <div className="border-t border-border mt-6 pt-6">
                <h3 className="font-bold mb-4">Benefits</h3>
                <ul className="space-y-2">
                  {mockProduct.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="text-accent">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {mockProduct.reviews.map((review, idx) => (
                <div key={idx} className="p-6 bg-card border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex text-accent mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? '' : 'opacity-30'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <h4 className="font-semibold">{review.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.comment}</p>
                  <p className="text-xs text-muted-foreground">— {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
