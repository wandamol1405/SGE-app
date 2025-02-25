import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import formatDate from "../utils/formatDate";
import Input from "../components/input";

function ListChequesByUser() {
  const [cheques, setCheques] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getCheques() {
      const response = await fetch("http://localhost:3000/cheque");
      const data = await response.json();
      setCheques(data.cheques);
    }
    getCheques();
  }, []);

  const filteredCheques = cheques.filter((cheque) =>
    cheque.User.company_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CheckContainer>
      <h2>Lista de cheques emitidos</h2>
      <Input
        type="text"
        placeholder="Filtrar por empresa"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredCheques.map((cheque) => {
          return (
            <section key={cheque.num_cheque}>
              <p>
                <strong>Número de cheque:</strong> {cheque.cheque_num}
              </p>
              <p>
                <strong>Fecha:</strong> {formatDate(cheque.issue_date)}
              </p>
              <p>
                <strong>Empresa:</strong> {cheque.User.company_name}
              </p>
              <p>
                <strong>Banco: </strong>
                {cheque.bank_name}
              </p>
              <p>
                <strong>Lugar de emisión: </strong>
                {cheque.issue_place}
              </p>
              <p>
                <strong>Tipo de cheque: </strong>
                {cheque.cheque_type}
              </p>
              <p>
                <strong>Modalidad de emisión: </strong>
                {cheque.emission_mode}
              </p>
              <p>
                <strong>¿Está certificado?: </strong>
                {cheque.certified ? "Si" : "No"}
              </p>
              <p>
                <strong>¿Está cruzado?: </strong>
                {cheque.crossed ? "Si" : "No"}
              </p>
              <p>
                <strong>Beneficiario: </strong>
                {cheque.receiver_name}
              </p>
              <p>
                <strong>Monto: </strong>
                {cheque.amount}
              </p>
              <p>
                <strong>Fecha de cobro:</strong>
                {cheque.collection_date
                  ? cheque.collection_date
                  : "No corresponde"}
              </p>
              <p>
                <strong>Número de cuenta: </strong>
                {cheque.account_number}
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

export default ListChequesByUser;
