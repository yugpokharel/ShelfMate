import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { registerSuccess } from '@/store/slices/authSlice'
import { Button } from '@/components/ui/Button'
import { useNotification } from '@/context/NotificationContext'
import { Mail, Lock, User } from 'lucide-react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone: '',
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
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-border p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-muted-foreground text-center mb-8">Join ShelfMate and start shopping</p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <div className="flex items-center bg-secondary border border-border rounded-lg px-3 py-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="flex-1 bg-transparent ml-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <div className="flex items-center bg-secondary border border-border rounded-lg px-3 py-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-transparent ml-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="flex items-center bg-secondary border border-border rounded-lg px-3 py-2">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="flex-1 bg-transparent ml-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <div className="flex items-center bg-secondary border border-border rounded-lg px-3 py-2">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="flex-1 bg-transparent ml-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full mt-6" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-accent font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
