import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { BuyOrderProvider } from "./context/BuyOrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InvoiceProvider>
        <BuyOrderProvider>
          <App />
        </BuyOrderProvider>
      </InvoiceProvider>
    </AuthProvider>
  </BrowserRouter>
);
