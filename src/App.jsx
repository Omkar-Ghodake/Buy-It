import './styles/App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// layouts
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'

// pages
import Home from './pages/Home'
import Products from './pages/Products'
import AboutUs from './pages/AboutUs'
import ContacUs from './pages/ContactUs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/Profile'
import AllUsers from './pages/AllUsers'
import AllProductsDash from './pages/AllProductsDash'
import StaffDashboard from './pages/StaffDashboard'
import AddProducts from './pages/AddProducts'

// contexts
import { UserState } from '../context/UserState'
import { ProductsState } from '../context/ProductsState'
import ProductDetails from './pages/ProductDetails'



function App() {

  return (
    <>
      <ProductsState>
        <UserState>
          <BrowserRouter>
            <Navbar />

            <ToastContainer
              position="top-left"
              autoClose={ 5000 }
              hideProgressBar={ false }
              newestOnTop={ false }
              closeOnClick
              rtl={ false }
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <div className="py-10 bg-zinc-100 min-h-screen">
              <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/products' element={ <Products /> } />
                <Route path='/aboutus' element={ <AboutUs /> } />
                <Route path='/contactus' element={ <ContacUs /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/signup' element={ <Signup /> } />
                <Route path='/profile/:userId' element={ <Profile /> } />
                <Route path='/product/:productId' element={ <ProductDetails /> } />
                <Route path='/allUsers' element={ <AllUsers /> } />
                <Route path='/adminDashboard' element={ <AdminDashboard /> } />
                <Route path='/staffDashboard' element={ <StaffDashboard /> } />
                <Route path='/allProductsDash' element={ <AllProductsDash /> } />
                <Route path='/addProducts' element={ <AddProducts /> } />
              </Routes>
            </div>

            <Footer />
          </BrowserRouter>
        </UserState>
      </ProductsState>
    </>
  )
}

export default App
