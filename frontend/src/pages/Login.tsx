import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { loginUser } from '@/store/slices/authSlice'
import { useNotification } from '@/context/NotificationContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await dispatch(loginUser({ email, password })).unwrap()
      addNotification('Logged in successfully!', 'success')
      navigate('/')
    } catch (err: any) {
      addNotification(err || 'Invalid email or password', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row text-on-surface select-none font-body-lg">
      {/* Left Panel: Brand & Features (Dark) */}
      <section className="relative hidden md:flex md:w-1/2 lg:w-[45%] xl:w-[40%] bg-[#0F0F0F] text-white p-2xl flex-col justify-between overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-[150px] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-xs mb-2xl">
            <span className="material-symbols-outlined text-primary-container text-[32px]">inventory_2</span>
            <span className="text-headline-md font-headline-md font-bold tracking-tight">ShelfMate</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg mb-xl leading-tight font-extrabold">Welcome back.</h1>
          
          <div className="space-y-md max-w-sm">
            <div className="feature-card p-md rounded-xl flex items-start gap-md group hover:bg-white/10 transition-all duration-300">
              <div className="bg-primary-container/20 p-sm rounded-lg">
                <span className="material-symbols-outlined text-primary-container">auto_awesome_motion</span>
              </div>
              <div>
                <h3 className="text-body-lg font-bold mb-xs">Smart list ready every Monday</h3>
                <p className="text-body-sm text-secondary-fixed-dim/70 text-sm">AI-powered replenishment based on your household consumption patterns.</p>
              </div>
            </div>
            <div className="feature-card p-md rounded-xl flex items-start gap-md group hover:bg-white/10 transition-all duration-300">
              <div className="bg-primary-container/20 p-sm rounded-lg">
                <span className="material-symbols-outlined text-primary-container">location_on</span>
              </div>
              <div>
                <h3 className="text-body-lg font-bold mb-xs">Live GPS tracking</h3>
                <p className="text-body-sm text-secondary-fixed-dim/70 text-sm">Real-time status of your grocery delivery from warehouse to doorstep.</p>
              </div>
            </div>
            <div className="feature-card p-md rounded-xl flex items-start gap-md group hover:bg-white/10 transition-all duration-300">
              <div className="bg-primary-container/20 p-sm rounded-lg">
                <span className="material-symbols-outlined text-primary-container">eco</span>
              </div>
              <div>
                <h3 className="text-body-lg font-bold mb-xs">Sustainable Sourcing</h3>
                <p className="text-body-sm text-secondary-fixed-dim/70 text-sm">Direct partnerships with local farms for the freshest organic produce.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-xl">
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img className="w-full h-full object-cover" alt="Modern pantry" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3hy6lCJc0gBvMVPcN84SlIlz2XNUFMaVU4kKBgbZDV45BBRM-tVg6-nIYJYGtuGS0I8uEvAKq8n7__tBCkNMHCpN-eOssTAMUwcpBXJE_7IVZ3_X3QUajeifq1axX7Nj7LfOOOs7vU0ey-5fxZLnHu8QdP2oFiZlkPhxvf8T1KnlAWr0fkxub4VS4rNVhz5SZ1B4x0Zo9TPbp1P_PDWwHvbMpHSF7fex8JqavgHWb3E1SN_IzLL_h" />
          </div>
        </div>
      </section>

      {/* Right Panel: Login Form (White) */}
      <section className="flex-1 bg-surface-container-lowest flex flex-col items-center justify-center p-margin-mobile md:p-2xl relative min-h-screen">
        <div className="md:hidden absolute top-md left-md flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary text-[24px]">inventory_2</span>
          <span className="text-headline-md font-headline-md font-bold text-primary">ShelfMate</span>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-xl">
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-xs font-extrabold">Sign in</h2>
            <p className="text-body-sm text-secondary">Manage your smart kitchen inventory and orders.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-lg">
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-on-surface-variant" htmlFor="email">EMAIL ADDRESS</label>
              <input
                className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface-container-lowest text-body-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                id="email"
                placeholder="name@company.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-xs">
              <div className="flex justify-between items-center">
                <label className="text-label-caps font-label-caps text-on-surface-variant" htmlFor="password">PASSWORD</label>
                <a className="text-label-caps font-label-caps text-primary hover:text-surface-tint transition-colors" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  className="w-full px-md py-sm pr-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-body-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-container text-on-primary-container py-md rounded-xl text-button font-button hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              {isLoading ? 'Signing In...' : 'Sign in to ShelfMate'}
            </button>
          </form>

          <div className="mt-2xl text-center">
            <p className="text-body-sm text-on-surface">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary font-bold hover:underline ml-xs transition-all cursor-pointer bg-transparent border-none p-0"
              >
                Create one free
              </button>
            </p>
          </div>
        </div>

        <div className="absolute bottom-md text-center">
          <p className="text-label-caps font-label-caps text-outline-variant font-bold">© 2026 ShelfMate. All rights reserved.</p>
        </div>
      </section>
    </main>
  )
}
