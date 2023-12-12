import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './assets/components/ProductList';
import Contacto from './assets/components/Contacto';
import React from 'react';
import Cart from './assets/components/Cart';
import Login from './assets/components/Login';
import SignUp from './assets/components/SignUp';
import Home from './assets/components/Home';
import LoadProduct from './assets/components/LoadPRoduct';
import './assets/components/styles/Nav.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPhoneAlt,
  faEnvelope
} 
from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp
} 

from '@fortawesome/free-brands-svg-icons';

// Agregar los íconos al conjunto de íconos de FontAwesome
library.add(
  faPhoneAlt,
  faEnvelope,
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp
);
function App() {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3030/');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      
    //Funcion para mostrar la lista del menu en la barra nav
    const toggleDropdown = () => {
    
      setIsDropdownOpen((prev) => !prev);
    };

    


  const addCart = (product) => {

    if (isAuthenticated) {
      // Usuario autenticado, permite agregar al carrito
      setCart((prev) => [...prev, product]);
      console.log(cart.length, product.id + product.title);
    } else {
      setShowLoginMessage(true);
      console.log("debe iniciar sesion para poder agregar productos al carrito")
    }
  };


  //funcion para remover la cart 
  const removeProductFromCart = (productId) => {
  const updatedCart = cart.filter((product) => product.id !== productId);
     setCart(updatedCart);
    console.log('Se ha eliminado el producto del carrito');
  };


//obtener el total del carrtito
  const getTotal = (cart) => {
    const totalPrice = cart.reduce((acum, curr) => acum + parseFloat(curr.price), 0);
    return totalPrice.toFixed(2);
  };

  //obtener el carrito
  const getDerivedCart = () => {
    const derivedCart = [];

    cart.forEach((item) => {
      const existingItem = derivedCart.find((dItem) => dItem.id === item.id);

      if (existingItem) {
        // Si el producto ya existe en el carrito, acumula la cantidad
        existingItem.quantity += 1;
        existingItem.totalPrice += parseFloat(item.price);
      } else {
        // Si el producto no existe en el carrito, agrégalo con cantidad inicial 1
        derivedCart.push({
          id: item.id,
          name: item.title,
          quantity: 1,
          totalPrice: parseFloat(item.price),
        });
      }
    });

    return derivedCart;
  };

  /* Peticion fetch */
  useEffect(() => {
    fetch(baseUrl + 'products')
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}.${res.statusText}`);
        setError('');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.toString()));
  }, [isAuthenticated]);

  if (!products.length && !error) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;



  return (
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/ProductList">Productos</Link>
          <Link to="/Cart">Carro</Link>
             <div className="dropdown">
                 <div className="dropdown-btn" onClick={toggleDropdown}>Menu</div>
                  {isDropdownOpen && (//preguntamos si isDropdownOpen es true (valor inical: false)
             <div className="dropdown-content">
                  <Link to="/ejercicios">Ejercicios</Link>
                  <Link to="/LoadProduct">Load Product</Link>
                  <Link to="/nutricion">Nutrición</Link>
                </div>
               )}
            </div>
          <Link to="/Contacto">Contacto</Link>
          <Link to="/Login">Sesion</Link>
       </nav>

         <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/Login"element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/ProductList" element={<ProductList products={products} addCart={addCart} removeProductFromCart={removeProductFromCart}/>}/>
          <Route path="/Contacto" element={<Contacto />} />
          {isAuthenticated && (
          <>
           <Route path="/Cart"
                element={ <Cart cart={getDerivedCart()}removeProductFromCart={removeProductFromCart}getTotal={getTotal}/>}/>
             <Route path="/LoadProduct" element={<LoadProduct />} />
          </>
        )}   

         </Routes>
      </BrowserRouter>
  
  );
}

export default App;
