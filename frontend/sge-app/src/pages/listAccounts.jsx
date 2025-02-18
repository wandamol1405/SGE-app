import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../components/backButton";

function ListDocs() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccounts() {
      const result = await fetch(`http://localhost:3000/account/`, {
        method: "GET",
      });
      const response = await result.json();
      console.log(response);

      setAccounts(response.accounts || []);
    }
    getAccounts();
  }, []);

  return (
    <CheckContainer>
      <h1>Cuentas</h1>
      {accounts.length > 0 ? (
        <section>
          <table>
            <thead>
              <tr>
                <th>Cuenta</th>
                <th>Tipo de cuenta</th>
                <th>Ultima actualización</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => {
                return (
                  <tr key={index}>
                    <td>{account.name}</td>
                    <td>{account.type}</td>
                    <td>{account.updatedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>No hay facturas generadas.</p>
      )}
      <Link to="/updateAccounts">
        <BackButton>Volver</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default ListDocs;
