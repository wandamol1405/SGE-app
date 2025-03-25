import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import Input from "../components/input";
import formatDate from "../utils/formatDate";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function ListPromissoryNotesByUser() {
  const [promissoryNotes, setPromissoryNotes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getPromissoryNotes() {
      const response = await fetch(`${API_URL}/promissoryNote`);
      const data = await response.json();
      setPromissoryNotes(data.promissoryNotes);
    }
    getPromissoryNotes();
  }, []);

  const filteredPromissoryNotes = promissoryNotes.filter((promissoryNote) =>
    promissoryNote.User.company_name
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de pagares emitidos</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredPromissoryNotes.map((promissoryNote) => {
          return (
            <section key={promissoryNote.num_promissoryNote}>
              <p>
                <strong>Fecha:</strong> {formatDate(promissoryNote.issue_date)}
              </p>
              <p>
                <strong>Empresa:</strong> {promissoryNote.User.company_name}
              </p>
              <p>
                <strong>Lugar de emisión:</strong>
                {promissoryNote.issue_place}
              </p>
              <p>
                <strong>Monto: </strong>${promissoryNote.amount}
              </p>
              {!promissoryNote.manturity_date &&
              !promissoryNote.manturity_days ? (
                <p>
                  <strong>Vencimiento: </strong>A la vista
                </p>
              ) : promissoryNote.manturity_date &&
                !promissoryNote.manturity_days ? (
                <p>
                  <strong>Vencimiento: </strong>
                  {formatDate(promissoryNote.manturity_date)}
                </p>
              ) : (
                <p>
                  <strong>Vencimiento: </strong>
                  {promissoryNote.manturity_days} días
                </p>
              )}
              <p>
                <strong>Beneficiario: </strong>
                {promissoryNote.receiver_name}
              </p>
              <p>
                <strong>Lugar de pago: </strong>
                {promissoryNote.pay_place}
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

export default ListPromissoryNotesByUser;
