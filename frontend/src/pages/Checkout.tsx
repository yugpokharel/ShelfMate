import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setCurrentStep,
  setShippingAddress,
  setPaymentMethod,
  setCardDetails,
  setOrderId,
  setProcessing,
} from '@/store/slices/checkoutSlice'
import { clearCart } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/Button'
import { useNotification } from '@/context/NotificationContext'
import { ChevronRight, MapPin, CreditCard, Package, CheckCircle } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const cart = useAppSelector((state) => state.cart.cart)
  const user = useAppSelector((state) => state.auth.user)
  const checkout = useAppSelector((state) => state.checkout)

  if (!user) {
    navigate('/login')
    return null
  }

  if (cart.items.length === 0) {
    navigate('/cart')
    return null
  }

  const total = Math.round(cart.total * 1.05)

  const handleNextStep = () => {
    if (checkout.currentStep < 4) {
      dispatch(setCurrentStep((checkout.currentStep + 1) as 1 | 2 | 3 | 4))
    }
  }

  const handlePrevStep = () => {
    if (checkout.currentStep > 1) {
      dispatch(setCurrentStep((checkout.currentStep - 1) as 1 | 2 | 3 | 4))
    }
  }

  const handlePlaceOrder = () => {
    dispatch(setProcessing(true))

    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`
      dispatch(setOrderId(orderId))
      dispatch(clearCart())
      addNotification('Order placed successfully!', 'success')
      dispatch(setProcessing(false))
      dispatch(setCurrentStep(4))
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <button
                  onClick={() => step < checkout.currentStep && dispatch(setCurrentStep(step as 1 | 2 | 3 | 4))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step <= checkout.currentStep
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {step === 4 && checkout.currentStep >= 4 ? <CheckCircle className="w-6 h-6" /> : step}
                </button>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < checkout.currentStep ? 'bg-accent' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Shipping</span>
            <span className="font-semibold">Payment</span>
            <span className="font-semibold">Review</span>
            <span className="font-semibold">Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {checkout.currentStep === 1 && (
              <div className="bg-white rounded-lg border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                </div>

                <div className="space-y-4">
                  {user.addresses.map((addr) => (
                    <label key={addr.id} className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition">
                      <input
                        type="radio"
                        name="address"
                        checked={checkout.shippingAddress?.id === addr.id}
                        onChange={() => dispatch(setShippingAddress(addr))}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{addr.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {checkout.currentStep === 2 && (
              <div className="bg-white rounded-lg border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {(['card', 'upi', 'netbanking'] as const).map((method) => (
                    <label key={method} className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition">
                      <input
                        type="radio"
                        name="payment"
                        checked={checkout.paymentMethod === method}
                        onChange={() => dispatch(setPaymentMethod(method))}
                      />
                      <span className="capitalize font-semibold">{method === 'upi' ? 'UPI' : method === 'netbanking' ? 'Net Banking' : 'Credit/Debit Card'}</span>
                    </label>
                  ))}
                </div>

                {checkout.paymentMethod === 'card' && (
                  <div className="mt-8 p-6 bg-secondary rounded-lg">
                    <h3 className="font-semibold mb-4">Card Details</h3>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full border border-border rounded-lg px-3 py-2 mb-3 outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border border-border rounded-lg px-3 py-2 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border border-border rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {checkout.currentStep === 3 && (
              <div className="bg-white rounded-lg border border-border p-8">
                <h2 className="text-2xl font-bold mb-6">Order Review</h2>

                {/* Shipping Address */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="font-semibold mb-2">Shipping Address</p>
                  {checkout.shippingAddress && (
                    <p className="text-sm text-muted-foreground">
                      {checkout.shippingAddress.street}, {checkout.shippingAddress.city}, {checkout.shippingAddress.state}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="font-semibold mb-2">Payment Method</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {checkout.paymentMethod === 'upi' ? 'UPI' : checkout.paymentMethod === 'netbanking' ? 'Net Banking' : 'Credit/Debit Card'}
                  </p>
                </div>

                {/* Items */}
                <div>
                  <p className="font-semibold mb-4">Order Items</p>
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {checkout.currentStep === 4 && (
              <div className="bg-white rounded-lg border border-border p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">Order ID: {checkout.orderId}</p>
                <p className="text-lg font-semibold mb-8">Thank you for your order</p>
                <Button onClick={() => navigate('/')} size="lg">
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{cart.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{Math.round(cart.total * 0.05)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mb-6 pt-4 border-t border-border">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {/* Navigation */}
              {checkout.currentStep < 4 && (
                <div className="flex gap-3">
                  {checkout.currentStep > 1 && (
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Back
                    </Button>
                  )}
                  {checkout.currentStep === 3 ? (
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1"
                      isLoading={checkout.isProcessing}
                    >
                      Place Order
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextStep}
                      disabled={
                        (checkout.currentStep === 1 && !checkout.shippingAddress) ||
                        (checkout.currentStep === 2 && !checkout.paymentMethod)
                      }
                      className="flex-1"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
