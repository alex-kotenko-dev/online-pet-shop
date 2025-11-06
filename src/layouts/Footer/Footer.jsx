import React from 'react'
import styles from './Footer.module.css'
import instaIcon from '../../assets/icons/instagram.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h2>Contact</h2>

      <div className={styles.content}>
        <div className={styles.box}>
          <p>Phone</p>
          <h3>+49 30 915-88492</h3>
        </div>

        <div className={styles.box}>
          <p>Socials</p>
          <div className={styles.icons_container}>
           <a href='https://www.instagram.com/'>
             <img src={instaIcon} alt='instagram'/>
           </a>
           <a href='https://www.whatsapp.com/'>
             <img src={whatsappIcon} alt='whatsapp'/>
           </a>
          </div>
        </div>

        <div className={styles.box}>
          <p>Address</p>
          <h3>Wallstraẞe 9-13, 10179 Berlin, Deutschland</h3>
        </div>

        <div className={styles.box}>
          <p>Working Hours</p>
          <h3>24 hours a day</h3>
        </div>
     </div>

        <div className={styles.mapW}>
            <iframe
            title="petshop map"
            src="https://www.google.com/maps?q=Wallstraße+9-13,+10179+Berlin,+Germany&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.map}
          />
        </div>
    </footer>
  )
}
