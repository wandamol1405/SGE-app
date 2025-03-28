import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePromissoryNote } from "../context/PromissoryNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreatePromissoryNote() {
  const { promissoryNote, updatePromissoryNote } = usePromissoryNote();
  const [issue_date, setDate] = useState("");
  const [issue_place, setPlace] = useState("");
  const [manturity_type, setManturityType] = useState("");
  const [manturity_date, setManturityDate] = useState("");
  const [manturity_days, setManturityDays] = useState("");
  const [receiver_name, setReceiverName] = useState("");
  const [amount, setAmount] = useState("");
  const [pay_place, setPayPlace] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (manturity_type === "A la vista") {
      setManturityDate("No corresponde");
      setManturityDays("No corresponde");
    }
    if (manturity_type === "Día fijo") {
      setManturityDays("No corresponde");
    }
    if (manturity_type === "Tantos días") {
      setManturityDate("No corresponde");
    }
  }, [manturity_type]);

  useEffect(() => {
    if (promissoryNote.data) {
      setDate(promissoryNote.data.issue_date || "");
      setPlace(promissoryNote.data.issue_place || "");
      setManturityType(promissoryNote.data.manturity_type || "");
      setManturityDate(promissoryNote.data.manturity_date || "");
      setManturityDays(promissoryNote.data.manturity_days || "");
      setReceiverName(promissoryNote.data.receiver_name || "");
      setAmount(promissoryNote.data.amount || "");
      setPayPlace(promissoryNote.data.pay_place || "");
    }
  }, [promissoryNote]);

  const handleNext = (e) => {
    e.preventDefault();
    if (
      issue_date &&
      issue_place &&
      manturity_type &&
      manturity_date &&
      manturity_days &&
      receiver_name &&
      amount &&
      pay_place
    ) {
      updatePromissoryNote("data", {
        issue_date,
        issue_place,
        manturity_type,
        manturity_date,
        manturity_days,
        receiver_name,
        amount,
        pay_place,
      });
      navigate("/checkPromissoryNote");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Complete los datos del pagaré</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <label>
          Fecha de emisión
          <Input
            type="text"
            label="Fecha de emisión"
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
          Lugar de emisión
          <Input
            type="text"
            label="Lugar de emisión"
            placeholder="Lugar de emisión"
            value={issue_place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </label>
        <label>
          Tipo de vencimiento
          <Select
            value={manturity_type}
            label="Tipo de vencimiento"
            onChange={(e) => setManturityType(e.target.value)}
          >
            <option value="" disabled>
              Seleccione el tipo de vencimiento
            </option>
            <option value="A la vista">A la vista</option>
            <option value="Día fijo">Día fijo</option>
            <option value="Tantos días">Tantos días</option>
          </Select>
        </label>
        {manturity_type === "Día fijo" && (
          <label>
            Fecha de vencimiento
            <Input
              type="text"
              placeholder="Fecha de vencimiento"
              value={manturity_date}
              onChange={(e) => setManturityDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
            />
          </label>
        )}
        {manturity_type === "Tantos días" && (
          <label>
            Cantidad de días
            <Input
              type="text"
              label="Cantidad de días"
              placeholder="Cantidad de días"
              value={manturity_days}
              onChange={(e) => setManturityDays(e.target.value)}
            />
          </label>
        )}
        <label>
          Nombre del beneficiario
          <Input
            type="text"
            placeholder="Nombre del beneficiario"
            value={receiver_name}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </label>
        <label>
          Monto
          <Input
            type="text"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Lugar de pago
          <Input
            type="text"
            placeholder="Lugar de pago"
            value={pay_place}
            onChange={(e) => setPayPlace(e.target.value)}
          />
        </label>
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

export default CreatePromissoryNote;
