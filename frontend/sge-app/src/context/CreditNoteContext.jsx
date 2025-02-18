import React, { createContext, useContext, useState } from "react";

const CreditNoteContext = createContext();

export function useCreditNote() {
  return useContext(CreditNoteContext);
}

export function CreditNoteProvider({ children }) {
  const initialState = {
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  };

  const [creditNote, setCreditNote] = useState(initialState);

  const updateCreditNote = (section, data) => {
    setCreditNote((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  const resetCreditNote = () => {
    setCreditNote(initialState);
  };

  return (
    <CreditNoteContext.Provider
      value={{ creditNote, updateCreditNote, resetCreditNote }}
    >
      {children}
    </CreditNoteContext.Provider>
  );
}
