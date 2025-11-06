import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [] 
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const quantityToAdd = product.quantity ?? 1
      const existingItem = state.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantityToAdd
      } else {
        state.items.push({ ...product, quantity: quantityToAdd })
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },

    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = state => state.cart.items

export const selectTotalCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalPrice = state =>
  state.cart.items.reduce(
    (sum, item) => sum + (item.discont_price > 0 ? item.discont_price : item.price) * item.quantity,
    0
  )