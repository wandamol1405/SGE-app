import { React, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function AddAccount() {
  const [account, setAccount] = useState({
    name: "",
    type: "",
  });
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFound = false;

    if (!account.name) {
      setError((prev) => ({
        ...prev,
        name: "Por favor, introduzca el nombre de la cuenta",
      }));
      errorFound = true;
    } else {
      setError((prev) => ({
        ...prev,
        name: "",
      }));
    }
    if (!account.type) {
      setError((prev) => ({
        ...prev,
        type: "Por favor, seleccione el tipo de cuenta",
      }));
      errorFound = true;
    } else {
      setError((prev) => ({
        ...prev,
        type: "",
      }));

      if (errorFound) {
        return;
      }

      if (account.name && account.type) {
        const response = await fetch(`${API_URL}/account`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(account),
        });
        if (response.ok) {
          setAccount({
            name: "",
            type: "",
          });
          alert("Cuenta agregada correctamente");
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    if (account.name && account.type) {
      setCompleteInfo(false);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Agrega una nueva cuenta</p>
      <form>
        {error.name && (
          <p style={{ color: "red", fontSize: "1.5rem" }}>{error.name}</p>
        )}
        <Input
          type="text"
          placeholder="Nombre de la cuenta"
          name="name"
          value={account.name}
          onChange={handleInputChange}
        />
        {error.type && (
          <p style={{ color: "red", fontSize: "1.5rem" }}>{error.type}</p>
        )}
        <Select name="type" value={account.type} onChange={handleInputChange}>
          <option value="" disabled>
            Selecciona el tipo de cuenta
          </option>
          <option value="Activo">Activo</option>
          <option value="Pasivo">Pasivo</option>
          <option value="Patrimonio Neto">Patrimonio Neto</option>
          <option value="Egreso">Egreso</option>
          <option value="Ingreso">Ingreso</option>
          <option value="Saldo deudor">Saldo deudor</option>
          <option value="Saldo acreedor">Saldo acreedor</option>
        </Select>
        <NextButton onClick={handleSubmit}>Agregar</NextButton>
        <Link to="/updateAccounts">
          <BackButton>Volver</BackButton>
        </Link>
      </form>
    </CreateInvoiceContainer>
  );
}

export default AddAccount;
