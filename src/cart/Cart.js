import React, { useEffect, useState } from 'react';
import { Button, Icon, Message } from 'semantic-ui-react';
import './style.scss';
import axiosInstance from '../api/axiosInstance';
import { accountService } from '../_services/account.service';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [addedToCart, setAddedToCart] = useState([]);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    axiosInstance.get("/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const consolidatedCartData = consolidateCartData(res.data);
      setCartData(consolidatedCartData);
      calculateSubtotal(consolidatedCartData);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const consolidateCartData = (cartData) => {
    const consolidatedData = [];
    cartData.forEach((item) => {
      const existingItem = consolidatedData.find(
        (consolidatedItem) => consolidatedItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantite += item.quantite;
      } else {
        consolidatedData.push(item);
      }
    });
    return consolidatedData;
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/remove-from-cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data.message);
      loadCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity >= 1) {
        const response = await axiosInstance.put(
          `/update-quantity/${productId}`,
          { quantite: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // Mettre à jour l'état local des quantités
        const updatedCartData = cartData.map(item => {
          if (item.id === productId) {
            return { ...item, quantite: newQuantity };
          }
          return item;
        });
        setCartData(updatedCartData);
        calculateSubtotal(updatedCartData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const calculateSubtotal = (cartData) => {
    const total = cartData.reduce((acc, item) => acc + item.prix * item.quantite, 0);
    setSubtotal(total.toFixed(2));
  };

  const handleClearCart = async () => {
    try {
      await axiosInstance.delete("/clear-cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartData([]);
      setSubtotal(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      // Créez une liste d'articles pour le checkout
      const lineItems = cartData.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.nom,
          },
          unit_amount: item.prix * 100, // Le montant doit être en cents
        },
        quantity: item.quantite,
      }));
  
      // Obtenez l'objet Stripe pour gérer le paiement
      const stripe = await stripePromise;
  
      // Créez une session de paiement avec les détails des articles
      const session = await axiosInstance.post("/create-checkout-session", { lineItems });
  
      // Redirigez l'utilisateur vers la page de paiement Stripe
      const result = await stripe.redirectToCheckout({
        sessionId: session.data.id,
      });
  
      if (result.error) {
        // Gérez les erreurs éventuelles
        console.error(result.error);
        // Affichez un message d'erreur à l'utilisateur
      }
    } catch (error) {
      console.error(error);
      // Affichez un message d'erreur à l'utilisateur
    }
  };

  return (
    <section>
      {accountService.isLogged() && (
        <div className='shoppingcart-container'>
          <div className="title-shop-main">
            <h1>Panier</h1>
          </div>
          <div className="cart-items">
            <div className="cart-titles">
              <h3>Product</h3>
              <h3>PRICE</h3>
              <h3>QUANTITY</h3>
              <h3>TOTAL</h3>
            </div>
            <div className="hr"></div>
            {cartData && cartData.map((item) => (
              <div className="shop-products" key={item.id}>
                <div className="shop-product">
                  <div className="adada">
                    <img src={item.image} className='cart-item-img' height="108px" alt="" />
                    <p className='cart-item-name'>{item.nom}</p>
                  </div>
                  <button className="remove-item" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
                <div className="product-price">
                  <p>{item.prix}</p>
                </div>
                <div className="product-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantite - 1)}
                  >
                    -
                  </button>
                  <div className="count">
                    {addedToCart.includes(item.id) ? addedToCart.filter(id => id === item.id).length : item.quantite}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantite + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="product-total-amount">
                  <p>${(item.prix * item.quantite).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="hr"></div>
            <div className="sub-container">
              <div className="btn-clear-btn">
                <button className='clear-cart' onClick={handleClearCart}>Clear cart</button>
              </div>
              <div className="subtotal">
                <div className="main-sub-text">
                  <span>Subtotal</span>
                  <span className="amount">€{subtotal}</span>
                </div>
                <div className="taxe-test">
                  <p>Taxes and shipping calculated at checkout</p>
                </div>
                <div className="continue-shopping-container">
                  <Button primary >Check out</Button>
                  <div className="continue-shoppinp">
                    <Icon disabled name="long arrow alternate left" />
                    Continue Shopping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
