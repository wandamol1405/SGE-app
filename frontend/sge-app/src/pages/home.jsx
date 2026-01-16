import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import BackButton from "../components/backButton";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  font-family: "Libre Franklin", sans-serif;
  gap: 2rem;

  h1 {
    color: #86a788;
    font-size: 2rem;
    padding: 1.5rem;
    text-align: center; /* Align the title to the center */
  }
  h2 {
    color: #fff;
    font-size: 1.9rem;
    padding: 1rem;
    text-align: center;
  }
  h3 {
    color: #fff;
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  p {
    color: #fff;
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
  }
  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fffdec;
    width: 100%;
  }
  @media (min-width: 1080px) {
    h1 {
      font-size: 2.5rem;
      padding: 1.5rem;
    }
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #9eb38b;
  border-radius: 10px;
  padding: 1rem;
`;

const HomeButton = styled.button`
  background-color: #ffcfcf;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1.3rem;
  width: 70vw;
  height: 20vh;
  align-self: center;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #525b44;

  @media (min-width: 1080px) {
    width: 30vw;
    font-size: 1.7rem;
    padding: 10px 20px;
    align-self: center;
  }

  &:hover {
    background-color: #ffb3b3;
  }
`;

function Home() {
  const { user, logout } = useLogin();
  const [company_name, setCompanyName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getUser() {
      const result = await fetch(`${API_URL}/users/find/${user}`);
      const response = await result.json();
      setCompanyName(response.user.company_name);
      setIsAdmin(response.user.is_admin);
    }
    getUser();
  }, [user]);

  return (
    <HomeContainer>
      <div className="welcome">
        <h1>Bienvenid@ {company_name}</h1>
      </div>
      <SectionContainer>
        <h2>Documentos comerciales</h2>
      <ButtonsContainer>
        <div>
          <h3>Documentos emitidos</h3>
        </div>
        <ButtonsContainer>
        <Link to="/createDocs">
          <HomeButton>Emitir documento comercial</HomeButton>
        </Link>
        <Link to="/listDocs">
          <HomeButton>Ver documentos comerciales emitidos</HomeButton>
        </Link>
        </ButtonsContainer>
        <div>
          <h3>Documentos recibidos</h3>
        </div>
        <ButtonsContainer>
        <Link to="/registerReceivedDocs">
          <HomeButton>Registrar documentos comerciales recibidos</HomeButton>
        </Link>
        <Link to="/viewReceivedDocs">
          <HomeButton>Ver documentos comerciales recibidos</HomeButton>
        </Link>
        </ButtonsContainer>
        </ButtonsContainer>
        </SectionContainer>
      <SectionContainer>
        <h2>Libros contables</h2>
      
        <ButtonsContainer>
        <Link to="/updateGeneralJournal">
          <HomeButton>Editar Libro Diario</HomeButton>
        </Link>
        <Link to="/ivaSalesLedger">
          <HomeButton>
            Libro de IVA <strong>Ventas</strong>
          </HomeButton>
        </Link>
        <Link to="/ivaPurchasesLedger">
          <HomeButton>
            Libro de IVA <strong>Compras</strong>
          </HomeButton>
        </Link>
        </ButtonsContainer>
        </SectionContainer>
      <SectionContainer>
        <h2>Herramientas del administrador</h2>
        <ButtonsContainer>
        {isAdmin && (
          <>
            <Link to="/updateAccounts">
              <HomeButton>Editar cuentas</HomeButton>
            </Link>
            <Link to="/selectDocs">
              <HomeButton>
                Ver documentos comerciales de cada empresa
              </HomeButton>
            </Link>
          </>
        )}
      </ButtonsContainer>
      </SectionContainer>
      <ButtonsContainer>
        <Link to="/login">
          <BackButton onClick={logout}>Cerrar sesión</BackButton>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  );
}

export default Home;
