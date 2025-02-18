import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function AddAccount() {
  const [account, setAccount] = useState({
    name: "",
    type: "",
  });
  const [completeInfo, setCompleteInfo] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (account.name && account.type) {
      const response = await fetch("http://localhost:3000/account", {
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
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Agrega una nueva cuenta</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <Input
          type="text"
          placeholder="Nombre de la cuenta"
          value={account.name}
          onChange={(e) => setAccount({ ...account, name: e.target.value })}
        />
        <Select
          value={account.type}
          onChange={(e) => setAccount({ ...account, type: e.target.value })}
        >
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
