import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation cartCount={0} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">About ShelfMate</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            ShelfMate is reimagining grocery shopping for busy urban professionals.
          </p>
          <p className="text-muted-foreground mb-6">
            Our mission is to save you time and help you eat better by using AI to understand your shopping preferences and deliver fresh groceries when you need them.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
