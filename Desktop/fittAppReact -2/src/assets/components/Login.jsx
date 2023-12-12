import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');//Variable de estado para iniciar sesion con el usuario registrado
  const [password, setPassword] = useState('');//Variable de estado para iniciar sesion con la contraseña
  const [showSignUp, setShowSignUp] = useState(false);//Variable de estado para mostrar el componente re SignUp y poder registrarse
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState([]);


  //Fetch para montar un body
  useEffect(() => {
    // Agrega una clase al cuerpo cuando se monta el componente
    document.body.classList.add('login-body');
  
    // Limpia la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);


//Fethc para obtener los usarios
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


  //Manejo del inicio de sesion
  const handleLogin = () => {
    const user = users.find(
      (user) => username === user.correo && password === user.contraseña
    );
  //Comprobando si existe el usuario
    if (user) {
      console.log(`Iniciando sesión con usuario: ${user.correo}`);
      setIsAuthenticated(true); // This should set isAuthenticated to true
      navigate('/');
    } else {
  setLoginError('Usuario o contraseña incorrectos');
    }
  };

 //Funcion para manejar el estado del componente SignUp y mostrarlo en caso de que lo invoquen
  const handleSignUpClick = () => {
    // Mostrar el componente SignUp al hacer clic en el botón "Registrarse"
    setShowSignUp(true);
  };
 //Funcion para manejar el estado del componente SignUp y mostrarlo en caso de que lo invoquen
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