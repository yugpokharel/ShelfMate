import { mockSmartLists } from '@/data/mockData'
import { Button } from '@/components/ui/Button'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/slices/cartSlice'
import { useNotification } from '@/context/NotificationContext'
import { Plus, Sparkles, RotateCw } from 'lucide-react'

export default function SmartLists() {
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const handleAddListToCart = (list: typeof mockSmartLists[0]) => {
    list.items.forEach((item) => {
      dispatch(addToCart({ product: item.product, quantity: item.quantity }))
    })
    addNotification(`${list.name} added to cart!`, 'success')
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold">Smart Lists</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            AI-powered lists that remember your preferences and help you shop smarter. Create personalized lists for your routine grocery needs.
          </p>
        </div>

        {/* Create List Button */}
        <div className="mb-12">
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create New List
          </Button>
        </div>

        {/* Smart Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockSmartLists.map((list) => (
            <div
              key={list.id}
              className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-accent to-accent/80 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">{list.name}</h2>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{list.items.length} items</span>
                  {list.frequency && (
                    <div className="flex items-center gap-1 text-sm">
                      <RotateCw className="w-4 h-4" />
                      {list.frequency}
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {list.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between pb-3 border-b border-border last:border-b-0">
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mb-6 pb-6 border-t-2 border-border pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">
                      ₹{list.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => handleAddListToCart(list)}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full">
                    Edit List
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-secondary rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How Smart Lists Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-accent mb-3">1</div>
              <h3 className="font-semibold mb-2">Create Lists</h3>
              <p className="text-muted-foreground">
                Add your favorite products and create personalized shopping lists based on your routine.
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-3">2</div>
              <h3 className="font-semibold mb-2">AI Recommendations</h3>
              <p className="text-muted-foreground">
                Our AI learns your preferences and suggests similar items to enhance your shopping.
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-3">3</div>
              <h3 className="font-semibold mb-2">One-Click Reorder</h3>
              <p className="text-muted-foreground">
                Reorder your favorite lists with just one click and get them delivered to your door.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
