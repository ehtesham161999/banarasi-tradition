import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function TrendingNow() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-gray-100 animate-pulse" />
  }

  const { trendingNow } = sections

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-blue-900 mb-8 tracking-wide">
        TRENDING NOW
      </h2>

      <div
        onClick={() => navigate('/category/silk-saree-sale')}
        className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
      >
        <img
          src={getImageUrl(trendingNow.image)}
          alt="Trending"
          className="w-full h-[300px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/1600x600?text=Trending' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-maroon-700/80"></div>
        <div className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 text-center md:text-right text-white">
          <div className="mb-4">
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-yellow-400 drop-shadow-lg">
              {trendingNow.line1}
            </h3>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-yellow-400 drop-shadow-lg">
              {trendingNow.line2}
            </h3>
            <p className="text-2xl md:text-4xl font-bold text-pink-400 mt-1 drop-shadow-lg">
              {trendingNow.line3}
            </p>
          </div>
          <p className="text-xl md:text-3xl font-semibold mb-6">{trendingNow.price}</p>
          <button className="bg-yellow-400 text-maroon-700 px-8 py-3 text-sm md:text-base font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  )
}