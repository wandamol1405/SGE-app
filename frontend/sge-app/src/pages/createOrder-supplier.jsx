import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuyOrder } from "../context/BuyOrderContext";
import Input from "../components/input";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import Select from "../components/select";

function CreateOrderSupplier() {
  const { updateBuyOrder } = useBuyOrder();
  const [supplier_name, setSupplierName] = useState("");
  const [supplier_address, setSupplierAddress] = useState("");
  const [supplier_cuit, setSupplierCuit] = useState("");
  const [supplier_condition, setSaleCondition] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    let errorFound = false;

    if (!supplier_name) {
      setErrors((prev) => ({
        ...prev,
        supplier_name: "El nombre del proveedor es requerido",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, supplier_name: null }));
    }

    if (!supplier_address) {
      setErrors((prev) => ({
        ...prev,
        supplier_address: "La dirección del proveedor es requerida",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, supplier_address: null }));
    }

    if (!supplier_cuit || supplier_cuit.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        supplier_cuit:
          "El CUIT del proveedor es requerido y debe tener 11 dígitos",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, supplier_cuit: null }));
    }

    if (!supplier_condition) {
      setErrors((prev) => ({
        ...prev,
        supplier_condition: "La condición de venta es requerida",
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({ ...prev, supplier_condition: null }));
    }

    if (!errorFound) {
      updateBuyOrder("supplier", {
        supplier_name,
        supplier_address,
        supplier_cuit,
        supplier_condition,
      });
      navigate("/createOrder-details");
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear orden de compra: Paso 2</h1>
      <p>Complete los datos del proveedor</p>
      <form>
        <Input
          type="text"
          value={supplier_name}
          onChange={(e) => setSupplierName(e.target.value)}
          placeholder="Nombre del proveedor"
          error={errors.supplier_name}
        />
        <Input
          type="text"
          value={supplier_address}
          onChange={(e) => setSupplierAddress(e.target.value)}
          placeholder="Dirección del proveedor"
          error={errors.supplier_address}
        />
        <Input
          type="text"
          value={supplier_cuit}
          onChange={(e) => setSupplierCuit(e.target.value)}
          placeholder="CUIT del proveedor"
          error={errors.supplier_cuit}
        />
        <Select
          value={supplier_condition}
          onChange={(e) => setSaleCondition(e.target.value)}
        >
          <option value="" disabled>
            Seleccione la condición ante el IVA
          </option>
          <option value="Responsable inscripto">Responsable inscripto</option>
          <option value="Monotributista">Monotributista</option>
        </Select>
        <div>
          <NextButton
            onClick={() => {
              navigate("/createOrder-header");
            }}
          >
            Volver
          </NextButton>
          <NextButton onClick={handleNext}> Siguiente </NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreateOrderSupplier;
