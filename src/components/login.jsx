import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          navigateTo.push("/");
        } else {
          alert("Inicio de sesión fallido. Verifica tus credenciales.");
        }
      } catch (error) {
        console.error(
          "Error al procesar la solicitud de inicio de sesión:",
          error
        );
      }
    }
    if (response.ok) {
      navigateTo.push("/");
    } else {
      alert("Inicio de sesión fallido. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-input">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="login-input">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
