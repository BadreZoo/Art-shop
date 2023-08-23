import './style.scss'
import Navbar from '../Navbar/Navbar'
import Products from '../Products/Products'
import Footer from '../Footer/Footer'

const Home = () => {
  
  return (
    <div id='Home'>
      <div className="page-container">
        <div className="content-container">
          <Products />
        </div>
        
      </div>
      <Footer/>
    </div>
  )
}


export default Home;
