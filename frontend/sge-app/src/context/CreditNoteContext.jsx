import React, { createContext, useContext, useState } from "react";

const CreditNoteContext = createContext();

export function useCreditNote() {
  return useContext(CreditNoteContext);
}

export function CreditNoteProvider({ children }) {
  const [creditNote, setCreditNote] = useState({
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  });

  const updateCreditNote = (key, value) => {
    if (typeof key === "object") {
      setCreditNote((prev) => ({ ...prev, ...key }));
    } else {
      setCreditNote((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <CreditNoteContext.Provider value={{ creditNote, updateCreditNote }}>
      {children}
    </CreditNoteContext.Provider>
  );
}
