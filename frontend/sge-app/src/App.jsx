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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
