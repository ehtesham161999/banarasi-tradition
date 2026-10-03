import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// ===== IMAGE URL HELPER =====
export const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/300x400?text=No+Image'
  if (path.startsWith('http') || path.startsWith('data:')) return path
  return `http://localhost:5000${path}`
}

// ===== PRODUCTS =====
export const getProducts = () => API.get('/products')
export const getProduct = (id) => API.get(`/products/${id}`)

// ===== ORDERS =====
export const createOrder = (data) => API.post('/orders', data)
export const getOrders = () => API.get('/orders')
export const updateOrderStatus = (id, orderStatus) =>
  API.put(`/orders/${id}`, { orderStatus })

// ===== DASHBOARD STATS =====
export const getDashboardStats = () => API.get('/orders/stats/dashboard')

// ===== PAYMENT =====
export const createRazorpayOrder = (amount) =>
  API.post('/payment/create-order', { amount })
export const verifyPayment = (data) => API.post('/payment/verify', data)

// ===== HERO SLIDER =====
export const getHeroSlides = () => API.get('/admin/hero')
export const updateHeroSlides = (slides) => API.put('/admin/hero', { slides })

// ===== HOME SECTIONS =====
export const getHomeSections = () => API.get('/admin/home-sections')
export const updateHomeSections = (sections) =>
  API.put('/admin/home-sections', sections)

// ===== WEEKLY DROP =====
export const getWeeklyDrop = () => API.get('/admin/weekly-drop')
export const updateWeeklyDrop = (data) => API.put('/admin/weekly-drop', data)

// ===== AUTH =====
export const userRegister = (data) => API.post('/auth/register', data)
export const userLogin = (email, password) =>
  API.post('/auth/login', { email, password })

// ===== REVIEWS =====
export const getReviews = (productId) => API.get(`/reviews/${productId}`)
export const createReview = (data) => API.post('/reviews', data)

// ===== CART =====
export const getCart = (userId) => API.get(`/cart/${userId}`)
export const saveCart = (userId, items) =>
  API.post(`/cart/${userId}`, { items })

// ===== ADMIN AUTH =====
export const adminLogin = (username, password) =>
  API.post('/admin-auth/login', { username, password })
export const adminSetup = (username, password) =>
  API.post('/admin-auth/setup', { username, password })

// ===== ADMIN =====
export const adminCreateProduct = (formData) =>
  API.post('/admin/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const adminUpdateProduct = (id, formData) =>
  API.put(`/admin/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const adminDeleteProduct = (id) => API.delete(`/admin/products/${id}`)

export const uploadFile = (formData) =>
  API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export default API