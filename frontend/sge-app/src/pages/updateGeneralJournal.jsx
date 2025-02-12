import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UpdateGJContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffdec;
  border-radius: 15px;
  align-items: center;
  padding: 8rem;
  width: 60%;
  font-family: "Libre Franklin", sans-serif;
  gap: 2rem;
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

const DocsButton = styled.button`
  background-color: #86a788;
  font-family: "Libre Franklin", sans-serif;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 25px;
  width: 40vw;
  height: 10vh;
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

function updateGeneralJournal() {
  const navigate = useNavigate();

  return (
    <UpdateGJContainer>
      <p>Seleccione que desea realiza en el libro diario de su empresa</p>
      <DocsButtonContainer>
        <DocsButton onClick={() => navigate("/addAccountingEntry")}>
          Agregar asiento contable
        </DocsButton>
        <DocsButton onClick={() => navigate("/showAccountingEntries")}>
          Ver asientos contables
        </DocsButton>
      </DocsButtonContainer>
    </UpdateGJContainer>
  );
}

export default updateGeneralJournal;
