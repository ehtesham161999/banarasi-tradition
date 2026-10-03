import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardStats } from '../../api/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>
  if (!stats) return <div className="p-8 text-center text-gray-500">No data</div>

  const maxRevenue = Math.max(...stats.last7Days.map((d) => d.revenue), 1)

  return (
    <div className="p-6 md:p-8">
      <h1
        className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 tracking-[0.05em]"
        style={{ color: '#1E3A8A' }}
      >
        Dashboard
      </h1>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-maroon-500 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Revenue</p>
          <p className="text-xl md:text-3xl font-bold text-maroon-500 mt-2">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Orders</p>
          <p className="text-xl md:text-3xl font-bold text-blue-600 mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-gold-500 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Products</p>
          <p className="text-xl md:text-3xl font-bold text-gold-500 mt-2">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Pending</p>
          <p className="text-xl md:text-3xl font-bold text-green-600 mt-2">{stats.pendingOrders}</p>
        </div>
      </div>

      {/* ===== ORDER STATUS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Placed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.pendingOrders}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Shipped</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.shippedOrders}</p>
            </div>
            <span className="text-4xl">🚚</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Delivered</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.deliveredOrders}</p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>
      </div>

      {/* ===== REVENUE CHART ===== */}
      <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 mb-8">
        <h2
          className="text-base md:text-lg font-bold mb-4 tracking-[0.05em]"
          style={{ color: '#1E3A8A' }}
        >
          Last 7 Days Revenue
        </h2>
        <div className="flex items-end gap-2 md:gap-3 h-40 md:h-48">
          {stats.last7Days.map((day) => {
            const height = (day.revenue / maxRevenue) * 100
            const dayName = new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center justify-end h-full">
                <p className="text-[10px] md:text-xs font-bold text-gray-700 mb-1">₹{day.revenue}</p>
                <div
                  className="w-full bg-maroon-500 rounded-t transition-all hover:bg-maroon-600"
                  style={{ height: `${Math.max(height, 2)}%` }}
                  title={`${day.orders} orders`}
                />
                <p className="text-[9px] md:text-[10px] text-gray-500 mt-1">{dayName}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ===== TOP PRODUCTS + QUICK ACTIONS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
          <h2
            className="text-base md:text-lg font-bold mb-4 tracking-[0.05em]"
            style={{ color: '#1E3A8A' }}
          >
            🏆 Top Products
          </h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm">Abhi koi data nahi hai</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.map((p, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-maroon-500 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.count} sold</p>
                  </div>
                  <p className="text-sm font-bold text-maroon-500">₹{p.revenue}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
          <h2
            className="text-base md:text-lg font-bold mb-4 tracking-[0.05em]"
            style={{ color: '#1E3A8A' }}
          >
            ⚡ Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/add-product"
              className="bg-maroon-500 text-white p-4 rounded-lg text-center font-bold text-xs uppercase tracking-wider hover:bg-maroon-600 transition-colors"
            >
              ➕ Add Product
            </Link>
            <Link
              to="/admin/orders"
              className="bg-blue-600 text-white p-4 rounded-lg text-center font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors"
            >
              🛒 View Orders
            </Link>
            <Link
              to="/admin/hero"
              className="bg-gold-500 text-white p-4 rounded-lg text-center font-bold text-xs uppercase tracking-wider hover:bg-gold-600 transition-colors"
            >
              🖼️ Hero Slider
            </Link>
            <Link
              to="/admin/home-sections"
              className="bg-green-600 text-white p-4 rounded-lg text-center font-bold text-xs uppercase tracking-wider hover:bg-green-700 transition-colors"
            >
              🏠 Home Sections
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}