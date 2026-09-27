import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../store/wishlistStore'
import { useCart } from '../store/cartStore'
import { getImageUrl } from '../api/api'

export default function Wishlist() {
  const navigate = useNavigate()
  const { items, loadWishlist, removeFromWishlist } = useWishlist()
  const addItem = useCart((state) => state.addItem)

  useEffect(() => {
    loadWishlist()
  }, [])

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">❤️</p>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">
          Wishlist Khaali Hai
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Pasand ke products save karo!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600"
        >
          Shop Now
        </button>
      </div>
    )
  }

  return (
    <div className="pb-20 max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-serif font-bold text-maroon-500 mb-6">
        My Wishlist ({items.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((p) => {
          const discount = Math.round((1 - p.price / p.mrp) * 100)
          return (
            <div
              key={p._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={getImageUrl(p.image)}
                  alt={p.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${p._id}`)}
                />
                <button
                  onClick={() => removeFromWishlist(p._id)}
                  className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-50"
                >
                  ✕
                </button>
                <span className="absolute top-2 left-2 bg-maroon-500 text-white text-[10px] font-bold px-2 py-1">
                  {discount}% Off
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                  {p.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-maroon-500">₹{p.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                </div>
                <button
                  onClick={() => {
                    addItem(p)
                    navigate('/cart')
                  }}
                  className="w-full mt-3 bg-maroon-500 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-maroon-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}