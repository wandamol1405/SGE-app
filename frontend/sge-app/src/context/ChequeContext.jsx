import React, { createContext, useContext, useState } from "react";

const ChequeContext = createContext();

export function useCheque() {
  return useContext(ChequeContext);
}

export function ChequeProvider({ children }) {
  const [cheque, setCheque] = useState({
    data: {},
  });

  const updateCheque = (key, value) => {
    if (typeof key === "object") {
      setCheque((prev) => ({ ...prev, ...key }));
    } else {
      setCheque((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <ChequeContext.Provider value={{ cheque, updateCheque }}>
      {children}
    </ChequeContext.Provider>
  );
}
