import { useHomeSections } from '../../hooks/useHomeSections'
import { getImageUrl } from '../../api/api'

export default function Celebrities() {
  const { sections, loading } = useHomeSections()

  if (loading || !sections) {
    return <div className="h-96 bg-gray-100 animate-pulse" />
  }

  const { celebrities } = sections

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
        <img
          src={getImageUrl(celebrities.banner)}
          alt="Loved by Celebrities"
          className="w-full h-[220px] md:h-[320px] object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/1600x400?text=Celebrities' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent flex items-center">
          <div className="px-8 md:px-16">
            <p className="text-white text-2xl md:text-4xl font-light drop-shadow-lg">Loved by</p>
            <h2 className="text-yellow-400 text-5xl md:text-7xl font-serif font-bold italic drop-shadow-lg">
              Celebrities
            </h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
        {celebrities.list.map((celeb, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src={getImageUrl(celeb.img)}
              alt={celeb.name}
              className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
              <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wider text-center">
                {celeb.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}