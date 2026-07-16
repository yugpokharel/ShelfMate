import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setCurrentStep,
  setShippingAddress,
  setPaymentMethod,
  setCardDetails,
  setOrderId,
  setProcessing,
  setOrderNotes,
} from '@/store/slices/checkoutSlice'
import { clearCart } from '@/store/slices/cartSlice'
import { createOrder } from '@/store/slices/ordersSlice'
import { useNotification } from '@/context/NotificationContext'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const cart = useAppSelector((state) => state.cart.cart)
  const user = useAppSelector((state) => state.auth.user)
  const checkout = useAppSelector((state) => state.checkout)

  const [activeDateTab, setActiveDateTab] = useState<'Today' | 'Tomorrow' | 'This Week'>('Today')
  const [selectedSlot, setSelectedSlot] = useState('08:00 - 10:00')
  const [slotPrice, setSlotPrice] = useState(0)
  const [notes, setNotes] = useState('')

  // New Card Form Local States
  const [cardHolder, setCardHolder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  // Redirect to login if user is not authenticated
  if (!user) {
    navigate('/login')
    return null
  }

  // Redirect to cart if cart is empty and order is not confirmed yet
  if (cart.items.length === 0 && checkout.currentStep < 4) {
    navigate('/cart')
    return null
  }

  const tax = cart.total * 0.05
  const deliveryFee = slotPrice
  const total = cart.total + tax + deliveryFee

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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkout.shippingAddress) {
      addNotification('Please select a shipping address', 'error')
      return
    }

    dispatch(setProcessing(true))
    dispatch(setOrderNotes(notes))

    if (checkout.paymentMethod === 'card' && !checkout.cardDetails) {
      dispatch(setCardDetails({ cardNumber, cardHolder, expiry, cvv }))
    }

    try {
      const order = await dispatch(
        createOrder({
          address: {
            line1: checkout.shippingAddress.street,
            line2: checkout.shippingAddress.label,
            city: checkout.shippingAddress.city,
            postcode: checkout.shippingAddress.zipCode,
          },
          deliverySlot: `${activeDateTab}, ${selectedSlot}`,
          paymentMethod: checkout.paymentMethod || 'card',
          deliveryFee,
        })
      ).unwrap()

      dispatch(setOrderId(order.id))
      dispatch(clearCart())
      addNotification('Order placed successfully!', 'success')
      dispatch(setCurrentStep(4))
    } catch (err: any) {
      addNotification(err || 'Failed to place order', 'error')
    } finally {
      dispatch(setProcessing(false))
    }
  }

  const handleSelectAddress = (addr: any) => {
    dispatch(setShippingAddress(addr))
  }

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen select-none">
      {/* TopNavBar: Simplified for Checkout */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-lg py-sm w-full bg-surface-container-lowest border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">
            ShelfMate
          </Link>
          <div className="h-6 w-px bg-outline-variant mx-sm"></div>
          <span className="font-body-lg text-body-lg text-primary font-semibold">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-sm text-secondary">
          <span className="material-symbols-outlined">lock</span>
          <span className="font-label-caps text-label-caps font-bold">SSL SECURED</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-md md:px-lg py-xl">
        {/* Step Indicator */}
        {checkout.currentStep < 4 && (
          <nav className="mb-2xl">
            <div className="flex items-center justify-between max-w-3xl mx-auto relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-high -translate-y-1/2 -z-10"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 -z-10 transition-all duration-300"
                style={{
                  width: `${((checkout.currentStep - 1) / 2) * 100}%`,
                }}
              ></div>

              {/* Step 1: Address */}
              <div className="relative z-10 flex flex-col items-center gap-xs">
                <button
                  onClick={() => dispatch(setCurrentStep(1))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-button ${
                    checkout.currentStep >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-secondary'
                  }`}
                >
                  {checkout.currentStep > 1 ? (
                    <span className="material-symbols-outlined text-md" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  ) : '1'}
                </button>
                <span className="font-label-caps text-label-caps text-on-surface">Address</span>
              </div>

              {/* Step 2: Delivery */}
              <div className="relative z-10 flex flex-col items-center gap-xs">
                <button
                  disabled={!checkout.shippingAddress}
                  onClick={() => dispatch(setCurrentStep(2))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-button ${
                    checkout.currentStep >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-secondary'
                  }`}
                >
                  {checkout.currentStep > 2 ? (
                    <span className="material-symbols-outlined text-md" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  ) : '2'}
                </button>
                <span className="font-label-caps text-label-caps text-on-surface">Delivery</span>
              </div>

              {/* Step 3: Payment */}
              <div className="relative z-10 flex flex-col items-center gap-xs">
                <button
                  disabled={!checkout.shippingAddress || !selectedSlot}
                  onClick={() => dispatch(setCurrentStep(3))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-button ${
                    checkout.currentStep >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-secondary'
                  }`}
                >
                  3
                </button>
                <span className="font-label-caps text-label-caps text-on-surface">Payment</span>
              </div>
            </div>
          </nav>
        )}

        {checkout.currentStep < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Left Column: Form Details based on Step */}
            <div className="lg:col-span-8 space-y-lg">
              {/* STEP 1: DELIVERY ADDRESS */}
              {checkout.currentStep === 1 && (
                <section className="space-y-lg">
                  <div className="flex items-center justify-between">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Delivery address</h1>
                  </div>

                  {/* Saved Address Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {user.addresses?.map((addr) => (
                      <label
                        key={addr.id}
                        onClick={() => handleSelectAddress(addr)}
                        className={`relative flex flex-col p-md bg-surface-container-lowest border-2 rounded-xl shadow-sm cursor-pointer group transition-all duration-200 ${
                          checkout.shippingAddress?.id === addr.id ? 'border-primary' : 'border-outline-variant'
                        }`}
                      >
                        <input
                          checked={checkout.shippingAddress?.id === addr.id}
                          onChange={() => handleSelectAddress(addr)}
                          className="absolute top-4 right-4 text-primary focus:ring-primary h-5 w-5"
                          name="address_selection"
                          type="radio"
                        />
                        <div className="flex items-center gap-xs mb-xs">
                          <span className="font-headline-md text-headline-md font-bold">{user.name}</span>
                          <span className="px-xs py-[2px] bg-primary-container text-on-primary-container text-[10px] font-bold rounded uppercase">
                            {addr.label}
                          </span>
                        </div>
                        <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                          {addr.street}<br />
                          {addr.city}, {addr.state}<br />
                          {addr.zipCode}
                        </p>
                      </label>
                    ))}
                  </div>

                  {/* New Address Form visual details */}
                  <div className="p-lg bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant space-y-md">
                    <h3 className="font-headline-md text-headline-md font-bold">New address details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">FIRST NAME</label>
                        <input className="rounded-lg border border-outline-variant focus:border-primary focus:ring-0 px-md py-sm font-body-lg text-body-lg outline-none bg-surface-container-low" placeholder="e.g. John" type="text" />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">LAST NAME</label>
                        <input className="rounded-lg border border-outline-variant focus:border-primary focus:ring-0 px-md py-sm font-body-lg text-body-lg outline-none bg-surface-container-low" placeholder="e.g. Doe" type="text" />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-xs">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">STREET ADDRESS</label>
                        <input className="rounded-lg border border-outline-variant focus:border-primary focus:ring-0 px-md py-sm font-body-lg text-body-lg outline-none bg-surface-container-low" placeholder="House number and street name" type="text" />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">CITY</label>
                        <input className="rounded-lg border border-outline-variant focus:border-primary focus:ring-0 px-md py-sm font-body-lg text-body-lg outline-none bg-surface-container-low" placeholder="London" type="text" />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">POSTCODE</label>
                        <input className="rounded-lg border border-outline-variant focus:border-primary focus:ring-0 px-md py-sm font-body-lg text-body-lg outline-none bg-surface-container-low" placeholder="e.g. SW1 1AA" type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-md">
                    <button
                      disabled={!checkout.shippingAddress}
                      onClick={handleNextStep}
                      className="bg-primary text-on-primary font-button text-button px-xl py-4 rounded-xl flex items-center justify-center gap-sm hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      Continue to Delivery
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 2: DELIVERY SLOT */}
              {checkout.currentStep === 2 && (
                <section className="space-y-xl">
                  <div>
                    <h1 className="font-headline-lg text-headline-lg mb-md">Choose delivery slot</h1>

                    {/* Express Option */}
                    <div
                      onClick={() => {
                        setSelectedSlot('Express (Under 60 Mins)')
                        setSlotPrice(4.99)
                      }}
                      className={`bg-surface-container-lowest p-md rounded-xl border flex items-center justify-between mb-lg cursor-pointer hover:border-primary transition-all active:scale-[0.98] ${
                        selectedSlot === 'Express (Under 60 Mins)' ? 'border-primary bg-primary-container/5' : 'border-outline-variant'
                      }`}
                    >
                      <div className="flex items-center gap-md">
                        <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md font-bold">Express Delivery</h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Arrives within 60 minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-md text-headline-md text-primary font-bold">$4.99</span>
                      </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-surface-container-low p-xs rounded-xl gap-xs mb-lg max-w-md">
                      {['Today', 'Tomorrow', 'This Week'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDateTab(tab as any)}
                          className={`flex-1 py-base px-md rounded-lg font-label-caps text-label-caps transition-all ${
                            activeDateTab === tab
                              ? 'bg-surface-container-lowest text-primary shadow-sm'
                              : 'text-secondary hover:bg-surface-container'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
                      {[
                        { time: '08:00 - 10:00', price: 0 },
                        { time: '10:00 - 12:00', price: 1.5 },
                        { time: '13:00 - 15:00', price: 0 },
                        { time: '16:00 - 18:00', price: 0.99 },
                        { time: '18:00 - 20:00', price: 2.5 },
                        { time: '20:00 - 22:00', price: 1.5 },
                      ].map((slot) => (
                        <div
                          key={slot.time}
                          onClick={() => {
                            setSelectedSlot(slot.time)
                            setSlotPrice(slot.price)
                          }}
                          className={`p-md rounded-xl cursor-pointer transition-all border-2 ${
                            selectedSlot === slot.time
                              ? 'border-primary bg-primary-container/5'
                              : 'border-transparent bg-surface-container-lowest hover:border-outline-variant'
                          }`}
                        >
                          <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">
                            {activeDateTab.toUpperCase()}, OCT 25
                          </p>
                          <p className="font-headline-md text-headline-md mb-xs font-semibold">{slot.time}</p>
                          <p className={`font-body-sm text-body-sm font-bold ${slot.price === 0 ? 'text-primary' : 'text-secondary'}`}>
                            {slot.price === 0 ? 'FREE' : `$${slot.price.toFixed(2)}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Instructions */}
                  <div className="bg-surface-container-low p-lg rounded-xl border border-dashed border-outline">
                    <div className="flex items-start gap-md">
                      <span className="material-symbols-outlined text-primary">edit_note</span>
                      <div className="flex-1">
                        <h4 className="font-headline-md text-headline-md mb-xs font-bold">Delivery Instructions</h4>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-md font-body-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[100px]"
                          placeholder="Add a note for the driver (e.g., Gate code, floor number, or leave at the door)..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-md">
                    <button
                      onClick={handlePrevStep}
                      className="border border-outline-variant text-on-surface font-button text-button px-xl py-4 rounded-xl flex items-center justify-center gap-sm hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="bg-primary text-on-primary font-button text-button px-xl py-4 rounded-xl flex items-center justify-center gap-sm hover:opacity-90 transition-all"
                    >
                      Continue to Payment
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 3: PAYMENT DETAILS */}
              {checkout.currentStep === 3 && (
                <section className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant">
                  <h2 className="font-headline-md text-headline-md mb-lg text-on-surface font-bold">Payment details</h2>

                  {/* Saved Cards */}
                  <div className="mb-xl">
                    <p className="font-label-caps text-label-caps text-secondary mb-md">SAVED PAYMENT METHODS</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <label
                        onClick={() => dispatch(setPaymentMethod('card'))}
                        className={`relative flex items-center p-md border-2 rounded-xl cursor-pointer transition-all ${
                          checkout.paymentMethod === 'card' ? 'border-primary bg-primary-container/5' : 'border-outline-variant'
                        }`}
                      >
                        <input
                          checked={checkout.paymentMethod === 'card'}
                          onChange={() => dispatch(setPaymentMethod('card'))}
                          className="hidden"
                          name="payment_method"
                          type="radio"
                        />
                        <div className="flex items-center gap-md w-full">
                          <div className="w-12 h-8 bg-surface-container rounded flex items-center justify-center overflow-hidden">
                            <img className="h-4" alt="Visa Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQeP3tBZlJJkFM8YMNCVaLyXtrn-yX2nxdlmCN5pA6EyQxSU3T2Z-IDr7LAyCK4P-g8CLD4gh8HvSYMtQ5aHmBTJxWg_zocE9PLB8CRIiDgTkgVdKBp5S6rL1AHQ4O7MZJNv7aQJvqb69D_KyN5zzNhTvmiv0-bO95c6hMPZh4QKjmq--cStWCfcyauBMLMEpGJpDRq14fbIEN63tgdaX0bY8DAdOAzYrYbhgEH7bSBmwduYqpJXIl" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-button text-button text-on-surface">Visa ending in 4242</p>
                            <p className="text-body-sm text-secondary">Expires 12/26</p>
                          </div>
                          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* New Card Form */}
                  <form onSubmit={handlePlaceOrder} className="space-y-md">
                    <p className="font-label-caps text-label-caps text-secondary mb-md">OR PAY WITH A NEW CARD</p>
                    <div className="space-y-sm">
                      <label className="font-label-caps text-label-caps text-on-surface-variant">CARDHOLDER NAME</label>
                      <input
                        className="w-full h-12 px-md border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface-container-low transition-all"
                        placeholder="Yogesh P."
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-sm relative">
                      <label className="font-label-caps text-label-caps text-on-surface-variant">CARD NUMBER</label>
                      <div className="relative">
                        <input
                          className="w-full h-12 px-md pr-12 border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface-container-low transition-all"
                          placeholder="XXXX XXXX XXXX XXXX"
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary">credit_card</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="space-y-sm">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">EXPIRY DATE</label>
                        <input
                          className="w-full h-12 px-md border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface-container-low transition-all"
                          placeholder="MM / YY"
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-sm">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">CVV</label>
                        <input
                          className="w-full h-12 px-md border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface-container-low transition-all"
                          placeholder="***"
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-xl border-t border-outline-variant mt-xl gap-md">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="border border-outline-variant text-on-surface font-button text-button px-xl py-4 rounded-xl flex items-center justify-center gap-sm hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={checkout.isProcessing}
                        className="flex-grow bg-primary text-on-primary rounded-xl font-button text-lg h-14 flex items-center justify-center gap-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                        {checkout.isProcessing ? 'Processing Securely...' : `Pay $${total.toFixed(2)} securely`}
                      </button>
                    </div>
                  </form>
                </section>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <aside className="lg:col-span-4 h-fit space-y-lg">
              <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
                <div className="p-md border-b border-outline-variant bg-surface-container-low">
                  <h3 className="font-headline-md text-headline-md font-bold">Order Summary</h3>
                </div>
                <div className="p-md max-h-[300px] overflow-y-auto space-y-md">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-md items-center">
                      <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" alt={item.product.name} src={item.product.image} />
                      </div>
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <h4 className="font-body-sm text-body-sm font-bold truncate">{item.product.name}</h4>
                        <p className="font-label-caps text-label-caps text-on-surface-variant">QTY: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                      <div className="font-body-sm text-body-sm font-bold flex items-center">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="p-md bg-surface-container-low border-t border-outline-variant space-y-sm">
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-secondary">Subtotal</span>
                    <span className="font-semibold text-on-surface">${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-secondary">Tax (5%)</span>
                    <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-secondary">Delivery Fee</span>
                    <span className="font-semibold text-on-surface">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-headline-md font-bold border-t border-outline-variant/30 pt-sm mt-xs">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* STEP 4: ORDER CONFIRMED */
          <div className="max-w-[680px] mx-auto px-margin-mobile py-xl space-y-xl">
            {/* Header Section */}
            <header className="text-center space-y-md">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">Order confirmed!</h1>
              <p className="text-on-surface-variant font-body-lg text-body-lg">Thank you, {user.name}. Your groceries are on their way.</p>
              <div className="pt-sm">
                <span className="inline-flex items-center px-md py-xs rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps tracking-wider font-bold">
                  ORDER #{checkout.orderId}
                </span>
              </div>
            </header>

            {/* Delivery Status Section */}
            <section className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/30 text-center">
              <div className="mb-lg">
                <p className="text-on-surface-variant font-label-caps text-label-caps mb-xs uppercase">Estimated Delivery</p>
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Today, 2:45 PM — 3:15 PM</h2>
              </div>
              {/* Tracker */}
              <div className="relative flex justify-between items-start mt-xl mb-4 max-w-md mx-auto">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-surface-container-highest -z-10"></div>
                <div className="absolute top-5 left-0 w-1/3 h-[2px] bg-primary -z-10"></div>
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface font-bold">Confirmed</span>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center ring-4 ring-primary-container/30">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-primary font-bold">Preparing</span>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">On the way</span>
                </div>
                {/* Step 4 */}
                <div className="flex flex-col items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">home</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Delivered</span>
                </div>
              </div>
            </section>

            <div className="text-center pt-md">
              <button
                onClick={() => {
                  navigate('/')
                }}
                className="bg-primary text-on-primary font-button text-button px-xl py-4 rounded-xl hover:opacity-90 transition-all shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
