import React, { useState, useEffect } from "react";
import { useCheque } from "../context/ChequeContext";
import CheckContainer from "../components/checkContainer";
import NextButton from "../components/nextButton";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function CheckCheque() {
  const { cheque = { data: {} } } = useCheque() || {};
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [company, setCompany] = useState({});
  const { user } = useLogin();

  useEffect(() => {
    async function getCompany() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response);
    }
    getCompany();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCheque = {
        cheque_type: cheque.data.type_cheque,
        cheque_num: cheque.data.cheque_num,
        bank_name: cheque.data.bank_name,
        issue_date: cheque.data.issue_date,
        issue_place: cheque.data.issue_place,
        emission_mode: cheque.data.emission_mode,
        certified: cheque.data.certificated,
        crossed: cheque.data.crossed,
        receiver_name: cheque.data.receiver_name,
        amount: cheque.data.amount,
        collection_date: cheque.data.collection_date,
        account_number: cheque.data.account_number,
        id_company: company.id_user,
      };
      const response = await fetch("http://localhost:3000/cheque", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCheque),
      });
      if (response.ok) {
        const responsePDF = await fetch(
          "http://localhost:3000/cheque/generate-pdf",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCheque),
          }
        );
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `cheque-${company.company_name}-${newCheque.receiver_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          alert("Error al generar el PDF");
        }
      } else {
        alert("Error al guardar el cheque");
      }
    } catch {
      setError((prev) => ({
        ...prev,
        form: { message: "Error al guardar el cheque" },
      }));

      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <CheckContainer>
      <h1>Revisar Cheque</h1>
      <h2>Tipo de cheque</h2>
      <section>
        <p>
          <strong>Tipo de cheque:</strong> {cheque.data.type_cheque}
        </p>
        <p>
          <strong>Modalidad de emisión</strong> {cheque.data.emission_mode}
        </p>
        <p>
          <strong>¿Está certificado?:</strong>{" "}
          {cheque.data.certificated ? "Sí" : "No"}
        </p>
        <p>
          <strong>¿Está cruzado?</strong> {cheque.data.crossed ? "Sí" : "No"}
        </p>
      </section>

      <h2>Datos del cheque</h2>
      <section>
        <p>
          <strong>Número de cheque: </strong> {cheque.data.cheque_num}
        </p>
        <p>
          <strong>Banco: </strong> {cheque.data.bank_name}
        </p>
        <p>
          <strong>Fecha de emisión: </strong> {cheque.data.issue_date}
        </p>
        <p>
          <strong>Lugar de emisión: </strong>
          {cheque.data.issue_place}
        </p>
        <p>
          <strong>Nombre del beneficiario: </strong>
          {cheque.data.receiver_name}
        </p>
        <p>
          <strong>Fecha de cobro:</strong>
          {cheque.data.collection_date}
        </p>
      </section>

      {error.form && <p style={{ color: "red" }}>{error.form.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <NextButton onClick={() => navigate("/createCheque")}>Volver</NextButton>
    </CheckContainer>
  );
}

export default CheckCheque;
