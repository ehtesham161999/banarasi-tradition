import { useState, useEffect } from 'react'
import { getHomeSections, updateHomeSections, getImageUrl } from '../../api/api'

export default function AdminHome() {
  const [sections, setSections] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getHomeSections()
      .then((res) => setSections(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // ===== Array Item Handlers =====
  const handleArrayItemChange = (sectionKey, idx, field, value) => {
    const updated = { ...sections }
    updated[sectionKey][idx][field] = value
    setSections(updated)
  }

  const handleArrayImageUpload = (sectionKey, idx, file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const updated = { ...sections }
      updated[sectionKey][idx].img = reader.result
      setSections(updated)
    }
    reader.readAsDataURL(file)
  }

  const handleAddItem = (sectionKey, defaultItem) => {
    const updated = { ...sections }
    updated[sectionKey] = [...updated[sectionKey], defaultItem]
    setSections(updated)
  }

  const handleRemoveItem = (sectionKey, idx) => {
    if (sections[sectionKey].length <= 1) {
      alert('Kam se kam 1 item hona chahiye!')
      return
    }
    const updated = { ...sections }
    updated[sectionKey] = updated[sectionKey].filter((_, i) => i !== idx)
    setSections(updated)
  }

  // ===== Trending Handlers =====
  const handleTrendingChange = (field, value) => {
    setSections({
      ...sections,
      trendingNow: { ...sections.trendingNow, [field]: value },
    })
  }

  const handleTrendingImageUpload = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      setSections({
        ...sections,
        trendingNow: { ...sections.trendingNow, image: reader.result },
      })
    }
    reader.readAsDataURL(file)
  }

  // ===== Celebrity Handlers =====
  const handleCelebrityBannerUpload = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      setSections({
        ...sections,
        celebrities: { ...sections.celebrities, banner: reader.result },
      })
    }
    reader.readAsDataURL(file)
  }

  const handleAddCelebrity = () => {
    const updated = { ...sections }
    updated.celebrities.list = [
      ...updated.celebrities.list,
      { name: 'NEW CELEBRITY', img: 'https://via.placeholder.com/400?text=New' },
    ]
    setSections(updated)
  }

  const handleRemoveCelebrity = (idx) => {
    if (sections.celebrities.list.length <= 1) {
      alert('Kam se kam 1 celebrity honi chahiye!')
      return
    }
    const updated = { ...sections }
    updated.celebrities.list = updated.celebrities.list.filter((_, i) => i !== idx)
    setSections(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateHomeSections(sections)
      alert('✅ Home sections update ho gaye!')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!sections) return <div className="p-8 text-center">No data</div>

  return (
    <div className="p-8 max-w-5xl pb-32">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 py-4 z-10">
        <h1 className="text-3xl font-bold text-gray-800">Home Sections</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-maroon-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : '💾 Save All'}
        </button>
      </div>

      {/* ===== TOP CATEGORIES ===== */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">📁 Top Categories</h2>
          <button
            onClick={() =>
              handleAddItem('topCategories', {
                name: 'NEW CATEGORY',
                img: 'https://via.placeholder.com/400?text=New',
              })
            }
            className="bg-maroon-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-maroon-600"
          >
            ➕ Add
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.topCategories.map((cat, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 relative">
              <button
                onClick={() => handleRemoveItem('topCategories', idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold z-10"
              >
                ✕
              </button>
              <img
                src={getImageUrl(cat.img)}
                alt={cat.name}
                className="w-full h-40 object-cover rounded mb-2"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No' }}
              />
              <input
                type="text"
                value={cat.name}
                onChange={(e) => handleArrayItemChange('topCategories', idx, 'name', e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm mb-2"
                placeholder="Category name"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleArrayImageUpload('topCategories', idx, e.target.files[0])}
                className="w-full text-xs file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-2 file:py-1"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRENDING NOW ===== */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 Trending Now</h2>
        <img
          src={getImageUrl(sections.trendingNow.image)}
          alt="Trending"
          className="w-full h-48 object-cover rounded mb-3"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300?text=No' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files[0] && handleTrendingImageUpload(e.target.files[0])}
          className="w-full text-sm mb-3 file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-4 file:py-2"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={sections.trendingNow.line1}
            onChange={(e) => handleTrendingChange('line1', e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            placeholder="Line 1"
          />
          <input
            type="text"
            value={sections.trendingNow.line2}
            onChange={(e) => handleTrendingChange('line2', e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            placeholder="Line 2"
          />
          <input
            type="text"
            value={sections.trendingNow.line3}
            onChange={(e) => handleTrendingChange('line3', e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            placeholder="Line 3"
          />
          <input
            type="text"
            value={sections.trendingNow.price}
            onChange={(e) => handleTrendingChange('price', e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            placeholder="Price text"
          />
        </div>
      </section>

      {/* ===== CELEBRITIES ===== */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">⭐ Celebrities</h2>
          <button
            onClick={handleAddCelebrity}
            className="bg-maroon-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-maroon-600"
          >
            ➕ Add
          </button>
        </div>
        <img
          src={getImageUrl(sections.celebrities.banner)}
          alt="Celebrities Banner"
          className="w-full h-40 object-cover rounded mb-3"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300?text=No' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files[0] && handleCelebrityBannerUpload(e.target.files[0])}
          className="w-full text-sm mb-4 file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-4 file:py-2"
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {sections.celebrities.list.map((celeb, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-2 relative">
              <button
                onClick={() => handleRemoveCelebrity(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] font-bold z-10"
              >
                ✕
              </button>
              <img
                src={getImageUrl(celeb.img)}
                alt={celeb.name}
                className="w-full h-32 object-cover rounded mb-2"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No' }}
              />
              <input
                type="text"
                value={celeb.name}
                onChange={(e) => {
                  const updated = { ...sections }
                  updated.celebrities.list[idx].name = e.target.value
                  setSections(updated)
                }}
                className="w-full border rounded px-2 py-1 text-xs mb-1"
                placeholder="Name"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (!e.target.files[0]) return
                  const reader = new FileReader()
                  reader.onload = () => {
                    const updated = { ...sections }
                    updated.celebrities.list[idx].img = reader.result
                    setSections(updated)
                  }
                  reader.readAsDataURL(e.target.files[0])
                }}
                className="w-full text-[10px] file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-1 file:py-1"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== SAREE STORE ===== */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">🏬 Saree Store</h2>
          <button
            onClick={() =>
              handleAddItem('sareeStore', {
                name: 'NEW',
                label: 'NEW LABEL',
                img: 'https://via.placeholder.com/400?text=New',
                slug: 'new',
              })
            }
            className="bg-maroon-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-maroon-600"
          >
            ➕ Add
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.sareeStore.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 relative">
              <button
                onClick={() => handleRemoveItem('sareeStore', idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold z-10"
              >
                ✕
              </button>
              <img
                src={getImageUrl(item.img)}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No' }}
              />
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleArrayItemChange('sareeStore', idx, 'name', e.target.value)}
                className="w-full border rounded px-2 py-1 text-xs mb-1"
                placeholder="Name"
              />
              <input
                type="text"
                value={item.label}
                onChange={(e) => handleArrayItemChange('sareeStore', idx, 'label', e.target.value)}
                className="w-full border rounded px-2 py-1 text-xs mb-1"
                placeholder="Label"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleArrayImageUpload('sareeStore', idx, e.target.files[0])}
                className="w-full text-[10px] file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-1 file:py-1"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== SAREES OF INDIA ===== */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">🇮🇳 Sarees of India</h2>
          <button
            onClick={() =>
              handleAddItem('sareeOfIndia', {
                name: 'New Saree',
                img: 'https://via.placeholder.com/400?text=New',
              })
            }
            className="bg-maroon-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-maroon-600"
          >
            ➕ Add
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.sareeOfIndia.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 relative">
              <button
                onClick={() => handleRemoveItem('sareeOfIndia', idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold z-10"
              >
                ✕
              </button>
              <img
                src={getImageUrl(item.img)}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No' }}
              />
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleArrayItemChange('sareeOfIndia', idx, 'name', e.target.value)}
                className="w-full border rounded px-2 py-1 text-xs mb-1"
                placeholder="Name"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleArrayImageUpload('sareeOfIndia', idx, e.target.files[0])}
                className="w-full text-[10px] file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-1 file:py-1"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORY CIRCLES ===== */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">⭕ Category Circles</h2>
          <button
            onClick={() =>
              handleAddItem('categoryCircles', {
                name: 'New',
                img: 'https://via.placeholder.com/200?text=New',
              })
            }
            className="bg-maroon-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-maroon-600"
          >
            ➕ Add
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {sections.categoryCircles.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 text-center relative">
              <button
                onClick={() => handleRemoveItem('categoryCircles', idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] font-bold z-10"
              >
                ✕
              </button>
              <img
                src={getImageUrl(item.img)}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No' }}
              />
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleArrayItemChange('categoryCircles', idx, 'name', e.target.value)}
                className="w-full border rounded px-2 py-1 text-xs mb-1"
                placeholder="Name"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleArrayImageUpload('categoryCircles', idx, e.target.files[0])}
                className="w-full text-[10px] file:bg-maroon-500 file:text-white file:border-0 file:rounded file:px-1 file:py-1"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== SAVE BUTTON (Bottom) ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end z-20">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-maroon-500 text-white px-12 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>
    </div>
  )
}