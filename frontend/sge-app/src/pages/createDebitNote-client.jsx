import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDebitNote } from "../context/DebitNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreateDebitNoteClient() {
  const { updateDebitNote, debitNote } = useDebitNote();
  const [buyer_name, setBuyerName] = useState("");
  const [buyer_address, setBuyerAddress] = useState("");
  const [buyer_cuit, setBuyerCuit] = useState("");
  const [buyer_iva, setBuyerIva] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (debitNote.client) {
      setBuyerName(debitNote.client.buyer_name || "");
      setBuyerAddress(debitNote.client.buyer_address || "");
      setBuyerCuit(debitNote.client.buyer_cuit || "");
      setBuyerIva(debitNote.client.buyer_iva || "");
    }
  }, [debitNote]);

  const handleNext = (e) => {
    e.preventDefault();
    let errorFound = false;

    if (!buyer_name) {
      setErrors((prev) => ({
        ...prev,
        buyer_name: "El nombre del cliente es requerido",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, buyer_name: null }));
    }

    if (!buyer_address) {
      setErrors((prev) => ({
        ...prev,
        buyer_address: "La dirección del cliente es requerida",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, buyer_address: null }));
    }

    if (!buyer_cuit || buyer_cuit.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        buyer_cuit: "El CUIT del cliente es requerido y debe tener 11 dígitos",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, buyer_cuit: null }));
    }

    if (!buyer_iva) {
      setErrors((prev) => ({
        ...prev,
        buyer_iva: "La condición frente al IVA del cliente es requerida",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, buyer_iva: null }));
    }

    if (errorFound) {
      return;
    }

    updateDebitNote("client", {
      buyer_name,
      buyer_address,
      buyer_cuit,
      buyer_iva,
    });
    navigate("/createDebitNote-details");
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear nota de débito: Paso 2</h1>
      <p>Complete los datos del cliente</p>
      {errors.buyer_name && (
        <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.buyer_name}</p>
      )}
      <form>
        <Input
          type="text"
          placeholder="Nombre del cliente"
          value={buyer_name}
          onChange={(e) => setBuyerName(e.target.value)}
        />
        {errors.buyer_address && (
          <p style={{ fontSize: "1.2rem", color: "red" }}>
            {errors.buyer_address}
          </p>
        )}
        <Input
          type="text"
          placeholder="Dirección del cliente"
          value={buyer_address}
          onChange={(e) => setBuyerAddress(e.target.value)}
        />
        {errors.buyer_cuit && (
          <p style={{ fontSize: "1.2rem", color: "red" }}>
            {errors.buyer_cuit}
          </p>
        )}
        <Input
          type="text"
          placeholder="CUIT del cliente"
          value={buyer_cuit}
          onChange={(e) => setBuyerCuit(e.target.value)}
        />
        {errors.buyer_iva && (
          <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.buyer_iva}</p>
        )}
        <Select value={buyer_iva} onChange={(e) => setBuyerIva(e.target.value)}>
          <option value="" disabled>
            Selecciona la condición frente al IVA del cliente
          </option>
          <option value="Responsable inscripto">Responsable inscripto</option>
          <option value="Monotributista">Monotributista</option>
          <option value="Consumidor final">Consumidor final</option>
        </Select>
        <div>
          <Link to="/createDebitNote-header">
            <BackButton>Volver</BackButton>
          </Link>
          <NextButton onClick={handleNext}>Siguiente</NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreateDebitNoteClient;
