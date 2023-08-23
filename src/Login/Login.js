// Login.js
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { accountService } from '../_services/account.service';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';
import './style.scss';

const Login = () => {
  let navigate = useNavigate();
  const [dataLogin, setdataLogin] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Ajout du hook d'état pour l'affichage du mot de passe

  const handleSubmit = (e) => {
    e.preventDefault();
    accountService
      .login(dataLogin)
      .then((res) => {
        accountService.saveToken(res.data.token);
        Cookies.set('your_auth_token', res.data.token, {
          expires: new Date(res.data.expiresIn),
        });
        navigate('/', { replace: true });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className='container-login'>
      <div className='login-form'>
        <h1 className='title-default-login'>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <input
              placeholder='Email'
              value={dataLogin.email}
              onChange={(e) =>
                setdataLogin({ ...dataLogin, email: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              value={dataLogin.password}
              onChange={(e) =>
                setdataLogin({ ...dataLogin, password: e.target.value })
              }
            />
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
        <Button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Masquer' : 'Afficher'} le mot de passe
        </Button>
      </div>
    </section>
  );
};

export default Login;
