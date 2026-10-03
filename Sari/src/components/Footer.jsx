import { Link } from 'react-router-dom'

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', path: '/' },
    { name: 'Contact Us', path: '/' },
    { name: 'FAQs', path: '/' },
    { name: 'Shipping Policy', path: '/' },
    { name: 'Return Policy', path: '/' },
    { name: 'Track Order', path: '/orders' },
  ]

  const categories = [
    { name: 'Sarees', path: '/category/saree' },
    { name: 'Kurta Sets', path: '/category/kurta-sets' },
    { name: 'Perfumes', path: '/category/perfumes' },
    { name: 'Sudathi Gold', path: '/category/sudathi-gold' },
    { name: 'Ready to Wear', path: '/category/ready-to-wear-sarees' },
    { name: 'Sarees Saturday', path: '/sarees-saturday' },
  ]

  const policies = [
    { name: 'Privacy Policy', path: '/' },
    { name: 'Terms & Conditions', path: '/' },
    { name: 'Cancellation Policy', path: '/' },
    { name: 'Bulk Orders', path: '/' },
  ]

  return (
    <footer className="bg-maroon-500 text-white mt-16">
      {/* Newsletter */}
      <div className="border-b border-maroon-600">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 tracking-wide">
            Stay Updated
          </h3>
          <p className="text-white/80 text-sm mb-5">
            Get 10% off on your first order + exclusive drops
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none"
            />
            <button className="bg-yellow-400 text-maroon-700 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-yellow-300 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2
              className="text-3xl mb-4 italic"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Banarasi
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              Premium handwoven sarees from the heart of Varanasi. Crafted with tradition, delivered with love.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {['📘', '📷', '🐦', '📌'].map((icon, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-lg">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-4 text-yellow-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-4 text-yellow-400">
              Shop By
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="text-sm text-white/80 hover:text-yellow-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-4 text-yellow-400">
              Policies
            </h4>
            <ul className="space-y-2.5">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <Link
                    to={policy.path}
                    className="text-sm text-white/80 hover:text-yellow-400 transition-colors"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 pt-8 border-t border-maroon-600 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📞</span>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider">Call Us</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider">Email</p>
              <p className="font-medium">support@banarasi.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider">Address</p>
              <p className="font-medium">Varanasi, Uttar Pradesh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-maroon-700 border-t border-maroon-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/70">
          <p>© 2026 Banarasi Tradition. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-400">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  )
}