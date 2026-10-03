import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeeklyDrop, getImageUrl, getProducts } from '../api/api'

export default function SareesSaturday() {
  const navigate = useNavigate()
  const [drop, setDrop] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    Promise.all([getWeeklyDrop(), getProducts()])
      .then(([dropRes, prodRes]) => {
        setDrop(dropRes.data)
        setProducts(prodRes.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!drop?.nextDrop) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(drop.nextDrop).getTime()
      const diff = target - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [drop])

  if (loading) {
    return <div className="flex items-center justify-center h-96"><p className="text-gray-500">Loading...</p></div>
  }

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={getImageUrl(drop?.bannerImage)}
          alt="Sarees Saturday"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <p className="text-yellow-400 text-lg md:text-xl font-bold uppercase tracking-widest mb-2">
            {drop?.title || 'Sarees Saturday'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
            {drop?.subtitle || 'Har Saturday 100+ Naye Sarees'}
          </h1>

          <div className="flex gap-3 md:gap-4 mt-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white/20 backdrop-blur-md rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
                <p className="text-2xl md:text-4xl font-bold text-white">
                  {String(item.value).padStart(2, '0')}
                </p>
                <p className="text-[10px] md:text-xs text-white/80 uppercase tracking-wider mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 bg-yellow-400 text-maroon-700 px-8 py-3 text-sm md:text-base font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-10 px-4 max-w-7xl mx-auto">
        <h2
          className="text-center text-2xl md:text-4xl font-bold mb-8 md:mb-10 tracking-[0.1em]"
          style={{ color: '#1E3A8A' }}
        >
          THIS WEEK'S DROP
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {products.map((p) => {
            const discount = Math.round((1 - p.price / p.mrp) * 100)
            return (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-2 left-2 bg-maroon-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    {discount}% Off
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 h-10 leading-tight">
                    {p.name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-maroon-500 text-sm md:text-base">₹{p.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}