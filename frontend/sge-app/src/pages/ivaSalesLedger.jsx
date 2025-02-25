import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TableContainer from "../components/tableContainer";
import NextButton from "../components/nextButton";
import BackButton from "../components/backButton";
import CheckContainer from "../components/checkContainer";
import useLogin from "../hooks/useLogin";
import styled from "styled-components";
import formatDate from "../utils/formatDate";
import formatDocNumber from "../utils/formatDocNumber";
import formatPointSale from "../utils/formatPointSale";

const InputDate = styled.input`
  background-color: #fffdec;
  color: #5a6c57;
  border: none;
  width: 40vw;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  text-align: center; /* Centrar el texto del input */

  &::placeholder {
    color: #5a6c57;
    opacity: 0.6;
    text-align: center;
  }

  @media (min-width: 1080px) {
    width: 15vw;
    padding: 10px 20px;
    font-size: 20px;
  }
`;

function IvaSalesLedger() {
  const [docs, setDocs] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [company, setCompany] = useState("");
  const [neto, setNeto] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const { user } = useLogin();

  useEffect(() => {
    async function getCompany() {
      const result = await fetch("http://localhost:3000/users/find/" + user);
      const response = await result.json();
      console.log("Company: ", response.user);
      setCompany(response.user);
    }
    getCompany();
  }, [user]);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch(
          `http://localhost:3000/ivaLedger/sales/from/${from}/to/${to}/id_company/${company.id_user}`
        );
        const data = await response.json();
        console.log("Docs: ", data.docs);
        const sortedDocs = data.docs.sort(
          (a, b) => new Date(a.issue_date) - new Date(b.issue_date)
        );
        setDocs(sortedDocs);
      } catch (error) {
        console.error("Error fetching docs: ", error);
      }
    }
    if (from && to) {
      fetchDocs();
    }
  }, [from, to, user]);

  useEffect(() => {
    setNeto(
      (docs ?? []).reduce((sum, doc) => {
        if (doc.type_credit_note === "Nota de Crédito A") {
          return sum - Number(doc.subtotal || 0);
        } else if (
          doc.type_invoice === "Factura A" ||
          doc.type_debit_note === "Nota de Débito A"
        ) {
          return sum + Number(doc.subtotal || 0);
        } else {
          return sum;
        }
      }, 0)
    );
    setIva(
      (docs ?? []).reduce((sum, doc) => {
        if (doc.type_credit_note === "Nota de Crédito A") {
          return sum - Number(doc.IVA_total || 0);
        } else if (
          doc.type_debit_note === "Nota de Débito A" ||
          doc.type_invoice === "Factura A"
        ) {
          return sum + Number(doc.IVA_total || 0);
        } else {
          return sum;
        }
      }, 0)
    );
    setTotal(
      (docs ?? []).reduce((sum, doc) => {
        if (
          doc.type_credit_note === "Nota de Crédito A" ||
          doc.type_credit_note === "Nota de Crédito B" ||
          doc.type_credit_note === "Nota de Crédito C"
        ) {
          return sum - Number(doc.total || 0);
        } else {
          return sum + Number(doc.total || 0);
        }
      }, 0)
    );
  }, [docs]);

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const fromDate = new Date(from);
    fromDate.setDate(fromDate.getDate() + 1);
    const toDate = new Date(to);
    toDate.setDate(toDate.getDate() + 1);
    const period = `${fromDate.toLocaleString("default", {
      month: "long",
    })} ${fromDate.getFullYear()}`;

    doc.setFontSize(20);
    doc.text(
      `Libro de IVA Ventas - ${company.company_name}`,
      doc.internal.pageSize.getWidth() / 2,
      16,
      {
        align: "center",
      }
    );
    doc.setFontSize(12);
    doc.text(
      `Periodo: ${period} - Desde: ${fromDate.toLocaleDateString()} Hasta: ${toDate.toLocaleDateString()}`,
      doc.internal.pageSize.getWidth() / 2,
      24,
      { align: "center" }
    );
    autoTable(doc, {
      head: [
        [
          "Fecha",
          "Tipo de Documento",
          "Punto de Venta",
          "Número",
          "Cliente",
          "Neto",
          "IVA",
          "Total",
        ],
      ],
      body: docs.map((doc) => {
        const isA =
          doc.type_invoice === "Factura A" ||
          doc.type_debit_note === "Nota de Débito A" ||
          doc.type_credit_note === "Nota de Crédito A";
        const formattedNumber = doc.num_invoice
          ? formatDocNumber(doc.num_invoice)
          : doc.num_debit_note
          ? formatDocNumber(doc.num_debit_note)
          : doc.num_credit_note
          ? formatDocNumber(doc.num_credit_note)
          : "";
        return [
          formatDate(doc.issue_date),
          doc.type_invoice || doc.type_debit_note || doc.type_credit_note,
          formatPointSale(doc.point_sale),
          formattedNumber,
          doc.buyer_name,
          `$${isA ? doc.subtotal : doc.total}`,
          `$${isA ? doc.IVA_total : "0"}`,
          `$${doc.total}`,
        ];
      }),
      foot: [
        [
          { content: "Totales", colSpan: 5 },
          { content: `$${neto}`, styles: { fontStyle: "bold" } },
          { content: `$${iva}`, styles: { fontStyle: "bold" } },
          { content: `$${total}`, styles: { fontStyle: "bold" } },
        ],
      ],
      startY: 30,
    });

    window.open(
      doc.output("bloburl", {
        filename: `Libro_IVA_Ventas_${company.company_name}.pdf`,
      }),
      "_blank"
    );
  };

  return (
    <CheckContainer>
      <h1>Libro de IVA Ventas</h1>
      <div>
        <p>Desde:</p>
        <InputDate
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <p>Hasta:</p>
        <InputDate
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <section>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo de Documento</th>
                <th>Punto de venta</th>
                <th>Número</th>
                <th>Cliente</th>
                <th>Neto</th>
                <th>IVA</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => {
                const isA =
                  doc.type_invoice === "Factura A" ||
                  doc.type_debit_note === "Nota de Débito A" ||
                  doc.type_credit_note === "Nota de Crédito A";
                const formattedNumber = doc.num_invoice
                  ? formatDocNumber(doc.num_invoice)
                  : doc.num_debit_note
                  ? formatDocNumber(doc.num_debit_note)
                  : doc.num_credit_note
                  ? formatDocNumber(doc.num_credit_note)
                  : "";
                return (
                  <tr key={doc.id}>
                    <td>{formatDate(doc.issue_date)}</td>
                    <td>
                      {doc.type_invoice ||
                        doc.type_debit_note ||
                        doc.type_credit_note}
                    </td>
                    <td>{formatPointSale(doc.point_sale)}</td>
                    <td>{formattedNumber}</td>
                    <td>{doc.buyer_name}</td>
                    <td>${isA ? doc.subtotal : "0"}</td>
                    <td>${isA ? doc.IVA_total : "0"}</td>
                    <td>${doc.total}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="5">Totales</th>
                <td>
                  <strong>${neto}</strong>
                </td>
                <td>
                  <strong>${iva}</strong>
                </td>
                <td>
                  <strong>${total}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </TableContainer>
      </section>
      <div>
        <Link to="/home">
          <BackButton> Volver </BackButton>
        </Link>
        <Link>
          <NextButton type="button" onClick={generatePDF}>
            Imprimir
          </NextButton>
        </Link>
      </div>
    </CheckContainer>
  );
}

export default IvaSalesLedger;
