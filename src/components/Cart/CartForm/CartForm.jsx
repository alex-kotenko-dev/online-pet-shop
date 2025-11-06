import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, selectCartItems, selectTotalCount, selectTotalPrice } from "../../../redux/slices/cartSlice"
import axios from "axios"
import styles from "./CartForm.module.css"

export const CartForm = ({ onSuccess }) => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalCount = useSelector(selectTotalCount)
  const totalPrice = useSelector(selectTotalPrice)
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    const orderData = { ...data, items }

    try {
      await axios.post("http://localhost:3333/order/send", orderData)
      dispatch(clearCart())
      reset()
      onSuccess()
      setErrorMessage("")
    } catch (error) {
      setErrorMessage("Try again later")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.onSubmitForm}>
      <h3 className={styles.title}>Order details</h3>

      <div className={styles.cartSummary}>
        <p className={styles.details}>{totalCount} items</p>
        <p className={styles.details}>Total <span className={styles.detailsPrice}>${totalPrice.toFixed(2)}</span></p>
      </div>

      <label>
        <input {...register("name", { required: "Name is required" })} className={styles.formInput}
        placeholder="Name"/>
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </label>

      <label>
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: { value: /^[0-9\-\+]{7,15}$/, message: "Invalid phone number" }
          })}
          className={styles.formInput}
          placeholder="Phone number"
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
      </label>

      <label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
          })}
          className={styles.formInput}
          placeholder="Email"
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </label>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <button type="submit" className={styles.formBtn}>Order</button>
    </form>
  )
}