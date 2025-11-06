import NotFoundImage from '../../assets/images/404.svg'
import { Link } from 'react-router-dom'
import styles from './NotFoundPageSection.module.css'

export const NotFoundPageSection = () => {
  return (
    <div className={styles.container}>
      <img src={NotFoundImage} alt='404 - Page Not Found' className={styles.image}/>
      <h2>Page Not Found</h2>
      <p>We’re sorry, the page you requested could not be found.</p>
      <p>Please go back to the homepage.</p>
      <Link to='/' className={styles.homeLink}>
      <button className={styles.button}>
        Go Home
      </button>
      </Link>
    </div>
  )
}
