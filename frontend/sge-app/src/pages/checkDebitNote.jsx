import React, { useState, useEffect } from "react";
import { useDebitNote } from "../context/DebitNoteContext";
import CheckContainer from "../components/checkContainer";
import NextButton from "../components/nextButton";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function CheckDebitNote() {
  const { debitNote = { header: {}, client: {}, details: [] } } =
    useDebitNote() || {};
  const navigate = useNavigate();
  const details = Array.isArray(debitNote.details)
    ? debitNote.details.filter(
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
      const newDebitNote = {
        type_debit_note: debitNote.header.type_debit_note,
        point_sale: debitNote.header.point_sale,
        issue_date: debitNote.header.issue_date,
        buyer_name: debitNote.client.buyer_name,
        buyer_address: debitNote.client.buyer_address,
        buyer_cuit: debitNote.client.buyer_cuit,
        id_company: company.id_user,
        sale_condition: debitNote.header.sale_condition,
        buyer_IVA_condition: debitNote.client.buyer_iva,
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
      const response = await fetch("http://localhost:3000/debitNote", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDebitNote),
      });
      if (response.ok) {
        newDebitNote.company = company;
        const responsePDF = await fetch(
          "http://localhost:3000/debitNote/generate-pdf",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newDebitNote),
          }
        );
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `nota_de_débito-${company.company_name}-${newDebitNote.buyer_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          navigate("/listDocs");
        } else {
          alert("Error al generar el PDF");
        }
      } else {
        alert("Error al guardar la nota de débito");
      }
    } catch {
      setError((prev) => ({
        ...prev,
        form: { message: "Error al guardar la nota de débito" },
      }));

      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <CheckContainer>
      <h1>Revisar Nota de Débito</h1>
      <h2>Datos de la nota</h2>
      <section>
        <p>
          <strong>Tipo de nota:</strong> {debitNote.header.type_debitNote}
        </p>
        <p>
          <strong>Punto de venta:</strong> {debitNote.header.point_sale}
        </p>
        <p>
          <strong>Fecha de emisión:</strong> {debitNote.header.issue_date}
        </p>
        <p>
          <strong>Condición de venta:</strong> {debitNote.header.sale_condition}
        </p>
      </section>

      <h2>Datos del Cliente</h2>
      <section>
        <p>
          <strong>Nombre:</strong> {debitNote.client.buyer_name}
        </p>
        <p>
          <strong>CUIT:</strong> {debitNote.client.buyer_cuit}
        </p>
        <p>
          <strong>Dirección: </strong> {debitNote.client.buyer_address}
        </p>
        <p>
          <strong>Condicion frente al IVA: </strong>
          {debitNote.client.buyer_iva}
        </p>
      </section>

      <h2>Detalle de la actualización</h2>
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
                <td>{row.unit_price || ""}</td>
                <td>
                  {row.unit_price && row.amount
                    ? row.unit_price * row.amount
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay detalles de compra disponibles.</p>
      )}

      <h2>Resumen de la actualización</h2>
      <section>
        <p>
          <strong>Subtotal:</strong>{" "}
          {"$" +
            details.reduce((acc, row) => acc + row.amount * row.unit_price, 0)}
        </p>
        <p>
          <strong>IVA:</strong>{" "}
          {"$" +
            details.reduce((acc, row) => acc + row.amount * row.unit_price, 0) *
              0.21}
        </p>
        <p>
          <strong>Total:</strong>{" "}
          {"$" +
            details.reduce((acc, row) => acc + row.amount * row.unit_price, 0) *
              1.21}
        </p>
      </section>
      {error.form && <p style={{ color: "red" }}>{error.form.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <NextButton onClick={() => navigate("/createDebitNote-details")}>
        Volver
      </NextButton>
    </CheckContainer>
  );
}

export default CheckDebitNote;
