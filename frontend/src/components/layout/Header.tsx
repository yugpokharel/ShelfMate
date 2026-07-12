import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import clsx from 'clsx'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const cartCount = useAppSelector((state) => state.cart.cart.itemCount)
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    setIsProfileOpen(false)
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SM</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline">ShelfMate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/shop"
            className={clsx(
              'text-sm font-medium transition-colors',
              isActive('/shop') ? 'text-accent' : 'text-foreground hover:text-accent'
            )}
          >
            Shop
          </Link>
          <Link
            to="/deals"
            className={clsx(
              'text-sm font-medium transition-colors',
              isActive('/deals') ? 'text-accent' : 'text-foreground hover:text-accent'
            )}
          >
            Deals
          </Link>
          <Link
            to="/smart-lists"
            className={clsx(
              'text-sm font-medium transition-colors',
              isActive('/smart-lists') ? 'text-accent' : 'text-foreground hover:text-accent'
            )}
          >
            Smart Lists
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search (visible on larger screens) */}
          <div className="hidden lg:flex items-center bg-secondary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent ml-2 outline-none w-40 text-sm"
            />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-6 h-6 rounded-full"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2">
                  <Link
                    to="/account"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-sm"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary text-sm text-left text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-accent hover:bg-secondary rounded-lg transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              to="/shop"
              className="px-4 py-2 hover:bg-white rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/deals"
              className="px-4 py-2 hover:bg-white rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link
              to="/smart-lists"
              className="px-4 py-2 hover:bg-white rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Smart Lists
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
