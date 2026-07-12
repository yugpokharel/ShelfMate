'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'

const menuItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation cartCount={0} />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-card border-b border-border py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your profile and preferences</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="md:col-span-1">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === item.id
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  )
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition text-destructive">
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                  <div className="mb-8">
                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                      <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <button className="text-accent hover:underline">Upload Photo</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <button className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                    Save Changes
                  </button>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Order #{order}</p>
                          <p className="text-lg font-semibold">Order placed on Dec {order}, 2024</p>
                        </div>
                        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          Delivered
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">3 items • Total: $24.16</p>
                      <Link href={`/order/${order}`} className="text-accent hover:underline text-sm font-semibold">
                        View Details →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                  <p className="text-muted-foreground mb-6">
                    You have 5 items in your wishlist
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
                        <Heart className="w-8 h-8 text-accent" fill="currentColor" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-semibold">Email Notifications</label>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your orders and new products
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-semibold">SMS Notifications</label>
                        <input type="checkbox" className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get delivery updates via SMS
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-semibold">Marketing Emails</label>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Exclusive offers and promotions
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <button className="text-destructive hover:underline font-semibold">
                        Delete Account
                      </button>
                      <p className="text-sm text-muted-foreground mt-2">
                        This action cannot be undone
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
