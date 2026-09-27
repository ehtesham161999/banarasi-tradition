import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../api/api'

export default function NewArrivals({ products }) {
  const navigate = useNavigate()

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-maroon-500">New Arrivals</h2>
        <div className="w-20 h-0.5 bg-gold-500 mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="bg-white rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="relative overflow-hidden">
              <img
                src={getImageUrl(p.image)}
                alt={p.name}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Image' }}
              />
              <span className="absolute top-2 left-2 bg-maroon-500 text-white text-[10px] font-bold px-2 py-1 uppercase">
                {Math.round((1 - p.price / p.mrp) * 100)}% Off
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-maroon-500">₹{p.price}</span>
                <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/category/new-arrivals')}
          className="border-2 border-maroon-500 text-maroon-500 px-10 py-3 text-sm font-bold uppercase tracking-wider hover:bg-maroon-500 hover:text-white transition-colors"
        >
          View All
        </button>
      </div>
    </section>
  )
}