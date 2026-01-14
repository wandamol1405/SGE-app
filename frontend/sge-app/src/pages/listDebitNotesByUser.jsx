import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import TableContainer from "../components/tableContainer";
import Input from "../components/input";
import formatDate from "../utils/formatDate";
import formatDocNumber from "../utils/formatDocNumber";
import formatPointSale from "../utils/formatPointSale";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function ListDebitNotesByUser() {
  const [debitNotes, setDebitNotes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getDebitNotes() {
      const response = await fetch(`${API_URL}/debitNote`);
      const data = await response.json();
      console.log(data);
      setDebitNotes(data.debitNotes);
    }
    getDebitNotes();
  }, []);

  const filteredDebitNotes = debitNotes.filter((debitNotes) =>
    debitNotes.User.company_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de notas de débito emitidas</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredDebitNotes.map((debitNote) => {
          return (
            <section key={debitNote.num_debit_note}>
              <p>
                <strong>Punto de venta: </strong>
                {formatPointSale(debitNote.point_sale)}
              </p>
              <p>
                <strong>Número de nota de débito:</strong>{" "}
                {formatDocNumber(debitNote.num_debit_note)}
              </p>
              <p>
                <strong>Fecha:</strong> {formatDate(debitNote.issue_date)}
              </p>
              <p>
                <strong>Empresa:</strong> {debitNote.User.company_name}
              </p>
              <p>
                <strong>Tipo de nota de débito:</strong>{" "}
                {debitNote.type_debit_note}
              </p>
              <p>
                <strong>Condición de venta:</strong> {debitNote.sale_condition}
              </p>
              <p>
                <strong>Comprador:</strong> {debitNote.buyer_name}
              </p>
              <p>
                <strong>CUIT del comprador:</strong> {debitNote.buyer_cuit}
              </p>
              <p>
                <strong>Dirección del comprador:</strong>{" "}
                {debitNote.buyer_address}
              </p>
              <p>
                <strong>Condición ante el IVA del comprador:</strong>{" "}
                {debitNote.buyer_IVA_condition}
              </p>
              <TableContainer>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Precio total</th>
                </tr>
                {debitNote.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.product}</td>
                    <td>{detail.amount}</td>
                    <td>${detail.unit_price}</td>
                    <td>${detail.amount * detail.unit_price}</td>
                  </tr>
                ))}
              </TableContainer>
              <p>
                <strong>Subtotal:</strong> ${debitNote.subtotal}
              </p>
              <p>
                <strong>Total IVA:</strong> ${debitNote.IVA_total}
              </p>
              <p>
                <strong>Total:</strong> ${debitNote.total}
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

export default ListDebitNotesByUser;
