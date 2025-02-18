import React, { createContext, useContext, useState } from "react";

const DeliveryNoteContext = createContext();

export function useDeliveryNote() {
  return useContext(DeliveryNoteContext);
}

export function DeliveryNoteProvider({ children }) {
  const initialState = {
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  };

  const [deliveryNote, setDeliveryNote] = useState(initialState);

  const updateDeliveryNote = (section, data) => {
    setDeliveryNote((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  const resetDeliveryNote = () => {
    setDeliveryNote(initialState);
  };

  return (
    <DeliveryNoteContext.Provider
      value={{ deliveryNote, updateDeliveryNote, resetDeliveryNote }}
    >
      {children}
    </DeliveryNoteContext.Provider>
  );
}
