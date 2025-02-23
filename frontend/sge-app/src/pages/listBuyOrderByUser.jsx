import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import TableContainer from "../components/tableContainer";
import Input from "../components/input";

function ListBuyOrderByUser() {
  const [buyOrders, setBuyOrders] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getBuyOrder() {
      const response = await fetch("http://localhost:3000/buyOrder");
      const data = await response.json();
      setBuyOrders(data.buyOrders);
    }
    getBuyOrder();
  }, []);

  const filteredBuyOrders = buyOrders.filter((buyOrder) =>
    buyOrder.User.company_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de órdenes de compra emitidas</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {buyOrders.map((buyOrder) => {
          const date = new Date(buyOrder.issue_date);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;
          const formattedBuyOrderNumber = String(
            buyOrder.order_number
          ).padStart(8, "0");
          return (
            <section>
              <p>
                <strong>Número de órden de compra:</strong>{" "}
                {formattedBuyOrderNumber}
              </p>
              <p>
                <strong>Fecha:</strong> {formattedDate}
              </p>
              <p>
                <strong>Empresa:</strong> {buyOrder.User.company_name}
              </p>
              <p>
                <strong>Condición de venta: </strong>
                {buyOrder.sale_condition}
              </p>
              <p>
                <strong>Proveedor: </strong>
                {buyOrder.supplier_name}
              </p>
              <p>
                <strong>CUIT del proveedor: </strong>
                {buyOrder.supplier_cuit}
              </p>
              <p>
                <strong>Dirección del proveedor: </strong>
                {buyOrder.supplier_address}
              </p>
              <p>
                <strong>Condición ante el IVA del proveedor: </strong>
                {buyOrder.supplier_condition}
              </p>
              <TableContainer>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Precio total</th>
                </tr>
                {buyOrder.details.map((detail) => (
                  <tr>
                    <td>{detail.product}</td>
                    <td>{detail.amount}</td>
                    <td>${detail.unit_price}</td>
                    <td>${detail.amount * detail.unit_price}</td>
                  </tr>
                ))}
              </TableContainer>
              <p>
                <strong>Total:</strong> ${buyOrder.total}
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

export default ListBuyOrderByUser;
