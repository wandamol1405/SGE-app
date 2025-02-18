import React, { useState, useEffect } from "react";
import CheckContainer from "../components/checkContainer";
import TableContainer from "../components/tableContainer";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../components/backButton";
import useLogin from "../hooks/useLogin";

function ListJournalEntries() {
  const [journalEntries, setJournalEntries] = useState([]);
  const navigate = useNavigate();
  const { user } = useLogin();
  const [company, setCompany] = useState({});

  useEffect(() => {
    async function getCompany() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  useEffect(() => {
    async function getJournalEntries() {
      const result = await fetch(
        `http://localhost:3000/journalEntry/find/` + company.id_user,
        {
          method: "GET",
        }
      );
      const response = await result.json();
      console.log(response);
      const sortedData = response.journalEntries.map((entry) => ({
        ...entry,
        accountingEntries: entry.accountingEntries.sort(
          (a, b) => a.id_acc_entry - b.id_acc_entry
        ),
      }));

      console.log(sortedData);

      setJournalEntries(sortedData || []);
    }
    getJournalEntries();
  }, [company]);

  return (
    <CheckContainer>
      <h1>Asientos contables</h1>
      {journalEntries.length > 0 ? (
        journalEntries.map((entry) => {
          const date = new Date(entry.date);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;
          return (
            <section key={entry.id}>
              <p>
                <strong>Fecha:</strong> {formattedDate}
              </p>

              <TableContainer>
                <thead>
                  <tr>
                    <th>Cuenta</th>
                    <th>Debe</th>
                    <th>Haber</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.accountingEntries.map((accountingEntry) => (
                    <tr key={accountingEntry.id}>
                      <td>{accountingEntry.accounts.name}</td>
                      <td>${accountingEntry.debit}</td>
                      <td>${accountingEntry.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </TableContainer>
              <p>
                <strong>Descripción:</strong> {entry.description}
              </p>
              <p>
                <strong>Total debe:</strong> ${entry.total_debit}
              </p>
              <p>
                <strong>Total haber:</strong> ${entry.total_credit}
              </p>
            </section>
          );
        })
      ) : (
        <p>No hay asientos contables</p>
      )}
      <Link to="/updateGeneralJournal">
        <BackButton>Volver</BackButton>
      </Link>
    </CheckContainer>
  );
}

export default ListJournalEntries;
