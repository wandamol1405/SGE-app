import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDebitNote } from "../context/DebitNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreateDebitNoteHeader() {
  const { debitNote, updateDebitNote } = useDebitNote();
  const [type_debit_note, setTypeDebitNote] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [issue_date, setDate] = useState("");
  const [sale_condition, setSaleCondition] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (debitNote.header) {
      setTypeDebitNote(debitNote.header.type_debit_note || "");
      setPointSale(debitNote.header.point_sale || "");
      setDate(debitNote.header.issue_date || "");
      setSaleCondition(debitNote.header.sale_condition || "");
    }
  }, [debitNote]);

  const handleNext = (e) => {
    e.preventDefault();
    if (type_debit_note && point_sale && issue_date) {
      updateDebitNote("header", {
        type_debit_note,
        point_sale,
        issue_date,
        sale_condition,
      });
      navigate("/createDebitNote-client");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear nota de débito: Paso 1</h1>
      <p>Complete los datos de la nota de débito</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <Select
          value={type_debit_note}
          onChange={(e) => setTypeDebitNote(e.target.value)}
        >
          <option value="" disabled>
            Selecciona el tipo de nota de débito
          </option>
          <option value="Nota de Débito A">Nota de Débito A</option>
          <option value="Nota de Débito B">Nota de Débito B</option>
          <option value="Nota de Débito C">Nota de Débito C</option>
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
          <Link to="/createDocs">
            <BackButton>Volver</BackButton>
          </Link>
          <NextButton onClick={handleNext}>Siguiente</NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreateDebitNoteHeader;
