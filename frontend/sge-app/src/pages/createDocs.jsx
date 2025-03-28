import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import CreateDocsContainer from "../components/createDocs";
import DocsButton from "../components/docsButton";
import DocsButtonContainer from "../components/docsButtonsConteiner";

function CreateDocs() {
  return (
    <CreateDocsContainer>
      <p>Seleccione que tipo de documento desea crear</p>
      <DocsButtonContainer>
        <Link to="/createInvoice-header">
          <DocsButton>Factura</DocsButton>
        </Link>
        <Link to="/createOrder-header">
          <DocsButton>Orden de compra</DocsButton>
        </Link>
        <Link to="/createDebitNote-header">
          <DocsButton>Nota de débito</DocsButton>
        </Link>
        <Link to="/createCreditNote-header">
          <DocsButton>Nota de crédito</DocsButton>
        </Link>
        <Link to="/createDeliveryNote-header">
          <DocsButton>Remito</DocsButton>
        </Link>
        <Link to="/createCheque">
          <DocsButton>Cheque</DocsButton>
        </Link>
        <Link to="/createPromissoryNote">
          <DocsButton>Pagaré</DocsButton>
        </Link>
      </DocsButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CreateDocsContainer>
  );
}

export default CreateDocs;
