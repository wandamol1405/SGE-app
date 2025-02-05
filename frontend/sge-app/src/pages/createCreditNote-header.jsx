import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreditNote } from "../context/CreditNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";

function CreateCreditNoteHeader() {
  const { updateCreditNote } = useCreditNote();
  const [type_credit_note, setTypeCreditNote] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [issue_date, setDate] = useState("");
  const [sale_condition, setSaleCondition] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (type_credit_note && point_sale && issue_date) {
      updateCreditNote("header", {
        type_credit_note,
        point_sale,
        issue_date,
        sale_condition,
      });
      navigate("/createCreditNote-client");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear nota de crédito: Paso 1</h1>
      <p>Complete los datos de la nota de crédito</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <Select
          value={type_credit_note}
          onChange={(e) => setTypeCreditNote(e.target.value)}
        >
          <option value="" disabled>
            Selecciona el tipo de nota de crédito
          </option>
          <option value="Nota de Crédito A">Nota de Crédito A</option>
          <option value="Nota de Crédito B">Nota de Crédito B</option>
          <option value="Nota de Crédito C">Nota de Crédito C</option>
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

export default CreateCreditNoteHeader;
