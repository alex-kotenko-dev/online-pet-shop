import styles from './PromoSection.module.css'
import { Link } from 'react-router-dom'

export const PromoSection = () => {
  return (
    <section className={styles.imageContainer}>
      <div className={styles.promo}>
        <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>
        <Link to="/sales">
          <button className={styles.button}>Check out</button>
        </Link>
     </div>
    </section>
  )
}