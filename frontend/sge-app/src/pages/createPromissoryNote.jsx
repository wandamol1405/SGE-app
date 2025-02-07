import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePromissoryNote } from "../context/PromissoryNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";

function CreatePromissoryNote() {
  const { updatePromissoryNote } = usePromissoryNote();
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
        <Input
          type="text"
          placeholder="Lugar de emisión"
          value={issue_place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <Select
          value={manturity_type}
          onChange={(e) => setManturityType(e.target.value)}
        >
          <option value="" disabled>
            Seleccione el tipo de vencimiento
          </option>
          <option value="A la vista">A la vista</option>
          <option value="Día fijo">Día fijo</option>
          <option value="Tantos días">Tantos días</option>
        </Select>
        {manturity_type === "Día fijo" && (
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
        )}
        {manturity_type === "Tantos días" && (
          <Input
            type="text"
            placeholder="Cantidad de días"
            value={manturity_days}
            onChange={(e) => setManturityDays(e.target.value)}
          />
        )}
        <Input
          type="text"
          placeholder="Nombre del beneficiario"
          value={receiver_name}
          onChange={(e) => setReceiverName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Lugar de pago"
          value={pay_place}
          onChange={(e) => setPayPlace(e.target.value)}
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

export default CreatePromissoryNote;
