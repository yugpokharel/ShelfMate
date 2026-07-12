import { useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'
import { mockOrders } from '@/data/mockData'
import { User, MapPin, ShoppingBag } from 'lucide-react'

export default function Account() {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg border border-border p-8">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            {user.phone && <p className="text-sm text-muted-foreground">Phone: {user.phone}</p>}
          </div>

          {/* Stats */}
          <div className="bg-accent text-white rounded-lg border border-border p-8">
            <ShoppingBag className="w-8 h-8 mb-4" />
            <p className="text-3xl font-bold">{mockOrders.length}</p>
            <p className="text-sm text-white/80">Total Orders</p>
          </div>

          <div className="bg-secondary rounded-lg border border-border p-8">
            <MapPin className="w-8 h-8 text-accent mb-4" />
            <p className="text-3xl font-bold">{user.addresses.length}</p>
            <p className="text-sm text-muted-foreground">Saved Addresses</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Delivery Addresses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{addr.label}</h3>
                  {addr.isDefault && (
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{addr.street}</p>
                <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.zipCode}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mb-4">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm text-muted-foreground">
                      {item.product.name} x {item.quantity}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <p className="font-semibold">Total: ₹{order.total}</p>
                  <button className="text-accent hover:underline text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
