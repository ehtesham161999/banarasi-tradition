import { create } from 'zustand'

export const useAuth = create((set) => ({
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  username: localStorage.getItem('adminUsername') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),

  login: (username) => {
    localStorage.setItem('isAdmin', 'true')
    localStorage.setItem('adminUsername', username)
    set({ isAdmin: true, username })
  },

  logout: () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminUsername')
    set({ isAdmin: false, username: '' })
  },

  userLogin: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },

  userLogout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },
}))