import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartStore'

export default function Navbar() {
  const navigate = useNavigate()
  const items = useCart((state) => state.items)
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

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

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h1
            className="text-4xl text-maroon-500 leading-none"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontStyle: 'italic' }}
          >
            Banarasi
          </h1>
        </Link>

        {/* Center Menu */}
        <div className="hidden lg:flex flex-col gap-1 flex-1 justify-center items-center">
          <div className="flex items-center gap-6">
            {menuRow1.map((item) => (
              <button
                key={item.slug}
                onClick={() => navigate(`/category/${item.slug}`)}
                className="text-[11px] font-bold uppercase tracking-wider text-gray-900 hover:text-maroon-500 transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {menuRow2.map((item) => (
              <button
                key={item.slug}
                onClick={() => navigate(`/category/${item.slug}`)}
                className="text-[11px] font-bold uppercase tracking-wider text-gray-900 hover:text-maroon-500 transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Search */}
          <button
            onClick={() => navigate('/search')}
            className="text-gray-800 hover:text-maroon-500 transition-colors cursor-pointer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* User */}
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-800 hover:text-maroon-500 transition-colors cursor-pointer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            className="relative text-gray-800 hover:text-maroon-500 transition-colors cursor-pointer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-maroon-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}