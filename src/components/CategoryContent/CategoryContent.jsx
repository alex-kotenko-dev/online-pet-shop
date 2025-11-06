import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryById, getProducts } from '../../api/api';
import { Filters } from '../../components/Filters/Filters.jsx';
import styles from './CategoryContent.module.css';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton.jsx';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';

export const CategoryContent = ({ categoryId }) => {
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { sort, priceFrom, priceTo, discounted } = useSelector(state => state.filters)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const categoryRes = await getCategoryById(categoryId)

        setCategory(categoryRes.data.category)
        setProducts(categoryRes.data.data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) fetchData()
  }, [categoryId]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading category data</p>
  if (!category) return <p>Category not found</p>

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
      return 0;
    })

    const breadcrumbItems = [
    { title: "Categories", link: "/all-categories" },
    { title: category.title, link: `/categories/${category.id}` }
   ]

  return (
    <section>
     <Breadcrumbs items={breadcrumbItems} />

    <div className={styles.categoryContent}>
      <h1 className={styles.categoryTitle}>{category.title}</h1>
      <Filters /> 

      <div className={styles.productsGrid}>
        {displayedProducts.map((product) => (
          <div key={product.id} className={styles.productWrapper}>
            <Link to={`/products/${product.id}`} className={styles.productCard}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
                className={styles.images}
              />

              {product.discont_price > 0 && (
                <span className={styles.discount}>
                  -{Math.round(
                    ((product.price - product.discont_price) / product.price) * 100
                  )}
                  %
                </span>
              )}
            </Link>

            <div className={styles.addToCartWrapper}>
              <AddToCartButton product={{ ...product, quantity: 1 }} />
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
    
    </section>
  )
}





















// import { useEffect, useState } from 'react';
// import { useParams, useLocation, Link } from 'react-router-dom';
// import { getCategoryById, getProducts } from '../../api/api';
// import { setSort, setPriceFrom, setPriceTo, setDiscounted } from '../../redux/slices/filtersSlice';
// import styles from './CategoryContent.module.css';
// import { useDispatch, useSelector } from 'react-redux';

// export const CategoryContent = () => {
//   const { id } = useParams()
//   const location = useLocation()
//   const dispatch = useDispatch()

//   const filters = useSelector((state) => state.filters)
//   const { sort, priceFrom, priceTo, discounted } = filters

//   const [category, setCategory] = useState(null)
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const response = await getCategoryById(id)

//         setCategory(response.data[0])

//         const productsRes = await getProducts()
//         setProducts(productsRes.data.filter(p => p.categoryId === Number(id)))
//       } catch {
//         setError(true)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCategory()
//   }, [id])


//   const showBreadcrumb = !['/', '/cart', '/404'].includes(location.pathname)


//   const filteredProducts = products
//     .filter(p => (discounted ? p.discont_price > 0 : true))
//     .filter(p => (priceFrom ? p.price >= Number(priceFrom) : true))
//     .filter(p => (priceTo ? p.price <= Number(priceTo) : true))
//     .sort((a, b) => {
//       if (sort === 'high') return b.price - a.price
//       if (sort === 'low') return a.price - b.price
//       if (sort === 'discount') return (b.discont_price || 0) - (a.discont_price || 0)
//       return 0
//     })

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error loading category</p>

//   return (
//     <div className={styles.container}>
//       {showBreadcrumb && category && (
//      <p className={styles.breadcrumb}>
//       <Link to="/all-categories">Categories</Link> / {category.title}
//      </p>
//      )}

//       {category && <h2 className={styles.title}>{category.title}</h2>}

//       <div className={styles.filters}>

//         <label>
//           Price From:
//           <input
//             type="number"
//             value={priceFrom}
//             onChange={(e) => dispatch(setPriceFrom(e.target.value))}
//           />
//         </label>

//         <label>
//           Price To:
//           <input
//             type="number"
//             value={priceTo}
//             onChange={(e) => dispatch(setPriceTo(e.target.value))}
//           />
//         </label>

//         <label>
//           Discounted:
//           <input
//             type="checkbox"
//             checked={discounted}
//             onChange={(e) => dispatch(setDiscounted(e.target.checked))}
//           />
//         </label>

//         <label>
//           Sort:
//           <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
//             <option value="">Default</option>
//             <option value="high">Price: High-Low</option>
//             <option value="low">Price: Low-High</option>
//           </select>
//         </label>
//       </div>

//       <div className={styles.productsGrid}>
//         {filteredProducts.map(product => (
//           <div key={product.id} className={styles.productWrapper}>
//             <Link to={`/products/${product.id}`} className={styles.productCard}>
//               <img
//                 src={`http://localhost:3333${product.image}`}
//                 alt={product.title}
//                 className={styles.images}
//               />
//               {product.discont_price > 0 && (
//             <span className={styles.discount}>
//           -   {Math.round(((product.price - product.discont_price) / product.price) * 100)}%
//             </span>
//               )}
//             </Link>

//        <div className={styles.priceBlock}>
//           {product.discont_price > 0 ? (
//         <>
//            <p className={styles.oldPrice}>${product.price}</p>
//            <p className={styles.newPrice}>${product.discont_price}</p>
//         </>
//           ) : (
//           <p className={styles.newPrice}>${product.price}</p>
//         )}
//        </div>

//             <button className={styles.addToCartButton}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


