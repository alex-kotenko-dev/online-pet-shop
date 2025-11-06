import styles from "./CartModal.module.css"

export const CartModal = ({isOpen, onClose}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
    <div className={styles.modalContainer}>
      <h3>Congratulations!</h3>
      <p className={styles.modalContent}>Your order has been successfully placed on the website.</p>
      <p className={styles.modalContent}>A manager will contact you shortly to confirm your order.</p>  
      <button className={styles.closeBtn} onClick={onClose}>×</button>
    </div>
    </div>
  )
}