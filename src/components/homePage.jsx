import React from "react";
import "./HomePage.css"; // Importa los estilos

function HomePage() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <ul>
          <li>Inicio</li>
          <li>Acerca de</li>
          <li>Servicios</li>
          <li>Contacto</li>
        </ul>
      </nav>
      <div className="content">
        <img
          src="https://via.placeholder.com/800x400" // URL de la imagen
          alt="Imagen de portada"
        />
      </div>
      <footer className="footer">
        <p>&copy; 2023 Tu Empresa</p>
      </footer>
    </div>
  );
}

export default HomePage;
