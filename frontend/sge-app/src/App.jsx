import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";
import CreateDocs from "./pages/createDocs";
import CreateInvoiceHeader from "./pages/createInvoice-header";
import CreateInvoiceClient from "./pages/createInvoice-client";
import CreateInvoiceDetails from "./pages/createInvoice-details";
import CheckInvoice from "./pages/checkInvoice";
import CreateOrderHeader from "./pages/createOrder-header";
import CreateOrderSupplier from "./pages/createOrder-supplier";
import CreateOrderDetails from "./pages/createOrder-details";
import CheckOrder from "./pages/checkOrder";
import CreateDebitNoteHeader from "./pages/createDebitNote-header";
import CreateDebitNoteClient from "./pages/createDebitNote-client";
import CreateDebitNoteDetail from "./pages/createDebitNote-details";
import CheckDebitNote from "./pages/checkDebitNote";
import CreateCreditNoteHeader from "./pages/createCreditNote-header";
import CreateCreditNoteClient from "./pages/createCreditNote-client";
import CreateCreditNoteDetail from "./pages/createCreditNote-details";
import CheckCreditNote from "./pages/checkCreditNote";
import CreateDeliveryNoteHeader from "./pages/createDeliveryNote-header";
import CreateDeliveryNoteClient from "./pages/createDeliveryNote-client";
import CreateDeliveryNoteDetail from "./pages/createDeliveryNote-detail";
import CheckDeliveryNote from "./pages/checkDeliveryNote";
import CreateCheque from "./pages/createCheque";
import CheckCheque from "./pages/checkCheque";
import CreatePromissoryNote from "./pages/createPromissoryNote";
import CheckPromissoryNote from "./pages/checkPromissoryNote";
import ListDocs from "./pages/listDocs";
import UpdateGJ from "./pages/updateGeneralJournal";
import AddAccount from "./pages/addAccount";
import UpdateAccounts from "./pages/updateAccounts";
import ListAccounts from "./pages/listAccounts";
import AddJournalEntry from "./pages/addJournalEntry";
import ListJournalEntries from "./pages/listJournalEntries";
import SelectDocs from "./pages/selectDocs";
import ListInvoicesByUser from "./pages/listInvoicesByUser";
import ListBuyOrderByUser from "./pages/listBuyOrderByUser";
import ListDebitNotesByUser from "./pages/listDebitNotesByUser";
import ListCreditNotesByUser from "./pages/listCreditNotesByUser";
import ListDeliveryNotesByUser from "./pages/listDeliveryNotesByUser";
import ListChequesByUser from "./pages/listChequesByUser";
import ListPromissoryNotesByUser from "./pages/listPromissoryNotesByUser";
import IvaSalesLedger from "./pages/ivaSalesLedger";
import RegisterReceivedDocs from "./pages/registerReceivedDocs";
import InvoiceReceived from "./pages/invoiceReceived";
import DebitNoteReceived from "./pages/debitNoteReceived";
import CreditNoteReceived from "./pages/creditNoteReceived";
import IvaPurchasesLedger from "./pages/ivaPurchasesLedger";
import Terms from "./pages/terminos";
import ListReceivedDocs from "./pages/viewReceivedDocs";
import JournalEntryUsers from "./pages/journalEntryUsers";

