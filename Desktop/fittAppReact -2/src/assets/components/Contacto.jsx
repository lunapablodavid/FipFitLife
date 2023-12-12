import React, { useState,useEffect } from 'react';
import './styles/contacto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faTwitter,faInstagram,faWhatsapp} 
 from '@fortawesome/free-brands-svg-icons';




 const Contacto = () => {
 
const initialState = {
    nombre: '',
    email: '',
    mensaje: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  
  //Fetch para montar un body
  useEffect(() => {
    // Agrega una clase al cuerpo cuando se monta el componente
    document.body.classList.add('contact-body');
  
    // Limpia la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('contact-body');
    };
  }, []);
  
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3030/contacto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          correo: formData.email,
          message: formData.mensaje,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el formulario: ${response.status} - ${response.statusText}`);
      }
      setFormData(initialState);
      // Realizar acciones adicionales si es necesario
      console.log('Formulario enviado con éxito');

    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      setError('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
    
    <div className='contacto-container'>
      <h1>Contacto</h1>
      <br />
      <p>Bienvenido a nuestro formulario de contacto. Estamos aquí para responder tus preguntas y comentarios. ¡Contáctanos!</p>
      <br />
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
    



    <div className='contacto-container'>
      {/* Contenido del formulario de contacto */}

      {/* Pie de página */}
      <div className="footer">
        <p>Contáctanos:</p>
        <p>
          <FontAwesomeIcon icon={faPhoneAlt} /> Teléfono: +123456789
        </p>
        <div>
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com/">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://wa.me/123456789">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="mailto:info@example.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
    
    </>
   
  );
};

export default Contacto;