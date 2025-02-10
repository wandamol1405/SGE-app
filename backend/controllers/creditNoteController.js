const CreditNote = require("../models").CreditNote;
const CreditNoteDetail = require("../models").CreditNoteDetail;
const CreditNoteCounter = require("../models").CreditNoteCounter;
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const getCreditNote = async (req, res) => {
  const creditNotes = await CreditNote.findAll();
  res.json({ msg: "Credit note list", creditNotes });
};

const getCreditNotesByCompany = async (req, res) => {
  const companyId = req.params.id;
  const creditNotes = await CreditNote.findAll({
    where: { id_company: companyId },
  });
  res.json({ msg: "Credit note list", creditNotes });
};

const addCreditNote = async (req, res) => {
  try {
    let { details, ...creditNote } = req.body;
    const companyId = creditNote.id_company;

    const creditNoteCounter = await CreditNoteCounter.findOne({
      where: { id_company: companyId },
    });
    const creditNoteNumber = creditNoteCounter.last_credit_note_number
      ? creditNoteCounter.last_credit_note_number + 1
      : 1;
    const formattedCreditNoteNumber = String(creditNoteNumber).padStart(8, "0");

    creditNote.num_credit_note = formattedCreditNoteNumber;

    const createdCreditNote = await CreditNote.create(creditNote);
    const creditNoteId = createdCreditNote.id_credit_note;

    details = details || []; // Asegurar que details sea un array
    for (const detail of details) {
      detail.id_credit_note_detail = creditNoteId;
      await CreditNoteDetail.create(detail); // Insertar cada detalle en la base de datos
    }

    if (creditNoteCounter) {
      await CreditNoteCounter.update(
        { last_credit_note_number: creditNoteNumber },
        { where: { id_company: companyId } }
      );
    } else {
      await CreditNoteCounter.create({
        id_company: companyId,
        last_credit_note_number: creditNoteNumber,
      });
    }

    // Respuesta exitosa
    res.status(201).json({ message: "Nota de crédito creada exitosamente." });
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ error: "Error al crear la nota de crédito." });
  }
};

