import { DiscountedProductsSection } from '../../components/DiscountedProductsSection/DiscountedProductsSection'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'

export const SalesPage = () => {
  const breadcrumbs = [
     { title: 'All sales', link: '/sales' }
   ]
  return (
    <div>
      <Breadcrumbs items={breadcrumbs}/>
      <DiscountedProductsSection limit={Infinity}/>
    </div>
  )
}

