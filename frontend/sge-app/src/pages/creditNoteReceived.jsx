import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function CreditNoteReceived() {
  const [type_credit_note, setTypeCreditNote] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [credit_note_number, setCreditNoteNumber] = useState("");
  const [issue_date, setDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [IVA, setIVA] = useState("");
  const [total, setTotal] = useState("");
  const { user } = useLogin();
  const [company, setCompany] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  useEffect(() => {
    if (type_credit_note === "Nota de Crédito A" && subtotal) {
      const ivaValue = 0.21 * parseFloat(subtotal);
      setIVA(ivaValue.toFixed(2));
      setTotal((parseFloat(subtotal) + ivaValue).toFixed(2));
    } else if (type_credit_note !== "Nota de Crédito A") {
      setIVA("0");
      setSubtotal("0");
    }
  }, [type_credit_note, subtotal]);

  useEffect(() => {
    async function getCompany() {
      const result = await fetch(`${API_URL}/users/find/${user}`);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  const resetCreditNote = () => {
    setTypeCreditNote("");
    setPointSale("");
    setCreditNoteNumber("");
    setDate("");
    setSupplier("");
    setSubtotal("");
    setIVA("");
    setTotal("");
  };

  const handleType = (e) => {
    setTypeCreditNote(e.target.value);
    if (e.target.value !== "Nota de Crédito A") {
      setSubtotal(0);
      setIVA(0);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setCompleteInfo(false);
    if (
      type_credit_note &&
      point_sale &&
      credit_note_number &&
      issue_date &&
      supplier &&
      subtotal &&
      IVA &&
      total
    ) {
      const newCreditNote = {
        type_credit_note,
        point_sale: parseInt(point_sale),
        company_id: company.id_user,
        credit_note_number: parseInt(credit_note_number),
        issue_date,
        supplier,
        subtotal,
        IVA,
        total,
      };
      const response = await fetch(`${API_URL}/creditNoteReceived/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newCreditNote }),
      });
      if (response.ok) {
        resetCreditNote();
        alert("Nota de crédito registrada con éxito");
      } else {
        alert("Error al registrar la nota de crédito");
      }
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Registrar Nota de Crédito recibida</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <label>
          {" "}
          Tipo de nota de crédito
          <Select value={type_credit_note} onChange={handleType}>
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option value="Nota de Crédito A">Nota de Crédito A</option>
            <option value="Nota de Crédito B">Nota de Crédito B</option>
            <option value="Nota de Crédito C">Nota de Crédito C</option>
          </Select>
        </label>
        <label>
          Punto de venta
          <Input
            type="text"
            value={point_sale}
            onChange={(e) => setPointSale(e.target.value)}
            placeholder="Punto de venta"
          />
        </label>
        <label>
          Número de nota de crédito
          <Input
            type="text"
            value={credit_note_number}
            onChange={(e) => setCreditNoteNumber(e.target.value)}
            placeholder="Número de nota de crédito"
          />
        </label>
        <label>
          Fecha de emisión
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
        </label>
        <label>
          Proveedor
          <Input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Proveedor"
          />
        </label>
        {type_credit_note === "Nota de Crédito A" ? (
          <>
            <label>
              Subtotal
              <Input
                type="number"
                value={subtotal}
                min={0}
                defaultValue={0}
                onChange={(e) => setSubtotal(e.target.value)}
                placeholder="Subtotal"
              />
            </label>
            <label>
              IVA
              <Input
                type="number"
                value={IVA}
                onChange={(e) => setIVA(e.target.value)}
                min={0}
                placeholder="IVA"
                readOnly
              />
            </label>
          </>
        ) : null}
        <label>
          Total
          <Input
            type="number"
            onChange={(e) => setTotal(e.target.value)}
            value={total}
            min={0}
            placeholder="Total"
          />
        </label>
        <div>
          <Link to="/registerReceivedDocs">
            <BackButton>Volver</BackButton>
          </Link>
          <NextButton onClick={handleNext}>Guardar</NextButton>
        </div>
      </form>
    </CreateInvoiceContainer>
  );
}

export default CreditNoteReceived;
