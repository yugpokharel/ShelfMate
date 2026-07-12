import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/Button'
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.cart)
  const user = useAppSelector((state) => state.auth.user)

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to get started!</p>
          <Button onClick={() => navigate('/shop')} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-6 border-b border-border last:border-b-0"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg bg-secondary"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-semibold hover:text-accent truncate block"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    <p className="font-bold mt-2">₹{item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
                      }
                      className="px-3 py-2 hover:bg-secondary transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            quantity: parseInt(e.target.value) || 1,
                          })
                        )
                      }
                      className="w-12 text-center border-l border-r border-border py-2 outline-none"
                    />
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                      }
                      className="px-3 py-2 hover:bg-secondary transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <div className="text-right min-w-max">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Button
              variant="outline"
              onClick={() => navigate('/shop')}
              className="mt-6 w-full"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{cart.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">₹{Math.round(cart.total * 0.05)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">₹{Math.round(cart.total * 1.05)}</span>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  if (!user) {
                    navigate('/login')
                  } else {
                    navigate('/checkout')
                  }
                }}
              >
                Proceed to Checkout
              </Button>

              {!user && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  You will be redirected to login to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
