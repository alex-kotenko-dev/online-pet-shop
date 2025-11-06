import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer'
import { AppRoutes } from './routes/AppRoutes'
import './styles/App.css'

function App() {

  return (
     <div className='container'>
       <Header />
       <AppRoutes />
       <Footer />
     </div>
  )
}

export default App
