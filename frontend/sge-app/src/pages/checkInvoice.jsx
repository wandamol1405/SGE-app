import React, { useState, useEffect } from "react";
import { useInvoice } from "../context/InvoiceContext";
import CheckContainer from "../components/checkContainer";
import NextButton from "../components/nextButton";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function CheckInvoice() {
  const { invoice = { header: {}, client: {}, details: [] } } =
    useInvoice() || {};
  const navigate = useNavigate();
  const details = Array.isArray(invoice.details)
    ? invoice.details.filter(
        (detail) =>
          detail.amount !== "" &&
          detail.product !== "" &&
          detail.sale_price !== ""
      )
    : [];
  const [error, setError] = useState({});
  const [company, setCompany] = useState({});
  const { user } = useLogin();

  useEffect(() => {
    async function getCompany() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInvoice = {
        type_invoice: invoice.header.type_invoice,
        point_sale: invoice.header.point_sale,
        issue_date: invoice.header.issue_date,
        buyer_name: invoice.client.buyer_name,
        buyer_address: invoice.client.buyer_address,
        buyer_cuit: invoice.client.buyer_cuit,
        id_company: company.id_user,
        sale_condition: invoice.header.sale_condition,
        buyer_IVA_condition: invoice.client.buyer_iva,
        details: details,
        subtotal: details.reduce(
          (acc, row) => acc + row.amount * row.sale_price,
          0
        ),
        IVA_total:
          details.reduce((acc, row) => acc + row.amount * row.sale_price, 0) *
          0.21,
        total:
          details.reduce((acc, row) => acc + row.amount * row.sale_price, 0) *
          1.21,
      };
      const response = await fetch("http://localhost:3000/invoice", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      });
      if (response.ok) {
        newInvoice.company = company;
        const responsePDF = await fetch(
          "http://localhost:3000/invoice/generate-pdf",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newInvoice),
          }
        );
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `factura-${company.company_name}-${newInvoice.buyer_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          navigate("/listDocs");
        } else {
          alert("Error al generar el PDF");
        }
      } else {
        alert("Error al guardar la factura");
      }
    } catch {
      setError((prev) => ({
        ...prev,
        form: { message: "Error al guardar la factura" },
      }));

      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <CheckContainer>
      <h1>Revisar Factura</h1>
      <h2>Datos de la Factura</h2>
      <section>
        <p>
          <strong>Tipo de factura:</strong> {invoice.header.type_invoice}
        </p>
        <p>
          <strong>Punto de venta:</strong> {invoice.header.point_sale}
        </p>
        <p>
          <strong>Fecha de emisión:</strong> {invoice.header.issue_date}
        </p>
        <p>
          <strong>Condición de venta:</strong> {invoice.header.sale_condition}
        </p>
      </section>

      <h2>Datos del Cliente</h2>
      <section>
        <p>
          <strong>Nombre:</strong> {invoice.client.buyer_name}
        </p>
        <p>
          <strong>CUIT:</strong> {invoice.client.buyer_cuit}
        </p>
        <p>
          <strong>Dirección: </strong> {invoice.client.buyer_address}
        </p>
        <p>
          <strong>Condicion frente al IVA: </strong>
          {invoice.client.buyer_iva}
        </p>
      </section>

      <h2>Detalle de la compra</h2>
      {details.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Detalle</th>
              <th>Precio unitario</th>
              <th>Precio total</th>
            </tr>
          </thead>
          <tbody>
            {details.map((row, index) => (
              <tr key={index}>
                <td>{row.amount || ""}</td>
                <td>{row.product}</td>
                <td>{row.sale_price || ""}</td>
                <td>
                  {row.sale_price && row.amount
                    ? row.sale_price * row.amount
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay detalles de compra disponibles.</p>
      )}

      <h2>Resumen de la compra</h2>
      <section>
        <p>
          <strong>Subtotal:</strong>{" "}
          {"$" +
            details.reduce((acc, row) => acc + row.amount * row.sale_price, 0)}
        </p>
        <p>
          <strong>IVA:</strong>{" "}
          {"$" +
            details.reduce((acc, row) => acc + row.amount * row.sale_price, 0) *
              0.21}
        </p>
        <p>
          <strong>Total:</strong>{" "}
          {"$" +
            details.reduce((acc, row) => acc + row.amount * row.sale_price, 0) *
              1.21}
        </p>
      </section>
      {error.form && <p style={{ color: "red" }}>{error.form.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <NextButton onClick={() => navigate("/createInvoice-details")}>
        Volver
      </NextButton>
    </CheckContainer>
  );
}

export default CheckInvoice;
