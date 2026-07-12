'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, User, Settings } from 'lucide-react'

interface NavigationProps {
  cartCount: number
}

export default function Navigation({ cartCount }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl md:text-2xl">
            ShelfMate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="hover:text-accent transition">
              Shop
            </Link>
            <Link href="/smart-lists" className="hover:text-accent transition">
              Smart Lists
            </Link>
            <Link href="/about" className="hover:text-accent transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-accent transition">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/account" className="p-2 hover:bg-secondary rounded-lg transition">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/preferences" className="p-2 hover:bg-secondary rounded-lg transition">
                <Settings className="w-5 h-5" />
              </Link>
            </div>

            {/* Cart */}
            <Link 
              href="/cart"
              className="relative p-2 hover:bg-secondary rounded-lg transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link href="/shop" className="block px-4 py-2 hover:bg-secondary rounded-lg transition">
              Shop
            </Link>
            <Link href="/smart-lists" className="block px-4 py-2 hover:bg-secondary rounded-lg transition">
              Smart Lists
            </Link>
            <Link href="/account" className="block px-4 py-2 hover:bg-secondary rounded-lg transition">
              My Account
            </Link>
            <Link href="/preferences" className="block px-4 py-2 hover:bg-secondary rounded-lg transition">
              Preferences
            </Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-secondary rounded-lg transition">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-secondary rounded-lg transition">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
