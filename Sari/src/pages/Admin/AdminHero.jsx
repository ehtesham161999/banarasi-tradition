import { useState, useEffect } from 'react'
import { getHeroSlides, updateHeroSlides, getImageUrl } from '../../api/api'

export default function AdminHero() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getHeroSlides()
      .then((res) => setSlides(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (idx, field, value) => {
    const updated = [...slides]
    updated[idx][field] = value
    setSlides(updated)
  }

  const handleImageUpload = (idx, file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const updated = [...slides]
      updated[idx].image = reader.result
      setSlides(updated)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateHeroSlides(slides)
      alert('✅ Hero slides update ho gaye!')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAddSlide = () => {
    setSlides([
      ...slides,
      {
        image: 'https://via.placeholder.com/1600x600?text=New+Slide',
        title: 'New Slide',
        subtitle: 'Subtitle',
      },
    ])
  }

  const handleRemoveSlide = (idx) => {
    if (slides.length <= 1) {
      alert('Kam se kam 1 slide hona chahiye!')
      return
    }
    setSlides(slides.filter((_, i) => i !== idx))
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hero Slider</h1>
        <div className="flex gap-3">
          <button
            onClick={handleAddSlide}
            className="border-2 border-maroon-500 text-maroon-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-maroon-500 hover:text-white transition-colors"
          >
            + Add Slide
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-maroon-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-maroon-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Slide {idx + 1}</h3>
              {slides.length > 1 && (
                <button
                  onClick={() => handleRemoveSlide(idx)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Preview */}
            <div className="mb-4">
              <img
                src={getImageUrl(slide.image)}
                alt={slide.title}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300?text=Hero' }}
              />
            </div>

            {/* Upload New Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files[0] && handleImageUpload(idx, e.target.files[0])
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-maroon-500 file:text-white file:font-semibold"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ya niche URL paste karo:
              </p>
              <input
                type="text"
                value={slide.image.startsWith('data:') ? '' : slide.image}
                onChange={(e) => handleChange(idx, 'image', e.target.value)}
                placeholder="Image URL (ya upar se upload karo)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mt-1"
              />
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleChange(idx, 'title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-maroon-500"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={slide.subtitle}
                onChange={(e) => handleChange(idx, 'subtitle', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-maroon-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}