import React, { useState, useEffect } from "react";
import { useDeliveryNote } from "../context/DeliveryNoteContext";
import CheckContainer from "../components/checkContainer";
import NextButton from "../components/nextButton";
import useLogin from "../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../components/backButton";
import formatPointSale from "../utils/formatPointSale";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";

function CheckDeliveryNote() {
  const {
    deliveryNote = { header: {}, client: {}, details: [] },
    resetDeliveryNote,
  } = useDeliveryNote() || {};
  const navigate = useNavigate();
  const details = Array.isArray(deliveryNote.details)
    ? deliveryNote.details.filter(
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
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDeliveryNote = {
        type_delivery_note: deliveryNote.header.type_delivery_note,
        point_sale: deliveryNote.header.point_sale,
        issue_date: deliveryNote.header.issue_date,
        buyer_name: deliveryNote.client.buyer_name,
        buyer_address: deliveryNote.client.buyer_address,
        buyer_cuit: deliveryNote.client.buyer_cuit,
        id_company: company.id_user,
        sale_condition: deliveryNote.header.sale_condition,
        buyer_IVA_condition: deliveryNote.client.buyer_iva,
        means_of_delivery: deliveryNote.header.means_of_delivery,
        observation: deliveryNote.header.observation,
        details: details,
        subtotal: details.reduce(
          (acc, row) => acc + row.amount * row.unit_price,
          0
        ),
        IVA_total:
          details.reduce((acc, row) => acc + row.amount * row.unit_price, 0) *
          0.21,
        total:
          details.reduce((acc, row) => acc + row.amount * row.unit_price, 0) *
          1.21,
      };
      const response = await fetch("http://localhost:3000/deliveryNote", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeliveryNote),
      });
      if (response.ok) {
        newDeliveryNote.company = company;
        const responsePDF = await fetch(
          "http://localhost:3000/deliveryNote/generate-pdf",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newDeliveryNote),
          }
        );
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `remito-${company.company_name}-${newDeliveryNote.buyer_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.open(url, "_blank");
          window.URL.revokeObjectURL(url);
          resetDeliveryNote();
          navigate("/listDocs");
        } else {
          alert("Error al generar el PDF");
        }
      } else {
        alert("Error al guardar el remito");
      }
    } catch {
      setError((prev) => ({
        ...prev,
        form: { message: "Error al guardar el remito" },
      }));

      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <CheckContainer>
      <h1>Revisar Remito</h1>
      <h2>Datos de la nota</h2>
      <section>
        <p>
          <strong>Tipo de remito:</strong>{" "}
          {deliveryNote.header.type_delivery_note}
        </p>
        <p>
          <strong>Punto de venta:</strong>{" "}
          {formatPointSale(deliveryNote.header.point_sale)}
        </p>
        <p>
          <strong>Fecha de emisión:</strong>{" "}
          {formatDate(deliveryNote.header.issue_date)}
        </p>
        <p>
          <strong>Condición de venta:</strong>{" "}
          {deliveryNote.header.sale_condition}
        </p>
        <p>
          <strong>Medio de entrega:</strong>{" "}
          {deliveryNote.header.means_of_delivery}
        </p>
        <p>
          <strong>Observaciones:</strong> {deliveryNote.header.observation}
        </p>
      </section>

      <h2>Datos del receptor</h2>
      <section>
        <p>
          <strong>Nombre:</strong> {deliveryNote.client.buyer_name}
        </p>
        <p>
          <strong>CUIT:</strong> {deliveryNote.client.buyer_cuit}
        </p>
        <p>
          <strong>Dirección: </strong> {deliveryNote.client.buyer_address}
        </p>
        <p>
          <strong>Condicion frente al IVA: </strong>
          {deliveryNote.client.buyer_iva}
        </p>
      </section>

      <h2>Detalle del envío</h2>
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

      {error.form && <p style={{ color: "red" }}>{error.form.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <Link to="/createDeliveryNote-details">
        <BackButton>Volver</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default CheckDeliveryNote;
