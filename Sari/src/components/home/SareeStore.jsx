import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function SareeStore() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-cream-100 animate-pulse" />
  }

  const { sareeStore } = sections

  const card0 = sareeStore[0]
  const card1 = sareeStore[1]
  const card2 = sareeStore[2]
  const card3 = sareeStore[3]

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <h2
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 tracking-[0.1em]"
        style={{ color: '#1E3A8A' }}
      >
        THE SAREE STORE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Left — SUDATHI GOLD (tall) */}
        {card0 && (
          <div
            onClick={() => navigate('/category/' + (card0.slug || 'sudathi-gold'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 md:row-span-2 h-80 md:h-auto"
          >
            <img
              src={getImageUrl(card0.img)}
              alt={card0.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center">
              <p className="text-white text-sm md:text-base italic font-light mb-1">
                Banarasi
              </p>
              <p className="text-yellow-400 text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.1em]">
                {card0.label || card0.name}
              </p>
            </div>
          </div>
        )}

        {/* Middle Top — BESTSELLERS */}
        {card1 && (
          <div
            onClick={() => navigate('/category/' + (card1.slug || 'bestsellers'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 h-56 md:h-64"
          >
            <img
              src={getImageUrl(card1.img)}
              alt={card1.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center">
              <p className="text-yellow-400 text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.12em]">
                {card1.label || card1.name}
              </p>
            </div>
          </div>
        )}

        {/* Right — READY TO WEAR (tall) */}
        {card2 && (
          <div
            onClick={() => navigate('/category/' + (card2.slug || 'ready-to-wear'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 md:row-span-2 h-80 md:h-auto"
          >
            <img
              src={getImageUrl(card2.img)}
              alt={card2.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center px-4">
              <p className="text-yellow-400 text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.1em] leading-tight">
                {card2.label || card2.name}
              </p>
            </div>
          </div>
        )}

        {/* Middle Bottom — ESSENTIALS */}
        {card3 && (
          <div
            onClick={() => navigate('/category/' + (card3.slug || 'essentials'))}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 h-56 md:h-64"
          >
            <img
              src={getImageUrl(card3.img)}
              alt={card3.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center">
              <p className="text-yellow-400 text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.12em]">
                {card3.label || card3.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}