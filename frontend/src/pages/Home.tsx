import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setProducts, setSearchFilter, setCategoryFilter } from '@/store/slices/productsSlice'
import { mockProducts } from '@/data/mockProducts'
import { addToCart } from '@/store/slices/cartSlice'
import { useNotification } from '@/context/NotificationContext'

export default function Home() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addNotification } = useNotification()
  const [searchVal, setSearchVal] = useState('')

  const products = useAppSelector((state) => state.products.filteredProducts).slice(0, 8)

  useEffect(() => {
    dispatch(setProducts(mockProducts))
  }, [dispatch])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchFilter(searchVal))
    navigate('/shop')
  }

  const handleCategoryClick = (category: string) => {
    dispatch(setCategoryFilter(category))
    navigate('/shop')
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ product, quantity: 1 }))
    addNotification(`${product.name} was added to your Cart.`, 'success')
  }

  return (
    <div className="w-full bg-background text-on-surface select-none font-body-lg">
      {/* Hero Section */}
      <header className="hero-bg text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-lg py-2xl grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="space-y-lg">
            <div className="inline-flex items-center gap-sm px-md py-xs rounded-full bg-white/10 border border-white/20 text-white/80">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <span className="font-label-caps text-label-caps">Smart grocery shopping</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg md:text-6xl leading-[1.1] font-extrabold tracking-tight">
              Fresh groceries,<br />
              <span className="text-primary-container">delivered smart.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-white/70 max-w-lg">
              Manage your household inventory, discover personalized deals, and get fresh essentials delivered to your door with the precision of ShelfMate.
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-sm bg-white/5 p-sm rounded-xl border border-white/10 max-w-xl">
              <div className="flex-1 flex items-center gap-sm px-md py-sm">
                <span className="material-symbols-outlined text-white/60">search</span>
                <input
                  className="bg-transparent border-none focus:ring-0 w-full text-white placeholder-white/40 outline-none"
                  placeholder="Search products, brands..."
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-primary-container text-on-primary-container font-button text-button px-xl py-sm rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-sm">
                Search
              </button>
            </form>
            <div className="flex flex-wrap gap-sm">
              {['Organic', 'Vegan', 'Local Farm', 'Gluten-Free'].map((tag) => (
                <span
                  key={tag}
                  onClick={() => {
                    dispatch(setSearchFilter(tag))
                    navigate('/shop')
                  }}
                  className="px-md py-xs bg-white/10 rounded-full font-label-caps text-label-caps text-white/80 border border-white/10 cursor-pointer hover:bg-white/20 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-lg flex gap-xl border-t border-white/10">
              <div>
                <div className="font-headline-md text-headline-md text-white font-bold">50k+</div>
                <div className="font-label-caps text-label-caps text-white/40">Products</div>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-white font-bold">120+</div>
                <div className="font-label-caps text-label-caps text-white/40">Stores</div>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-white font-bold">4.9/5</div>
                <div className="font-label-caps text-label-caps text-white/40">Rating</div>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-12 -right-12 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="relative z-10 glass-card p-lg rounded-2xl elevation-1 transform rotate-2">
              <div className="aspect-video rounded-xl overflow-hidden mb-md">
                <img
                  className="w-full h-full object-cover"
                  alt="Organic Vegetables Crate"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrlZ6GrOaZYzr7Pq5zXrZBvBLxJXiq1OhHsbYLKnI2O0vzAW1zs7RQluuA4TBQowQRGWZcLOx2wam2l21Kq19ZIMPd0CVZetf0GrN1WyKN2t_NxbgoDwoqZo_cHHZVWqsHbHFRx_XgHapLaxdNd2w-DtUOQR_1y1LkRfNYtMDbyOhidrLS56pYS5H-upDMtQ_Gkl5uVuHmw9VwWyQZNUVi2iZOKNjZTEFd3qya5xIhBjSPqHPOcO7t"
                />
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-headline-md text-headline-md text-white">Weekly Fresh Box</span>
                  <span className="text-primary-container font-bold text-xl">$24.99</span>
                </div>
                <div className="flex items-center gap-xs">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                  <span className="text-white/40 font-body-sm text-body-sm ml-xs">(128 reviews)</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-12 z-20 glass-card p-md rounded-xl elevation-1 flex items-center gap-md transform -rotate-3">
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  inventory_2
                </span>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-white/60">Stock Alert</div>
                <div className="font-body-lg text-body-lg text-white font-bold">Milk is low (10%)</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-lg py-2xl">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Browse by Category</h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg">Find everything you need for your pantry.</p>
          </div>
          <button onClick={() => handleCategoryClick('All')} className="text-primary font-button text-button flex items-center gap-xs hover:underline cursor-pointer">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {[
            { name: 'Vegetables', label: 'Fresh Veg', count: '240+ Items', color: 'bg-[#F0FDF4]', textCol: 'text-primary', icon: 'eco' },
            { name: 'Fruits', label: 'Fruits', count: '180+ Items', color: 'bg-[#FEFCE8]', textCol: 'text-yellow-600', icon: 'nutrition' },
            { name: 'Meat & Seafood', label: 'Meat & Fish', count: '90+ Items', color: 'bg-[#FFF1F2]', textCol: 'text-red-600', icon: 'set_meal' },
            { name: 'Dairy & Eggs', label: 'Dairy & Eggs', count: '110+ Items', color: 'bg-[#EFF6FF]', textCol: 'text-blue-600', icon: 'local_drink' },
            { name: 'Bakery', label: 'Bakery', count: '60+ Items', color: 'bg-[#F5F3FF]', textCol: 'text-purple-600', icon: 'bakery_dining' },
            { name: 'Pantry', label: 'Snacks', count: '320+ Items', color: 'bg-[#FFF7ED]', textCol: 'text-orange-600', icon: 'cookie' },
            { name: 'Beverages', label: 'Beverages', count: '200+ Items', color: 'bg-[#ECFEFF]', textCol: 'text-cyan-600', icon: 'water_drop' },
            { name: 'Oils & Condiments', label: 'Household', count: '450+ Items', color: 'bg-[#F8FAFC]', textCol: 'text-slate-600', icon: 'sanitizer' },
          ].map((cat) => (
            <div key={cat.name} onClick={() => handleCategoryClick(cat.name)} className="group cursor-pointer">
              <div className={`${cat.color} p-lg rounded-2xl flex flex-col items-center text-center transition-transform group-hover:-translate-y-1`}>
                <div className="w-16 h-16 bg-white rounded-full elevation-1 flex items-center justify-center mb-md">
                  <span className={`material-symbols-outlined ${cat.textCol} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {cat.icon}
                  </span>
                </div>
                <span className="font-headline-md text-headline-md text-on-surface">{cat.label}</span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smart List Banner */}
      <section className="max-w-7xl mx-auto px-lg py-xl">
        <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl overflow-hidden flex flex-col md:flex-row items-center border-l-8 border-primary-container elevation-1">
          <div className="p-xl flex-1 space-y-md">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                smart_toy
              </span>
              <span className="font-label-caps text-label-caps tracking-widest text-primary-fixed">AI-POWERED PREDICTION</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg">Your weekly ShelfMate list is ready — 18 items</h3>
            <p className="text-white/60 font-body-lg text-body-lg">Based on your consumption patterns, we've predicted exactly what you'll need this week. Review and order in one click.</p>
            <div className="flex gap-md pt-md">
              <Link to="/smart-lists" className="bg-primary-container text-on-primary-container font-button text-button px-lg py-sm rounded-lg hover:opacity-90 transition-opacity">
                Review My List
              </Link>
              <Link to="/smart-lists" className="border border-white/20 text-white font-button text-button px-lg py-sm rounded-lg hover:bg-white/10 transition-colors">
                How it works
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
              alt="Smart List Phone Preview"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCly_bFAZ4okdmSb7C4VfJDzuAc1eOZ9HnfJ74uhyyE8SDhkr6Ub5IShfX18ON6FcaMPr1d94xXPJuAAk8Q_rV3-Hp2toClmFl0e12x4N6RqoQbJS_COeOCC3arHt8dQfc83Q9jdXAlNHuhUj0Mxd5CtNJzuMFJbG0ASMAEUQzv9GxsL-fDXjTB5cUwVUH4i0WeDnyJQdoDjZ_b6oxaQNTtLmDBinSgTYbNT1WTDxOez9MkJ9plX6uh"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-lg py-2xl">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Fresh picks for you</h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg">Recommended based on your recent activity.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-md">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white p-md rounded-2xl border border-outline-variant elevation-1 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square rounded-xl overflow-hidden mb-md relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <button className="absolute top-sm right-sm w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-secondary hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                </div>
                <div className="space-y-xs">
                  {product.badge && (
                    <span className="text-primary font-label-caps text-label-caps capitalize">{product.badge}</span>
                  )}
                  <h4 className="font-headline-md text-[16px] leading-[22px] font-semibold text-on-surface leading-tight truncate">{product.name}</h4>
                  <p className="text-on-surface-variant font-body-sm text-body-sm">{product.category}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-sm mt-auto">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-10 h-10 bg-surface-container text-primary rounded-lg flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
