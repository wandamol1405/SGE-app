import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";

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
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  useEffect(() => {
    async function getInvoices() {
      const result = await fetch(
        `http://localhost:3000/invoice/find/` + company.id_user
      );
      const response = await result.json();

      setInvoices(response.invoices || []);
    }
    if (company.id_user) {
      getInvoices();
    }

    async function getBuyOrders() {
      const result = await fetch(
        `http://localhost:3000/buyOrder/find/` + company.id_user
      );
      const response = await result.json();
      setBuyOrders(response.buyOrders || []);
    }
    if (company.id_user) {
      getBuyOrders();
    }

    async function getDebitNotes() {
      const result = await fetch(
        `http://localhost:3000/debitNote/find/` + company.id_user
      );
      const response = await result.json();
      setDebitNotes(response.debitNotes || []);
    }
    if (company.id_user) {
      getDebitNotes();
    }

    async function getCreditNotes() {
      const result = await fetch(
        `http://localhost:3000/creditNote/find/` + company.id_user
      );
      const response = await result.json();
      setCreditNotes(response.creditNotes || []);
    }
    if (company.id_user) {
      getCreditNotes();
    }

    async function getCheques() {
      const result = await fetch(
        `http://localhost:3000/cheque/find/` + company.id_user
      );
      const response = await result.json();
      setCheques(response.cheques || []);
    }
    if (company.id_user) {
      getCheques();
    }

    async function getDeliveryNotes() {
      const result = await fetch(
        `http://localhost:3000/deliveryNote/find/` + company.id_user
      );
      const response = await result.json();
      console.log(response);
      setDeliveryNotes(response.deliveryNotes || []);
    }
    if (company.id_user) {
      getDeliveryNotes();
    }

    async function getPromissoryNotes() {
      const result = await fetch(
        `http://localhost:3000/promissoryNote/find/` + company.id_user
      );
      const response = await result.json();
      setPromissoryNotes(response.promissoryNotes || []);
    }
    if (company.id_user) {
      getPromissoryNotes();
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
                <th>Fecha de emisión</th>
                <th>Comprador</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
                const date = new Date(invoice.issue_date);
                const formattedDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date.getFullYear()}`;
                return (
                  <tr key={index}>
                    <td>{invoice.num_invoice}</td>
                    <td>{formattedDate}</td>
                    <td>{invoice.buyer_name}</td>
                    <td>
                      $
                      {invoice.subtotal.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {invoice.IVA_total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {invoice.total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
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
                const date = new Date(buyOrder.issue_date);
                const formattedIssueDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date.getFullYear()}`;
                const deliveryDate = new Date(buyOrder.delivery_date);
                const formattedDeliveryDate = `${deliveryDate
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(deliveryDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${deliveryDate.getFullYear()}`;
                return (
                  <tr key={index}>
                    <td>{buyOrder.order_number}</td>
                    <td>{formattedIssueDate}</td>
                    <td>{formattedDeliveryDate}</td>
                    <td>{buyOrder.supplier_name}</td>
                    <td>
                      $
                      {buyOrder.total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
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
                <th>Fecha de emisión</th>
                <th>Comprador</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {debitNotes.map((debitNote, index) => {
                const date = new Date(debitNote.issue_date);
                const formattedDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date.getFullYear()}`;
                return (
                  <tr key={index}>
                    <td>{debitNote.num_debit_note}</td>
                    <td>{formattedDate}</td>
                    <td>{debitNote.buyer_name}</td>
                    <td>
                      $
                      {debitNote.subtotal.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {debitNote.IVA_total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {debitNote.total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
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
                <th>Fecha de emisión</th>
                <th>Comprador</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Importe total</th>
              </tr>
            </thead>
            <tbody>
              {creditNotes.map((creditNote, index) => {
                const date = new Date(creditNote.issue_date);
                const formattedDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date.getFullYear()}`;
                return (
                  <tr key={index}>
                    <td>{creditNote.num_credit_note}</td>
                    <td>{formattedDate}</td>
                    <td>{creditNote.buyer_name}</td>
                    <td>
                      $
                      {creditNote.subtotal.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {creditNote.IVA_total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {creditNote.total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
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
                const issueDate = new Date(cheque.issue_date);
                const formattedIssueDate = `${issueDate
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(issueDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${issueDate.getFullYear()}`;
                const cashDate = new Date(cheque.collection_date);
                let formattedCashDate;
                if (cheque.collection_date) {
                  formattedCashDate = `${cashDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${(cashDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${cashDate.getFullYear()}`;
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
                    <td>{formattedIssueDate}</td>
                    <td>{formattedCashDate}</td>
                    <td>
                      $
                      {cheque.amount.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
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
                <th>Fecha de emisión</th>
                <th>Cliente</th>
                <th>Medio de transporte</th>
              </tr>
            </thead>
            <tbody>
              {deliveryNotes.map((deliveryNote, index) => {
                const date = new Date(deliveryNote.issue_date);
                const formattedDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date.getFullYear()}`;
                return (
                  <tr key={index}>
                    <td>{deliveryNote.num_delivery_note}</td>
                    <td>{formattedDate}</td>
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
                const issueDate = new Date(promissoryNote.issue_date);
                const formattedIssueDate = `${issueDate
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(issueDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${issueDate.getFullYear()}`;
                let formattedDueDate;
                if (promissoryNote.manturity_date) {
                  const dueDate = new Date(promissoryNote.manturity_date);
                  formattedDueDate = `${dueDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${(dueDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${dueDate.getFullYear()}`;
                } else if (promissoryNote.manturity_days) {
                  formattedDueDate = `${promissoryNote.manturity_days} días`;
                } else {
                  formattedDueDate = "A la vista";
                }
                return (
                  <tr key={index}>
                    <td>{formattedIssueDate}</td>
                    <td>{formattedDueDate}</td>
                    <td>{promissoryNote.receiver_name}</td>
                    <td>
                      $
                      {promissoryNote.amount.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
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
