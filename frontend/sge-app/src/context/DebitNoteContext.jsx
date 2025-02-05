import React, { createContext, useContext, useState } from "react";

const DebitNoteContext = createContext();

export function useDebitNote() {
  return useContext(DebitNoteContext);
}

export function DebitNoteProvider({ children }) {
  const [debitNote, setDebitNote] = useState({
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  });

  const updateDebitNote = (key, value) => {
    if (typeof key === "object") {
      setDebitNote((prev) => ({ ...prev, ...key }));
    } else {
      setDebitNote((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <DebitNoteContext.Provider value={{ debitNote, updateDebitNote }}>
      {children}
    </DebitNoteContext.Provider>
  );
}
