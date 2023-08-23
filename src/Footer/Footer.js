import React from 'react';
import './style.scss';

const Footer = () => {
    return (

        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Mon Site Web. Tous droits réservés.</p>
        </footer>
    );
}

export default Footer;
