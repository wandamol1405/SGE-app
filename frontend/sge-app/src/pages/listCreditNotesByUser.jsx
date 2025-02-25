import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import TableContainer from "../components/tableContainer";
import Input from "../components/input";
import formatDate from "../utils/formatDate";
import formatDocNumber from "../utils/formatDocNumber";
import formatPointSale from "../utils/formatPointSale";

function ListCreditNoteByUser() {
  const [creditNotes, setCreditNotes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getCreditNotes() {
      const response = await fetch("http://localhost:3000/creditNote");
      const data = await response.json();
      setCreditNotes(data.creditNotes);
    }
    getCreditNotes();
  }, []);

  const filteredCreditNotes = creditNotes.filter((creditNotes) =>
    creditNotes.User.company_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de notas de crédito emitidas</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredCreditNotes.map((creditNote) => {
          return (
            <section key={creditNote.num_credit_note}>
              <p>
                <strong>Punto de venta: </strong>
                {formatPointSale(creditNote.point_sale)}
              </p>
              <p>
                <strong>Número de nota de crédito:</strong>{" "}
                {formatDocNumber(creditNote.num_credit_note)}
              </p>
              <p>
                <strong>Fecha:</strong> {formatDate(creditNote.issue_date)}
              </p>
              <p>
                <strong>Empresa:</strong> {creditNote.User.company_name}
              </p>
              <p>
                <strong>Tipo de nota de crédito:</strong>{" "}
                {creditNote.type_credit_note}
              </p>
              <p>
                <strong>Condición de venta:</strong> {creditNote.sale_condition}
              </p>
              <p>
                <strong>Comprador:</strong> {creditNote.buyer_name}
              </p>
              <p>
                <strong>CUIT del comprador:</strong> {creditNote.buyer_cuit}
              </p>
              <p>
                <strong>Dirección del comprador:</strong>{" "}
                {creditNote.buyer_address}
              </p>
              <p>
                <strong>Condición ante el IVA del comprador:</strong>{" "}
                {creditNote.buyer_IVA_condition}
              </p>
              <TableContainer>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Precio total</th>
                </tr>
                {creditNote.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.product}</td>
                    <td>{detail.amount}</td>
                    <td>${detail.unit_price}</td>
                    <td>${detail.amount * detail.unit_price}</td>
                  </tr>
                ))}
              </TableContainer>
              <p>
                <strong>Subtotal:</strong> ${creditNote.subtotal}
              </p>
              <p>
                <strong>Total IVA:</strong> ${creditNote.IVA_total}
              </p>
              <p>
                <strong>Total:</strong> ${creditNote.total}
              </p>
            </section>
          );
        })}
      </ul>
      <Link to="/selectDocs">
        <BackButton>Volver</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default ListCreditNoteByUser;
