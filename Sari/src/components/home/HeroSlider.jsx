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
    }, 4000)
    return () => clearInterval(interval)
  }, [slides])

  if (loading || slides.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[550px] bg-gray-100 animate-pulse" />
    )
  }

  return (
    <section className="relative w-full h-[400px] md:h-[550px] overflow-hidden bg-gray-100">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={getImageUrl(slide.image)}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/1600x600?text=Hero' }}
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center">
            <h2 className="text-white text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-white text-lg md:text-xl mt-3 tracking-widest uppercase drop-shadow">
              {slide.subtitle}
            </p>
            <button
              onClick={() => navigate('/category/saree')}
              className="mt-6 bg-white text-maroon-500 px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-maroon-500 hover:text-white transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 transition-all ${
              idx === currentSlide ? 'w-10 bg-white' : 'w-6 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}