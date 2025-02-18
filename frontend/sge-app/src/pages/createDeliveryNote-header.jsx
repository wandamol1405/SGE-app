import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDeliveryNote } from "../context/DeliveryNoteContext";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function CreateDeliveryNoteHeader() {
  const { deliveryNote, updateDeliveryNote } = useDeliveryNote();
  const [type_delivery_note, setTypeDeliveryNote] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [issue_date, setDate] = useState("");
  const [sale_condition, setSaleCondition] = useState("");
  const [means_of_delivery, setMeansOfDelivery] = useState("");
  const [observation, setObservation] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (deliveryNote.header) {
      setTypeDeliveryNote(deliveryNote.header.type_delivery_note || "");
      setPointSale(deliveryNote.header.point_sale || "");
      setDate(deliveryNote.header.issue_date || "");
      setSaleCondition(deliveryNote.header.sale_condition || "");
      setMeansOfDelivery(deliveryNote.header.means_of_delivery || "");
      setObservation(deliveryNote.header.observation || "");
    }
  }, [deliveryNote]);

  const handleNext = (e) => {
    e.preventDefault();
    if (type_delivery_note && point_sale && issue_date) {
      updateDeliveryNote("header", {
        type_delivery_note,
        point_sale,
        issue_date,
        sale_condition,
        means_of_delivery,
        observation,
      });
      navigate("/createDeliveryNote-client");
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <h1>Crear remito: Paso 1</h1>
      <p>Complete los datos del remito</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <Select
          value={type_delivery_note}
          onChange={(e) => setTypeDeliveryNote(e.target.value)}
        >
          <option value="" disabled>
            Selecciona el tipo de remito
          </option>
          <option value="Remito R">Remito R</option>
          <option value="Remito X">Remito X</option>
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
        <Input
          type="text"
          placeholder="Medio de transporte"
          value={means_of_delivery}
          onChange={(e) => setMeansOfDelivery(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Observaciones"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
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

export default CreateDeliveryNoteHeader;
