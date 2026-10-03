import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHeroSlides, getImageUrl } from '../../api/api'

export default function HeroSlider() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHeroSlides()
      .then((res) => setSlides(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides])

  if (loading || slides.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[550px] bg-cream-100 animate-pulse" />
    )
  }

  return (
    <section className="relative w-full h-[400px] md:h-[550px] lg:h-[600px] overflow-hidden bg-gray-100">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={getImageUrl(slide.image)}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-yellow-400 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-3 md:mb-4">
              New Collection
            </p>
            <h2 className="text-white text-3xl md:text-5xl lg:text-7xl font-serif font-bold drop-shadow-2xl mb-3 md:mb-4 max-w-4xl leading-tight">
              {slide.title}
            </h2>
            <p className="text-white/90 text-sm md:text-lg tracking-[0.2em] uppercase drop-shadow-lg mb-6 md:mb-8">
              {slide.subtitle}
            </p>
            <button
              onClick={() => navigate('/category/saree')}
              className="bg-white text-maroon-500 px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-maroon-500 hover:text-white transition-all duration-300 shadow-lg"
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 md:gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 ${
              idx === currentSlide
                ? 'w-10 md:w-12 h-1 bg-white'
                : 'w-6 md:w-8 h-1 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrow Buttons (Desktop) */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-12 h-12 rounded-full items-center justify-center transition-all z-10"
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-12 h-12 rounded-full items-center justify-center transition-all z-10"
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  )
}