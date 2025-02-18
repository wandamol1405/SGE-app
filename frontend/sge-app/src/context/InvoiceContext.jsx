import React, { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export function useInvoice() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const initialState = {
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  };

  const [invoice, setInvoice] = useState(initialState);

  const updateInvoice = (section, data) => {
    setInvoice((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  const resetInvoice = () => {
    setInvoice(initialState);
  };

  return (
    <InvoiceContext.Provider value={{ invoice, updateInvoice, resetInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}
