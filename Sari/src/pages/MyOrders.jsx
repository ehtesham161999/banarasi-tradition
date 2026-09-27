import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrders, getImageUrl } from '../api/api'
import { useAuth } from '../store/authStore'

export default function MyOrders() {
  const navigate = useNavigate()
  const user = useAuth((state) => state.user)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders()
      .then((res) => {
        // Sirf apne orders dikhao (phone match se)
        const myOrders = user
          ? res.data.filter((o) => o.customer?.phone === user.phone)
          : res.data
        setOrders(myOrders)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return <div className="flex items-center justify-center h-96"><p className="text-gray-500">Loading...</p></div>
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">🔒</p>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Login Karo</h2>
        <p className="text-gray-500 mb-6 text-center">Orders dekhne ke liye login karo</p>
        <button onClick={() => navigate('/login')} className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider">Login</button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">📦</p>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Koi Order Nahi</h2>
        <p className="text-gray-500 mb-6 text-center">Abhi tak koi order nahi kiya</p>
        <button onClick={() => navigate('/')} className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider">Shop Now</button>
      </div>
    )
  }

  const statusColors = {
    placed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-yellow-100 text-yellow-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="pb-20 max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-serif font-bold text-maroon-500 mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-cream-50 px-4 py-3 flex flex-wrap justify-between items-center gap-2 border-b">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="text-sm font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-sm font-bold text-maroon-500">₹{order.total}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                {order.orderStatus || 'placed'}
              </span>
            </div>

            {/* Items */}
            <div className="p-4 space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No' }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.qty} × ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Online Payment'}
              </span>
              <button className="text-maroon-500 font-medium hover:underline">Track Order →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}