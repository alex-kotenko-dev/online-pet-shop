import {CartItem} from '../CartItem/CartItem'
import styles from './CartList.module.css'

export const CartList = ({items}) => {
  return (
    <div className={styles.container}>
      {items.map(item => (
        <CartItem key={item.id} product={item}/>
      ))}
    </div>
  )
}