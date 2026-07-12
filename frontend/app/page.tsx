'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'
import { ShoppingBag, Sparkles, Leaf, Zap } from 'lucide-react'

export default function Home() {
  const [cartCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation cartCount={cartCount} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
                  Smart Grocery Shopping Made Simple
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  AI-powered Smart Lists and premium delivery for busy urban professionals
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="/shop"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Start Shopping
                  </Link>
                  <Link 
                    href="/smart-lists"
                    className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-8 aspect-square flex items-center justify-center">
                <ShoppingBag className="w-32 h-32 text-accent" strokeWidth={1} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 bg-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose ShelfMate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8">
                <Sparkles className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3">Smart Lists</h3>
                <p className="text-muted-foreground">
                  AI-powered recommendations based on your preferences and past purchases
                </p>
              </div>
              <div className="p-8">
                <Zap className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Premium delivery service with real-time tracking and flexible scheduling
                </p>
              </div>
              <div className="p-8">
                <Leaf className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3">Fresh & Organic</h3>
                <p className="text-muted-foreground">
                  Curated selection of fresh produce and organic products
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-accent text-accent-foreground rounded-xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Shopping?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of busy professionals saving time with ShelfMate
            </p>
            <Link 
              href="/shop"
              className="inline-block bg-accent-foreground text-accent px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