const generateCreditNotePDF = async (req, res) => {
  const creditNoteData = req.body;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const filePath = path.join(__dirname, "credit-note.pdf");
  const stream = fs.createWriteStream(filePath);
  const showIVA = creditNoteData.type_credit_note === "Nota de crédito A";

  const creditNoteCounter = await CreditNoteCounter.findOne({
    where: { id_company: creditNoteData.company.id_user },
  });

  const creditNoteNumber = creditNoteCounter
    ? String(creditNoteCounter.last_credit_note_number).padStart(8, "0")
    : "00000001";

  doc.pipe(stream);

  // Header
  doc
    .fontSize(20)
    .text(`${creditNoteData.type_credit_note}`, { align: "center" });
  doc.moveDown(0.5);

  // credit note info (right-aligned)
  doc.fontSize(12);
  doc.text(`Punto de venta: ${creditNoteData.point_sale}`, { align: "right" });
  doc.text(`Número de nota de crédito: ${creditNoteNumber}`, {
    align: "right",
  });
  const date = new Date(creditNoteData.issue_date).toLocaleDateString("es-AR");
  doc.text(`Fecha de emisión: ${date}`, { align: "right" });
  doc.text(`Condición de venta: ${creditNoteData.sale_condition}`, {
    align: "right",
  });
  doc.moveDown(1);

  // Company info
  doc
    .fontSize(18) // Cambiar el tamaño de la fuente a 14
    .font("Helvetica-Bold")
    .text(`${creditNoteData.company.company_name}`);
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.company.cuit}`);
  doc.font("Helvetica-Bold").text("Domicilio comercial: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.company.business_address}`);
  doc
    .font("Helvetica-Bold")
    .text("Condición frente al IVA: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.company.IVA_condition}`);
  doc.font("Helvetica-Bold").text("Ingresos brutos: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.company.gross_revenue}`);
  const startDate = new Date(
    creditNoteData.company.start_date
  ).toLocaleDateString("es-AR");
  doc.font("Helvetica-Bold").text("Fecha de inicio de actividades:", {
    continued: true,
  });
  doc.font("Helvetica").text(`${startDate}`);
  doc.moveDown(1);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Buyer info
  doc.font("Helvetica-Bold").text("Nombre y apellido: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.buyer_name}`);
  doc.font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.buyer_cuit}`);
  doc.font("Helvetica-Bold").text("Condición IVA: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.buyer_IVA_condition}`);
  doc.font("Helvetica-Bold").text("Domicilio: ", { continued: true });
  doc.font("Helvetica").text(`${creditNoteData.buyer_address}`);
  doc.moveDown(1);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  const currentY = doc.y;

  // Table header
  doc.fontSize(10).font("Helvetica-Bold");
  doc.text("Descripción", 50, currentY);
  doc.text("Cantidad", 300, currentY);
  doc.text("Precio Unitario", 400, currentY);
  doc.text("Subtotal", 500, currentY);
  doc.moveDown(0.5);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Table rows
  doc.font("Helvetica");
  (creditNoteData.details || []).forEach((detail) => {
    const salePrice = showIVA ? detail.unit_price : detail.unit_price * 1.21;
    const subtotal = showIVA
      ? detail.amount * detail.unit_price
      : detail.amount * detail.unit_price * 1.21;

    // Definir posiciones centrales según un ancho de página estándar
    const productX = 50;
    const amountX = 300;
    const priceX = 400;
    const subtotalX = 500;

    const currentY = doc.y;

    doc.text(detail.product, productX, currentY);
    doc.text(detail.amount.toString(), amountX, currentY);
    doc.text(`$${salePrice}`, priceX, currentY);
    doc.text(`$${subtotal}`, subtotalX, currentY);

    doc.moveDown(0.5);
  });

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Totals
  doc.fontSize(12).font("Helvetica-Bold");

  if (showIVA) {
    doc.text(`Subtotal: $${creditNoteData.subtotal}`, 450, doc.y, {
      align: "right",
    });
    doc.text(`IVA: $${creditNoteData.IVA_total}`, 450, doc.y, {
      align: "right",
    });
    doc
      .fontSize(14)
      .text(`Total: $${creditNoteData.total}`, 450, doc.y, { align: "right" });
  } else {
    doc
      .fontSize(14)
      .text(`Total: $${creditNoteData.total}`, 450, doc.y, { align: "right" });
    doc.moveDown(0.5);
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        "Régimen de Transparencia Fiscal al Consumidor (Ley 27.743)",
        50,
        doc.y,
        {
          align: "left",
        }
      );
    doc.text(`IVA Contenido: $${creditNoteData.IVA_total}`, 50, doc.y, {
      align: "left",
    });
  }

  // Footer
  doc.moveDown(2);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Gracias por su compra.", { align: "center" });
  doc.text("Esta nota de crédito ha sido generada automáticamente.", {
    align: "center",
  });
  doc.moveDown(0.5);
  doc
    .font("Helvetica-Bold")
    .text("Documento de práctica - No válido para operaciones comerciales.", {
      align: "center",
    });

  // Finalize the PDF
  doc.end();

  stream.on("finish", () => {
    res.download(filePath, "credit-note.pdf", (error) => {
      if (error) {
        console.error("Error al descargar el archivo:", error);
        res.status(500).json({ error: "Error al descargar el archivo." });
      } else {
        fs.unlink(filePath, (error) => {
          if (error) {
            console.error("Error al eliminar el archivo:", error);
          }
        });
      }
    });
  });
};

module.exports = {
  getCreditNote,
  addCreditNote,
  generateCreditNotePDF,
  getCreditNotesByCompany,
};
