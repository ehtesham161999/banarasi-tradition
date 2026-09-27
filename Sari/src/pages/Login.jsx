import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../api/api'
import { useAuth } from '../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const userLoginStore = useAuth((state) => state.userLogin)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await userLogin(form.email, form.password)
      if (res.data.success) {
        userLoginStore(res.data.user)
        alert('✅ Login successful!')
        navigate('/profile')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-maroon-500 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-maroon-500 text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Account nahi hai?{' '}
          <Link to="/signup" className="text-maroon-500 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}