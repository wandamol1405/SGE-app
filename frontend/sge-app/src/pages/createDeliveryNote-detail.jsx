import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeliveryNote } from "../context/deliveryNoteContext";
import Input from "../components/input";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import TableContainer from "../components/tableContainer";

function CreateDeliveryNoteDetails() {
  const { updateDeliveryNote } = useDeliveryNote();
  const [details, setDetails] = useState(
    Array(5)
      .fill()
      .map(() => ({ amount: "", product: "", unit_price: "" })) // Inicializa con 5 filas vacías
  );
  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value; // Actualiza el campo correspondiente
    setDetails(updatedDetails);
  };

  const handleSaveDetails = () => {
    // Actualiza el contexto con los detalles ingresados
    updateDeliveryNote({ details });
    alert("Detalles guardados en el remito.");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (details.some((row) => Object.values(row).some((value) => value))) {
      handleSaveDetails();
      navigate("/checkDeliveryNote");
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear remito: Paso 3</h1>
      <p>Complete el detalle del remito</p>
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
        <NextButton onClick={() => navigate("/createDeliverytNote-client")}>
          Volver
        </NextButton>
        <NextButton onClick={handleNext}>Siguiente</NextButton>
      </div>
    </CreateInvoiceContainer>
  );
}

export default CreateDeliveryNoteDetails;
