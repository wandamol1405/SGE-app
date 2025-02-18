const DeliveryNote = require("../models").DeliveryNote;
const DeliveryNoteDetail = require("../models").DeliveryNoteDetail;
const DeliveryNoteCounter = require("../models").DeliveryNoteCounter;
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const getDeliveryNote = async (req, res) => {
  const deliveryNotes = await DeliveryNote.findAll();
  res.json({ msg: "Delivery note list", deliveryNotes });
};

const getDeliveryNoteByCompany = async (req, res) => {
  const companyId = req.params.id;
  const deliveryNotes = await DeliveryNote.findAll({
    where: { id_company: companyId },
  });
  res.json({ msg: "Delivery note list", deliveryNotes });
};

const addDeliveryNote = async (req, res) => {
  try {
    let { details, ...deliveryNote } = req.body; // Separar details del resto de los datos de la factura
    const companyId = deliveryNote.id_company;

    // Obtener el último número de factura para la compañía
    const deliveryNoteCounter = await DeliveryNoteCounter.findOne({
      where: { id_company: companyId },
    });
    const deliveryNoteNumber = deliveryNoteCounter.last_delivery_note_number
      ? deliveryNoteCounter.last_delivery_note_number + 1
      : 1;
    const formattedDeliveryNoteNumber = String(deliveryNoteNumber).padStart(
      8,
      "0"
    );

    deliveryNote.num_delivery_note = formattedDeliveryNoteNumber;
    // Insertar la nueva factura y obtener su id
    const createdDeliveryNote = await DeliveryNote.create(deliveryNote);
    const deliveryNoteId = createdDeliveryNote.id_delivery_note; // Obtener el id de la factura creada

    // Agregar los detalles de la factura con el id de la factura
    details = details || []; // Asegurar que details sea un array
    for (const detail of details) {
      detail.id_delivery_note = deliveryNoteId; // Asignar el id de la factura a cada detalle
      await DeliveryNoteDetail.create(deliveryNote); // Insertar cada detalle en la base de datos
    }

    if (deliveryNoteCounter) {
      await DeliveryNoteCounter.update(
        { last_delivery_note_number: deliveryNoteNumber },
        { where: { id_company: companyId } }
      );
    } else {
      await DeliveryNoteCounter.create({
        id_company: companyId,
        last_delivery_note_number: deliveryNoteNumber,
      });
    }

    // Respuesta exitosa
    res.status(201).json({ message: "Remito creada exitosamente." });
  } catch (error) {
    console.error("Error al crear el remito:", error);
    res.status(500).json({ error: "Error al crear el remito." });
  }
};

const generateDeliveryNotePDF = async (req, res) => {
  const deliveryNoteData = req.body;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const filePath = path.join(__dirname, "delivery_note.pdf");
  const stream = fs.createWriteStream(filePath);

  const deliveryNoteCounter = await DeliveryNoteCounter.findOne({
    where: { id_company: deliveryNoteData.company.id_user },
  });

  const deliveryNoteNumber = deliveryNoteCounter
    ? String(deliveryNoteCounter.last_delivery_note_number).padStart(8, "0")
    : "00000001";

  doc.pipe(stream);

  // Header
  doc
    .fontSize(20)
    .text(`${deliveryNoteData.type_delivery_note}`, { align: "center" });
  doc.moveDown(0.5);

  doc.fontSize(12);
  doc.text(`Punto de venta: ${deliveryNoteData.point_sale}`, {
    align: "right",
  });
  doc.text(`Número de remito: ${deliveryNoteNumber}`, { align: "right" });
  const date = new Date(deliveryNoteData.issue_date).toLocaleDateString(
    "es-AR"
  );
  doc.text(`Fecha de emisión: ${date}`, { align: "right" });
  doc.text(`Condición de venta: ${deliveryNoteData.sale_condition}`, {
    align: "right",
  });
  doc.moveDown(1);

  // Company info
  doc
    .fontSize(18) // Cambiar el tamaño de la fuente a 14
    .font("Helvetica-Bold")
    .text(`${deliveryNoteData.company.company_name}`);
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.company.cuit}`);
  doc.font("Helvetica-Bold").text("Domicilio comercial: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.company.business_address}`);
  doc
    .font("Helvetica-Bold")
    .text("Condición frente al IVA: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.company.IVA_condition}`);
  doc.font("Helvetica-Bold").text("Ingresos brutos: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.company.gross_revenue}`);
  const startDate = new Date(
    deliveryNoteData.company.start_date
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
  doc.font("Helvetica").text(`${deliveryNoteData.buyer_name}`);
  doc.font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.buyer_cuit}`);
  doc.font("Helvetica-Bold").text("Condición IVA: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.buyer_IVA_condition}`);
  doc.font("Helvetica-Bold").text("Domicilio: ", { continued: true });
  doc.font("Helvetica").text(`${deliveryNoteData.buyer_address}`);
  doc.moveDown(1);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  const currentY = doc.y;

  // Table header
  doc.fontSize(10).font("Helvetica-Bold");
  doc.text("Descripción", 50, currentY);
  doc.text("Cantidad", 500, currentY);
  doc.moveDown(0.5);

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Table rows
  doc.font("Helvetica");
  (deliveryNoteData.details || []).forEach((detail) => {
    // Definir posiciones centrales según un ancho de página estándar
    const productX = 50;
    const amountX = 500;

    const currentY = doc.y;

    doc.text(detail.product, productX, currentY);
    doc.text(detail.amount.toString(), amountX, currentY);

    doc.moveDown(0.5);
  });

  // Line separator
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(2);

  doc.fontSize(12).font("Helvetica-Bold");
  doc.text("Medio de transporte: ", 50, doc.y, { continued: true });
  doc.font("Helvetica");
  doc.text(`${deliveryNoteData.means_of_delivery}`);
  doc.moveDown(1);

  doc.fontSize(12).font("Helvetica-Bold");
  doc.text("Observaciones: ", 50, doc.y);
  doc.moveDown(0.5);
  doc.font("Helvetica");
  doc.text(`${deliveryNoteData.observation}`);

  // Totals
  doc.fontSize(12).font("Helvetica-Bold");

  // Footer
  doc.moveDown(2);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Gracias por su compra.", 50, doc.y, { align: "center" });
  doc.text("Este remito ha sido generado automáticamente.", {
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
    res.download(filePath, "delivery-note.pdf", (error) => {
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
  getDeliveryNote,
  addDeliveryNote,
  generateDeliveryNotePDF,
  getDeliveryNoteByCompany,
};
