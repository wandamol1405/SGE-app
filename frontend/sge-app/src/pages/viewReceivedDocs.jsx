import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import formatDate from "../utils/formatDate";
import formatDocNumber from "../utils/formatDocNumber";
import formatPrice from "../utils/formatPrice";
import formatPointSale from "../utils/formatPointSale";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function ListReceivedDocs() {
  const [company, setCompany] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [debitNotes, setDebitNotes] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const { user } = useLogin();

  useEffect(() => {
    async function getCompany() {
      const result = await fetch(`${API_URL}/users/find/${user}`);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  useEffect(() => {
    async function getDocuments() {
      try {
        const result = await fetch(
          `${API_URL}/documents/received/${company.id_user}`
        );
        const response = await result.json();
        const documents = response.documents;
        setInvoices(documents.invoices || []);
        setDebitNotes(documents.debitNotes || []);
        setCreditNotes(documents.creditNotes || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }

    if (company.id_user) {
      getDocuments();
    }
  }, [company.id_user]);

  return (
    <CheckContainer>
      <h1>Documentos recibidos</h1>
      <h2>Facturas</h2>
      {invoices.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de factura</th>
                <th>Punto de venta</th>
                <th>Tipo de factura</th>
                <th>Fecha de emisión</th>
                <th>Proveedor</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(invoice.num_invoice)}</td>
                    <td>{formatPointSale(invoice.point_sale)}</td>
                    <td>{invoice.type_invoice}</td>
                    <td>{formatDate(invoice.issue_date)}</td>
                    <td>{invoice.supplier}</td>
                    <td>${formatPrice(invoice.subtotal)}</td>
                    <td>${formatPrice(invoice.IVA)}</td>
                    <td>${formatPrice(invoice.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay facturas recibidas.</p>
      )}
      <h2>Notas de débito</h2>
      {debitNotes.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de nota</th>
                <th>Punto de venta</th>
                <th>Tipo de nota</th>
                <th>Fecha de emisión</th>
                <th>Proveedor</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {debitNotes.map((debitNote, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(debitNote.debit_note_number)}</td>
                    <td>{formatPointSale(debitNote.point_sale)}</td>
                    <td>{debitNote.type_debit_note}</td>
                    <td>{formatDate(debitNote.issue_date)}</td>
                    <td>{debitNote.supplier}</td>
                    <td>${formatPrice(debitNote.subtotal)}</td>
                    <td>${formatPrice(debitNote.IVA)}</td>
                    <td>${formatPrice(debitNote.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay notas de débito recibidas.</p>
      )}
      <h2>Notas de crédito</h2>
      {creditNotes.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de nota</th>
                <th>Punto de venta</th>
                <th>Tipo de nota</th>
                <th>Fecha de emisión</th>
                <th>Proveedor</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {creditNotes.map((creditNote, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(creditNote.credit_note_number)}</td>
                    <td>{formatPointSale(creditNote.point_sale)}</td>
                    <td>{creditNote.type_credit_note}</td>
                    <td>{formatDate(creditNote.issue_date)}</td>
                    <td>{creditNote.supplier}</td>
                    <td>${formatPrice(creditNote.subtotal)}</td>
                    <td>${formatPrice(creditNote.IVA)}</td>
                    <td>${formatPrice(creditNote.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay notas de crédito recibidas.</p>
      )}

      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default ListReceivedDocs;
