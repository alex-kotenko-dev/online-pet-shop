import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../api/api'
import styles from './DiscountedProductsSection.module.css'

export const DiscountedProductsSection = ({limit=4}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts()

        const discounted = res.data
          .filter(p => p.discont_price && p.discont_price < p.price)

        setProducts(discounted.slice(0, limit))
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong. Please try again later.</p>

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Discounted items</h2>
         {limit === 4 && (
        <Link 
        to="/sales"
        className={styles.link}>
          <button className={styles.allSalesBtn}>
            All sales
          </button>
        </Link>
         )}
      </div>

      <div className={styles.cards}>
        {products.map(product => {
          const discountPercent = Math.round((1 - product.discont_price / product.price) * 100)

          return (
            <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
              <div className={styles.cardImage}>
               <img
                src={product.image ? `http://localhost:3333/${product.image}` : '/placeholder.png'}
                alt={product.title}
                className={styles.image}
               />
               <span className={styles.discountBadge}>-{discountPercent}%</span>

               <p className={styles.cardTitle}>{product.title}</p>
               <div className={styles.price}>
                <p className={styles.newPrice}>$ {product.discont_price}</p>
                <p className={styles.oldPrice}>$ {product.price}</p>
               </div>
             </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}