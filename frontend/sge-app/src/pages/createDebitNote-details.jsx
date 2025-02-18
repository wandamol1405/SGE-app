import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDebitNote } from "../context/DebitNoteContext";
import Input from "../components/input";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import TableContainer from "../components/tableContainer";
import BackButton from "../components/backButton";
import AddButton from "../components/addButton";

function CreateDebitNoteDetails() {
  const { updateDebitNote } = useDebitNote();
  const [details, setDetails] = useState([
    { amount: "", product: "", unit_price: "" },
  ]);
  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
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
    updateDebitNote("details", details); // Asegurar formato correcto
    alert("Detalles guardados en la nota de débito.");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (details.some((row) => Object.values(row).some((value) => value))) {
      handleSaveDetails();
      navigate("/checkDebitNote");
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear nota de débito: Paso 3</h1>
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
        <Link to="/createDebitNote-client">
          <BackButton>Volver</BackButton>
        </Link>
        <NextButton onClick={handleNext}>Siguiente</NextButton>
      </div>
    </CreateInvoiceContainer>
  );
}

export default CreateDebitNoteDetails;
