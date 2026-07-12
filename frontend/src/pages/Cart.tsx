import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice'
import { useNotification } from '@/context/NotificationContext'

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()
  const cart = useAppSelector((state) => state.cart.cart)
  const user = useAppSelector((state) => state.auth.user)

  const tax = cart.total * 0.05
  const total = cart.total + tax

  const handleRemove = (productId: string, productName: string) => {
    dispatch(removeFromCart(productId))
    addNotification(`${productName} was removed from your Cart.`, 'info')
  }

  const handleQtyChange = (productId: string, quantity: number, name: string) => {
    if (quantity <= 0) {
      handleRemove(productId, name)
    } else {
      dispatch(updateQuantity({ productId, quantity }))
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center text-on-surface select-none font-body-lg">
        <div className="bg-surface-container-lowest border border-outline-variant p-2xl rounded-xl shadow-sm text-center flex flex-col items-center justify-center min-h-[420px] max-w-md w-full">
          <div className="relative w-32 h-32 mb-lg">
            <div className="absolute inset-0 bg-primary-container/10 rounded-full animate-pulse"></div>
            <span className="material-symbols-outlined text-[64px] text-primary absolute inset-0 flex items-center justify-center">shopping_basket</span>
          </div>
          <div>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">Your basket is empty</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-xl">It seems you haven't added any fresh groceries to your cart yet. Let's start building your weekly list.</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary text-on-primary px-lg py-md rounded-xl font-button text-button w-full hover:opacity-90 transition-all active:scale-95 cursor-pointer"
          >
            Browse Groceries
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 text-on-surface select-none font-body-lg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-xl flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Your Shopping Cart</h1>
            <p className="text-on-surface-variant font-body-sm">Review your items and continue to checkout</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-primary font-button text-button flex items-center gap-xs hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Continue Shopping
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-xl items-start">
          {/* Left Column: Cart Items */}
          <div className="w-full lg:w-2/3 flex flex-col gap-md">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant flex flex-col sm:flex-row gap-md items-center sm:items-start group shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <div className="w-24 h-24 bg-surface-container-low rounded-lg flex-shrink-0 overflow-hidden">
                  <img className="w-full h-full object-cover" alt={item.product.name} src={item.product.image} />
                </div>
                <div className="flex-grow flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.productId}`} className="font-headline-md text-headline-md text-on-surface hover:text-primary transition-colors">
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-sm mt-xs">
                        <span className="font-body-sm text-on-surface-variant">{item.product.category}</span>
                        {item.product.badge && (
                          <span className="bg-primary-container/20 text-on-primary-container text-[10px] px-sm py-[2px] rounded-full font-bold tracking-wider uppercase">
                            {item.product.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-headline-md text-headline-md text-primary font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-auto pt-md flex flex-wrap items-center justify-between gap-md">
                    <div className="flex items-center border border-outline-variant rounded-xl overflow-hidden bg-surface-container-low">
                      <button
                        onClick={() => handleQtyChange(item.productId, item.quantity - 1, item.product.name)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-outline-variant transition-colors text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="w-8 text-center font-bold text-on-surface">{item.quantity}</span>
                      <button
                        onClick={() => handleQtyChange(item.productId, item.quantity + 1, item.product.name)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-outline-variant transition-colors text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-md">
                      <button
                        onClick={() => addNotification(`${item.product.name} saved for later!`, 'info')}
                        className="text-primary font-label-caps text-label-caps hover:underline"
                      >
                        Save for later
                      </button>
                      <button
                        onClick={() => handleRemove(item.productId, item.product.name)}
                        className="text-error font-label-caps text-label-caps hover:underline flex items-center gap-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <aside className="w-full lg:w-1/3 space-y-lg">
            <section className="bg-surface-container-low rounded-xl p-lg sticky top-24 border border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md mb-lg text-on-surface font-bold">Order Summary</h2>
              
              <div className="space-y-md mb-lg">
                <div className="flex justify-between items-center text-body-lg">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-semibold text-on-surface">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-body-lg">
                  <span className="text-secondary">Delivery Fee</span>
                  <span className="font-bold text-primary">FREE</span>
                </div>
                <div className="flex justify-between items-center text-body-lg">
                  <span className="text-secondary">Tax (5%)</span>
                  <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="pt-lg border-t border-outline-variant mb-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-headline-md text-headline-md text-on-surface font-bold">Total</p>
                    <p className="text-body-sm text-secondary">Including VAT & Delivery</p>
                  </div>
                  <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login')
                  } else {
                    navigate('/checkout')
                  }
                }}
                className="w-full h-14 bg-primary text-on-primary rounded-xl font-button text-lg flex items-center justify-center gap-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              {!user && (
                <p className="text-xs text-secondary text-center mt-3">
                  Please sign in to proceed to checkout
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
