import React, { createContext, useContext, useState } from "react";

const BuyOrderContext = createContext();

export function useBuyOrder() {
  return useContext(BuyOrderContext);
}

export function BuyOrderProvider({ children }) {
  const initialState = {
    header: {}, // Datos de la factura (cabecera)
    client: {}, // Datos del cliente
    details: [], // Detalles de los productos/servicios
  };

  const [buyOrder, setBuyOrder] = useState(initialState);

  const updateBuyOrder = (section, data) => {
    setBuyOrder((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  const resetBuyOrder = () => {
    setBuyOrder(initialState);
  };

  return (
    <BuyOrderContext.Provider
      value={{ buyOrder, updateBuyOrder, resetBuyOrder }}
    >
      {children}
    </BuyOrderContext.Provider>
  );
}
