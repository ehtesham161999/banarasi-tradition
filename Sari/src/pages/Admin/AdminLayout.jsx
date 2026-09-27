import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/authStore'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuth((state) => state.logout)

  const menu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Add Product', path: '/admin/add-product', icon: '➕' },
    { name: 'Hero Slider', path: '/admin/hero', icon: '🖼️' },
    { name: 'Home Sections', path: '/admin/home-sections', icon: '🏠' },
    { name: 'Orders', path: '/admin/orders', icon: '🛒' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 min-w-[256px] bg-maroon-500 text-white flex flex-col">
        <div className="p-6 border-b border-maroon-600">
          <h1
            className="text-2xl italic"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            Banarasi
          </h1>
          <p className="text-xs text-white/70 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-white text-maroon-500'
                  : 'text-white/90 hover:bg-maroon-600'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-maroon-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/90 hover:bg-maroon-600 transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}