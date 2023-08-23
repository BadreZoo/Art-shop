// Products.js
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import './style.scss';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  let navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  useEffect(() => {
    axiosInstance.get('/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      setProductData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const handleShowProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (productId) => {
    try {
      if (!localStorage.getItem('token')) {
        navigate('/login', { replace: true });
        return;
      }
  
      await axiosInstance.post(
        '/add-to-cart',
        {
          product_id: productId,
          quantite: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Ajouter le produit à l'état local du panier
      setAddedToCart([...addedToCart, productId]);
  
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div className="product-container">
      <section className="products">
        {productData.slice(0, 6).map((product) => ( // Only render the first 6 products
          <div className="product" key={product.id}>
             <Card
            image={product.image}
            header={product.nom}
            meta={product.prix + '€'}
           
            onClick={() => handleShowProductDetails(product.id)}
/>
            <Button
              className={`submit-btn-product${
                addedToCart.includes(product.id) ? ' addtocartbtn' : ''
              }`}
              secondary
              onClick={() => handleAddToCart(product.id)}
            >
              ajouter au panier
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
