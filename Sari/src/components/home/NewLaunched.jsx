import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../api/api'

export default function NewLaunched({ products }) {
  const navigate = useNavigate()

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-wide">
        NEW LAUNCHED
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="w-64 shrink-0 cursor-pointer group"
          >
            <div className="relative rounded-lg overflow-hidden bg-gray-50">
              <img
                src={getImageUrl(p.image)}
                alt={p.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Image' }}
              />
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug h-10">
                {p.name.toUpperCase()}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                <span className="font-bold text-gray-900">₹{p.price}</span>
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  -{Math.round((1 - p.price / p.mrp) * 100)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/category/new-launched')}
          className="bg-blue-900 text-white px-16 py-3 text-sm font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors"
        >
          VIEW ALL
        </button>
      </div>
    </section>
  )
}