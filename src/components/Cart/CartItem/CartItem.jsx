import { useDispatch } from "react-redux"
import {removeFromCart} from "../../../redux/slices/cartSlice"
import {Counter} from "../../Counter/Counter"
import styles from './CartItem.module.css'


export const CartItem = ({product}) => {
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeFromCart(product.id))
  }

  const itemPrice = product.discont_price > 0 ? product.discont_price : product.price 
  // const totalPrice = itemPrice * product.quantity

return(
  <div className={styles.itemContainer}>
    <img src={`http://localhost:3333${product.image}`} alt={product.title} className={styles.image}/>

    <div className={styles.details}>
       <h3 className={styles.title}>{product.title}</h3>
       <button onClick={handleRemove} className={styles.removeBtn}>×</button>

      <div className={styles.detailsCountPrice}>
       <Counter product={product}/>
       {product.discont_price > 0 ? (
          <div className={styles.priceBlock}>
            <p className={styles.price}>${product.discont_price}</p>
            <p className={styles.oldPrice}>${product.price}</p>
          </div>
        ) : (
          <p className={styles.price}>${product.price}</p>
        )}
        
        {/* <p>${totalPrice}</p> */}
      </div>

    </div>
  </div>
)
}