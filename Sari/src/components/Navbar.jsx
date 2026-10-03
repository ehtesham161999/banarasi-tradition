import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartStore'

export default function Navbar() {
  const navigate = useNavigate()
  const items = useCart((state) => state.items)
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuRow1 = [
    { name: 'Saree', slug: 'saree' },
    { name: 'Silk Saree Sale', slug: 'silk-saree-sale' },
    { name: 'Ready to Wear Sarees', slug: 'ready-to-wear-sarees' },
    { name: 'Kurta Sets', slug: 'kurta-sets' },
    { name: 'Perfumes', slug: 'perfumes' },
    { name: 'Sudathi Gold', slug: 'sudathi-gold' },
  ]

  const menuRow2 = [
    { name: 'Indian Heritage', slug: 'indian-heritage' },
    { name: 'Sarees Saturday', slug: 'sarees-saturday' },
    { name: 'Stars Ka Parivaar', slug: 'stars-ka-parivaar' },
    { name: 'Tyohaar Sarees', slug: 'tyohaar-sarees' },
    { name: 'Karwa Chauth', slug: 'karwa-chauth' },
  ]

  const handleMenuClick = (slug) => {
    navigate(`/category/${slug}`)
    setMobileOpen(false)
  }

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-800 p-2"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
            <h1
              className="text-3xl md:text-4xl leading-none"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#1E3A8A',
              }}
            >
              Banarasi
            </h1>
          </Link>

          {/* Center Menu (Desktop) */}
          <div className="hidden lg:flex flex-col gap-2 flex-1 justify-center items-center">
            <div className="flex items-center gap-7">
              {menuRow1.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleMenuClick(item.slug)}
                  className="text-[12px] font-bold uppercase tracking-[0.08em] transition-colors whitespace-nowrap cursor-pointer"
                  style={{ color: '#1E3A8A' }}
                  onMouseEnter={(e) => (e.target.style.color = '#8B1E3F')}
                  onMouseLeave={(e) => (e.target.style.color = '#1E3A8A')}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-7">
              {menuRow2.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleMenuClick(item.slug)}
                  className="text-[12px] font-bold uppercase tracking-[0.08em] transition-colors whitespace-nowrap cursor-pointer"
                  style={{ color: '#1E3A8A' }}
                  onMouseEnter={(e) => (e.target.style.color = '#8B1E3F')}
                  onMouseLeave={(e) => (e.target.style.color = '#1E3A8A')}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-5 shrink-0">
            {/* Search */}
            <button
              onClick={() => navigate('/search')}
              className="text-gray-800 hover:text-maroon-500 transition-colors cursor-pointer p-1"
              aria-label="Search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* User */}
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-800 hover:text-maroon-500 transition-colors cursor-pointer p-1"
              aria-label="Profile"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative text-gray-800 hover:text-maroon-500 transition-colors cursor-pointer p-1"
              aria-label="Cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-maroon-500 text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {[...menuRow1, ...menuRow2].map((item) => (
              <button
                key={item.slug}
                onClick={() => handleMenuClick(item.slug)}
                className="block w-full text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider rounded-lg hover:bg-cream-100 transition-colors"
                style={{ color: '#1E3A8A' }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}