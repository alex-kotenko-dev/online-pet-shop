import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../../api/api'
import { Filters } from '../../components/Filters/Filters.jsx'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton.jsx'
import styles from './ProductsSection.module.css'

export const ProductsSection = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { sort, priceFrom, priceTo, discounted } = useSelector(state => state.filters)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await getProducts()
        setProducts(res.data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading products</p>

  const displayedProducts = products
    .filter(p => {
      if (discounted && (!p.discont_price || p.discont_price <= 0)) return false
      if (priceFrom && p.price < Number(priceFrom)) return false
      if (priceTo && p.price > Number(priceTo)) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'high') return b.price - a.price
      if (sort === 'low') return a.price - b.price
      return 0
    })

  return (
    <div className={styles.allProducts}>

      <h2 className={styles.title}>All Products</h2>

      <Filters />

      <div className={styles.productsGrid}>
        {displayedProducts.map(product => (
          <div key={product.id} className={styles.productWrapper}>
            <Link to={`/products/${product.id}`} className={styles.productCard}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
                className={styles.images}
              />
              {product.discont_price > 0 && (
                <span className={styles.discount}>
                  -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                </span>
              )}
            </Link>

            <div className={styles.addToCartWrapper}>
              <AddToCartButton product={{ ...product, quantity: 1 }}/>
            </div>

            <p className={styles.productTitle}>{product.title}</p>

            <div className={styles.priceBlock}>
              {product.discont_price > 0 ? (
                <>
                  <p className={styles.newPrice}>${product.discont_price}</p>
                  <p className={styles.oldPrice}>${product.price}</p>
                </>
              ) : (
                <p className={styles.newPrice}>${product.price}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}