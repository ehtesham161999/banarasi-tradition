import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, getImageUrl, getProducts, getReviews, createReview } from '../api/api'
import { useCart } from '../store/cartStore'
import { useWishlist } from '../store/wishlistStore'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useCart((state) => state.addItem)
  const { addToWishlist, isInWishlist, loadWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    loadWishlist()
  }, [])

  useEffect(() => {
    setLoading(true)
    getProduct(id)
      .then((res) => {
        setProduct(res.data)
        return getProducts()
      })
      .then((res) => {
        const relatedItems = res.data.filter((p) => p._id !== id).slice(0, 4)
        setRelated(relatedItems)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))

    getReviews(id)
      .then((res) => {
        setReviews(res.data.reviews)
        setAvgRating(res.data.avgRating)
        setTotalReviews(res.data.totalReviews)
      })
      .catch((err) => console.error(err))
  }, [id])

  if (loading) {
    return <div className="flex items-center justify-center h-96"><p className="text-gray-500">Loading...</p></div>
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">Product nahi mila</p>
        <button onClick={() => navigate('/')} className="bg-maroon-500 text-white px-6 py-2 rounded-lg">Home Pe Jao</button>
      </div>
    )
  }

  const discount = Math.round((1 - product.price / product.mrp) * 100)
  const gallery = [product.image, product.image, product.image, product.image]
  const savings = product.mrp - product.price

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
    navigate('/cart')
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
    navigate('/checkout')
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!newReview.userName || !newReview.comment) {
      alert('Name aur comment chahiye!')
      return
    }
    setSubmittingReview(true)
    try {
      await createReview({ ...newReview, productId: id })
      alert('✅ Review add ho gaya!')
      setNewReview({ userName: '', rating: 5, comment: '' })
      setShowReviewForm(false)
      const res = await getReviews(id)
      setReviews(res.data.reviews)
      setAvgRating(res.data.avgRating)
      setTotalReviews(res.data.totalReviews)
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSubmittingReview(false)
    }
  }

  return (
    <div className="pb-28 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 p-4 md:p-8">
        {/* ===== LEFT: IMAGE GALLERY ===== */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-cream-50 aspect-square">
            <img
              src={getImageUrl(gallery[selectedImage])}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-maroon-500 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
              {discount}% Off
            </span>
            <button
              onClick={() => addToWishlist(product)}
              className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
              aria-label="Wishlist"
            >
              <span className="text-lg">{isInWishlist(product._id) ? '❤️' : '🤍'}</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === selectedImage ? 'border-maroon-500' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={getImageUrl(img)} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Video */}
          {product.video && (
            <div className="mt-4 bg-black rounded-2xl overflow-hidden">
              <video src={getImageUrl(product.video)} controls className="w-full h-80 md:h-96 object-cover" />
            </div>
          )}
        </div>

        {/* ===== RIGHT: PRODUCT INFO ===== */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#8B1E3F' }}>
            {product.category}
          </p>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-lg">
              {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
            </span>
            <span className="text-sm text-gray-600">({avgRating}) · {totalReviews} reviews</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-maroon-500">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
            <span className="bg-green-100 text-green-700 text-xs md:text-sm font-bold px-2 py-1 rounded">
              {discount}% Off
            </span>
          </div>
          <p className="text-sm text-green-600 font-medium mb-4">You save ₹{savings}!</p>
          <p className="text-xs text-gray-500 mb-6">Inclusive of all taxes</p>

          <p className="text-sm mb-6">
            <span className="font-bold text-gray-700">Stock:</span>{' '}
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock ({product.stock})</span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Trust Icons */}
          <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-t border-b border-gray-200">
            <div className="text-center">
              <p className="text-2xl mb-1">💎</p>
              <p className="text-xs text-gray-600 font-medium">Genuine</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">🚚</p>
              <p className="text-xs text-gray-600 font-medium">Free Ship</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">↩️</p>
              <p className="text-xs text-gray-600 font-medium">Easy Return</p>
            </div>
          </div>

          {/* Buttons (Desktop) */}
          <div className="hidden md:flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-maroon-500 text-maroon-500 py-3.5 rounded-lg font-bold uppercase tracking-[0.1em] text-sm hover:bg-maroon-500 hover:text-white transition-all duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-maroon-500 text-white py-3.5 rounded-lg font-bold uppercase tracking-[0.1em] text-sm hover:bg-maroon-600 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-cream-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700"><span className="font-bold">📦 Delivery:</span> 3-5 business days</p>
            <p className="text-sm text-gray-700 mt-1"><span className="font-bold">💰 COD:</span> Available</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="px-4 md:px-8 mt-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.1em] ${
              activeTab === 'description'
                ? 'border-b-2 border-maroon-500 text-maroon-500'
                : 'text-gray-500'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.1em] ${
              activeTab === 'reviews'
                ? 'border-b-2 border-maroon-500 text-maroon-500'
                : 'text-gray-500'
            }`}
          >
            Reviews ({totalReviews})
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="text-gray-700 text-sm leading-relaxed">
              <p>{product.description || `Premium quality ${product.category} — perfect for weddings, festivals, and special occasions.`}</p>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>Pure {product.category} fabric</li>
                <li>Comes with matching blouse piece</li>
                <li>Handwoven with intricate zari work</li>
                <li>Perfect for festive and wedding wear</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6 pb-6 border-b">
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-maroon-500">{avgRating}</p>
                  <p className="text-yellow-500 text-lg">{'★'.repeat(Math.round(avgRating))}</p>
                  <p className="text-xs text-gray-500 mt-1">{totalReviews} reviews</p>
                </div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-maroon-500 text-white px-6 py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-maroon-600 transition-colors"
                >
                  {showReviewForm ? '✕ Cancel' : '+ Write Review'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="bg-cream-50 p-4 rounded-lg mb-6 space-y-3">
                  <input
                    type="text"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    placeholder="Aapka naam"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-3xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Aapka review..."
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-maroon-500 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Abhi koi review nahi hai. Pehla review aap likho!</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev._id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">{rev.userName}</span>
                        <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{rev.comment}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="px-4 md:px-8 mt-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 tracking-[0.1em] text-center"
            style={{ color: '#1E3A8A' }}
          >
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {related.map((p) => (
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
                    {Math.round((1 - p.price / p.mrp) * 100)}% Off
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 h-10">{p.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-maroon-500 text-sm md:text-base">₹{p.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STICKY BUTTONS (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-3 md:hidden z-40">
        <button
          onClick={handleAddToCart}
          className="flex-1 border-2 border-maroon-500 text-maroon-500 py-3 rounded-lg font-bold text-xs uppercase tracking-wider"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-maroon-500 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}