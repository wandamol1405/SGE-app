import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDeliveryNote } from "../context/DeliveryNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreateDeliveryNoteClient() {
  const { deliveryNote, updateDeliveryNote } = useDeliveryNote();
  const [buyer_name, setBuyerName] = useState("");
  const [buyer_address, setBuyerAddress] = useState("");
  const [buyer_cuit, setBuyerCuit] = useState("");
  const [buyer_iva, setBuyerIva] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (deliveryNote.client) {
      setBuyerName(deliveryNote.client.buyer_name || "");
      setBuyerAddress(deliveryNote.client.buyer_address || "");
      setBuyerCuit(deliveryNote.client.buyer_cuit || "");
      setBuyerIva(deliveryNote.client.buyer_iva || "");
    }
  }, [deliveryNote]);

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

    updateDeliveryNote("client", {
      buyer_name,
      buyer_address,
      buyer_cuit,
      buyer_iva,
    });
    navigate("/createDeliveryNote-details");
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear remito: Paso 2</h1>
      <p>Complete los datos del receptor</p>
      {errors.buyer_name && (
        <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.buyer_name}</p>
      )}
      <form>
        <Input
          type="text"
          placeholder="Nombre del receptor"
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
          placeholder="Dirección del receptor"
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
          placeholder="CUIT del receptor"
          value={buyer_cuit}
          onChange={(e) => setBuyerCuit(e.target.value)}
        />
        {errors.buyer_iva && (
          <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.buyer_iva}</p>
        )}
        <Select value={buyer_iva} onChange={(e) => setBuyerIva(e.target.value)}>
          <option value="" disabled>
            Selecciona la condición frente al IVA del receptor
          </option>
          <option value="Responsable inscripto">Responsable inscripto</option>
          <option value="Monotributista">Monotributista</option>
          <option value="Consumidor final">Consumidor final</option>
        </Select>
        <div>
          <Link to="/createDeliveryNote-header">
            <BackButton>Volver</BackButton>
          </Link>
          <NextButton onClick={handleNext}>Siguiente</NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreateDeliveryNoteClient;
