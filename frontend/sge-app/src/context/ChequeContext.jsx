import React, { createContext, useContext, useState } from "react";

const ChequeContext = createContext();

export function useCheque() {
  return useContext(ChequeContext);
}

export function ChequeProvider({ children }) {
  const initialState = {
    data: {},
  };

  const [cheque, setCheque] = useState(initialState);

  const updateCheque = (section, data) => {
    setCheque((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  const resetCheque = () => {
    setCheque(initialState);
  };

  return (
    <ChequeContext.Provider value={{ cheque, updateCheque, resetCheque }}>
      {children}
    </ChequeContext.Provider>
  );
}
