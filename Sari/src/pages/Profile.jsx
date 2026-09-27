import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../store/wishlistStore'
import { useCart } from '../store/cartStore'
import { useAuth } from '../store/authStore'

export default function Profile() {
  const navigate = useNavigate()
  const { items: wishlistItems } = useWishlist()
  const { items: cartItems } = useCart()
  const user = useAuth((state) => state.user)
  const userLogout = useAuth((state) => state.userLogout)

  const handleLogout = () => {
    userLogout()
    alert('✅ Logout ho gaya')
    navigate('/')
  }

  const menuItems = [
    { icon: '📦', label: 'My Orders', desc: 'Apne orders dekho', path: '/orders' },
    { icon: '❤️', label: 'Wishlist', desc: `${wishlistItems.length} saved items`, path: '/wishlist' },
    { icon: '🛒', label: 'Cart', desc: `${cartItems.length} items`, path: '/cart' },
    { icon: '📍', label: 'Addresses', desc: 'Delivery addresses', path: '/addresses' },
    { icon: '💳', label: 'Payments', desc: 'Saved payment methods', path: '/payments' },
    { icon: '📞', label: 'Contact Us', desc: 'Help & support', path: '/contact' },
  ]

  return (
    <div className="pb-20 max-w-2xl mx-auto">
      <section className="bg-maroon-500 text-white p-8 text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-5xl">👤</span>
        </div>
        {user ? (
          <>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-white/80 text-sm mt-1">{user.phone}</p>
            <p className="text-white/60 text-xs mt-1">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-white text-maroon-500 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Guest User</h1>
            <p className="text-white/80 text-sm mt-1">Login karo apne account ke liye</p>
            <div className="flex gap-3 justify-center mt-4">
              <Link
                to="/login"
                className="bg-white text-maroon-500 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-maroon-700 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-yellow-300"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="p-4 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        ))}
      </section>

      <p className="text-center text-xs text-gray-400 mt-4">
        Banarasi Tradition v1.0.0
      </p>
    </div>
  )
}