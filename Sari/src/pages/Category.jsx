import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProducts, getImageUrl } from '../api/api'
import { useWishlist } from '../store/wishlistStore'

export default function Category() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [showFilter, setShowFilter] = useState(false)

  const { addToWishlist, isInWishlist, loadWishlist } = useWishlist()

  useEffect(() => {
    loadWishlist()
  }, [])

  const categoryName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  useEffect(() => {
    setLoading(true)
    getProducts()
      .then((res) => {
        let items = res.data
        const catLower = slug.toLowerCase()

        if (catLower.includes('silk')) items = items.filter((p) => p.category === 'silk')
        else if (catLower.includes('cotton')) items = items.filter((p) => p.category === 'cotton')
        else if (catLower.includes('kurta')) items = items.filter((p) => p.category === 'kurta')
        else if (catLower.includes('perfume')) items = items.filter((p) => p.category === 'perfume')
        else if (catLower.includes('gold')) items = items.filter((p) => p.category === 'gold')
        else if (catLower.includes('georgette')) items = items.filter((p) => p.category === 'georgette')

        setProducts(items)
        setFiltered(items)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    let result = [...products]
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'discount') {
      result.sort((a, b) => {
        const dA = (1 - a.price / a.mrp) * 100
        const dB = (1 - b.price / b.mrp) * 100
        return dB - dA
      })
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFiltered(result)
  }, [products, sortBy, priceRange])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-cream-100 py-10 text-center border-b border-cream-200">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-maroon-500">
          {categoryName}
        </h1>
        <p className="text-gray-600 mt-2 text-sm">{filtered.length} products</p>
      </section>

      {/* Filter + Sort Bar */}
      <section className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-3 border-b border-gray-200">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-maroon-500"
        >
          🔍 {showFilter ? 'Hide' : 'Show'} Filters
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-maroon-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </section>

      {/* Filter Panel */}
      {showFilter && (
        <section className="max-w-7xl mx-auto px-4 py-4 bg-cream-50 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Price Range</h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-24 border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Min"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-24 border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Max"
            />
            <button
              onClick={() => setPriceRange([0, 10000])}
              className="text-maroon-500 text-sm hover:underline"
            >
              Reset
            </button>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="text-gray-500 mb-4">Koi product nahi hai</p>
            <button
              onClick={() => navigate('/')}
              className="bg-maroon-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Home Pe Jao
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => {
              const discount = Math.round((1 - p.price / p.mrp) * 100)
              return (
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
                    />
                    <span className="absolute top-2 left-2 bg-maroon-500 text-white text-[10px] font-bold px-2 py-1 uppercase">
                      {discount}% Off
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToWishlist(p)
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-50"
                    >
                      {isInWishlist(p._id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                      {p.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-maroon-500">₹{p.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                    </div>
                    <div className="text-xs text-yellow-500 mt-1">★★★★★</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}