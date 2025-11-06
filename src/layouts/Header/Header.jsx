import styles from './Header.module.css'
import logoIcon from '../../assets/icons/logo.svg'
import cartIcon from '../../assets/icons/basket.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalCount } from '../../redux/slices/cartSlice'


export default function Header() {
  const totalCount = useSelector(selectTotalCount)

  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logoIcon} alt='Logo' className={styles.logo} />
      </NavLink>

      <nav className={styles.middle}>
        <NavLink to="/" >Main Page</NavLink>
        <NavLink to="/all-categories" >Categories</NavLink>
        <NavLink to="/all-products" >All products</NavLink>
        <NavLink to="/sales" >All sales</NavLink>
      </nav>

      <div>
        <NavLink to="/cart">
          <img src={cartIcon} alt='Basket' className={styles.cartIcon}/>
          {totalCount > 0 && (
            <span className={styles.cartBadge}>{totalCount}</span> // <-- показываем число товаров
          )}
        </NavLink>
      </div>
    </header>
  )
}
