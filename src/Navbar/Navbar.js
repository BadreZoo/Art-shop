import { Icon } from 'semantic-ui-react';
import './style.scss';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { accountService } from '../_services/account.service';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [productData, setProductData] = useState([]);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0); // État pour stocker le nombre total de produits dans le panier
  const [isAnimationActive, setIsAnimationActive] = useState(false); // État pour indiquer si l'animation doit être activée

  useEffect(() => {
    axiosInstance.get("/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setProductData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance.get("/cart", { // Faites une requête pour récupérer les données du panier depuis votre backend
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        // Calculer la quantité totale des produits dans le panier
        const totalQuantity = res.data.reduce((acc, item) => acc + item.quantite, 0);
        setTotalItemsInCart(totalQuantity); // Mettre à jour l'état totalItemsInCart avec la quantité totale
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token"); // Supprimez le jeton du local storage
    accountService.logout();
    navigate("/login", { replace: true });
  };
  
  // Fonction pour ajouter un produit au panier et déclencher l'animation
  const addToCart = () => {
    // Ici, vous pouvez ajouter la logique pour ajouter le produit au panier et mettre à jour l'état totalItemsInCart
    // Par exemple, en utilisant la fonction setTotalItemsInCart(newTotalItems) pour mettre à jour l'état totalItemsInCart
    // Et en utilisant setIsAnimationActive(true) pour déclencher l'animation
    // N'oubliez pas de désactiver l'animation après un certain délai en utilisant setIsAnimationActive(false)
    setIsAnimationActive(true);
    setTimeout(() => {
      setIsAnimationActive(false);
    }, 2000); // Désactivez l'animation après 2 secondes (durée de l'animation)
  };

  return (
    <div id="nav-container">
      <nav>
        <Link to="/" relative="path">
          <div className="nav-logo">e-commerce site (Beta)</div>
        </Link>
        <div className="nav-basket">
        
        
        </div>
        <ul className="lists-container">
          {!accountService.isLogged() &&
            <>
              <Link to="/login" relative="path">
                <li className="list">login</li>
              </Link>
              <Link to="/register" relative="path">
                <li className="list">register</li>
              </Link>
            
            </>}
        
            {accountService.isLogged() && localStorage.getItem("token") && (
  <>
    <div className="panier">
    <Link to="/cart" relative="path">
      <Icon name="shop" size='big'  />
      </Link>
      </div>

    <Link to="/login" relative="path">
      {!accountService.isLogged() &&
      <li className=""><Icon name="user outline"  /></li>}
    </Link>
    
    
    <li className="logout" onClick={logout}> logout</li>
  </>
)}


        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
