import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Category from './pages/Category'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyOrders from './pages/MyOrders'
// Admin
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AddProduct from './pages/Admin/AddProduct'
import AdminHero from './pages/Admin/AdminHero'
import AdminHome from './pages/Admin/AdminHome'
import AdminOrders from './pages/Admin/AdminOrders'

import { useAuth } from './store/authStore'
import { useCart } from './store/cartStore'

// Protected Route Wrapper
function RequireAuth({ children }) {
  const isAdmin = useAuth((state) => state.isAdmin)
  return isAdmin ? children : <Navigate to="/admin" replace />
}

export default function App() {
  const loadCart = useCart((state) => state.loadCart)

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <Routes>
      {/* ===== ADMIN ROUTES (Sabse Pehle) ===== */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="home-sections" element={<AdminHome />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      {/* ===== CUSTOMER ROUTES (Baad Mein) ===== */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/orders" element={<MyOrders />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  )
}