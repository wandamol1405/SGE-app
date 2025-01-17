import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/src/styles/reset.css" />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
