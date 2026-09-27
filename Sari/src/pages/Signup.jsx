import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from '../api/api'
import { useAuth } from '../store/authStore'

export default function Signup() {
  const navigate = useNavigate()
  const userLoginStore = useAuth((state) => state.userLogin)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.phone.length !== 10) {
      setError('Phone number 10 digit ka hona chahiye')
      return
    }

    if (form.password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye')
      return
    }

    setLoading(true)
    try {
      const res = await userRegister(form)
      if (res.data.success) {
        userLoginStore(res.data.user)
        alert('✅ Account ban gaya!')
        navigate('/profile')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-maroon-500 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join Banarasi Tradition
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
              required
            />
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="9876543210"
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
              placeholder="Min 6 characters"
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-maroon-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}