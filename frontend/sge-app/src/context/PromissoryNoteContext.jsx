import React, { createContext, useContext, useState } from "react";

const PromissoryNoteContext = createContext();

export function usePromissoryNote() {
  return useContext(PromissoryNoteContext);
}

export function PromissoryNoteProvider({ children }) {
  const [promissoryNote, setPromissoryNote] = useState({
    data: {},
  });

  const updatePromissoryNote = (key, value) => {
    if (typeof key === "object") {
      setPromissoryNote((prev) => ({ ...prev, ...key }));
    } else {
      setPromissoryNote((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <PromissoryNoteContext.Provider
      value={{ promissoryNote, updatePromissoryNote }}
    >
      {children}
    </PromissoryNoteContext.Provider>
  );
}
