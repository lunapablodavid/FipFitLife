import React from 'react';
import './styles/Cart.css';
import { useEffect } from 'react';

function Cart({ cart, removeProductFromCart,showLoginMessage }) {
  const getTotal = (cart) => {
    const totalPrice = cart.reduce((acum, curr) => {
      return acum + curr.totalPrice;
    }, 0);
    return totalPrice.toFixed(2);
  };
  useEffect(() => {
    // Agrega una clase al cuerpo cuando se monta el componente
    document.body.classList.add('cart-body');
  
    // Limpia la clase cuando el componente se desmonta
    return () => {
      
      {showLoginMessage && (
        <div className="login-message">
          Debes iniciar sesión para agregar productos al carrito.
        </div>)}
      document.body.classList.remove('cart-body');
    };
  }, []);
  return cart.length ? (
    <div className="cartAdd">
      <ul>
        {cart.map((prod) => (
          <li key={prod.id}>
            {prod.name} x {prod.quantity} = ${prod.totalPrice.toFixed(2)}
            <button onClick={() => removeProductFromCart(prod.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="cartTotal">
        <p>Total: ${getTotal(cart)}</p>
      </div>
    </div>
  ) : null;
}

export default Cart;