import { useSelector } from "react-redux"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CartList } from "../../components/Cart/CartList/CartList"
import styles from "./CartPage.module.css"
import { CartForm } from "../../components/Cart/CartForm/CartForm"
import { CartModal } from "../../components/Cart/CartModal/CartModal"


export const CartPage = () => {
  const items = useSelector(state => state.cart.items)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleOrderSuccess = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleContinueShopping = () => {
    navigate("/")
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Shopping cart</h2>
        <div className={styles.line}></div>
        <NavLink to="/" className={styles.navBtn}>Back to the store</NavLink>
      </div>
      <div className={styles.containerFlex}>
      {items.length === 0 ? (
       <div>
        <p className={styles.emptyCartContent}>Looks like you have no items in your basket currently.</p>
        <button  onClick={handleContinueShopping} className={styles.btnEmptyCart}>Continue Shoping</button>
       </div>
      ) : (
     <>
      <CartList items={items}/>

      <CartForm items={items} onSuccess={handleOrderSuccess}/>
     </>
      )}
      </div>

      <CartModal isOpen={isModalOpen} onClose={closeModal}/>
    </div>
  )
}