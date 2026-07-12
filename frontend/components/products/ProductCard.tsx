'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      onAddToCart?.(product.id)
    } finally {
      setIsAdding(false)
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary h-48">
        <Link href={`/shop/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </Link>

        {/* Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          {discount > 0 && (
            <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold">
              -{discount}%
            </div>
          )}
          {!product.inStock && (
            <div className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-bold">
              Out of Stock
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist?.(product.id)}
          className="absolute top-3 right-3 p-2 bg-background border border-border rounded-full hover:bg-secondary transition"
          aria-label="Add to wishlist"
        >
          <Heart
            className="w-4 h-4"
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke={isInWishlist ? 'currentColor' : 'currentColor'}
            color={isInWishlist ? '#059669' : 'currentColor'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-accent">★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-semibold text-sm mb-3 line-clamp-2 hover:text-accent transition">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            product.inStock
              ? 'bg-accent text-accent-foreground hover:opacity-90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          } ${isAdding ? 'opacity-70' : ''}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}
