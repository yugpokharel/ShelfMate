import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { registerSuccess } from '@/store/slices/authSlice'
import { useNotification } from '@/context/NotificationContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      addNotification('Passwords do not match', 'error')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone: '',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        addresses: [],
        defaultAddressId: undefined,
      }
      dispatch(registerSuccess(newUser))
      addNotification('Account created successfully!', 'success')
      navigate('/')
      setIsLoading(false)
    }, 1000)
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
          <h1 className="text-headline-lg font-headline-lg mb-sm leading-tight font-extrabold">Start fresh.</h1>
          <p className="text-on-surface-variant text-body-lg mb-xl max-w-sm">Join thousands of households saving time and eating better with AI-powered grocery management.</p>

          <div className="space-y-md max-w-sm">
            {[
              {
                icon: 'shopping_bag',
                title: 'Free delivery on first 3 orders',
                desc: 'No minimum order — just fresh produce, delivered fast.',
              },
              {
                icon: 'auto_graph',
                title: 'Personalized recommendations',
                desc: 'ShelfMate learns your taste profile and adapts every week.',
              },
              {
                icon: 'savings',
                title: 'Save up to 20% with Smart Lists',
                desc: 'Bulk predictions and loyalty pricing for regulars.',
              },
            ].map((f) => (
              <div key={f.icon} className="p-md rounded-xl flex items-start gap-md group hover:bg-white/10 transition-all duration-300">
                <div className="bg-primary-container/20 p-sm rounded-lg">
                  <span className="material-symbols-outlined text-primary-container">{f.icon}</span>
                </div>
                <div>
                  <h3 className="text-body-lg font-bold mb-xs">{f.title}</h3>
                  <p className="text-body-sm opacity-70 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-xl">
          <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              className="w-full h-48 object-cover"
              alt="Fresh produce"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU7A5bhRpy2IG87ABT4aFyWthojHG44zr_KVzZ2zxQ3pBA1UTQ3Vo_sJONYSmzrFkqB3e8S4i-zwwsui5-9zzOS2Jq_cksG4MsgaWnQSy9_yTa5LX7q1m4F9xcSDDL_qo-tkVajHFJ2jJ5c-ZlEqfaW0xXiy7IzrKH2MtEA4jdebANCy7DZUqBKoW-gjjFy_3AAWseDFE_95jO_qFjxbSU6h5VLJvFpDSWBXuSuQWjHQtAqOq5ya8x"
            />
          </div>
        </div>
      </section>

      {/* Right Panel: Signup Form */}
      <section className="flex-1 bg-surface-container-lowest flex flex-col items-center justify-center p-margin-mobile md:p-2xl relative min-h-screen">
        {/* Mobile Brand */}
        <div className="md:hidden absolute top-md left-md flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary text-[24px]">inventory_2</span>
          <span className="text-headline-md font-headline-md font-bold text-primary">ShelfMate</span>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="mb-xl">
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-xs font-extrabold">Create account</h2>
            <p className="text-body-sm text-secondary">Your smart kitchen companion starts here.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-md">
            {/* Full Name */}
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-on-surface-variant" htmlFor="name">FULL NAME</label>
              <div className="relative">
                <input
                  className="w-full px-md py-sm pl-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-body-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="name"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-on-surface-variant" htmlFor="signup-email">EMAIL ADDRESS</label>
              <div className="relative">
                <input
                  className="w-full px-md py-sm pl-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-body-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="signup-email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-on-surface-variant" htmlFor="signup-password">PASSWORD</label>
              <div className="relative">
                <input
                  className="w-full px-md py-sm pl-12 pr-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-body-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="signup-password"
                  placeholder="Min. 8 characters"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
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

            {/* Confirm Password */}
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-on-surface-variant" htmlFor="confirm-password">CONFIRM PASSWORD</label>
              <div className="relative">
                <input
                  className="w-full px-md py-sm pl-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-body-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="confirm-password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock_check</span>
              </div>
            </div>

            {/* Terms agreement */}
            <p className="text-body-sm text-secondary leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary py-md rounded-xl text-button font-button hover:opacity-90 active:scale-[0.98] transition-all shadow-sm mt-sm disabled:opacity-60"
            >
              {isLoading ? 'Creating Your Account...' : 'Create Free Account'}
            </button>
          </form>

          <div className="mt-xl text-center">
            <p className="text-body-sm text-on-surface">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary font-bold hover:underline ml-xs transition-all cursor-pointer bg-transparent border-none p-0"
              >
                Sign in
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
