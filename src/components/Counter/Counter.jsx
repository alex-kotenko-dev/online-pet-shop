import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateQuantity } from "../../redux/slices/cartSlice"
import styles from './Counter.module.css'

export const Counter = ({ product, min = 1, max = 99 }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(state => state.cart.items.find(i => i.id === product.id))

  const [count, setCount] = useState(cartItem?.quantity || 1)

  useEffect(() => {
    if (cartItem) setCount(cartItem.quantity)
  }, [cartItem])

  const increment = () => {
    if (count < max) {
      const newCount = count + 1
      setCount(newCount)
      dispatch(updateQuantity({ id: product.id, quantity: newCount }))
    }
  }

  const decrement = () => {
    if (count > min) {
      const newCount = count - 1
      setCount(newCount)
      dispatch(updateQuantity({ id: product.id, quantity: newCount }))
    }
  }

  return (
    <div className={styles.counter}>
      <button className={styles.btn} onClick={decrement}>-</button>
      <span className={styles.value}>{count}</span>
      <button className={styles.btn} onClick={increment}>+</button>
    </div>
  )
}