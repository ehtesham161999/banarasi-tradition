import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../api/api'

export default function NewLaunched({ products }) {
  const navigate = useNavigate()

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.1em]"
          style={{ color: '#1E3A8A' }}
        >
          NEW LAUNCHED
        </h2>
        <div className="w-20 h-0.5 mx-auto mt-3" style={{ backgroundColor: '#D4AF37' }} />
      </div>

      {/* Product Slider */}
      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 no-scrollbar">
        {products.map((p) => {
          const discount = Math.round((1 - p.price / p.mrp) * 100)
          return (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="w-56 md:w-64 shrink-0 cursor-pointer group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-2 left-2 bg-maroon-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    {discount}% Off
                  </span>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                    aria-label="Wishlist"
                  >
                    <span className="text-sm">🤍</span>
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 h-10 leading-tight">
                    {p.name.toUpperCase()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                    <span className="font-bold text-maroon-500 text-sm md:text-base">₹{p.price}</span>
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      -{discount}%
                    </span>
                  </div>
                  <div className="text-xs text-yellow-500 mt-1">★★★★★</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* View All */}
      <div className="text-center mt-8 md:mt-12">
        <button
          onClick={() => navigate('/category/new-launched')}
          className="text-white px-10 md:px-14 py-3 md:py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300"
          style={{ backgroundColor: '#1E3A8A' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#8B1E3F')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1E3A8A')}
        >
          View All
        </button>
      </div>
    </section>
  )
}