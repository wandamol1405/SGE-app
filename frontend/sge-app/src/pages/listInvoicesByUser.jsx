import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import TableContainer from "../components/tableContainer";
import Input from "../components/input";

function ListInvoicesByUser() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getInvoices() {
      const response = await fetch("http://localhost:3000/invoice");
      const data = await response.json();
      setInvoices(data.invoices);
    }
    getInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.User.company_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de facturas emitidas</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredInvoices.map((invoice) => {
          const date = new Date(invoice.issue_date);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;
          const formattedInvoiceNumber = String(invoice.num_invoice).padStart(
            8,
            "0"
          );
          const formattedPointSale = String(invoice.point_sale).padStart(
            4,
            "0"
          );
          return (
            <section key={invoice.num_invoice}>
              <p>
                <strong>Punto de venta: </strong>
                {formattedPointSale}
              </p>
              <p>
                <strong>Número de factura:</strong> {formattedInvoiceNumber}
              </p>
              <p>
                <strong>Fecha:</strong> {formattedDate}
              </p>
              <p>
                <strong>Empresa:</strong> {invoice.User.company_name}
              </p>
              <p>
                <strong>Tipo de Factura:</strong> {invoice.type_invoice}
              </p>
              <p>
                <strong>Condición de venta:</strong> {invoice.sale_condition}
              </p>
              <p>
                <strong>Comprador:</strong> {invoice.buyer_name}
              </p>
              <p>
                <strong>CUIT del comprador:</strong> {invoice.buyer_cuit}
              </p>
              <p>
                <strong>Dirección del comprador:</strong>{" "}
                {invoice.buyer_address}
              </p>
              <p>
                <strong>Condición ante el IVA del comprador:</strong>{" "}
                {invoice.buyer_IVA_condition}
              </p>
              <TableContainer>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Precio total</th>
                </tr>
                {invoice.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.product}</td>
                    <td>{detail.amount}</td>
                    <td>${detail.sale_price}</td>
                    <td>${detail.amount * detail.sale_price}</td>
                  </tr>
                ))}
              </TableContainer>
              <p>
                <strong>Subtotal:</strong> ${invoice.subtotal}
              </p>
              <p>
                <strong>Total IVA:</strong> ${invoice.IVA_total}
              </p>
              <p>
                <strong>Total:</strong> ${invoice.total}
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

export default ListInvoicesByUser;
