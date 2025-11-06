import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './AddToCartButton.module.css'

export const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
   const [status, setStatus] = useState('idle') 

  const handleAdd = () => {
    const isProductInCart = cartItems.some(item => item.id === product.id)

    if (isProductInCart) {
      setStatus('exists')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    dispatch(addToCart({ ...product, quantity: 1 }))
    setStatus('added')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div>
    <button
      onClick={handleAdd}
      className={`${styles.button} ${
        status === 'added' ? styles.added : ''
      } ${status === 'exists' ? styles.exists : ''}`}
    >
      {status === 'added'
        ? 'Added'
        : status === 'exists'
        ? 'Already in cart'
        : 'Add to cart'}
    </button>
    </div>
  )
}