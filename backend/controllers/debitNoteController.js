const DebitNote = require("../models").DebitNote;
const DebitNoteDetail = require("../models").DebitNoteDetail;
const DebitNoteCounter = require("../models").DebitNoteCounter;
const User = require("../models").User;
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const formatDate = require("../utils/formatDate");
const formatDocNumber = require("../utils/formatDocNumber");
const formatPointSale = require("../utils/formatPointSale");
const formatPrice = require("../utils/formatPrice");

const getDebitNote = async (req, res) => {
  const debitNotes = await DebitNote.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id_user", "company_name"],
      },
      {
        model: DebitNoteDetail,
        as: "details",
        attributes: ["product", "amount", "unit_price"],
      },
    ],
  });
  res.json({ msg: "Debit note list", debitNotes });
};

const getDebitNoteByCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res
        .status(400)
        .json({ error: "No se proporcionó el id de la empresa." });
    }
    const debitNotes = await DebitNote.findAll({
      where: { id_company: companyId },
    });
    res.json({ debitNotes });
  } catch (error) {
    console.error("Error al obtener las notas de débito:", error);
    res.status(500).json({ error: "Error al obtener las notas de débito." });
  }
};

const addDebitNote = async (req, res) => {
  try {
    let { details, ...debitNote } = req.body;
    const companyId = debitNote.id_company;
    const debitNoteType = debitNote.type_debit_note;

    const debitNoteCounter = await DebitNoteCounter.findOne({
      where: { id_company: companyId, debit_note_type: debitNoteType },
    });
    const debitNoteNumber = debitNoteCounter.last_debit_note_number
      ? debitNoteCounter.last_debit_note_number + 1
      : 1;
    const formattedDebitNoteNumber = String(debitNoteNumber).padStart(8, "0");

    debitNote.num_debit_note = formattedDebitNoteNumber;

    const createdDebitNote = await DebitNote.create(debitNote);
    const debitNoteId = createdDebitNote.id_debit_note;

    details = details || []; // Asegurar que details sea un array
    for (const detail of details) {
      detail.id_debit_note = debitNoteId;
      await DebitNoteDetail.create(detail); // Insertar cada detalle en la base de datos
    }

    if (debitNoteCounter) {
      await DebitNoteCounter.update(
        { last_debit_note_number: debitNoteNumber },
        { where: { id_company: companyId, debit_note_type: debitNoteType } }
      );
    } else {
      await DebitNoteCounter.create({
        id_company: companyId,
        debit_note_type: debitNoteType,
        last_debit_note_number: debitNoteNumber,
      });
    }

    // Respuesta exitosa
    res.status(201).json({ message: "Nota de débito creada exitosamente." });
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ error: "Error al crear la nota de débito." });
  }
};

const generateDebitNotePDF = async (req, res) => {
  const debitNoteData = req.body;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const filePath = path.join(__dirname, "debit-note.pdf");
  const stream = fs.createWriteStream(filePath);
  const showIVA = debitNoteData.type_debit_note === "Nota de Débito A";

  const debitNoteCounter = await DebitNoteCounter.findOne({
    where: {
      id_company: debitNoteData.company.id_user,
      debit_note_type: debitNoteData.type_debit_note,
    },
  });

  doc.pipe(stream);

  // Header
  doc
    .fontSize(20)
    .text(`${debitNoteData.type_debit_note}`, { align: "center" });
  doc.moveDown(0.5);

  // Debit note info (right-aligned)
  doc.fontSize(12);
  doc.text(`Punto de venta: ${formatPointSale(debitNoteData.point_sale)}`, {
    align: "right",
  });
  doc.text(
    `Número de nota de débito: ${formatDocNumber(
      debitNoteCounter.last_debit_note_number
    )}`,
    {
      align: "right",
    }
  );

  doc.text(`Fecha de emisión: ${formatDate(debitNoteData.issue_date)}`, {
    align: "right",
  });
  doc.text(`Condición de venta: ${debitNoteData.sale_condition}`, {
    align: "right",
  });
  doc.moveDown(1);

  // Company info
  doc
    .fontSize(18) // Cambiar el tamaño de la fuente a 14
    .font("Helvetica-Bold")
    .text(`${debitNoteData.company.company_name}`);
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.company.cuit}`);
  doc.font("Helvetica-Bold").text("Domicilio comercial: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.company.business_address}`);
  doc
    .font("Helvetica-Bold")
    .text("Condición frente al IVA: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.company.IVA_condition}`);
  doc.font("Helvetica-Bold").text("Ingresos brutos: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.company.gross_revenue}`);
  doc.font("Helvetica-Bold").text("Fecha de inicio de actividades:", {
    continued: true,
  });
  doc.font("Helvetica").text(`${formatDate(debitNoteData.company.start_date)}`);
  doc.moveDown(1);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Buyer info
  doc.font("Helvetica-Bold").text("Nombre y apellido: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.buyer_name}`);
  doc.font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.buyer_cuit}`);
  doc.font("Helvetica-Bold").text("Condición IVA: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.buyer_IVA_condition}`);
  doc.font("Helvetica-Bold").text("Domicilio: ", { continued: true });
  doc.font("Helvetica").text(`${debitNoteData.buyer_address}`);
  doc.moveDown(1);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  const currentY = doc.y;

  // Table header
  doc.fontSize(10).font("Helvetica-Bold");
  doc.text("Descripción", 50, currentY);
  doc.text("Cantidad", 300, currentY);
  doc.text("Precio Unitario", 350, currentY);
  doc.text("Subtotal", 450, currentY);
  doc.moveDown(0.5);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Table rows
  doc.font("Helvetica");
  (debitNoteData.details || []).forEach((detail) => {
    const salePrice = showIVA ? detail.unit_price : detail.unit_price * 1.21;
    const subtotal = showIVA
      ? detail.amount * detail.unit_price
      : detail.amount * detail.unit_price * 1.21;

    // Definir posiciones centrales según un ancho de página estándar
    const productX = 50;
    const amountX = 300;
    const priceX = 350;
    const subtotalX = 450;

    const currentY = doc.y;

    doc.text(detail.product, productX, currentY);
    doc.text(detail.amount.toString(), amountX, currentY);
    doc.text(`$${formatPrice(salePrice)}`, priceX, currentY);
    doc.text(`$${formatPrice(subtotal)}`, subtotalX, currentY);

    doc.moveDown(0.5);
  });

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Totals
  doc.fontSize(12).font("Helvetica-Bold");

  if (showIVA) {
    doc.text(`Subtotal: $${formatPrice(debitNoteData.subtotal)}`, 400, doc.y, {
      align: "right",
    });
    doc.text(`IVA: $${formatPrice(debitNoteData.IVA_total)}`, 400, doc.y, {
      align: "right",
    });
    doc
      .fontSize(14)
      .text(`Total: $${formatPrice(debitNoteData.total)}`, 400, doc.y, {
        align: "right",
      });
  } else {
    doc
      .fontSize(14)
      .text(`Total: $${formatPrice(debitNoteData.total)}`, 400, doc.y, {
        align: "right",
      });
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
    doc.text(`IVA Contenido: $${debitNoteData.IVA_total}`, 50, doc.y, {
      align: "left",
    });
  }

  // Footer
  doc.moveDown(2);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Gracias por su compra.", 50, doc.y, { align: "center" });
  doc.text("Esta nota de débito ha sido generada automáticamente.", {
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
    res.download(filePath, "debit-note.pdf", (error) => {
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
  getDebitNote,
  addDebitNote,
  generateDebitNotePDF,
  getDebitNoteByCompany,
};
