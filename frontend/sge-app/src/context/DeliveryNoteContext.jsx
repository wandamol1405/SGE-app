import React, { createContext, useContext, useState } from "react";

const DeliveryNoteContext = createContext();

export function useDeliveryNote() {
  return useContext(DeliveryNoteContext);
}

export function DeliveryNoteProvider({ children }) {
  const [deliveryNote, setDeliveryNote] = useState({
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  });

  const updateDeliveryNote = (key, value) => {
    if (typeof key === "object") {
      setDeliveryNote((prev) => ({ ...prev, ...key }));
    } else {
      setDeliveryNote((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <DeliveryNoteContext.Provider value={{ deliveryNote, updateDeliveryNote }}>
      {children}
    </DeliveryNoteContext.Provider>
  );
}
