import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductId, getCategoryById } from '../../api/api'
import styles from './ProductContent.module.css'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton.jsx'
import { Counter } from '../../components/Counter/Counter.jsx'


export const ProductContent = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [readMore, setReadMore] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductId(id);
        const productData = Array.isArray(res.data) ? res.data[0] : res.data
        setProduct(productData)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])


  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;

  const truncatedDescription = product.description.length > 400
    ? product.description.slice(0, 400) + '...'
    : product.description

  const breadcrumbs = [
    { title: 'Categories', link: '/all-categories' },
    category && { title: category.title, link: `/category/${category.id}` },
    { title: product.title, link: `/products/${product.id}` },
  ].filter(Boolean)

  return (
    <section>

      <Breadcrumbs items={breadcrumbs}/>

      <div className={styles.container}>

          <div className={styles.miniImgWrapper}>
           <img
             src={`http://localhost:3333${product.image}`}
             alt={`${product.title} 1`}
             className={styles.miniImg}
           />
           <img
              src={`http://localhost:3333${product.image}`}
              alt={`${product.title} 2`}
              className={styles.miniImg}
           />
            <img
              src={`http://localhost:3333${product.image}`}
              alt={`${product.title} 3`}
              className={styles.miniImg}
            />
          </div>       

      <img src={`http://localhost:3333${product.image}`} alt={product.title} className={styles.image} />


      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.priceBlock}>
       {product.discont_price > 0 ? (
       <>
        <p className={styles.newPrice}>${product.discont_price}</p>
        <p className={styles.oldPrice}>${product.price}</p>

        <span className={styles.discount}>
        -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
      </span>
       </>
        ) : (
         <p className={styles.newPrice}>${product.price}</p>
         )}
      </div>

        <div className={styles.quantity}>
          <Counter product={product} />
          <AddToCartButton product={product} quantity={product.quantity || 1} />
        </div>

        <h4>Description</h4>
        <p className={styles.description}>
          {readMore ? product.description : truncatedDescription}
          {product.description.length > 400 && (
            <span className={styles.readMore} onClick={() => setReadMore(!readMore)}>
              {readMore ? ' Read less' : ' Read more'}
            </span>
          )}
        </p>
      </div>
    </div>
  </section>
  )
}