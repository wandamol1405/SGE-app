import React, { createContext, useContext, useState } from "react";

const BuyOrderContext = createContext();

export function useBuyOrder() {
  return useContext(BuyOrderContext);
}

export function BuyOrderProvider({ children }) {
  const [buyOrder, setBuyOrder] = useState({
    header: {},
    supplier: {},
    details: [],
  });

  const updateBuyOrder = (key, value) => {
    if (typeof key === "object") {
      setBuyOrder((prev) => ({ ...prev, ...key }));
    } else {
      setBuyOrder((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <BuyOrderContext.Provider value={{ buyOrder, updateBuyOrder }}>
      {children}
    </BuyOrderContext.Provider>
  );
}
