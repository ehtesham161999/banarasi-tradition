import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartStore'
import { getImageUrl } from '../api/api'

export default function Cart() {
  const navigate = useNavigate()
  const { items, removeItem, addItem, decreaseQty, clearCart } = useCart()

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const totalMrp = items.reduce((sum, i) => sum + i.mrp * i.qty, 0)
  const totalDiscount = totalMrp - subtotal
  const deliveryCharge = subtotal > 999 ? 0 : 49
  const total = subtotal + deliveryCharge

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">
          Aapka Cart Khaali Hai
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Yahan kuch bhi nahi hai. Shopping shuru karo!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors"
        >
          Shop Now
        </button>
      </div>
    )
  }

  return (
    <div className="pb-32 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-4 md:p-6 flex items-center justify-between border-b">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-maroon-500">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-red-500 text-sm hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {/* ===== LEFT: CART ITEMS ===== */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              {/* Image */}
              <div
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer"
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-24 h-32 object-cover rounded-lg"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No' }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="font-medium text-gray-800 cursor-pointer hover:text-maroon-500 line-clamp-2 mb-1"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 capitalize mb-2">
                  {item.category}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-maroon-500">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{item.mrp}
                  </span>
                  <span className="text-xs text-green-600 font-semibold">
                    {Math.round((1 - item.price / item.mrp) * 100)}% off
                  </span>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center text-sm">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => addItem(item)}
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <button
            onClick={() => navigate('/')}
            className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg text-sm font-medium hover:border-maroon-500 hover:text-maroon-500 transition-colors"
          >
            + Continue Shopping
          </button>
        </div>

        {/* ===== RIGHT: ORDER SUMMARY ===== */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total MRP</span>
                <span className="font-medium">₹{totalMrp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">
                  − ₹{totalDiscount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              {deliveryCharge > 0 && (
                <p className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                  ₹{999 - subtotal} aur add karo → FREE delivery!
                </p>
              )}

              <div className="border-t pt-3 flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-bold text-maroon-500">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-maroon-500 text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors"
            >
              Proceed to Checkout
            </button>

            {/* Trust Badges */}
            <div className="mt-4 pt-4 border-t space-y-2 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <span>🔒</span> 100% Secure Payments
              </p>
              <p className="flex items-center gap-2">
                <span>🚚</span> Free delivery above ₹999
              </p>
              <p className="flex items-center gap-2">
                <span>↩️</span> 7-day easy returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}