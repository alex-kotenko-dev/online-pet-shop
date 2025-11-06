import axios from "axios"

const API = axios.create({
  baseURL: 'http://localhost:3333'
})

export const getCategories = () => API.get('/categories/all')
export const getProducts = () => API.get('/products/all')
export const getCategoryById = (id) => API.get(`/categories/${id}`)
export const getProductId = (productId) => API.get(`/products/${productId}`)

export const sendDiscountForm = (formData) => API.post('/sale/send', formData)
export const sendOrder = (orderData) => API.post('/order/send', orderData)