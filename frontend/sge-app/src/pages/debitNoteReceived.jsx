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

function DebitNoteReceived() {
  const [type_debit_note, setTypeDebitNote] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [debit_note_number, setDebitNoteNumber] = useState("");
  const [issue_date, setDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [IVA, setIVA] = useState("");
  const [total, setTotal] = useState("");
  const { user } = useLogin();
  const [company, setCompany] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  useEffect(() => {
    if (type_debit_note === "Nota de Débito A" && subtotal) {
      const ivaValue = 0.21 * parseFloat(subtotal);
      setIVA(ivaValue.toFixed(2));
      setTotal((parseFloat(subtotal) + ivaValue).toFixed(2));
    } else if (type_debit_note !== "Nota de Débito A") {
      setIVA("0");
      setSubtotal("0");
    }
  }, [type_debit_note, subtotal]);

  useEffect(() => {
    async function getCompany() {
      const result = await fetch(`${API_URL}/users/find/${user}`);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  const resetDebitNote = () => {
    setTypeDebitNote("");
    setPointSale("");
    setDebitNoteNumber("");
    setDate("");
    setSupplier("");
    setSubtotal("");
    setIVA("");
    setTotal("");
  };

  const handleType = (e) => {
    setTypeDebitNote(e.target.value);
    if (e.target.value !== "Nota de Débito A") {
      setSubtotal(0);
      setIVA(0);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setCompleteInfo(false);
    if (
      type_debit_note &&
      point_sale &&
      debit_note_number &&
      issue_date &&
      supplier &&
      subtotal &&
      IVA &&
      total
    ) {
      const newDebitNote = {
        type_debit_note: type_debit_note,
        company_id: company.id_user,
        point_sale: point_sale,
        debit_note_number: debit_note_number,
        issue_date: issue_date,
        supplier: supplier,
        subtotal: subtotal,
        IVA: IVA,
        total: total,
      };
      const result = await fetch(`${API_URL}/debitNoteReceived`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newDebitNote }),
      });
      if (result.ok) {
        resetDebitNote();
        alert("Nota de débito registrada con éxito");
      } else {
        alert("Error al registrar la nota de débito");
      }
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Registrar Nota de Débito recibida</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor complete todos los campos
        </p>
      )}
      <form>
        <label>
          Tipo de Nota de Débito
          <Select value={type_debit_note} onChange={handleType}>
            <option value="">Seleccione una opción</option>
            <option value="Nota de Débito A">Nota de Débito A</option>
            <option value="Nota de Débito B">Nota de Débito B</option>
            <option value="Nota de Débito C">Nota de Débito C</option>
          </Select>
        </label>
        <label>
          Punto de venta
          <Input
            label="Punto de Venta"
            type="number"
            placeholder="Punto de Venta"
            value={point_sale}
            onChange={(e) => setPointSale(e.target.value)}
          />
        </label>
        <label>
          Número de Nota de Débito
          <Input
            label="Número de Nota de Débito"
            type="number"
            placeholder="Número de Nota de Débito"
            value={debit_note_number}
            onChange={(e) => setDebitNoteNumber(e.target.value)}
          />
        </label>
        <label>
          Fecha de Emisión
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
            label="Proveedor"
            value={supplier}
            type="text"
            placeholder="Proveedor"
            onChange={(e) => setSupplier(e.target.value)}
          />
        </label>
        {type_debit_note === "Nota de Débito A" ? (
          <>
            <label>
              Subtotal
              <Input
                label="Subtotal"
                type="number"
                value={subtotal}
                min={0}
                placeholder="Subtotal"
                onChange={(e) => setSubtotal(e.target.value)}
              />
            </label>
            <label>
              IVA
              <Input
                value={IVA}
                onChange={(e) => setIVA(e.target.value)}
                type="number"
                min={0}
                placeholder="IVA"
              />
            </label>
          </>
        ) : null}
        <label>
          Total
          <Input
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            type="number"
            placeholder="Total"
            min={0}
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

export default DebitNoteReceived;
