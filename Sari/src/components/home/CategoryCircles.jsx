import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function CategoryCircles() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-48 bg-gray-100 animate-pulse" />
  }

  const { categoryCircles } = sections

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-serif font-bold text-maroon-500 mb-8">
        Shop by Category
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {categoryCircles.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/category/' + cat.name.toLowerCase().replace(/ /g, '-'))}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold-500 group-hover:border-maroon-500 transition-all">
              <img
                src={getImageUrl(cat.img)}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No' }}
              />
            </div>
            <p className="mt-3 text-xs md:text-sm font-semibold text-gray-800 group-hover:text-maroon-500">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}