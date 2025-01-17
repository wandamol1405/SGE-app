import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import LogButton from "../components/logButton";
import Title from "../components/title";
import useLogin from "../hooks/useLogin";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #86a788;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 50%;
  family-font: "Libre Franklin", sans-serif;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;

  h1 {
    color: #fff;
    font-size: 2.5rem;
    padding: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }
  h2 {
    color: #fff;
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login, email, logout } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFound = false;

    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      errorFound = true;
    } else {
      setError((prev) => ({ ...prev, email: null }));
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      errorFound = true;
    } else {
      setError((prev) => ({ ...prev, password: null }));
    }

    if (errorFound) {
      return;
    }

    try {
      const userLogin = { user: email, password: password };
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Something went wrong!");
      }
      login(user);
      navigate("/");
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
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Something went wrong!");
      }
      logout();
    } catch (error) {
      setError((prev) => ({ ...prev, form: error.message }));
      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <LoginContainer>
      {email !== "" && (
        <Title className="logout">
          <h1>Para volver a ingresar, debes cerrar session</h1>
          <LogButton onClick={handleLogout}>Cerrar Sesion</LogButton>
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
          placeholder="Email"
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

      <h2>
        Si es la primera vez que ingresas, presiona en{" "}
        <Link to="/register">Registrarse</Link>
      </h2>
    </LoginContainer>
  );
}

export default Login;
