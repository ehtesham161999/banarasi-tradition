import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../api/api'

export default function VideoReels({ products }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)

  // Sirf woh products jinke video hai
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
    <section className="bg-black">
      <h2 className="text-white text-2xl md:text-3xl font-serif text-center pt-8 pb-4">
        Shop the Look 🎥
      </h2>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[600px] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {videoProducts.map((p, idx) => (
          <div
            key={p._id}
            className="relative h-[600px] w-full snap-start flex items-center justify-center"
          >
            {/* Video */}
            <video
              src={getImageUrl(p.video)}
              autoPlay={idx === currentIndex}
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Product Info + Shop Now */}
            <div className="absolute bottom-8 left-4 right-4 flex items-end justify-between">
              <div className="flex-1">
                <p className="text-white text-lg font-bold">{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400 text-xl font-bold">
                    ₹{p.price}
                  </span>
                  <span className="text-white/60 text-sm line-through">
                    ₹{p.mrp}
                  </span>
                </div>
                <p className="text-white/70 text-xs mt-1 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <button
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-yellow-400 text-maroon-700 px-5 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-yellow-300 transition-colors shrink-0 ml-4"
              >
                Shop Now
              </button>
            </div>

            {/* Scroll Indicator */}
            {idx === 0 && videoProducts.length > 1 && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 text-xs flex flex-col items-center gap-2 animate-bounce">
                <span>▲</span>
                <span>Scroll</span>
                <span>▼</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}