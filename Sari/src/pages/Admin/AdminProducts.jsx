import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, adminDeleteProduct, getImageUrl } from '../../api/api'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`"${name}" delete karna hai?`)) return

    try {
      await adminDeleteProduct(id)
      setProducts(products.filter((p) => p._id !== id))
      alert('Product delete ho gaya!')
    } catch (err) {
      alert('Delete nahi hua: ' + err.message)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <Link
          to="/admin/add-product"
          className="bg-maroon-500 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-maroon-600 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase text-gray-500">Image</th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase text-gray-500">Name</th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase text-gray-500">Price</th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase text-gray-500">Category</th>
              <th className="text-right px-6 py-4 text-xs font-bold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100?text=No+Image'
                    }}
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="font-bold text-maroon-500">₹{p.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-2">₹{p.mrp}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                  {p.category}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(p._id, p.name)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-8 text-center text-gray-400">Koi product nahi hai</p>
        )}
      </div>
    </div>
  )
}