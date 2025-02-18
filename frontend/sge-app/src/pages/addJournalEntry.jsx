import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import BackButton from "../components/backButton";
import TableContainer from "../components/tableContainer";
import AddButton from "../components/addButton";
import styled from "styled-components";

const JournalEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffcfcf;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 80vw;
  font-family: "Libre Franklin", sans-serif;
  gap: 1.5rem;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;

  h1 {
    color: #525b44;
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }
  p {
    color: #525b44;
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
  }
  h2 {
    color: #525b44;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  @media (min-width: 1080px) {
    width: 60vw;
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Input = styled.input`
  background-color: #fffdec;
  color: #5a6c57;
  border: none;
  width: 40vw;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  text-align: center;

  &::placeholder {
    color: #5a6c57;
    opacity: 0.6;
    text-align: center;
  }

  @media (min-width: 1080px) {
    width: 15vw;
    padding: 10px 20px;
    font-size: 20px;
  }
`;

const AddJournalEntry = () => {
  const [journalEntry, setJournalEntry] = useState({
    date: "",
    description: "",
  });
  const [accountingEntries, setAccountingEntries] = useState([
    { id_account: "", debit: 0, credit: 0 },
  ]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const { user } = useLogin();
  const navigate = useNavigate();
  const [company, setCompany] = useState({});

  useEffect(() => {
    async function getCompany() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  // Cargar cuentas contables
  useEffect(() => {
    async function fetchAccounts() {
      const response = await fetch("http://localhost:3000/account");
      const data = await response.json();
      setAccounts(data.accounts);
    }
    fetchAccounts();
  }, []);

  useEffect(() => {
    setTotalDebit(
      (accountingEntries ?? []).reduce(
        (sum, p) => sum + Number(p.debit || 0),
        0
      )
    );
    setTotalCredit(
      (accountingEntries ?? []).reduce(
        (sum, p) => sum + Number(p.credit || 0),
        0
      )
    );
  }, [accountingEntries]);

  // Agregar nueva fila
  const addRow = () => {
    setAccountingEntries([
      ...accountingEntries,
      { id_account: "", debit: 0, credit: 0 },
    ]);
  };

  // Eliminar última fila
  const removeRow = () => {
    if (accountingEntries.length > 1) {
      setAccountingEntries(accountingEntries.slice(0, -1));
    }
  };

  // Manejar cambios en las accountingEntries
  const handleChanges = (index, field, value) => {
    const updatedEntries = [...accountingEntries];
    updatedEntries[index][field] = value;
    setAccountingEntries(updatedEntries);
  };

  const resetEntries = () => {
    setAccountingEntries([{ id_account: "", debit: 0, credit: 0 }]);
  };

  // Guardar asiento (validando que debe = haber)
  const saveJournalEntry = () => {
    if (totalDebit !== totalCredit) {
      alert("El total del Debe y el Haber deben ser iguales.");
      return;
    }

    // Validar que los campos debit y credit no estén vacíos
    const validEntries = accountingEntries.every(
      (entry) => entry.debit !== "" || entry.credit !== ""
    );

    if (!validEntries) {
      alert("Todos los campos de Debe y Haber deben tener valores válidos.");
      return;
    }

    const newJournalEntry = {
      ...journalEntry,
      id_company: company.id_user,
      accountingEntries: accountingEntries,
      total_debit: totalDebit,
      total_credit: totalCredit,
    };

    const saveEntry = async () => {
      const response = await fetch("http://localhost:3000/journalEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJournalEntry),
      });
      if (response.ok) {
        resetEntries();
        alert("Asiento guardado correctamente.");
      }
    };
    saveEntry();
  };

  return (
    <JournalEntryContainer>
      <h1 style={{ textAlign: "center" }}>Libro Diario</h1>
      <p>Complete los datos correspondientes al asiento contable</p>
      <DateContainer>
        <Input
          type="text"
          placeholder="Fecha"
          value={journalEntry.date}
          onChange={(e) =>
            setJournalEntry({ ...journalEntry, date: e.target.value })
          }
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
        />
      </DateContainer>

      {/* Tabla de partidas */}
      <TableContainer>
        <thead>
          <tr className="bg-gray-300">
            <th className="border p-2">Cuenta</th>
            <th className="border p-2">Debe</th>
            <th className="border p-2">Haber</th>
          </tr>
        </thead>
        <tbody>
          {accountingEntries.map((accountingEntry, index) => (
            <tr key={index}>
              <td className="border p-2">
                <Select
                  value={accountingEntry.id_account}
                  onChange={(e) =>
                    handleChanges(index, "id_account", e.target.value)
                  }
                >
                  <option value="">Seleccione una cuenta</option>
                  {accounts.map((account) => (
                    <option key={account.id_account} value={account.id_account}>
                      {account.name}
                    </option>
                  ))}
                </Select>
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={accountingEntry.debit}
                  disabled={accountingEntry.credit !== 0}
                  onChange={(e) =>
                    handleChanges(index, "debit", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={accountingEntry.credit}
                  disabled={accountingEntry.debit !== 0}
                  onChange={(e) =>
                    handleChanges(index, "credit", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        {/* Totales */}
        <tfoot>
          <tr>
            <td>
              <h2>Total:</h2>
            </td>
            <td>
              <h2>{totalDebit.toFixed(2)}</h2>
            </td>
            <td>
              <h2>{totalCredit.toFixed(2)}</h2>
            </td>
          </tr>
        </tfoot>
      </TableContainer>
      <div>
        <AddButton onClick={addRow}>+ Agregar línea</AddButton>
        <AddButton onClick={removeRow}>- Eliminar línea</AddButton>
      </div>

      <Input
        style={{ width: "50vw" }}
        type="text"
        className="border p-2 flex-1"
        placeholder="Descripción"
        value={journalEntry.description}
        onChange={(e) =>
          setJournalEntry({ ...journalEntry, description: e.target.value })
        }
      />

      {/* Botones */}
      <div>
        <BackButton
          onClick={() => {
            navigate("/updateGeneralJournal");
          }}
        >
          Volver
        </BackButton>

        <NextButton onClick={saveJournalEntry}>Guardar Asiento</NextButton>
      </div>
    </JournalEntryContainer>
  );
};

export default AddJournalEntry;
