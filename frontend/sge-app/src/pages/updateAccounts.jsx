import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";

const UpdateAccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffdec;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 60%;
  font-family: "Libre Franklin", sans-serif;
  gap: 1.5rem;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;

  p {
    color: #86a788;
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }
`;

const ActionButton = styled.button`
  background-color: #86a788;
  font-family: "Libre Franklin", sans-serif;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 25px;
  width: 40vw;
  height: 7vh;
  align-self: center;
  cursor: pointer;
  &:hover {
    background-color: #525b44;
  }
  @media (min-width: 1080px) {
    width: 20vw;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

function UpdateAccounts() {
  return (
    <UpdateAccountsContainer>
      <p>Seleccione que desea realizar</p>
      <ActionButtonContainer>
        <Link to="/addAccount">
          <ActionButton>Agregar cuenta</ActionButton>
        </Link>
        <Link to="/listAccounts">
          <ActionButton>Listar cuentas cargadas</ActionButton>
        </Link>
      </ActionButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </UpdateAccountsContainer>
  );
}

export default UpdateAccounts;
