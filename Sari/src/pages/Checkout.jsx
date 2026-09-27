import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartStore'
import { createOrder, getImageUrl } from '../api/api'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
  })

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const totalMrp = items.reduce((sum, i) => sum + i.mrp * i.qty, 0)
  const totalDiscount = totalMrp - subtotal
  const deliveryCharge = subtotal > 999 ? 0 : 49
  const total = subtotal + deliveryCharge

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert('Saare fields fill karo!')
      return
    }

    if (form.phone.length !== 10) {
      alert('Phone number 10 digit ka hona chahiye!')
      return
    }

    if (form.pincode.length !== 6) {
      alert('Pincode 6 digit ka hona chahiye!')
      return
    }

    setLoading(true)

    try {
      const orderData = {
        customer: {
          name: form.name,
          phone: form.phone,
          address: `${form.address}, ${form.city}, ${form.state}`,
          pincode: form.pincode,
        },
        items: items.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          image: i.image,
        })),
        total,
        paymentMethod,
      }

      await createOrder(orderData)
      alert('✅ Order placed successfully!')
      clearCart()
      navigate('/')
    } catch (err) {
      alert('Order failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">🛍️</p>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
          Cart Khaali Hai
        </h2>
        <button
          onClick={() => navigate('/')}
          className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider"
        >
          Shop Now
        </button>
      </div>
    )
  }

  return (
    <div className="pb-32 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-4 md:p-6 border-b">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-maroon-500">
          Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {/* ===== LEFT: FORM ===== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-maroon-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Delivery Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ramesh Kumar"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address *
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House no, Street, Landmark..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Mumbai"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="Maharashtra"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  placeholder="400001"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-maroon-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Payment Method
            </h2>

            <div className="space-y-3">
              {/* COD */}
              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'COD' ? 'border-maroon-500 bg-maroon-50' : 'border-gray-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when you receive</p>
                </div>
                <span className="text-2xl">💵</span>
              </label>

              {/* Razorpay */}
              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'Razorpay' ? 'border-maroon-500 bg-maroon-50' : 'border-gray-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="Razorpay"
                  checked={paymentMethod === 'Razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Online Payment</p>
                  <p className="text-xs text-gray-500">UPI, Card, Netbanking</p>
                </div>
                <span className="text-2xl">💳</span>
              </label>
            </div>
          </div>
        </div>

        {/* ===== RIGHT: ORDER SUMMARY ===== */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-12 h-16 object-cover rounded"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=No' }}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.qty} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total MRP</span>
                <span>₹{totalMrp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">− ₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-bold text-maroon-500">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-maroon-500 text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Placing Order...' : paymentMethod === 'COD' ? '✅ Place Order (COD)' : '💳 Pay ₹' + total}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Your data is 100% secure
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}