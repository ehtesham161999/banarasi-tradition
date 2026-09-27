export default function TrustBar() {
  const items = [
    { icon: '✨', text: '3,000+ Styles' },
    { icon: '💎', text: 'Genuine Quality' },
    { icon: '🚚', text: 'Free Shipping' },
    { icon: '↩️', text: 'Easy Returns' },
  ]

  return (
    <section className="bg-cream-100 py-4 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700">
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}