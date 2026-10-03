import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function CategoryCircles() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-48 bg-cream-100 animate-pulse" />
  }

  const { categoryCircles } = sections

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <h2
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 tracking-[0.1em]"
        style={{ color: '#1E3A8A' }}
      >
        SHOP BY CATEGORY
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {categoryCircles.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/category/' + cat.name.toLowerCase().replace(/ /g, '-'))}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Circle */}
            <div
              className="w-20 h-20 md:w-28 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden transition-all duration-500 shadow-md group-hover:shadow-2xl"
              style={{
                border: '3px solid #D4AF37',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B1E3F')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
            >
              <img
                src={getImageUrl(cat.img)}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Name */}
            <p
              className="mt-2 md:mt-3 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.08em] text-center transition-colors"
              style={{ color: '#1E3A8A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#8B1E3F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1E3A8A')}
            >
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}