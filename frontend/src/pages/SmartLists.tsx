import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mockSmartLists } from '@/data/mockData'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addToCart } from '@/store/slices/cartSlice'
import { useNotification } from '@/context/NotificationContext'

export default function SmartLists() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addNotification } = useNotification()
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    navigate('/login')
    return null
  }

  const [lists, setLists] = useState(() =>
    mockSmartLists.map((list) => ({
      ...list,
      items: list.items.map((item) => ({
        ...item,
        // Convert mock prices from INR to USD style just for display matching the design
        price: item.product.price > 20 ? item.product.price / 40 : item.product.price,
      })),
    }))
  )

  const handleQtyChange = (listId: string, itemId: string, delta: number) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== listId) return list
        return {
          ...list,
          items: list.items.map((item) => {
            if (item.id !== itemId) return item
            return {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          }),
        }
      })
    )
  }

  const handleRemoveItem = (listId: string, itemId: string, name: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== listId) return list
        return {
          ...list,
          items: list.items.filter((item) => item.id !== itemId),
        }
      })
    )
    addNotification(`${name} removed from Smart List.`, 'info')
  }

  const handleAddListToCart = (list: typeof lists[0]) => {
    list.items.forEach((item) => {
      dispatch(addToCart({ product: item.product, quantity: item.quantity }))
    })
    addNotification(`${list.name} items added to cart!`, 'success')
  }

  return (
    <div className="flex min-h-screen text-on-surface select-none font-body-lg bg-background">
      {/* SideNavBar - predicted component */}
      <aside className="hidden md:flex flex-col h-screen w-64 rounded-r-xl sticky top-0 bg-surface-container-low py-lg gap-base shrink-0 z-40 border-r border-outline-variant">
        <div className="px-md mb-lg">
          <span className="text-headline-md font-headline-md font-bold text-primary">ShelfMate</span>
          <div className="mt-xl flex items-center gap-md">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div>
              <p className="text-label-caps font-label-caps text-on-surface">Dashboard</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Smart kitchen tracker</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-xs px-sm">
          <Link to="/" className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors rounded-lg group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
            <span className="text-label-caps font-label-caps">Home</span>
          </Link>
          <Link to="/shop" className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors rounded-lg group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">store</span>
            <span className="text-label-caps font-label-caps">Shop</span>
          </Link>
          <div className="flex items-center gap-sm bg-primary-container text-on-primary-container rounded-lg px-md py-sm translate-x-1 transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>format_list_bulleted</span>
            <span className="text-label-caps font-label-caps">Smart List</span>
          </div>
          <Link to="/account" className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors rounded-lg group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">account_circle</span>
            <span className="text-label-caps font-label-caps">Account</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 pb-2xl px-md md:px-lg">
        {lists.map((list) => {
          const listTotal = list.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
          return (
            <div key={list.id} className="mt-8 border-b border-outline-variant/30 pb-xl last:border-b-0">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
                <div>
                  <h1 className="text-headline-lg font-headline-lg text-on-surface font-extrabold">{list.name}</h1>
                  <div className="flex items-center gap-xs mt-xs">
                    <span className="text-body-sm font-body-sm text-on-surface-variant"> AI Predicted List</span>
                    <span className="text-on-surface-variant text-body-sm">•</span>
                    <span className="text-label-caps font-label-caps text-primary bg-primary-container/20 px-sm py-[2px] rounded-full uppercase tracking-wider font-bold">
                      {list.frequency}
                    </span>
                  </div>
                </div>
                <div className="flex gap-md">
                  <button
                    onClick={() => handleAddListToCart(list)}
                    className="bg-primary text-on-primary font-button text-button px-lg py-sm rounded-xl hover:opacity-90 transition-opacity flex items-center gap-xs cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    Add list to Cart (${listTotal.toFixed(2)})
                  </button>
                </div>
              </header>

              {/* Items List */}
              <div className="bg-surface-container-lowest rounded-xl custom-shadow overflow-hidden border border-outline-variant/30">
                {list.items.length > 0 ? (
                  list.items.map((item) => (
                    <div key={item.id} className="flex items-center p-md border-b border-surface-container gap-md last:border-b-0">
                      <div className="w-16 h-16 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                        <img className="w-full h-full object-cover" alt={item.product.name} src={item.product.image} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-body-lg font-headline-md font-semibold truncate">{item.product.name}</h3>
                        <div className="flex gap-xs mt-xs">
                          <span className="text-label-caps font-label-caps px-sm py-1 bg-primary/10 text-primary rounded-full text-[10px] uppercase font-bold tracking-wider">
                            {item.product.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-md">
                        <div className="flex items-center bg-surface-container-low rounded-xl p-xs gap-sm">
                          <button
                            onClick={() => handleQtyChange(list.id, item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-8 text-center font-bold text-body-lg">{item.quantity}</span>
                          <button
                            onClick={() => handleQtyChange(list.id, item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-primary"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                        <span className="text-body-lg font-headline-md w-20 text-right font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => handleRemoveItem(list.id, item.id, item.product.name)}
                          className="p-sm text-error hover:bg-error-container rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-xl text-center text-on-surface-variant">No items left in this Smart List</div>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  )
}
