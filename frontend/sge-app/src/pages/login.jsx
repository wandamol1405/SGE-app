import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import LogButton from "../components/logButton";
import Title from "../components/title";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #86a788;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 50%;
  font-family: "Libre Franklin", sans-serif;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;

  h1 {
    color: #fff;
    font-size: 2rem;
    padding: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }
  p {
    color: #fff;
    font-size: 1rem;
    padding: 1rem;
    text-align: center;
  }
  @media (min-width: 1080px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;

function Login() {
  const [email, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { loginHome, logoutHome } = useAuth();
  const navigate = useNavigate();
  const { login, user = null, logout } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFound = false;

    if (!email) {
      setError((prev) => ({
        ...prev,
        email: "Por favor, introduzca el e-mail de la empresa",
      }));
      errorFound = true;
    } else {
      setError((prev) => ({ ...prev, email: null }));
    }

    if (!password) {
      setError((prev) => ({
        ...prev,
        password: "Por favor, introduzca su contraseña",
      }));
      errorFound = true;
    } else {
      setError((prev) => ({ ...prev, password: null }));
    }

    if (errorFound) {
      return;
    }

    try {
      const userLogin = { email: email, password: password };
      const response = await fetch(`${API_URL}/users/login`, {
        method: "post",
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Credenciales inválidas");
      }
      console.log("Login successful with email: ", email);
      login(email);
      loginHome(email, password);
      navigate("/home");
    } catch (err) {
      setError((prev) => ({ ...prev, form: err.message }));

      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/logout`, {
        method: "post",
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Something went wrong!");
      }
      logout();
      logoutHome();
    } catch (error) {
      setError((prev) => ({ ...prev, form: error.message }));
      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <LoginContainer>
      {user !== "" && (
        <Title className="logout">
          <p>Para volver a ingresar, debes cerrar sesión</p>
          <LogButton onClick={handleLogout}>Cerrar sesión</LogButton>
        </Title>
      )}
      <div>
        <h1>Iniciar sesión</h1>
      </div>
      {error.form && <p>{error.form}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setUser(e.target.value)}
        />
        {error.email && <p>{error.email}</p>}
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <p>{error.password}</p>}
        <LogButton type="submit">Ingresar</LogButton>
      </form>

      <p>
        Si es la primera vez que ingresas, presiona en{" "}
        <Link to="/register">Registrarse</Link>
      </p>
    </LoginContainer>
  );
}

export default Login;
