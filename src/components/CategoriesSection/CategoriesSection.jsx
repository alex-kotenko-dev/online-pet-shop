import React, { useEffect, useState } from 'react'
import { getCategories } from '../../api/api'
import { Link } from 'react-router-dom'
import styles from "./CategoriesSection.module.css"


export const CategoriesSection = ({limit}) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories()
        setCategories(response.data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const visibleCategories = limit ? categories.slice(0, limit) : categories

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Categories</h2>
        {limit && (
        <Link 
          to="/all-categories"
          className={styles.link}>
            <button className={styles.button}>
              All categories
            </button>
        </Link>
        )}
      </div>

      <div className={styles.imageContainer}>
        {visibleCategories.map(({id, image, title}) => (
          <Link key={id} to={`/category/${id}`}>
            <img 
            src={`http://localhost:3333${image}`}
            alt={title}
            className={styles.images}
            />
            <p className={styles.title}>{title}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

