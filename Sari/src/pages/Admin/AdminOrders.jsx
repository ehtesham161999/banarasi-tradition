import { useEffect, useState } from 'react'
import { getOrders, updateOrderStatus } from '../../api/api'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  const fetchOrders = () => {
    setLoading(true)
    getOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus)
      setOrders(orders.map((o) => (o._id === id ? { ...o, orderStatus: newStatus } : o)))
      alert('✅ Status update ho gaya!')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  const statusColors = {
    placed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-yellow-100 text-yellow-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
          Abhi koi order nahi hai
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-3 border-b">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-sm font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="text-sm font-medium">{order.customer?.name}</p>
                  <p className="text-xs text-gray-500">{order.customer?.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-sm font-bold text-maroon-500">₹{order.total}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.paymentMethod === 'Razorpay' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {order.paymentMethod}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <select
                    value={order.orderStatus || 'placed'}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer border-0 ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}
                  >
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                  className="text-maroon-500 text-sm font-medium hover:underline"
                >
                  {expandedId === order._id ? 'Hide Items' : 'View Items'} →
                </button>
              </div>

              {expandedId === order._id && (
                <div className="p-6 space-y-3 bg-cream-50">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Delivery Address</p>
                    <p className="text-sm text-gray-800">{order.customer?.address}</p>
                    <p className="text-sm text-gray-600">Pincode: {order.customer?.pincode}</p>
                  </div>

                  <p className="text-xs font-bold uppercase text-gray-500">Items ({order.items?.length})</p>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-3 bg-white p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                      </div>
                      <p className="text-sm font-bold">₹{item.qty * item.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}