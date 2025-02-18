import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreditNote } from "../context/CreditNoteContext";
import Input from "../components/input";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import TableContainer from "../components/tableContainer";
import BackButton from "../components/backButton";
import AddButton from "../components/addButton";

function CreateCreditNoteDetails() {
  const { updateCreditNote } = useCreditNote();
  const [details, setDetails] = useState([
    { amount: "", product: "", unit_price: "" },
  ]);
  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value; // Actualiza el campo correspondiente
    setDetails(updatedDetails);
  };

  const addRow = () => {
    setDetails([...details, { amount: "", product: "", unit_price: "" }]);
  };

  const removeRow = () => {
    if (details.length > 1) {
      setDetails(details.slice(0, -1));
    }
  };

  const handleSaveDetails = () => {
    // Actualiza el contexto con los detalles ingresados
    updateCreditNote("details", details);
    alert("Detalles guardados en la nota de crédito.");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (details.some((row) => Object.values(row).some((value) => value))) {
      handleSaveDetails();
      navigate("/checkCreditNote");
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear nota de crédito: Paso 3</h1>
      <p>Complete el detalle de la nota</p>
      <TableContainer>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Detalle</th>
            <th>Precio unitario</th>
          </tr>
        </thead>
        <tbody>
          {details.map((row, index) => (
            <tr key={index}>
              <td>
                <Input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }
                  placeholder="Cantidad"
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={row.product}
                  onChange={(e) =>
                    handleInputChange(index, "product", e.target.value)
                  }
                  placeholder="Detalle"
                />
              </td>
              <td>
                <Input
                  type="number"
                  value={row.unit_price}
                  onChange={(e) =>
                    handleInputChange(index, "unit_price", e.target.value)
                  }
                  placeholder="Precio unitario"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <div>
        <AddButton onClick={addRow}>Agregar fila</AddButton>
        <AddButton onClick={removeRow}>Eliminar fila</AddButton>
      </div>
      <div>
        <Link to="/createCreditNote-client">
          <BackButton>Volver</BackButton>
        </Link>
        <NextButton onClick={handleNext}>Siguiente</NextButton>
      </div>
    </CreateInvoiceContainer>
  );
}

export default CreateCreditNoteDetails;
