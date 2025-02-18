import React, { createContext, useContext, useState } from "react";

const PromissoryNoteContext = createContext();

export function usePromissoryNote() {
  return useContext(PromissoryNoteContext);
}

export function PromissoryNoteProvider({ children }) {
  const initialState = {
    data: {},
  };

  const [promissoryNote, setPromissoryNote] = useState(initialState);

  const updatePromissoryNote = (section, data) => {
    setPromissoryNote((prev) => ({
      ...prev,
      [section]: Array.isArray(data)
        ? [...data]
        : { ...prev[section], ...data },
    }));
  };

  const resetPromissoryNote = () => {
    setPromissoryNote(initialState);
  };

  return (
    <PromissoryNoteContext.Provider
      value={{ promissoryNote, updatePromissoryNote, resetPromissoryNote }}
    >
      {children}
    </PromissoryNoteContext.Provider>
  );
}
