import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCheque } from "../context/ChequeContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreateCheque() {
  const { cheque, updateCheque } = useCheque();
  const [type_cheque, setTypeCheque] = useState("");
  const [cheque_num, setChequeNum] = useState("");
  const [bank_name, setBankName] = useState("");
  const [issue_date, setDate] = useState("");
  const [issue_place, setPlace] = useState("");
  const [emission_mode, setEmissionMode] = useState("");
  const [certificated, setCertificated] = useState("");
  const [crossed, setCrossed] = useState("");
  const [receiver_name, setReceiverName] = useState("");
  const [amount, setAmount] = useState("");
  const [collection_date, setCollectionDate] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (emission_mode === "Al portador") {
      setReceiverName("No corresponde");
    }
    if (type_cheque === "Común") {
      setCollectionDate("No corresponde");
    }
  }, [emission_mode, type_cheque]);

  useEffect(() => {
    if (cheque.data) {
      setTypeCheque(cheque.data.type_cheque || "");
      setChequeNum(cheque.data.cheque_num || "");
      setBankName(cheque.data.bank_name || "");
      setDate(cheque.data.issue_date || "");
      setPlace(cheque.data.issue_place || "");
      setEmissionMode(cheque.data.emission_mode || "");
      setCertificated(cheque.data.certificated || "");
      setCrossed(cheque.data.crossed || "");
      setReceiverName(cheque.data.receiver_name || "");
      setAmount(cheque.data.amount || "");
      setCollectionDate(cheque.data.collection_date || "");
      setAccountNumber(cheque.data.account_number || "");
    }
  }, [cheque]);

  const handleNext = (e) => {
    e.preventDefault();
    if (
      type_cheque &&
      cheque_num &&
      bank_name &&
      issue_date &&
      issue_place &&
      emission_mode &&
      certificated &&
      crossed &&
      receiver_name &&
      amount &&
      collection_date &&
      account_number
    ) {
      updateCheque("data", {
        type_cheque,
        cheque_num,
        bank_name,
        issue_date,
        issue_place,
        emission_mode,
        certificated,
        crossed,
        receiver_name,
        amount,
        collection_date,
        account_number,
      });
      navigate("/checkCheque");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Complete los datos del cheque</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <h1>Información sobre el tipo de cheque</h1>
        <Select
          value={type_cheque}
          onChange={(e) => setTypeCheque(e.target.value)}
        >
          <option value="" disabled>
            Selecciona el tipo de cheque
          </option>
          <option value="Común">Común</option>
          <option value="Diferido">Diferido</option>
        </Select>
        <Select
          value={emission_mode}
          onChange={(e) => setEmissionMode(e.target.value)}
        >
          <option value="" disabled>
            Selecciona la modalidad de emisión
          </option>
          <option value="Al portador">Al portador</option>
          <option value="A la orden">A la orden</option>
        </Select>
        <Select
          value={certificated}
          onChange={(e) => setCertificated(e.target.value)}
        >
          <option value="" disabled>
            Selecciona si esta certificado
          </option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </Select>
        <Select value={crossed} onChange={(e) => setCrossed(e.target.value)}>
          <option value="" disabled>
            Selecciona si es cruzado
          </option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </Select>
        <h1>Datos de cheque</h1>
        <Input
          type="text"
          placeholder="Número de cheque"
          value={cheque_num}
          onChange={(e) => setChequeNum(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Banco"
          value={bank_name}
          onChange={(e) => setBankName(e.target.value)}
        />
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

        <Input
          type="text"
          placeholder="Nombre del beneficiario"
          value={receiver_name}
          disabled={emission_mode === "Al portador"}
          onChange={(e) => setReceiverName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Fecha de cobro"
          value={collection_date}
          disabled={type_cheque === "Común"}
          onChange={(e) => setCollectionDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
        />
        <Input
          type="text"
          placeholder="Número de cuenta"
          value={account_number}
          onChange={(e) => setAccountNumber(e.target.value)}
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

export default CreateCheque;
