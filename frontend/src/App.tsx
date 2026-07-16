import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { NotificationProvider } from '@/context/NotificationContext'
import { ToastContainer } from '@/components/ui/Toast'
import { Header } from '@/components/layout/Header'

// Pages
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Account from '@/pages/Account'
import SmartLists from '@/pages/SmartLists'
import Deals from '@/pages/Deals'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCurrentUser, logout } from '@/store/slices/authSlice'
import { fetchProducts } from '@/store/slices/productsSlice'
import { fetchCart } from '@/store/slices/cartSlice'
import { fetchOrders } from '@/store/slices/ordersSlice'
import { getTokens } from '@/utils/api'

function AppContent() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // 1. Fetch products immediately on startup
    dispatch(fetchProducts())

    // 2. Fetch current user if token exists in localStorage
    const { accessToken } = getTokens()
    if (accessToken) {
      dispatch(fetchCurrentUser())
    }

    // 3. Listen for token refresh expiry (unauthorized events) to log out cleanly
    const handleUnauthorized = () => {
      dispatch(logout())
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [dispatch])

  // Fetch cart and orders once user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart())
      dispatch(fetchOrders())
    }
  }, [isAuthenticated, dispatch])

  return (
    <NotificationProvider>
      <Router>
        <Header />
        <main className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/smart-lists" element={<SmartLists />} />
            <Route path="/deals" element={<Deals />} />
          </Routes>
        </main>
        <ToastContainer />
      </Router>
    </NotificationProvider>
  )
}

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
