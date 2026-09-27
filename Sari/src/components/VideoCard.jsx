import { useNavigate } from 'react-router-dom'

export default function VideoCard({ product }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative w-40 h-64 rounded-xl overflow-hidden shrink-0 cursor-pointer bg-black"
    >
      <video
        src={product.video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-90"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
        <p className="text-white text-xs font-medium truncate">{product.name}</p>
        <p className="text-white text-sm font-bold">₹{product.price}</p>
      </div>
    </div>
  )
}