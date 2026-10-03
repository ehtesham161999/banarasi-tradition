import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../api/api'

export default function VideoReels({ products }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)

  const videoProducts = products.filter((p) => p.video)

  if (videoProducts.length === 0) return null

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollTop = containerRef.current.scrollTop
    const height = containerRef.current.clientHeight
    const index = Math.round(scrollTop / height)
    setCurrentIndex(index)
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <h2
        className="text-white text-2xl md:text-3xl lg:text-4xl font-serif text-center mb-6 md:mb-8 tracking-[0.1em]"
      >
        Shop the Look 🎥
      </h2>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[600px] md:h-[700px] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {videoProducts.map((p, idx) => (
          <div
            key={p._id}
            className="relative h-[600px] md:h-[700px] w-full snap-start flex items-center justify-center"
          >
            <video
              src={getImageUrl(p.video)}
              autoPlay={idx === currentIndex}
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-90"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

            {/* Product Info + Shop Now */}
            <div className="absolute bottom-12 md:bottom-16 left-4 md:left-12 right-4 md:right-12 flex items-end justify-between gap-4">
              <div className="flex-1">
                <p className="text-white text-lg md:text-2xl font-bold mb-2 line-clamp-2">
                  {p.name}
                </p>
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <span className="text-yellow-400 text-xl md:text-2xl font-bold">
                    ₹{p.price}
                  </span>
                  <span className="text-white/60 text-sm md:text-base line-through">
                    ₹{p.mrp}
                  </span>
                  <span className="bg-maroon-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round((1 - p.price / p.mrp) * 100)}% OFF
                  </span>
                </div>
                <p className="text-white/70 text-xs md:text-sm line-clamp-2 max-w-md">
                  {p.description}
                </p>
              </div>

              <button
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-yellow-400 text-maroon-700 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base uppercase tracking-[0.12em] hover:bg-yellow-300 transition-all duration-300 shadow-lg shrink-0"
              >
                Shop Now
              </button>
            </div>

            {/* Scroll Indicator */}
            {idx === 0 && videoProducts.length > 1 && (
              <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 text-xs flex flex-col items-center gap-2 animate-bounce">
                <span className="text-2xl">▲</span>
                <span className="font-bold tracking-wider">SCROLL</span>
                <span className="text-2xl">▼</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}