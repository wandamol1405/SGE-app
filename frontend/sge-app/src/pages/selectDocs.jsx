import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import CreateDocsContainer from "../components/createDocs";
import DocsButton from "../components/docsButton";
import DocsButtonContainer from "../components/docsButtonsConteiner";

const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function SelectDocs() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/exportExcel`, { method: 'GET' });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SGE_Documents.xlsx');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }
  
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
          <DocsButton onClick={handleSubmit} style={{ backgroundColor: "green", color: "white" }}>Descargar Excel</DocsButton>
      </DocsButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CreateDocsContainer>
  );
}

export default SelectDocs;
