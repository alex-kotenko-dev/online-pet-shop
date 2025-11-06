import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs"
import { ProductsSection } from "../../components/ProductsSection/ProductsSection"

export const ProductsPage = () => {
  const breadcrumbs = [
     { title: 'All Products', link: '/products' }
   ]

  return (
    <div>
      <Breadcrumbs items={breadcrumbs}/>
      <ProductsSection />
    </div>
  )
}

