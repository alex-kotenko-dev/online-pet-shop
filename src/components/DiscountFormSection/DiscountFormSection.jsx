import styles from './DiscountFormSection.module.css'
import { sendDiscountForm } from '../../api/api'
import { useState } from 'react'
import imgPets from '../../assets/images/pets.svg'

export const DiscountFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setSuccess(false)

    try {
      await sendDiscountForm(formData)
      setSuccess(true)
      setFormData({name: '', phone: '', email: ''})
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <div className={styles.container}>
        <img src={imgPets} alt='' className={styles.imgPromo}/>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          required 
          className={styles.input}
          />

          <input
          type='tel'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone'
          required 
          className={styles.input}
          
          />

          <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required 
          className={styles.input}
          />

          <button type='submit' disabled={loading || success} className={`${styles.btn} ${success ? styles.submitted : ''}`}>
            {success ? 'Request submitted' : loading ? 'Sending...' : 'Get discount'}
          </button>
        </form>
      </div>
    </section>
  )
}

 