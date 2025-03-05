import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import Input from "../components/input";
import Select from "../components/select";
import NextButton from "../components/nextButton";
import CreateInvoiceContainer from "../components/createInvoice";
import BackButton from "../components/backButton";

function InvoiceReceived() {
  const [type_invoice, setTypeInvoice] = useState("");
  const [point_sale, setPointSale] = useState("");
  const [invoice_number, setInvoiceNumber] = useState("");
  const [issue_date, setDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [IVA, setIVA] = useState("");
  const [total, setTotal] = useState("");
  const { user } = useLogin();
  const [company, setCompany] = useState("");
  const [completeInfo, setCompleteInfo] = useState(false);

  useEffect(() => {
    if (type_invoice === "Factura A" && subtotal) {
      const ivaValue = 0.21 * parseFloat(subtotal);
      setIVA(ivaValue.toFixed(2));
      setTotal((parseFloat(subtotal) + ivaValue).toFixed(2));
    } else if (type_invoice !== "Factura A") {
      setIVA("0");
      setSubtotal("0");
    }
  }, [type_invoice, subtotal]);

  useEffect(() => {
    async function getCompany() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  const resetInvoice = () => {
    setTypeInvoice("");
    setPointSale("");
    setInvoiceNumber("");
    setDate("");
    setSupplier("");
    setSubtotal("");
    setIVA("");
    setTotal("");
  };

  const handleType = (e) => {
    setTypeInvoice(e.target.value);
    if (e.target.value !== "Factura A") {
      setSubtotal(0);
      setIVA(0);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setCompleteInfo(false);
    if (
      type_invoice &&
      point_sale &&
      invoice_number &&
      issue_date &&
      supplier &&
      subtotal &&
      IVA &&
      total
    ) {
      const newInvoice = {
        type_invoice: type_invoice,
        point_sale: parseInt(point_sale),
        company_id: company ? company.id_user : null,
        invoice_number: parseInt(invoice_number),
        issue_date: issue_date,
        supplier: supplier,
        subtotal: subtotal,
        IVA: IVA,
        total: total,
      };
      const response = await fetch("http://localhost:3000/invoiceReceived", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newInvoice }),
      });
      if (response.ok) {
        resetInvoice();
        alert("Factura registrada con éxito");
      } else {
        alert("Error al registrar la factura");
      }
    } else {
      setCompleteInfo(true);
    }
  };

  return (
    <CreateInvoiceContainer>
      <p>Registrar Factura recibida</p>
      {completeInfo && (
        <p style={{ fontSize: "1.5rem", color: "red" }}>
          Por favor, complete todos los campos antes de continuar
        </p>
      )}
      <form>
        <label>
          Tipo de factura
          <Select value={type_invoice} onChange={handleType}>
            <option value="" disabled>
              Selecciona el tipo de factura
            </option>
            <option value="Factura A">Factura A</option>
            <option value="Factura B">Factura B</option>
            <option value="Factura C">Factura C</option>
          </Select>
        </label>
        <label>
          Punto de venta
          <Input
            value={point_sale}
            onChange={(e) => setPointSale(e.target.value)}
            type="text"
            placeholder="Punto de venta"
          />
        </label>
        <label>
          Número de factura
          <Input
            value={invoice_number}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            type="text"
            placeholder="Número de factura"
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
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            type="text"
            placeholder="Proveedor"
          />
        </label>
        {type_invoice === "Factura A" ? (
          <>
            <label>
              Subtotal
              <Input
                value={subtotal}
                onChange={(e) => setSubtotal(e.target.value)}
                type="number"
                min={0}
                defaultValue={0}
                placeholder="Subtotal"
              />
            </label>
            <label>
              IVA
              <Input
                value={IVA}
                onChange={(e) => setIVA(e.target.value)}
                type="number"
                min={0}
                defaultValue={0}
                placeholder="IVA"
              />
            </label>
          </>
        ) : null}
        <label>
          Total
          <Input
            value={total}
            min={0}
            onChange={(e) => setTotal(e.target.value)}
            type="number"
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

export default InvoiceReceived;
