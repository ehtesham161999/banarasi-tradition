import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminCreateProduct } from '../../api/api'

export default function AddProduct() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    price: '',
    mrp: '',
    category: 'silk',
    description: '',
    stock: '10',
  })
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleVideo = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideo(file)
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      alert('Photo choose karo!')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('price', form.price)
      formData.append('mrp', form.mrp)
      formData.append('category', form.category)
      formData.append('description', form.description)
      formData.append('stock', form.stock)
      formData.append('image', image)
      if (video) formData.append('video', video)

      await adminCreateProduct(formData)
      alert('✅ Product add ho gaya!')
      navigate('/admin/products')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl pb-20">
      <h1
        className="text-2xl md:text-3xl font-bold mb-6 tracking-[0.05em]"
        style={{ color: '#1E3A8A' }}
      >
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5 border border-gray-100">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Banarasi Silk Saree - Red"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500 text-sm"
            required
          />
        </div>

        {/* Price + MRP */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Selling Price (₹) *
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="1299"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              MRP (₹) *
            </label>
            <input
              type="number"
              value={form.mrp}
              onChange={(e) => setForm({ ...form, mrp: e.target.value })}
              placeholder="2999"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500 text-sm"
              required
            />
          </div>
        </div>

        {/* Category + Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500 text-sm"
            >
              <option value="silk">Silk</option>
              <option value="cotton">Cotton</option>
              <option value="georgette">Georgette</option>
              <option value="kurta">Kurta Sets</option>
              <option value="perfume">Perfumes</option>
              <option value="gold">Gold</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Stock
            </label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500 text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="3"
            placeholder="Product ki details..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-maroon-500 text-sm"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
            Product Photo * (JPG, PNG)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-maroon-500 file:text-white file:font-bold file:uppercase file:tracking-wider file:text-xs hover:file:bg-maroon-600 cursor-pointer"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-32 h-40 object-cover rounded-lg border shadow-sm"
            />
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
            Product Video (MP4, optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideo}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold-500 file:text-white file:font-bold file:uppercase file:tracking-wider file:text-xs hover:file:bg-gold-600 cursor-pointer"
          />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="mt-3 w-48 rounded-lg border shadow-sm"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-maroon-500 text-white py-4 rounded-lg font-bold uppercase tracking-[0.1em] text-sm hover:bg-maroon-600 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Saving...' : '✅ Save Product'}
        </button>
      </form>
    </div>
  )
}