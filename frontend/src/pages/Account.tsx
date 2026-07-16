import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useNavigate, Link } from 'react-router-dom'
import { logoutUser } from '@/store/slices/authSlice'
import { useState } from 'react'

export default function Account() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const orders = useAppSelector((state) => state.orders.orders)
  const [activeTab, setActiveTab] = useState<'Preferences' | 'Addresses' | 'Orders'>('Preferences')

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/')
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen text-on-surface select-none font-body-lg">
      {/* SideNavBar */}
      <aside className="w-full md:w-64 p-lg border-r border-outline-variant bg-surface-container-low flex flex-col h-auto md:h-[calc(100vh-64px)] sticky top-16 shrink-0 gap-base">
        <div className="flex items-center gap-md px-md mb-lg">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
            <img className="w-full h-full object-cover" alt={user.name} src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
          </div>
          <div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface leading-tight">{user.name}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{user.email}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-xs">
          <button
            onClick={() => setActiveTab('Preferences')}
            className={`font-label-caps text-label-caps rounded-lg px-md py-sm flex items-center gap-md cursor-pointer transition-all ${
              activeTab === 'Preferences' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            Overview & Prefs
          </button>
          <button
            onClick={() => setActiveTab('Orders')}
            className={`font-label-caps text-label-caps rounded-lg px-md py-sm flex items-center gap-md cursor-pointer transition-all ${
              activeTab === 'Orders' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">package</span>
            Orders
          </button>
          <button
            onClick={() => setActiveTab('Addresses')}
            className={`font-label-caps text-label-caps rounded-lg px-md py-sm flex items-center gap-md cursor-pointer transition-all ${
              activeTab === 'Addresses' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">location_on</span>
            Addresses
          </button>
          <Link
            to="/smart-lists"
            className="text-on-surface-variant hover:bg-surface-container-high rounded-lg px-md py-sm flex items-center gap-md cursor-pointer transition-transform"
          >
            <span className="material-symbols-outlined">list_alt</span>
            <span className="font-label-caps text-label-caps">Smart List</span>
          </Link>
          <div className="mt-8 pt-4 border-t border-outline-variant/30">
            <button
              onClick={handleLogout}
              className="w-full text-error hover:bg-error-container/20 rounded-lg px-md py-sm flex items-center gap-md cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-caps text-label-caps">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-lg overflow-y-auto bg-surface-container-lowest">
        <header className="mb-xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">Welcome back, {user.name}</h1>
          <p className="text-on-surface-variant text-body-sm mt-1">Here is what is happening with your pantry today.</p>
        </header>

        {activeTab === 'Preferences' && (
          <div className="space-y-lg">
            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
              {/* Active Order Card */}
              <section className="lg:col-span-8 bg-inverse-surface text-inverse-on-surface rounded-xl p-lg overflow-hidden relative min-h-[320px] flex flex-col justify-between shadow-sm">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-lg">
                    <div>
                      <span className="bg-primary px-sm py-xs rounded text-on-primary font-label-caps text-[10px] uppercase font-bold tracking-wider">
                        On the way
                      </span>
                      <h2 className="font-headline-md text-headline-md mt-xs font-semibold">Order #77421</h2>
                    </div>
                    <div className="text-right">
                      <p className="font-label-caps text-label-caps opacity-70">Estimated Arrival</p>
                      <p className="font-headline-md text-headline-md text-primary-fixed font-bold">12:45 PM</p>
                    </div>
                  </div>
                  <div className="mt-auto mb-lg">
                    <div className="flex justify-between mb-sm">
                      <span className="text-body-sm text-primary-fixed font-bold">Driver is 2 mins away</span>
                      <span className="text-body-sm opacity-70">3 of 4 steps completed</span>
                    </div>
                    <div className="w-full bg-on-surface-variant/30 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-primary-container h-full w-[75%]"></div>
                    </div>
                    <div className="flex justify-between mt-xs font-label-caps text-[10px] uppercase opacity-50">
                      <span>Packed</span>
                      <span>Shipped</span>
                      <span className="text-primary-fixed opacity-100 font-bold">Out for Delivery</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary py-md rounded-lg font-button text-button text-on-primary hover:opacity-90 transition-opacity">
                    Track Courier Live
                  </button>
                </div>
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                  <img className="w-full h-full object-cover grayscale" alt="Map placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz-Gp-uuf5tyefmi2JSZEuUx_ugMeGlFTkUok7HmpGFREMIYldBrwmlvEpECaZSZT1BE54sRjuR-J8hSa5q4yvI4PJu1lRaabT-R5H8GZBCIGgrugRfm0f70k1GSmDdSGxVJORWlGjDpVXtkzxY7ywm-Dc1jwQ3P2PMQMHvyINitoWyyDAOJJNT8UgsBVb0N-7tz8BcqB9AJMU72Y8b6R5hBmcegh7xPLvncwQ3ieAbPLugHO655z3" />
                </div>
              </section>

              {/* Smart List Banner */}
              <section className="lg:col-span-4 bg-tertiary-container rounded-xl p-lg flex flex-col justify-between shadow-sm text-on-tertiary-container">
                <div>
                  <div className="w-12 h-12 bg-on-tertiary-container/10 rounded-full flex items-center justify-center mb-md">
                    <span className="material-symbols-outlined text-on-tertiary-container text-3xl">magic_button</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-tertiary-container mb-xs font-bold leading-snug">Your next list is ready</h3>
                  <p className="text-on-tertiary-container/80 text-body-sm leading-relaxed">Based on your consumption of Milk, Eggs, and Avocados, we've prepared a suggested Monday restock list.</p>
                </div>
                <Link
                  to="/smart-lists"
                  className="mt-lg border-2 border-on-tertiary-container text-on-tertiary-container py-sm rounded-lg font-button text-button hover:bg-on-tertiary-container hover:text-tertiary-container transition-all flex items-center justify-center"
                >
                  Review Smart List
                </Link>
              </section>
            </div>

            {/* Dietary Preferences Switches */}
            <section className="bg-surface-container-low rounded-xl p-lg border border-outline-variant shadow-sm">
              <h3 className="font-headline-md text-headline-md mb-md font-bold text-primary">Dietary Preferences</h3>
              <p className="text-on-surface-variant text-body-sm mb-lg">Select diets to automatically filter recommended fresh produce across ShelfMate.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {[
                  { label: 'Keto Diet', desc: 'High-fat, low-carb options' },
                  { label: 'Vegan Friendly', desc: 'No animal products' },
                  { label: 'Organic Only', desc: 'Sourced exclusively from organic orchards' },
                ].map((pref, i) => (
                  <div key={pref.label} className="flex items-center justify-between p-md bg-surface-container-lowest border border-outline-variant rounded-xl">
                    <div>
                      <p className="font-semibold text-on-surface">{pref.label}</p>
                      <p className="text-[11px] text-secondary">{pref.desc}</p>
                    </div>
                    <button
                      className={`w-10 h-6 rounded-full relative transition-colors ${i === 1 ? 'bg-primary' : 'bg-outline-variant'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i === 1 ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="space-y-md">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-md">Order History</h2>
            {orders.map((order) => (
              <div key={order.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
                <div className="flex justify-between items-start mb-md">
                  <div>
                    <h3 className="font-headline-md text-body-lg font-bold text-on-surface">Order #{order.id}</h3>
                    <p className="text-body-sm text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-sm py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.status === 'delivered' ? 'bg-primary-container/20 text-primary' : 'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-sm mb-md border-b border-surface-container pb-md">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-body-sm text-on-surface-variant">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span className="font-semibold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-body-lg text-primary">Total: ${order.total.toFixed(2)}</span>
                  <button className="text-primary font-label-caps text-label-caps hover:underline">View invoice</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Addresses' && (
          <div className="space-y-md">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-md">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {user.addresses?.map((addr) => (
                <div key={addr.id} className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm relative">
                  <div className="flex items-center gap-xs mb-xs">
                    <span className="font-headline-md text-headline-md font-bold">{user.name}</span>
                    {addr.isDefault && (
                      <span className="px-xs py-[2px] bg-primary-container text-on-primary-container text-[10px] font-bold rounded uppercase">Default</span>
                    )}
                  </div>
                  <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                    {addr.street}<br />
                    {addr.city}, {addr.state}<br />
                    {addr.zipCode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
