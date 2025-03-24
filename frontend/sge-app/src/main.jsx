import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import "./frontend/sge-app/public/reset.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { BuyOrderProvider } from "./context/BuyOrderContext";
import { DebitNoteProvider } from "./context/DebitNoteContext";
import { CreditNoteProvider } from "./context/CreditNoteContext";
import { DeliveryNoteProvider } from "./context/DeliveryNoteContext";
import { ChequeProvider } from "./context/ChequeContext";
import { PromissoryNoteProvider } from "./context/PromissoryNoteContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InvoiceProvider>
        <BuyOrderProvider>
          <DebitNoteProvider>
            <CreditNoteProvider>
              <DeliveryNoteProvider>
                <ChequeProvider>
                  <PromissoryNoteProvider>
                    <App />
                  </PromissoryNoteProvider>
                </ChequeProvider>
              </DeliveryNoteProvider>
            </CreditNoteProvider>
          </DebitNoteProvider>
        </BuyOrderProvider>
      </InvoiceProvider>
    </AuthProvider>
  </BrowserRouter>
);
