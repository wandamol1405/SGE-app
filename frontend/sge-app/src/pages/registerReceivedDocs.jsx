import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import CreateDocsContainer from "../components/createDocs";
import DocsButton from "../components/docsButton";
import DocsButtonContainer from "../components/docsButtonsConteiner";

function RegisterReceivedDocs() {
  return (
    <CreateDocsContainer>
      <p>Seleccione el tipo de documento que desea registrar</p>
      <DocsButtonContainer>
        <Link to="/invoiceReceived">
          <DocsButton>Factura</DocsButton>
        </Link>
        <Link to="/debitNoteReceived">
          <DocsButton>Nota de débito</DocsButton>
        </Link>
        <Link to="/creditNoteReceived">
          <DocsButton>Nota de crédito</DocsButton>
        </Link>
      </DocsButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CreateDocsContainer>
  );
}

export default RegisterReceivedDocs;
