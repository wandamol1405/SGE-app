import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBuyOrder } from "../context/BuyOrderContext";
import Input from "../components/input";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import TableInputContainer from "../components/tableInputContainer";
import BackButton from "../components/backButton";
import AddButton from "../components/addButton";

function CreateOrderDetails() {
  const { updateBuyOrder } = useBuyOrder();
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
    updateBuyOrder("details", details);
    alert("Detalles guardados en la orden de compra.");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (details.some((row) => Object.values(row).some((value) => value))) {
      handleSaveDetails();
      navigate("/checkOrder");
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear orden de compra: Paso 3</h1>
      <p>Complete el detalle de la compra</p>
      <TableInputContainer>
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
      </TableInputContainer>
      <div>
        <AddButton onClick={addRow}>Agregar fila</AddButton>
        <AddButton onClick={removeRow}>Eliminar fila</AddButton>
      </div>
      <div>
        <Link to="/createOrder-supplier">
          <BackButton>Volver</BackButton>
        </Link>
        <NextButton onClick={handleNext}>Siguiente</NextButton>
      </div>
    </CreateInvoiceContainer>
  );
}

export default CreateOrderDetails;
