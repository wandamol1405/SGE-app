import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";

const UpdateGJContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffdec;
  border-radius: 15px;
  align-items: center;
  padding: 8rem;
  width: 70%;
  font-family: "Libre Franklin", sans-serif;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 5rem;

  p {
    color: #86a788;
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }
`;

const DocsButton = styled.button`
  background-color: #86a788;
  font-family: "Libre Franklin", sans-serif;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 25px;
  width: 50vw;
  height: 20vh;
  align-self: center;
  cursor: pointer;
  &:hover {
    background-color: #525b44;
  }
  @media (min-width: 1080px) {
    width: 20vw;
  }
`;

const DocsButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

function UpdateGeneralJournal() {
  return (
    <UpdateGJContainer>
      <p>Seleccione que desea realiza en el libro diario de su empresa</p>
      <DocsButtonContainer>
        <Link to="/addJournalEntry">
          <DocsButton>Agregar asiento contable</DocsButton>
        </Link>
        <Link to="/listJournalEntries">
          <DocsButton>Ver asientos contables</DocsButton>
        </Link>
      </DocsButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </UpdateGJContainer>
  );
}

export default UpdateGeneralJournal;
