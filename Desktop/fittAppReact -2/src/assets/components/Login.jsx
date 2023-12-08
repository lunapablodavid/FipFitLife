import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Agrega una clase al cuerpo cuando se monta el componente
    document.body.classList.add('login-body');
  
    // Limpia la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);
  useEffect(() => {
    // Obtener datos de usuarios desde el endpoint de NestJS
    fetch('http://localhost:3030/users/')
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}.${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        console.log('Usuarios cargados:', users);
      })
      .catch((error) => console.error(error));
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (user) => username === user.correo && password === user.contraseña
    );
  
    if (user) {
      console.log(`Iniciando sesión con usuario: ${user.correo}`);
      setIsAuthenticated(true); // This should set isAuthenticated to true
      navigate('/');
    } else {
      
      set
  setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleSignUpClick = () => {
    // Mostrar el componente SignUp al hacer clic en el botón "Registrarse"
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    // Ocultar el componente SignUp al cerrarlo
    setShowSignUp(false);
  };

  return (
    <div className="login-container" >
      {showSignUp ? (
        <SignUp onClose={handleCloseSignUp} />
      ) : (
        <>
          <h2 className="login-title">Iniciar Sesión</h2>
          <form className="login-form">
            <label className="login-label">
              Usuario / Correo:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </label>
            <br />
            <label className="login-label">
              Contraseña:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </label>
            <br />
            <button
              type="button"
              onClick={handleLogin}
              className="login-button"
            >
              Iniciar Sesión
            </button>
            <br />
            <button
              type="button"
              onClick={handleSignUpClick}
              className="login-button"
            >
              Registrarse
            </button>
          </form>
          {loginError && <p className="login-error">{loginError}</p>}
        </>
      )}
    </div>
  );
}

export default Login;