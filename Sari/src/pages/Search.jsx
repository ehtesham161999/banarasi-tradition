import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getProducts, getImageUrl } from '../api/api'

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data)
        setFiltered(res.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Search filter
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(products)
      return
    }

    const q = query.toLowerCase()
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    )
    setFiltered(results)
  }, [query, products])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="pb-20">
      {/* Search Header */}
      <section className="bg-cream-100 py-10 border-b border-cream-200">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-maroon-500 text-center mb-6">
            Search Products
          </h1>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Saree, Kurta, Silk..."
              className="w-full bg-white border border-gray-300 rounded-lg px-5 py-4 pr-14 focus:outline-none focus:border-maroon-500 text-base"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-maroon-500 text-white px-4 py-2 rounded-lg hover:bg-maroon-600 transition-colors"
            >
              🔍
            </button>
          </form>

          {query && (
            <p className="text-sm text-gray-600 mt-3 text-center">
              {filtered.length} results "{query}" ke liye
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-500 mb-2">Koi product nahi mila</p>
            <p className="text-sm text-gray-400 mb-6">
              Try: saree, silk, kurta, perfume
            </p>
            <button
              onClick={() => { setQuery(''); navigate('/search') }}
              className="bg-maroon-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Image' }}
                  />
                  <span className="absolute top-2 left-2 bg-maroon-500 text-white text-[10px] font-bold px-2 py-1 uppercase">
                    {Math.round((1 - p.price / p.mrp) * 100)}% Off
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {p.name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-maroon-500">₹{p.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}