import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../api/api'

export default function ShopTheLook({ products }) {
  const navigate = useNavigate()

  return (
    <section className="bg-black py-8">
      <h2 className="text-white text-2xl md:text-3xl font-serif text-center mb-6">
        Shop the Look 🎥
      </h2>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="relative w-44 h-72 rounded-xl overflow-hidden shrink-0 cursor-pointer group"
          >
            {p.video ? (
              <video
                src={getImageUrl(p.video)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            ) : (
              <img
                src={getImageUrl(p.image)}
                alt={p.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
              <p className="text-white text-xs truncate">{p.name}</p>
              <p className="text-gold-500 text-sm font-bold">₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}