import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function Celebrities() {
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-cream-100 animate-pulse" />
  }

  const { celebrities } = sections

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-8">
        <img
          src={getImageUrl(celebrities.banner)}
          alt="Loved by Celebrities"
          className="w-full h-[180px] md:h-[280px] lg:h-[340px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
          <div className="px-6 md:px-16">
            <p className="text-white text-xl md:text-3xl lg:text-4xl font-light drop-shadow-lg">
              Loved by
            </p>
            <h2 className="text-yellow-400 text-4xl md:text-6xl lg:text-7xl font-serif font-bold italic drop-shadow-2xl">
              Celebrities
            </h2>
          </div>
        </div>
      </div>

      {/* Celebrity Cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {celebrities.list.map((celeb, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={getImageUrl(celeb.img)}
              alt={celeb.name}
              className="w-full h-40 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2 md:p-3">
              <p className="text-white text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] text-center">
                {celeb.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}