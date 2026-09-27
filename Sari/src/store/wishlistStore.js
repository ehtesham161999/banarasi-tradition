import { create } from 'zustand'

const getUserId = () => {
  let userId = localStorage.getItem('guestUserId')
  if (!userId) {
    userId = 'guest_' + Date.now() + '_' + Math.round(Math.random() * 1e9)
    localStorage.setItem('guestUserId', userId)
  }
  return userId
}

export const useWishlist = create((set, get) => ({
  items: [],

  loadWishlist: () => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      try {
        set({ items: JSON.parse(saved) })
      } catch (e) {
        set({ items: [] })
      }
    }
  },

  addToWishlist: (product) => {
    const state = get()
    const exists = state.items.find((i) => i._id === product._id)
    if (exists) return

    const newItems = [...state.items, product]
    set({ items: newItems })
    localStorage.setItem('wishlist', JSON.stringify(newItems))
  },

  removeFromWishlist: (id) => {
    const newItems = get().items.filter((i) => i._id !== id)
    set({ items: newItems })
    localStorage.setItem('wishlist', JSON.stringify(newItems))
  },

  isInWishlist: (id) => {
    return get().items.some((i) => i._id === id)
  },
}))