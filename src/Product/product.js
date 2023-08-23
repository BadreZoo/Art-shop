
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import './style.scss';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

const Product = () => {
  const [oneProductData, setOneProductData] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    axiosInstance.get(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      setOneProductData(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [productId]);

  return (
    <section className="Oneproduct-container">
      <div className="Oneproduct">
        <div className="img-product"><img src={oneProductData.image} className='Oneproduct-img' height="160px" alt="" /></div>
        <div className="details-product">
          <h1>{oneProductData.nom}</h1>
          <span>{oneProductData.prix + '€'}</span>
          <p>{oneProductData.description}</p>
          
        </div>
      </div>
    </section>
  );
};

export default Product;
