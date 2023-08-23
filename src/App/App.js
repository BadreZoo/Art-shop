import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Products from '../Products/Products';
import Home from '../Home/Home';
import Cart from '../cart/Cart';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SucessPage from '../sucessPage/SucessPage';
import NotFound from '../NotFound/NotFound';
import Product from '../Product/product';
import Footer from '../Footer/Footer';
function App() {
  return (
    <div className="App">
      <Router>
   <Navbar/>
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/panier" element={<Cart />} />
     <Route path="/checkout-success" element={<SucessPage />} />
     <Route path="/product/:productId" element={<Product />} />
     <Route path="*" element={<NotFound />} />

   </Routes>

 </Router>
    </div>
  );
}

export default App;
