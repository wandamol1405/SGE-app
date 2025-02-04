import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoice } from "../context/InvoiceContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";

function CreateInvoiceHeader() {
  const { updateInvoice } = useInvoice();
  const [type_invoice, setTypeInvoice] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [issue_date, setDate] = useState("");
  const [sale_condition, setSaleCondition] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (type_invoice && point_sale && issue_date) {
      updateInvoice("header", {
        type_invoice,
        point_sale,
        issue_date,
        sale_condition,
      });
      navigate("/createInvoice-client");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear factura: Paso 1</h1>
      <p>Complete los datos de la factura</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <Select
          value={type_invoice}
          onChange={(e) => setTypeInvoice(e.target.value)}
        >
          <option value="" disabled>
            Selecciona el tipo de factura
          </option>
          <option value="Factura A">Factura A</option>
          <option value="Factura B">Factura B</option>
          <option value="Factura C">Factura C</option>
        </Select>
        <Select
          value={point_sale}
          onChange={(e) => setPointSale(e.target.value)}
        >
          <option value="" disabled>
            Selecciona el punto de venta
          </option>
          <option value="0001">0001</option>
        </Select>
        <Select
          value={sale_condition}
          onChange={(e) => setSaleCondition(e.target.value)}
        >
          <option value="" disabled>
            Selecciona la condición de venta
          </option>
          <option value="Contado">Contado</option>
          <option value="Cuenta corriente">Cuenta corriente</option>
        </Select>
        <Input
          type="text"
          placeholder="Fecha emisión"
          value={issue_date}
          onChange={(e) => setDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
        />
        <div>
          <NextButton onClick={() => navigate("/createDocs")}>
            Volver
          </NextButton>
          <NextButton onClick={handleNext}>Siguiente</NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreateInvoiceHeader;
