import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function TopCategories() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-gray-100 animate-pulse" />
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-wide">
        TOP CATEGORIES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {sections.topCategories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/category/' + cat.name.toLowerCase().replace(/ /g, '-'))}
            className="cursor-pointer group"
          >
            <div className="rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
              <img
                src={getImageUrl(cat.img)}
                alt={cat.name}
                className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image' }}
              />
            </div>
            <p className="mt-4 text-center text-sm md:text-base font-bold uppercase text-gray-900 tracking-wider group-hover:text-maroon-500">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}