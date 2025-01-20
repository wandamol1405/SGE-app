import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const HomeContainer = styled.div`
  justify-content: center;
  padding: 4rem;
  width: 100%;
  font-family: "Libre Franklin", sans-serif;
  gap: 1rem;

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
  font-size: 20px;
  width: 50vw;
  height: 15vh;
  align-self: center;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #525b44;

  @media (min-width: 1080px) {
    width: 30vw;
    font-size: 25px;
    align-self: center;
  }

  &:hover {
    background-color: #ffb3b3;
  }
`;

function Home() {
  const { user } = useLogin();
  const [company_name, setCompanyName] = useState("");

  useEffect(() => {
    async function getUser() {
      console.log(user);
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      console.log(response);
      setCompanyName(response.user.company_name);
    }
    getUser();
  }, [user]);

  return (
    <HomeContainer>
      <div className="welcome">
        <h1>Bienvenido {company_name}</h1>
      </div>
      <ButtonsContainer>
        <Link to="/createDoc">
          <HomeButton>Crear documento comercial</HomeButton>
        </Link>
        <Link to="/listDocs">
          <HomeButton>Ver documentos comerciales</HomeButton>
        </Link>
        <Link to="/updateCompany">
          <HomeButton>Actualizar datos de la empresa</HomeButton>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  );
}

export default Home;
