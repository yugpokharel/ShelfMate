import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addToCart } from '@/store/slices/cartSlice'
import { useNotification } from '@/context/NotificationContext'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState('250g')

  const products = useAppSelector((state) => state.products.products)
  const user = useAppSelector((state) => state.auth.user)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary text-on-primary font-button text-button px-lg py-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      addNotification('Please log in to add items to your cart', 'error')
      navigate('/login')
      return
    }
    dispatch(addToCart({ product, quantity }))
    addNotification(`${product.name} was added to your Cart.`, 'success')
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    addNotification(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'info'
    )
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background text-on-surface select-none font-body-lg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-xs text-secondary font-label-caps text-label-caps mb-lg">
          <Link className="hover:text-primary" to="/">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link className="hover:text-primary" to="/shop">Shop</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl mb-16">
          {/* Left: Image Gallery (5/12 columns) */}
          <div className="lg:col-span-5 space-y-md">
            <div className="relative aspect-square bg-surface-container rounded-xl overflow-hidden shadow-sm">
              <img className="w-full h-full object-cover" alt={product.name} src={product.image} />
              <div className="absolute top-md left-md bg-primary-container text-on-primary-container px-md py-xs rounded-full flex items-center gap-xs font-label-caps text-label-caps shadow-md">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Verified Fresh
              </div>
            </div>
          </div>

          {/* Right: Product Info (7/12 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-xs mb-sm">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-tertiary-container/20 text-on-tertiary-container px-sm py-xs rounded-full font-label-caps text-[10px] uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">{product.name}</h1>
              
              <div className="flex items-center gap-md mb-lg">
                <div className="flex items-center gap-xs">
                  <div className="flex text-primary">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`material-symbols-outlined text-[20px] ${s <= Math.round(product.rating) ? 'text-yellow-400' : 'text-surface-container-high'}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary">({product.reviews} Reviews)</span>
                </div>
                <span className="w-[1px] h-4 bg-outline-variant"></span>
                <span className={`font-body-sm text-body-sm font-semibold ${product.inStock ? 'text-primary' : 'text-error'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-baseline gap-md mb-lg">
                <span className="font-headline-lg text-headline-lg text-on-surface">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="font-body-lg text-body-lg text-secondary line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="bg-error-container text-on-error-container px-sm py-xs rounded-lg font-label-caps text-label-caps">
                      -{product.discount}% Off
                    </span>
                  </>
                )}
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl leading-relaxed">
                {product.description || "Sourced from premium organic growers, selected for freshness and optimal quality. Hand-picked at peak maturity and ripened naturally to ensure a premium experience upon delivery."}
              </p>

              <div className="mb-xl">
                <h3 className="font-label-caps text-label-caps text-secondary mb-md">SELECT WEIGHT</h3>
                <div className="flex gap-md">
                  {['250g', '500g', '1kg'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`flex-1 py-md rounded-xl font-semibold transition-all border-2 ${
                        selectedWeight === w
                          ? 'border-primary bg-primary-container/10 text-on-primary-container'
                          : 'border-outline-variant text-on-surface hover:border-primary'
                      }`}
                    >
                      {w === '250g' ? `${w} (Single)` : w === '500g' ? `${w} (Duo)` : `${w} (Pack)`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-md mb-xl">
              <div className="flex items-center bg-surface-container-high rounded-xl p-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-primary hover:bg-surface-container-highest rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="w-12 text-center font-bold text-headline-md">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-primary hover:bg-surface-container-highest rounded-lg transition-colors animate-pulse"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 w-full sm:w-auto bg-primary text-on-primary font-button text-button py-4 rounded-xl flex items-center justify-center gap-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'border-error text-error bg-error-container/20'
                    : 'border-outline-variant text-secondary hover:text-error hover:border-error'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : undefined }}>
                  favorite
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="border-t border-outline-variant pt-2xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
              {similarProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white p-md rounded-2xl border border-outline-variant elevation-1 group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square rounded-xl overflow-hidden mb-md relative">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="space-y-xs">
                      <h4 className="font-headline-md text-[16px] leading-[22px] font-semibold text-on-surface truncate">{p.name}</h4>
                      <p className="text-on-surface-variant font-body-sm text-body-sm">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-sm mt-4 border-t border-surface-container">
                    <span className="font-bold text-lg">${p.price.toFixed(2)}</span>
                    <span className="material-symbols-outlined text-primary hover:scale-110 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
