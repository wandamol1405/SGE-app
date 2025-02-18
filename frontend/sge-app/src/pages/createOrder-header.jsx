import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBuyOrder } from "../context/BuyOrderContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreateOrderHeader() {
  const { updateBuyOrder, buyOrder } = useBuyOrder();
  const [issue_date, setDate] = useState("");
  const [delivery_date, setDeliveryDate] = useState("");
  const [sale_condition, setSaleCondition] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (buyOrder.header) {
      setDate(buyOrder.header.issue_date || "");
      setDeliveryDate(buyOrder.header.delivery_date || "");
      setSaleCondition(buyOrder.header.sale_condition || "");
    }
  }, [buyOrder]);

  const handleNext = (e) => {
    e.preventDefault();
    if (issue_date && delivery_date) {
      updateBuyOrder("header", {
        issue_date,
        delivery_date,
        sale_condition,
      });
      navigate("/createOrder-supplier");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear orden de compra: Paso 1</h1>
      <p>Complete los datos de la orden de compra</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <Input
          type="text"
          value={issue_date}
          onChange={(e) => setDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text";
            }
          }}
          placeholder="Fecha de emisión"
        />
        <Input
          type="text"
          value={delivery_date}
          onChange={(e) => setDeliveryDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text";
            }
          }}
          placeholder="Fecha de entrega"
        />
        <Select
          value={sale_condition}
          onChange={(e) => setSaleCondition(e.target.value)}
        >
          <option value="" disabled>
            Seleccione la condición de venta
          </option>
          <option value="Contado">Contado</option>
          <option value="Crédito">Crédito</option>
        </Select>
        <div>
          <Link to="/createDocs">
            <BackButton>Volver</BackButton>
          </Link>
          <NextButton onClick={handleNext}>Siguiente</NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreateOrderHeader;
