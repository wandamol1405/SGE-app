import React, { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export function useInvoice() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [invoice, setInvoice] = useState({
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  });

  const updateInvoice = (key, value) => {
    if (typeof key === "object") {
      setInvoice((prev) => ({ ...prev, ...key }));
    } else {
      setInvoice((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <InvoiceContext.Provider value={{ invoice, updateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}
