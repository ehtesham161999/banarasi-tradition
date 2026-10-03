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
        <h2
          className="text-2xl md:text-3xl font-bold mb-2 tracking-[0.05em]"
          style={{ color: '#1E3A8A' }}
        >
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Kuch bhi nahi hai. Shopping shuru karo!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-[0.1em] text-sm hover:bg-maroon-600 transition-all duration-300"
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
        <h1
          className="text-2xl md:text-3xl font-bold tracking-[0.05em]"
          style={{ color: '#1E3A8A' }}
        >
          Shopping Cart ({items.length})
        </h1>
        <button
          onClick={clearCart}
          className="text-red-500 text-xs md:text-sm font-bold uppercase tracking-wider hover:underline"
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
              className="flex gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer shrink-0"
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="font-medium text-gray-800 cursor-pointer hover:text-maroon-500 line-clamp-2 mb-1 text-xs md:text-sm"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 capitalize mb-2">
                  {item.category}
                </p>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-base md:text-lg font-bold text-maroon-500">
                    ₹{item.price}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400 line-through">
                    ₹{item.mrp}
                  </span>
                  <span className="text-xs text-green-600 font-bold">
                    {Math.round((1 - item.price / item.mrp) * 100)}% off
                  </span>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center text-sm font-medium">
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
                    className="text-red-500 text-xs md:text-sm font-bold uppercase tracking-wider hover:underline"
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
            className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:border-maroon-500 hover:text-maroon-500 transition-colors"
          >
            + Continue Shopping
          </button>
        </div>

        {/* ===== RIGHT: ORDER SUMMARY ===== */}
        <div className="lg:col-span-1">
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
            <h2
              className="text-lg md:text-xl font-bold mb-4 pb-3 border-b tracking-[0.05em]"
              style={{ color: '#1E3A8A' }}
            >
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
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              {deliveryCharge > 0 && (
                <p className="text-xs text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-200">
                  ₹{999 - subtotal} aur add karo → FREE delivery!
                </p>
              )}

              <div className="border-t pt-3 flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-bold text-maroon-500 text-lg">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-maroon-500 text-white py-3.5 rounded-lg font-bold uppercase tracking-[0.1em] text-sm hover:bg-maroon-600 transition-all duration-300"
            >
              Proceed to Checkout
            </button>

            {/* Trust Badges */}
            <div className="mt-5 pt-5 border-t space-y-2.5 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-base">🔒</span>
                <span className="font-medium">100% Secure Payments</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-base">🚚</span>
                <span className="font-medium">Free delivery above ₹999</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-base">↩️</span>
                <span className="font-medium">7-day easy returns</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}