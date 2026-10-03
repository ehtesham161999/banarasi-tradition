import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function TopCategories() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-cream-100 animate-pulse" />
  }

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <h2
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 tracking-[0.1em]"
        style={{ color: '#1E3A8A' }}
      >
        TOP CATEGORIES
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {sections.topCategories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/category/' + cat.name.toLowerCase().replace(/ /g, '-'))}
            className="cursor-pointer group"
          >
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500">
              <img
                src={getImageUrl(cat.img)}
                alt={cat.name}
                className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </div>

            {/* Name */}
            <p
              className="mt-3 md:mt-4 text-center text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ color: '#1E3A8A' }}
            >
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}