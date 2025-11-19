import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster } from 'sonner'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BarraNav from './components/navBar/nav/navBar.jsx'
import Contacto from './components/navBar/contacto/contacto.jsx'
import ChangePassword from './components/pageChangePassword/changePassword.jsx';
import Error404 from './components/error404/error404.jsx'
import Footer from './components/footer/footer.jsx';
import Home from './components/pageHome/home/home.jsx'
import Login from './components/navBar/login/login.jsx';
import PanelUser from './components/panel/panelUser/panelUser.jsx'
import ProductDisplay from './components/pageProducts/listProducts/productDisplay.jsx'
import ProductDetail from './components/detalleProducto/productDetail.jsx'
import RegisterUser from './components/navBar/RegisterUser/RegisterUser.jsx'
import PanelProduct from './components/panel/panelProduct/panelProduct.jsx'
import NavAdmin from './components/panel/navbarAdmin/navAdmin.jsx';
import UserProfile from './components/navBar/profile/profile.jsx';
import Shop from './components/navBar/img-carrito/shop/shop.jsx';
import Whatsaap from './components/whatsapp/whatsapp.jsx';
import OrderPanel from './components/panel/panelOrders/panelOrders.jsx';
import CartSidebar from './components/navBar/img-carrito/modalCart/cartSidebar.jsx';
import Checkout from './components/navBar/img-carrito/checkoout/checkoout.jsx';


function App() {

  return (
    <>
      <BarraNav/> 
      <Routes>
        {/* Pagina de inicio */}
        <Route path="/" element={<Home />}/>

        {/* Pagina de productos */}
        <Route path="/products" element={<ProductDisplay />}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        
        {/* Carrito */}
        <Route path='/cart' element={<CartSidebar/>}/>
        <Route path='/cart/shopping' element={<Shop/>}/>
        
        {/* Formalizar compra */}
        <Route path='/checkout' element={<Checkout/>}/> 

        {/* Admin */}
        <Route path="/admin" element  ={<NavAdmin />}/>
        <Route path="/admin/users" element={<PanelUser />}/>
        <Route path="/admin/products" element={<PanelProduct />}/>
        <Route path="/admin/orders" element={<OrderPanel />}/>
        
        {/* Usuarios */}
        <Route path="/users/login" element={<Login />}/>
        <Route path="/users/profile" element={<UserProfile />}/>
        <Route path="/users/register" element={<RegisterUser />}/>
      
        {/* Password */}
        <Route path="/password/forgot" element={<ChangePassword />}/>
        

        {/* OTROS */}
        <Route path="*" element={<Error404 />}/>
        <Route path="/contact" element={<Contacto />}/>
      </Routes>
      <Footer />
      <Whatsaap/>
      <Toaster/>
    </>
  )
}

export default App