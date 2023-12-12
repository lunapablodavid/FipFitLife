import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './styles/Home.css';

const Home = () => {

  useEffect(() => {
    // Agrega una clase al cuerpo cuando se monta el componente
    document.body.classList.add('home-body');
  
    // Limpia la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('home-body');
    };
  }, []);
  return (
    <div className="home-container">
      <div className="header">
        <div className="logo">Fitt</div>
     </div>
     <div className="main-content">
        <div className="container">
          <div className="content1">
            <img src="https://media.revistagq.com/photos/607852dcb2ae7c7e79836cae/16:9/w_1600,c_limit/GettyImages-523080624.jpg" alt="Content 1" />
          </div>
          <div className="content2">
            <img src="https://s3.abcstatics.com/media/familia/2018/10/30/rutina-ejercicios_3-kYpH--1248x698@abc.jpg" alt="Content 2" />
          </div>
          <div className="content3">
            <img src="/path/to/content3.jpg" alt="Content 3" />
          </div>
          <div className="content content4">
            <img src="/path/to/content4.jpg" alt="Content 4" />
          </div>
        </div>
     

       
      </div> 
      <h2>¿Quieres comenzar tu vida fit?</h2>
          <ul>
            <li><Link to="/ProductList">Productos</Link></li>
            <li><Link to="/nutricion">Nutrición</Link></li>
            <li><Link to="/ejercicios">Ejercicios</Link></li>
          </ul>
        
      

     

      <footer>
        <div className="footer-contact">
          <p>Contáctanos:</p>
          <p><FontAwesomeIcon icon={faPhoneAlt} /> Teléfono: +123456789</p>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://twitter.com/"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://wa.me/123456789"><FontAwesomeIcon icon={faWhatsapp} /></a>
          <a href="mailto:info@example.com"><FontAwesomeIcon icon={faEnvelope} /></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
