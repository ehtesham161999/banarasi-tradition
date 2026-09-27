import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/authStore'
import { adminLogin } from '../../api/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const login = useAuth((state) => state.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await adminLogin(username, password)

      if (res.data.success) {
        login(res.data.admin.username)
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1
          className="text-3xl text-center text-maroon-500 mb-2"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontStyle: 'italic' }}
        >
          Banarasi
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Admin Panel</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-maroon-500 text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}