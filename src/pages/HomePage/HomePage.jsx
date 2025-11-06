import { CategoriesSection } from "../../components/CategoriesSection/CategoriesSection"
import { DiscountedProductsSection } from "../../components/DiscountedProductsSection/DiscountedProductsSection"
import { DiscountFormSection } from "../../components/DiscountFormSection/DiscountFormSection"
import { PromoSection } from "../../components/PromoSection/PromoSection"

import styles from './HomePage.module.css'

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <PromoSection />
      <CategoriesSection limit={4} />
      <DiscountFormSection />
      <DiscountedProductsSection limit={4}/>
    </div>
  )
}