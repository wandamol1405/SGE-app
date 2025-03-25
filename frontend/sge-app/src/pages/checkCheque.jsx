import React, { useState, useEffect } from "react";
import { useCheque } from "../context/ChequeContext";
import CheckContainer from "../components/checkContainer";
import NextButton from "../components/nextButton";
import useLogin from "../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../components/backButton";
import formatPrice from "../utils/formatPrice";
import formatDate from "../utils/formatDate";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function CheckCheque() {
  const { cheque = { data: {} }, resetCheque } = useCheque() || {};
  const navigate = useNavigate();
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
      const response = await fetch(`${API_URL}/cheque`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCheque),
      });
      if (response.ok) {
        const responsePDF = await fetch(`${API_URL}/cheque/generate-pdf`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCheque),
        });
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `cheque-${company.company_name}-${newCheque.receiver_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.open(url, "_blank");
          window.URL.revokeObjectURL(url);
          resetCheque();
          navigate("/listDocs");
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
          <strong>Tipo de cheque: </strong> {cheque.data.type_cheque}
        </p>
        <p>
          <strong>Modalidad de emisión: </strong> {cheque.data.emission_mode}
        </p>
        <p>
          <strong>¿Está certificado?: </strong>
          {cheque.data.certificated}
        </p>
        <p>
          <strong>¿Está cruzado?: </strong> {cheque.data.crossed}
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
          <strong>Fecha de emisión: </strong>{" "}
          {formatDate(cheque.data.issue_date)}
        </p>
        <p>
          <strong>Lugar de emisión: </strong>
          {cheque.data.issue_place}
        </p>
        <p>
          <strong>Monto: </strong> ${formatPrice(cheque.data.amount)}
        </p>
        <p>
          <strong>Nombre del beneficiario: </strong>
          {cheque.data.receiver_name}
        </p>
        <p>
          <strong>Fecha de cobro: </strong>
          {cheque.data.collection_date === "No corresponde"
            ? cheque.data.collection_date
            : formatDate(cheque.data.collection_date)}
        </p>
      </section>

      {error.form && <p style={{ color: "red" }}>{error.form.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <Link to="/createCheque">
        <BackButton>Volver</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default CheckCheque;
