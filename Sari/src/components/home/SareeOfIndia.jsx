import { useNavigate } from 'react-router-dom'
import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function SareeOfIndia() {
  const navigate = useNavigate()
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-cream-100 animate-pulse" />
  }

  const { sareeOfIndia } = sections

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <h2
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 tracking-[0.1em]"
        style={{ color: '#1E3A8A' }}
      >
        SAREES OF INDIA
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {sareeOfIndia.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/category/' + cat.name.toLowerCase().replace(/ /g, '-'))}
            className="cursor-pointer group"
          >
            {/* Mehrab Card */}
            <div
              className="relative overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500"
              style={{
                borderRadius: '120px 120px 12px 12px',
                border: '2px solid #D4AF37',
                padding: '4px',
                background: '#FFF9EE',
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: '116px 116px 8px 8px' }}
              >
                <img
                  src={getImageUrl(cat.img)}
                  alt={cat.name}
                  className="w-full h-72 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12 pb-4 text-center">
                  <p
                    className="text-yellow-300 text-base md:text-lg lg:text-xl font-semibold drop-shadow-lg"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {cat.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}