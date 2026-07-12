import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Address } from '@/types'

interface CheckoutState {
  currentStep: 1 | 2 | 3 | 4
  shippingAddress: Address | null
  paymentMethod: 'card' | 'upi' | 'netbanking' | null
  cardDetails: {
    cardNumber: string
    cardHolder: string
    expiry: string
    cvv: string
  } | null
  orderNotes: string
  isProcessing: boolean
  orderId: string | null
}

const initialState: CheckoutState = {
  currentStep: 1,
  shippingAddress: null,
  paymentMethod: null,
  cardDetails: null,
  orderNotes: '',
  isProcessing: false,
  orderId: null,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
      state.currentStep = action.payload
    },
    setShippingAddress: (state, action: PayloadAction<Address>) => {
      state.shippingAddress = action.payload
    },
    setPaymentMethod: (state, action: PayloadAction<'card' | 'upi' | 'netbanking'>) => {
      state.paymentMethod = action.payload
    },
    setCardDetails: (state, action: PayloadAction<{
      cardNumber: string
      cardHolder: string
      expiry: string
      cvv: string
    }>) => {
      state.cardDetails = action.payload
    },
    setOrderNotes: (state, action: PayloadAction<string>) => {
      state.orderNotes = action.payload
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload
    },
    resetCheckout: (state) => {
      state.currentStep = 1
      state.shippingAddress = null
      state.paymentMethod = null
      state.cardDetails = null
      state.orderNotes = ''
      state.isProcessing = false
      state.orderId = null
    },
  },
})

export const {
  setCurrentStep,
  setShippingAddress,
  setPaymentMethod,
  setCardDetails,
  setOrderNotes,
  setProcessing,
  setOrderId,
  resetCheckout,
} = checkoutSlice.actions
export default checkoutSlice.reducer
