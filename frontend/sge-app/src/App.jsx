import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
