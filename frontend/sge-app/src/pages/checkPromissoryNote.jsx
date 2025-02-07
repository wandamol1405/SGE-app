import React, { useState, useEffect } from "react";
import { usePromissoryNote } from "../context/PromissoryNoteContext";
import CheckContainer from "../components/checkContainer";
import NextButton from "../components/nextButton";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function CheckPromissoryNote() {
  const { promissoryNote = { data: {} } } = usePromissoryNote() || {};
  const navigate = useNavigate();
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
      const newPromissoryNote = {
        issue_date: promissoryNote.data.issue_date,
        id_company: company.id_user,
        amount: promissoryNote.data.amount,
        issue_place: promissoryNote.data.issue_place,
        manturity_date: promissoryNote.data.manturity_date,
        manturity_days: promissoryNote.data.manturity_days,
        manturity_type: promissoryNote.data.manturity_type,
        pay_place: promissoryNote.data.pay_place,
        receiver_name: promissoryNote.data.receiver_name,
      };
      const response = await fetch("http://localhost:3000/promissoryNote", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPromissoryNote),
      });
      if (response.ok) {
        const responsePDF = await fetch(
          "http://localhost:3000/promissoryNote/generate-pdf",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPromissoryNote),
          }
        );
        if (responsePDF.ok) {
          const blob = await responsePDF.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `pagaré-${company.company_name}-${newPromissoryNote.receiver_name}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          alert("Error al generar el PDF");
        }
      } else {
        alert("Error al guardar el pagaré");
      }
    } catch {
      setError((prev) => ({
        ...prev,
        form: { message: "Error al guardar el pagaré" },
      }));

      setTimeout(() => {
        setError((prev) => ({ ...prev, form: null }));
      }, 3000);
    }
  };

  return (
    <CheckContainer>
      <h1>Revisar Pagaré</h1>
      <h2>Datos del pagaré</h2>
      <section>
        <p>
          <strong>Fecha de emisión: </strong> {promissoryNote.data.issue_date}
        </p>
        <p>
          <strong>Lugar de emisión: </strong> {promissoryNote.data.issue_place}
        </p>
        <p>
          <strong>Nombre del receptor: </strong>{" "}
          {promissoryNote.data.receiver_name}
        </p>
        <p>
          <strong>Monto: </strong> {promissoryNote.data.amount}
        </p>
        {promissoryNote.data.manturity_type === "Día fijo" && (
          <p>
            <strong>Fecha de vencimiento: </strong>{" "}
            {promissoryNote.data.manturity_date}
          </p>
        )}
        {promissoryNote.data.manturity_type === "Tantos días" && (
          <p>
            <strong>Vencimiento: a </strong>{" "}
            {promissoryNote.data.manturity_days} días
          </p>
        )}
        {promissoryNote.data.manturity_type === "A la vista" && (
          <p>
            <strong>Fecha de vencimiento: </strong> A la vista
          </p>
        )}
        <p>
          <strong>Lugar de pago: </strong> {promissoryNote.data.pay_place}
        </p>
      </section>

      {error.form && <p style={{ color: "red" }}>{error.form.message}</p>}
      <NextButton onClick={handleSubmit}>Guardar e imprimir</NextButton>
      <NextButton onClick={() => navigate("/createPromissoryNote")}>
        Volver
      </NextButton>
    </CheckContainer>
  );
}

export default CheckPromissoryNote;
