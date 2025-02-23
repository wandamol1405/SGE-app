import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import TableContainer from "../components/tableContainer";
import Input from "../components/input";

function ListDeliveryNoteByUser() {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getDeliveryNotes() {
      const response = await fetch("http://localhost:3000/deliveryNote");
      const data = await response.json();
      setDeliveryNotes(data.deliveryNotes);
    }
    getDeliveryNotes();
  }, []);

  const filteredDeliveryNotes = deliveryNotes.filter((deliveryNote) =>
    deliveryNote.User.company_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de remitos emitidos</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredDeliveryNotes.map((deliveryNote) => {
          const date = new Date(deliveryNote.issue_date);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;
          const formattedDeliveryNoteNumber = String(
            deliveryNote.num_delivery_note
          ).padStart(8, "0");
          const formattedPointSale = String(deliveryNote.point_sale).padStart(
            4,
            "0"
          );
          return (
            <section key={deliveryNote.num_delivery_note}>
              <p>
                <strong>Punto de venta: </strong>
                {formattedPointSale}
              </p>
              <p>
                <strong>Número de remito:</strong> {formattedDeliveryNoteNumber}
              </p>
              <p>
                <strong>Fecha:</strong> {formattedDate}
              </p>
              <p>
                <strong>Empresa:</strong> {deliveryNote.User.company_name}
              </p>
              <p>
                <strong>Tipo de remito:</strong>{" "}
                {deliveryNote.type_delivery_note}
              </p>
              <p>
                <strong>Condición de venta:</strong>{" "}
                {deliveryNote.sale_condition}
              </p>
              <p>
                <strong>Comprador:</strong> {deliveryNote.buyer_name}
              </p>
              <p>
                <strong>CUIT del comprador:</strong> {deliveryNote.buyer_cuit}
              </p>
              <p>
                <strong>Dirección del comprador:</strong>{" "}
                {deliveryNote.buyer_address}
              </p>
              <p>
                <strong>Condición ante el IVA del comprador:</strong>{" "}
                {deliveryNote.buyer_IVA_condition}
              </p>
              <TableContainer>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Precio total</th>
                </tr>
                {deliveryNote.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.product}</td>
                    <td>{detail.amount}</td>
                    <td>${detail.unit_price}</td>
                    <td>${detail.amount * detail.unit_price}</td>
                  </tr>
                ))}
              </TableContainer>
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

export default ListDeliveryNoteByUser;
