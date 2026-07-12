import { Link, useLocation, useNavigate } from 'react-router-dom'
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
    <nav className="sticky top-0 z-50 flex justify-between items-center px-lg py-sm w-full bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex items-center gap-xl">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary cursor-pointer">
          ShelfMate
        </Link>
        <div className="hidden md:flex items-center gap-lg">
          <Link
            to="/"
            className={clsx(
              'font-label-caps text-label-caps transition-all pb-1 cursor-pointer hover:text-primary',
              isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-secondary'
            )}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={clsx(
              'font-label-caps text-label-caps transition-all pb-1 cursor-pointer hover:text-primary',
              isActive('/shop') ? 'text-primary border-b-2 border-primary' : 'text-secondary'
            )}
          >
            Shop
          </Link>
          <Link
            to="/deals"
            className={clsx(
              'font-label-caps text-label-caps transition-all pb-1 cursor-pointer hover:text-primary',
              isActive('/deals') ? 'text-primary border-b-2 border-primary' : 'text-secondary'
            )}
          >
            Deals
          </Link>
          <Link
            to="/smart-lists"
            className={clsx(
              'font-label-caps text-label-caps transition-all pb-1 cursor-pointer hover:text-primary',
              isActive('/smart-lists') ? 'text-primary border-b-2 border-primary' : 'text-secondary'
            )}
          >
            Smart List
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-md">
        {/* Search, Cart, Profile Icons */}
        <div className="hidden md:flex items-center gap-sm">
          <Link to="/shop" className="material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container-low transition-colors rounded-full text-2xl">
            search
          </Link>
          <Link to="/cart" className="relative material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container-low transition-colors rounded-full text-2xl">
            shopping_cart
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </Link>
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container-low transition-colors rounded-full text-2xl block"
              >
                account_circle
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant">
                    <p className="text-body-sm font-bold truncate">{user.name}</p>
                    <p className="text-[11px] text-secondary truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/account"
                    className="flex items-center gap-sm px-4 py-2 hover:bg-surface-container-low text-body-sm text-on-surface transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <span className="material-symbols-outlined text-lg">person</span>
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-sm px-4 py-2 hover:bg-surface-container-low text-body-sm text-left text-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-sm">
          {!user ? (
            <>
              <Link to="/login" className="font-button text-button text-primary px-md py-sm hover:bg-surface-container-low transition-colors rounded-lg">
                Sign In
              </Link>
              <Link to="/signup" className="font-button text-button bg-primary-container text-on-primary-container px-md py-sm rounded-lg hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="md:hidden flex items-center gap-sm">
              <Link to="/cart" className="relative material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container-low transition-colors rounded-full text-2xl">
                shopping_cart
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container-low transition-colors rounded-full text-2xl"
              >
                menu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && user && (
        <nav className="absolute top-full left-0 right-0 border-t border-outline-variant bg-surface-container-lowest shadow-md md:hidden z-50 flex flex-col p-md">
          <Link
            to="/account"
            className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg text-body-lg text-on-surface"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-xl">person</span>
            My Account
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg text-body-lg text-error text-left"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </nav>
      )}
    </nav>
  )
}
