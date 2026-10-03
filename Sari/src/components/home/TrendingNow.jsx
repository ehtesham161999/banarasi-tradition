import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function TrendingNow() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-cream-100 animate-pulse" />
  }

  const { trendingNow } = sections

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <h2
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 tracking-[0.1em]"
        style={{ color: '#1E3A8A' }}
      >
        TRENDING NOW
      </h2>

      {/* Banner */}
      <div
        onClick={() => navigate('/category/silk-saree-sale')}
        className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        <img
          src={getImageUrl(trendingNow.image)}
          alt="Trending"
          className="w-full h-[280px] md:h-[400px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-1000"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-maroon-700/90" />

        {/* Content */}
        <div className="absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 text-center md:text-right text-white">
          <div className="mb-3 md:mb-4">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-yellow-400 drop-shadow-2xl leading-none">
              {trendingNow.line1}
            </h3>
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-yellow-400 drop-shadow-2xl leading-none">
              {trendingNow.line2}
            </h3>
            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-pink-400 mt-1 md:mt-2 drop-shadow-lg">
              {trendingNow.line3}
            </p>
          </div>

          <p className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 drop-shadow-lg">
            {trendingNow.price}
          </p>

          <button className="bg-yellow-400 text-maroon-700 px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-yellow-300 transition-all duration-300 shadow-lg">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  )
}