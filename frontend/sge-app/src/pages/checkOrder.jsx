import React, { useState, useEffect } from "react";
import { useBuyOrder } from "../context/BuyOrderContext";
import NextButton from "../components/nextButton";
import CheckContainer from "../components/checkContainer";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import BackButton from "../components/backButton";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function CheckOrder() {
  const {
    buyOrder = { header: {}, supplier: {}, details: [] },
    resetBuyOrder,
  } = useBuyOrder() || {};
  const navigate = useNavigate();
  const details = Array.isArray(buyOrder.details)
    ? buyOrder.details.filter(
        (detail) =>
          detail.amount !== "" &&
          detail.product !== "" &&
          detail.unit_price !== ""
      )
    : [];
  const [error, setError] = useState({});
  const [company, setCompany] = useState({});
  const { user } = useLogin();

  useEffect(() => {
    async function getCompany() {
      const result = await fetch(`${API_URL}/users/find/${user}`);
      const response = await result.json();
      setCompany(response.user);
    }

    getCompany();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        issue_date: buyOrder.header.issue_date,
        delivery_date: buyOrder.header.delivery_date,
        sale_condition: buyOrder.header.sale_condition,
        id_company: company.id_user,
        supplier_name: buyOrder.supplier.supplier_name,
        supplier_address: buyOrder.supplier.supplier_address,
        supplier_cuit: buyOrder.supplier.supplier_cuit,
        supplier_condition: buyOrder.supplier.supplier_condition,
        details: details,
        total: details.reduce(
          (acc, row) => acc + row.amount * row.unit_price,
          0
        ),
      };
      const response = await fetch(`${API_URL}/buyOrder`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      if (response.ok) {
        newOrder.company = company;
        const responsePDF = await fetch(`${API_URL}/buyOrder/generate-pdf`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        });
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `orden_compra-${company.company_name}-${newOrder.supplier_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.open(url, "_blank");
          window.URL.revokeObjectURL(url);
          navigate("/listDocs");
          resetBuyOrder();
        } else {
          setError((prev) => ({ ...prev, message: "Error al crear el PDF" }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          message: "Error al crear la orden de compra",
        }));
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        message: "Error al crear la orden de compra",
      }));
      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <CheckContainer>
      <h1>Revisar orden de compra</h1>

      <h2>Datos de la orden de compra</h2>
      <section>
        <p>
          <strong>Fecha de emisión: </strong>{" "}
          {formatDate(buyOrder.header.issue_date)}
        </p>
        <p>
          <strong>Fecha de entrega: </strong>{" "}
          {formatDate(buyOrder.header.delivery_date)}
        </p>
        <p>
          <strong>Condición de venta: </strong> {buyOrder.header.sale_condition}
        </p>
      </section>

      <h2>Datos del proveedor</h2>
      <section>
        <p>
          <strong>Nombre: </strong> {buyOrder.supplier.supplier_name}
        </p>
        <p>
          <strong>Dirección: </strong> {buyOrder.supplier.supplier_address}
        </p>
        <p>
          <strong>CUIT:</strong> {buyOrder.supplier.supplier_cuit}
        </p>
      </section>

      <h2>Detalle de la orden</h2>
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
                <td>{formatPrice(row.unit_price) || ""}</td>
                <td>
                  {row.unit_price && row.amount
                    ? formatPrice(row.unit_price * row.amount)
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay detalles de compra disponibles.</p>
      )}
      <h2>Resumen de la orden</h2>
      <section>
        <p>
          <strong>Total:</strong>{" "}
          {"$" +
            formatPrice(
              details.reduce((acc, row) => acc + row.amount * row.unit_price, 0)
            )}
        </p>
      </section>

      {error.message && <p style={{ color: "red" }}>{error.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <Link to="/createOrder-details">
        <BackButton>Volver</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default CheckOrder;
