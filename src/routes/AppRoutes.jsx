import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { CategoriesPage } from "../pages/CategoriesPage/CategoriesPage"
import { CategoryPage } from "../pages/CategoryPage/CategoryPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { SalesPage } from "../pages/SalesPage/SalesPage"
import { CartPage } from "../pages/CartPage/CartPage"
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage"


export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/all-categories' element={<CategoriesPage />} />
    <Route path='/all-products' element={<ProductsPage />} />
    <Route path='/category/:id' element={<CategoryPage/>} />
    <Route path='/products/:id' element={<ProductPage />} />
    <Route path='/sales' element={<SalesPage />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
)