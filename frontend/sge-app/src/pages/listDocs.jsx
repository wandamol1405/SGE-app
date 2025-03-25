import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import formatDate from "../utils/formatDate";
import formatDocNumber from "../utils/formatDocNumber";
import formatPrice from "../utils/formatPrice";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function ListDocs() {
  const [company, setCompany] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [debitNotes, setDebitNotes] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [promissoryNotes, setPromissoryNotes] = useState([]);
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
          `${API_URL}/documents/find/${company.id_user}`
        );
        const response = await result.json();
        const documents = response.documents;
        setInvoices(documents.invoices || []);
        setBuyOrders(documents.buyOrders || []);
        setDebitNotes(documents.debitNotes || []);
        setCreditNotes(documents.creditNotes || []);
        setCheques(documents.cheques || []);
        setDeliveryNotes(documents.deliveryNotes || []);
        setPromissoryNotes(documents.promissoryNotes || []);
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
      <h1>Documentos generados</h1>
      <h2>Facturas</h2>
      {invoices.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de factura</th>
                <th>Tipo de factura</th>
                <th>Fecha de emisión</th>
                <th>Comprador</th>
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
                    <td>{invoice.type_invoice}</td>
                    <td>{formatDate(invoice.issue_date)}</td>
                    <td>{invoice.buyer_name}</td>
                    <td>${formatPrice(invoice.subtotal)}</td>
                    <td>${formatPrice(invoice.IVA_total)}</td>
                    <td>${formatPrice(invoice.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay facturas generadas.</p>
      )}
      <h2>Órdenes de compra</h2>
      {buyOrders.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de orden</th>
                <th>Fecha de emisión</th>
                <th>Fecha de entraga</th>
                <th>Proveedor</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {buyOrders.map((buyOrder, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(buyOrder.order_number)}</td>
                    <td>{formatDate(buyOrder.issue_date)}</td>
                    <td>{formatDate(buyOrder.delivery_date)}</td>
                    <td>{buyOrder.supplier_name}</td>
                    <td>${formatPrice(buyOrder.total_amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay órdenes de compra generadas.</p>
      )}
      <h2>Notas de débito</h2>
      {debitNotes.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de nota</th>
                <th>Tipo de nota</th>
                <th>Fecha de emisión</th>
                <th>Comprador</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {debitNotes.map((debitNote, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(debitNote.num_debit_note)}</td>
                    <td>{debitNote.type_debit_note}</td>
                    <td>{formatDate(debitNote.issue_date)}</td>
                    <td>{debitNote.buyer_name}</td>
                    <td>${formatPrice(debitNote.subtotal)}</td>
                    <td>${formatPrice(debitNote.IVA_total)}</td>
                    <td>${formatPrice(debitNote.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay notas de débito generadas.</p>
      )}
      <h2>Notas de crédito</h2>
      {creditNotes.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de nota</th>
                <th>Tipo de nota</th>
                <th>Fecha de emisión</th>
                <th>Comprador</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {creditNotes.map((creditNote, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(creditNote.num_credit_note)}</td>
                    <td>{creditNote.type_credit_note}</td>
                    <td>{formatDate(creditNote.issue_date)}</td>
                    <td>{creditNote.buyer_name}</td>
                    <td>${formatPrice(creditNote.subtotal)}</td>
                    <td>${formatPrice(creditNote.IVA_total)}</td>
                    <td>${formatPrice(creditNote.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay notas de crédito generadas.</p>
      )}

      <h2>Cheques</h2>
      {cheques.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de cheque</th>
                <th>Banco</th>
                <th>Beneficiario</th>
                <th>Fecha de emisión</th>
                <th>Fecha de cobro</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              {cheques.map((cheque, index) => {
                let formattedCashDate;
                if (cheque.collection_date) {
                  formattedCashDate = formatDate(cheque.collection_date);
                } else {
                  formattedCashDate = "No corresponde";
                }
                let receiverName;
                if (cheque.receiver_name === "No corresponde") {
                  receiverName = "Al portador";
                } else {
                  receiverName = cheque.receiver_name;
                }
                return (
                  <tr key={index}>
                    <td>{cheque.cheque_num}</td>
                    <td>{cheque.bank_name}</td>
                    <td>{receiverName}</td>
                    <td>{formatDate(cheque.issue_date)}</td>
                    <td>{formattedCashDate}</td>
                    <td>${formatPrice(cheque.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay cheques generados.</p>
      )}
      <h2>Remitos</h2>
      {deliveryNotes.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Número de remito</th>
                <th>Tipo de remito</th>
                <th>Fecha de emisión</th>
                <th>Cliente</th>
                <th>Medio de transporte</th>
              </tr>
            </thead>
            <tbody>
              {deliveryNotes.map((deliveryNote, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDocNumber(deliveryNote.num_delivery_note)}</td>
                    <td>{deliveryNote.type_delivery_note}</td>
                    <td>{formatDate(deliveryNote.issue_date)}</td>
                    <td>{deliveryNote.buyer_name}</td>
                    <td>{deliveryNote.means_of_delivery}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay remitos generados.</p>
      )}
      <h2>Pagarés</h2>
      {promissoryNotes.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Fecha de emisión</th>
                <th>Fecha de vencimiento</th>
                <th>Beneficiario</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              {promissoryNotes.map((promissoryNote, index) => {
                let formattedDueDate;
                if (promissoryNote.manturity_date) {
                  formattedDueDate = formatDate(promissoryNote.manturity_date);
                } else if (promissoryNote.manturity_days) {
                  formattedDueDate = `${promissoryNote.manturity_days} días`;
                } else {
                  formattedDueDate = "A la vista";
                }
                return (
                  <tr key={index}>
                    <td>{formatDate(promissoryNote.issue_date)}</td>
                    <td>{formattedDueDate}</td>
                    <td>{promissoryNote.receiver_name}</td>
                    <td>${formatPrice(promissoryNote.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay pagarés generados.</p>
      )}

      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default ListDocs;