function App() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/src/styles/reset.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/createDocs"
          element={
            <ProtectedRoute>
              {" "}
              <CreateDocs />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/createInvoice-header"
          element={
            <ProtectedRoute>
              <CreateInvoiceHeader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createInvoice-client"
          element={
            <ProtectedRoute>
              <CreateInvoiceClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createInvoice-details"
          element={
            <ProtectedRoute>
              <CreateInvoiceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkInvoice"
          element={
            <ProtectedRoute>
              <CheckInvoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createOrder-header"
          element={
            <ProtectedRoute>
              <CreateOrderHeader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createOrder-supplier"
          element={
            <ProtectedRoute>
              <CreateOrderSupplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createOrder-details"
          element={
            <ProtectedRoute>
              <CreateOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkOrder"
          element={
            <ProtectedRoute>
              <CheckOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDebitNote-header"
          element={
            <ProtectedRoute>
              <CreateDebitNoteHeader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDebitNote-client"
          element={
            <ProtectedRoute>
              <CreateDebitNoteClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDebitNote-details"
          element={
            <ProtectedRoute>
              <CreateDebitNoteDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkDebitNote"
          element={
            <ProtectedRoute>
              <CheckDebitNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCreditNote-header"
          element={
            <ProtectedRoute>
              <CreateCreditNoteHeader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCreditNote-client"
          element={
            <ProtectedRoute>
              <CreateCreditNoteClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCreditNote-details"
          element={
            <ProtectedRoute>
              <CreateCreditNoteDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkCreditNote"
          element={
            <ProtectedRoute>
              <CheckCreditNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDeliveryNote-header"
          element={
            <ProtectedRoute>
              <CreateDeliveryNoteHeader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDeliveryNote-client"
          element={
            <ProtectedRoute>
              <CreateDeliveryNoteClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDeliveryNote-details"
          element={
            <ProtectedRoute>
              <CreateDeliveryNoteDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkDeliveryNote"
          element={
            <ProtectedRoute>
              <CheckDeliveryNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCheque"
          element={
            <ProtectedRoute>
              <CreateCheque />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkCheque"
          element={
            <ProtectedRoute>
              <CheckCheque />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createPromissoryNote"
          element={
            <ProtectedRoute>
              <CreatePromissoryNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkPromissoryNote"
          element={
            <ProtectedRoute>
              <CheckPromissoryNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listDocs"
          element={
            <ProtectedRoute>
              <ListDocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateGeneralJournal"
          element={
            <ProtectedRoute>
              <UpdateGJ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addAccount"
          element={
            <ProtectedRoute>
              <AddAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateAccounts"
          element={
            <ProtectedRoute>
              <UpdateAccounts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listAccounts"
          element={
            <ProtectedRoute>
              <ListAccounts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addJournalEntry"
          element={
            <ProtectedRoute>
              <AddJournalEntry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listJournalEntries"
          element={
            <ProtectedRoute>
              <ListJournalEntries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/selectDocs"
          element={
            <ProtectedRoute>
              <SelectDocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listInvoicesByUser"
          element={
            <ProtectedRoute>
              <ListInvoicesByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listBuyOrderByUser"
          element={
            <ProtectedRoute>
              <ListBuyOrderByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listDebitNotesByUser"
          element={
            <ProtectedRoute>
              <ListDebitNotesByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listCreditNotesByUser"
          element={
            <ProtectedRoute>
              <ListCreditNotesByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listDeliveryNotesByUser"
          element={
            <ProtectedRoute>
              <ListDeliveryNotesByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listChequesByUser"
          element={
            <ProtectedRoute>
              <ListChequesByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listPromissoryNotesByUser"
          element={
            <ProtectedRoute>
              <ListPromissoryNotesByUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ivaSalesLedger"
          element={
            <ProtectedRoute>
              <IvaSalesLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registerReceivedDocs"
          element={
            <ProtectedRoute>
              <RegisterReceivedDocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoiceReceived"
          element={
            <ProtectedRoute>
              <InvoiceReceived />
            </ProtectedRoute>
          }
        />
        <Route
          path="/debitNoteReceived"
          element={
            <ProtectedRoute>
              <DebitNoteReceived />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creditNoteReceived"
          element={
            <ProtectedRoute>
              <CreditNoteReceived />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ivaPurchasesLedger"
          element={
            <ProtectedRoute>
              <IvaPurchasesLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/terminos"
          element={
              <Terms />
          }
        />
        <Route
        path="/viewReceivedDocs"
        element={
          <ProtectedRoute>
            <ListReceivedDocs />
          </ProtectedRoute>
        }
          >
        </Route>
        <Route
        path="/journalEntryUsers"
        element={
          <ProtectedRoute>
            <JournalEntryUsers />
          </ProtectedRoute>
        }
          >
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
