import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import './style.scss';

const Register = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    nom: '',
    email: '',
    password: '',
    prenom: '',
    sex: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const options = [
    { key: 'm', text: 'Male', value: 'homme' },
    { key: 'f', text: 'Female', value: 'femme' },
    { key: 'o', text: 'Other', value: 'autre' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.sex) {
      console.log("Veuillez sélectionner le sexe.");
      return;
    }
    axiosInstance
      .post('/signup', data)
      .then((res) => {
        Cookies.set('your_auth_token', res.data.token, { expires: 1 });
        navigate('/login', { replace: true });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className='register-container'>
        <div className='register-form'>
          <h1 className='title-register'>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                value={data.prenom}
                placeholder='Prenom'
                onChange={(e) => setData({ ...data, prenom: e.target.value })}
              />
              <Form.Input
                fluid
                value={data.nom}
                placeholder='Nom'
                onChange={(e) => setData({ ...data, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                value={data.email}
                placeholder='Email'
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
             <Form.Input
  fluid
  value={data.password}
  placeholder='Mot de passe'
  type={showPassword ? 'text' : 'password'}
  onChange={(e) => setData({ ...data, password: e.target.value })}
  autocomplete="current-password" // Ajout de l'attribut autocomplete
/>

            </Form.Group>
            <Form.Dropdown
              selection
              value={data.sex}
              options={options}
              placeholder='Sexe'
              onChange={(e, { value }) => {
                console.log('Sexe sélectionné :', value);
                setData({ ...data, sex: value });
              }}
            />
            <Button type='submit'>Register</Button>
          </Form>
          <Button type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Masquer' : 'Afficher'} le mot de passe
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Register;
