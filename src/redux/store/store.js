import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../slices/filtersSlice'
import cartReducer from '../slices/cartSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer
  }
})