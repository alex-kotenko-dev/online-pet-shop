import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sort: '',       
  priceFrom: '',
  priceTo: '',
  discounted: false
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSort: (state, action) => { state.sort = action.payload },
    setPriceFrom: (state, action) => { state.priceFrom = action.payload },
    setPriceTo: (state, action) => { state.priceTo = action.payload },
    setDiscounted: (state, action) => { state.discounted = action.payload },
    resetFilters: (state) => {
      state.sort = ''
      state.priceFrom = ''
      state.priceTo = ''
      state.discounted = false
    }
  }
})

export const { setSort, setPriceFrom, setPriceTo, setDiscounted, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer