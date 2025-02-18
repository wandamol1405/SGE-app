import React, { createContext, useContext, useState } from "react";

export const DebitNoteContext = createContext();

export function useDebitNote() {
  return useContext(DebitNoteContext);
}

export function DebitNoteProvider({ children }) {
  const initialState = {
    header: {
      type_debit_note: "",
      point_sale: "",
      issue_date: "",
      sale_condition: "",
    }, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  };

  const [debitNote, setDebitNote] = useState(initialState);

  const updateDebitNote = (section, data) => {
    setDebitNote((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  // Función para resetear el contexto
  const resetDebitNote = () => {
    setDebitNote(initialState);
  };

  return (
    <DebitNoteContext.Provider
      value={{ debitNote, updateDebitNote, resetDebitNote }}
    >
      {children}
    </DebitNoteContext.Provider>
  );
}
