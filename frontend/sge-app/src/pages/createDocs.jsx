import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CreateDocsContainer = styled.div`
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

const DocsButton = styled.button`
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

const DocsButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

function CreateDocs() {
  const navigate = useNavigate();

  return (
    <CreateDocsContainer>
      <p>Seleccione que tipo de documento desea crear</p>
      <DocsButtonContainer>
        <DocsButton onClick={() => navigate("/createInvoice-header")}>
          Factura
        </DocsButton>
        <DocsButton onClick={() => navigate("/createOrder-header")}>
          Orden de compra
        </DocsButton>
        <DocsButton onClick={() => navigate("/createDebitNote")}>
          Nota de débito
        </DocsButton>
        <DocsButton onClick={() => navigate("/createCreditNote")}>
          Nota de crédito
        </DocsButton>
        <DocsButton onClick={() => navigate("/createDeliveryNote")}>
          Remito
        </DocsButton>
        <DocsButton onClick={() => navigate("/createCheck")}>Cheque</DocsButton>
      </DocsButtonContainer>
    </CreateDocsContainer>
  );
}

export default CreateDocs;
