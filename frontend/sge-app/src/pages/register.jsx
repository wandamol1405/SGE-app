import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import LogButton from "../components/logButton";
import Select from "../components/select";
import BackButton from "../components/backButton";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #86a788;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 80%;
  font-family: "Libre Franklin", sans-serif;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 5rem;

  h1 {
    color: #fff;
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    align-items: center;
  }
  p {
    color: #fff;
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
  }
  @media (min-width: 1080px) {
    width: 60%;
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [cuit, setCuit] = useState("");
  const [gross_revenue, setGross_revenue] = useState("");
  const [IVA_condition, setIVA_condition] = useState("");
  const [start_date, setStart_date] = useState("");
  const [business_address, setBusiness_address] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFound = false;

    if (
      !email ||
      !password ||
      !company_name ||
      !cuit ||
      !gross_revenue ||
      !IVA_condition ||
      !start_date ||
      !business_address
    ) {
      setErrors((prev) => ({
        ...prev,
        general: { message: "Por favor, complete todos los campos" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, general: null }));
    }

    if (!email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: { message: "Ingrese una email valido" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: null,
      }));
    }

    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: { message: "La contraseña debe tener al menos 6 caracteres" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        cuit: null,
      }));
    }

    if (cuit.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        cuit: { message: "Ingrese un CUIT válido" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        cuit: null,
      }));
    }

    if (gross_revenue.length !== 9) {
      setErrors((prev) => ({
        ...prev,
        gross_revenue: {
          message: "Ingrese un número de Ingresos Brutos válido (9 dígitos)",
        },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        gross_revenue: null,
      }));
    }

    if (errorFound) {
      return;
    }

    try {
      const newCompany = {
        email: email,
        password: password,
        company_name: company_name,
        cuit: cuit,
        gross_revenue: gross_revenue,
        IVA_condition: IVA_condition,
        start_date: start_date,
        business_address: business_address,
        is_admin: false,
      };

      const response = await fetch(`${API_URL}/users/register`, {
        method: "post",
        body: JSON.stringify(newCompany),
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Something went wrong!");
      }
      navigate("/login");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: { message: "Error al registrar la empresa" },
      }));

      setTimeout(() => {
        setErrors((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };
  return (
    <RegisterContainer>
      <h1>Añade los datos de tu empresa</h1>
      {errors.general && <p>{errors.general.message}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Razón Social"
          value={company_name}
          onChange={(e) => setCompany_name(e.target.value)}
        />
        {errors.cuit && (
          <p style={{ fontSize: "1.2rem" }}>{errors.cuit.message}</p>
        )}
        <Input
          type="text"
          placeholder="CUIT"
          value={cuit}
          onChange={(e) => setCuit(e.target.value)}
        />
        {errors.gross_revenue && (
          <p style={{ fontSize: "1.2rem" }}>{errors.gross_revenue.message}</p>
        )}
        <Input
          type="text"
          placeholder="Ingresos Brutos"
          value={gross_revenue}
          onChange={(e) => setGross_revenue(e.target.value)}
        />

        <Select
          value={IVA_condition}
          onChange={(e) => setIVA_condition(e.target.value)}
        >
          <option value="" disabled>
            Seleccione la condición de IVA
          </option>
          <option value="Responsable inscripto">Responsable inscripto</option>
          <option value="Monotributista">Monotributista</option>
        </Select>

        <Input
          type="text"
          placeholder="Fecha de inicio de actividades"
          value={start_date}
          onChange={(e) => setStart_date(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
        />

        <Input
          type="text"
          placeholder="Domicilio comercial"
          value={business_address}
          onChange={(e) => setBusiness_address(e.target.value)}
        />
        <p>
          Agrega un e-mail y una contraseña para los futuros ingresos a la
          página
        </p>
        {errors.email && (
          <p style={{ fontSize: "1.2rem" }}>{errors.email.message}</p>
        )}
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.password && (
          <p style={{ fontSize: "1.2rem" }}>{errors.password.message}</p>
        )}
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LogButton type="submit">Registrarse</LogButton>
        <Link to="/login">
          <BackButton>Volver</BackButton>
        </Link>
      </form>
    </RegisterContainer>
  );
}
