import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function SareeStore() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-gray-100 animate-pulse" />
  }

  const { sareeStore } = sections

  // 4 cards: [0] = Left tall, [1] = Middle top, [2] = Right tall, [3] = Middle bottom
  const card0 = sareeStore[0]
  const card1 = sareeStore[1]
  const card2 = sareeStore[2]
  const card3 = sareeStore[3]

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-wide">
        THE SAREE STORE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Left — tall */}
        {card0 && (
          <div
            onClick={() => navigate('/category/' + (card0.slug || 'sudathi-gold'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg md:row-span-2 h-96 md:h-auto"
          >
            <img
              src={getImageUrl(card0.img)}
              alt={card0.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800?text=No' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white text-sm italic font-light">Banarasi</p>
              <p className="text-yellow-400 text-3xl font-bold tracking-wide">
                {card0.label || card0.name}
              </p>
            </div>
          </div>
        )}

        {/* Middle Top */}
        {card1 && (
          <div
            onClick={() => navigate('/category/' + (card1.slug || 'bestsellers'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg h-56 md:h-64"
          >
            <img
              src={getImageUrl(card1.img)}
              alt={card1.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800?text=No' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-yellow-400 text-lg md:text-xl font-bold uppercase tracking-wider">
                {card1.label || card1.name}
              </p>
            </div>
          </div>
        )}

        {/* Right — tall */}
        {card2 && (
          <div
            onClick={() => navigate('/category/' + (card2.slug || 'ready-to-wear'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg md:row-span-2 h-96 md:h-auto"
          >
            <img
              src={getImageUrl(card2.img)}
              alt={card2.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800?text=No' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-0 right-0 text-center px-4">
              <p className="text-yellow-400 text-xl md:text-2xl font-bold uppercase tracking-wider leading-tight">
                {card2.label || card2.name}
              </p>
            </div>
          </div>
        )}

        {/* Middle Bottom */}
        {card3 && (
          <div
            onClick={() => navigate('/category/' + (card3.slug || 'essentials'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg h-56 md:h-64"
          >
            <img
              src={getImageUrl(card3.img)}
              alt={card3.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800?text=No' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-yellow-400 text-lg md:text-xl font-bold uppercase tracking-wider">
                {card3.label || card3.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}