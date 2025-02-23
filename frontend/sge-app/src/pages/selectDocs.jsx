import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import CreateDocsContainer from "../components/createDocs";
import DocsButton from "../components/docsButton";
import DocsButtonContainer from "../components/docsButtonsConteiner";

function SelectDocs() {
  return (
    <CreateDocsContainer>
      <p>Seleccione el tipo de documento que desea ver</p>
      <DocsButtonContainer>
        <Link to="/listInvoicesByUser">
          <DocsButton>Factura</DocsButton>
        </Link>
        <Link to="/listBuyOrderByUser">
          <DocsButton>Orden de compra</DocsButton>
        </Link>
        <Link to="/listDebitNotesByUser">
          <DocsButton>Nota de débito</DocsButton>
        </Link>
        <Link to="/listCreditNotesByUser">
          <DocsButton>Nota de crédito</DocsButton>
        </Link>
        <Link to="/listDeliveryNotesByUser">
          <DocsButton>Remito</DocsButton>
        </Link>
        <Link to="/listChequesByUser">
          <DocsButton>Cheque</DocsButton>
        </Link>
        <Link to="/listPromissoryNotesByUser">
          <DocsButton>Pagaré</DocsButton>
        </Link>
      </DocsButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CreateDocsContainer>
  );
}

export default SelectDocs;
