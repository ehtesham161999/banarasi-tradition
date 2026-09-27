import { create } from 'zustand'
import { getCart, saveCart } from '../api/api'

// Unique user ID (guest ke liye — localStorage mein save)
const getUserId = () => {
  let userId = localStorage.getItem('guestUserId')
  if (!userId) {
    userId = 'guest_' + Date.now() + '_' + Math.round(Math.random() * 1e9)
    localStorage.setItem('guestUserId', userId)
  }
  return userId
}

// Backend pe cart save karo (debounced)
let saveTimeout = null
const syncCart = (items) => {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveCart(getUserId(), items).catch((err) => console.error('Cart sync failed:', err))
  }, 500)
}

export const useCart = create((set, get) => ({
  items: [],
  loaded: false,

  // Backend se cart load karo
  loadCart: async () => {
    try {
      const res = await getCart(getUserId())
      set({ items: res.data.items || [], loaded: true })
    } catch (err) {
      console.error('Cart load failed:', err)
      set({ items: [], loaded: true })
    }
  },

  addItem: (product) => {
    const state = get()
    const exists = state.items.find((i) => i._id === product._id)

    let newItems
    if (exists) {
      newItems = state.items.map((i) =>
        i._id === product._id ? { ...i, qty: i.qty + 1 } : i
      )
    } else {
      newItems = [...state.items, { ...product, qty: 1 }]
    }

    set({ items: newItems })
    syncCart(newItems)
  },

  removeItem: (id) => {
    const newItems = get().items.filter((i) => i._id !== id)
    set({ items: newItems })
    syncCart(newItems)
  },

  decreaseQty: (id) => {
    const newItems = get()
      .items.map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0)
    set({ items: newItems })
    syncCart(newItems)
  },

  clearCart: () => {
    set({ items: [] })
    syncCart([])
  },
}))