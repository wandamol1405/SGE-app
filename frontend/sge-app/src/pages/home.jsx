import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const HomeContainer = styled.div`
  justify-content: center;
  padding: 5rem;
  width: 100%;
  font-family: "Libre Franklin", sans-serif;
  gap: 2rem;

  h1 {
    color: #86a788;
    font-size: 2.5rem;
    padding: 1.5rem;
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
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const HomeButton = styled.button`
  background-color: #ffcfcf;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 20px 30px;
  font-size: 1.5rem;
  width: 50vw;
  height: 15vh;
  align-self: center;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #525b44;

  @media (min-width: 1080px) {
    width: 30vw;
    font-size: 1.8rem;
    align-self: center;
  }

  &:hover {
    background-color: #ffb3b3;
  }
`;

function Home() {
  const { user } = useLogin();
  const [company_name, setCompanyName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getUser() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompanyName(response.user.company_name);
      setIsAdmin(response.user.is_admin);
    }
    getUser();
  }, [user]);

  return (
    <HomeContainer>
      <div className="welcome">
        <h1>Bienvenido {company_name}</h1>
      </div>
      <ButtonsContainer>
        <Link to="/createDocs">
          <HomeButton>Crear documento comercial</HomeButton>
        </Link>
        <Link to="/listDocs">
          <HomeButton>Ver documentos comerciales</HomeButton>
        </Link>
        <Link to="/updateGeneralJournal">
          <HomeButton>Editar Libro Diario</HomeButton>
        </Link>
        {isAdmin && (
          <Link to="/addAccount">
            <HomeButton>Agregar cuenta</HomeButton>
          </Link>
        )}
      </ButtonsContainer>
    </HomeContainer>
  );
}

export default Home;
