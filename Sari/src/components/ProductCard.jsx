import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <p className="text-sm truncate font-medium">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-bold text-sm">₹{product.price}</p>
          <p className="text-xs text-gray-500 line-through">₹{product.mrp}</p>
        </div>
      </div>
    </div>
  )
}