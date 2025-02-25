const Invoice = require("../models").Invoice;
const InvoiceDetail = require("../models").InvoiceDetail;
const InvoiceCounter = require("../models").InvoiceCounter;
const User = require("../models").User;
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const formatDate = require("../utils/formatDate");
const formatDocNumber = require("../utils/formatDocNumber");
const formatPointSale = require("../utils/formatPointSale");

const getInvoices = async (req, res) => {
  const invoices = await Invoice.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id_user", "company_name"],
      },
      {
        model: InvoiceDetail,
        as: "details",
        attributes: ["product", "amount", "sale_price"],
      },
    ],
  });
  res.json({ msg: "Invoices list", invoices });
};

const getInvoicesByCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res
        .status(400)
        .json({ error: "No se proporcionó el id de la empresa." });
    }
    const invoices = await Invoice.findAll({
      where: { id_company: companyId },
    });
    res.json({ invoices });
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
    res.status(500).json({ error: "Error al obtener las facturas." });
  }
};
const addInvoice = async (req, res) => {
  try {
    let { details, ...invoice } = req.body; // Separar details del resto de los datos de la factura
    const companyId = invoice.id_company;

    // Obtener el último número de factura para la compañía
    const invoiceCounter = await InvoiceCounter.findOne({
      where: { company_id: companyId },
    });
    const invoiceNumber = invoiceCounter.last_invoice_number
      ? invoiceCounter.last_invoice_number + 1
      : 1;
    const formattedInvoiceNumber = String(invoiceNumber).padStart(8, "0");

    // Asignar el número de factura al objeto invoice
    invoice.num_invoice = formattedInvoiceNumber;
    // Insertar la nueva factura y obtener su id
    const createdInvoice = await Invoice.create(invoice);
    const invoiceId = createdInvoice.id_invoice; // Obtener el id de la factura creada

    // Agregar los detalles de la factura con el id de la factura
    details = details || []; // Asegurar que details sea un array
    for (const detail of details) {
      detail.id_invoice = invoiceId; // Asignar el id de la factura a cada detalle
      await InvoiceDetail.create(detail); // Insertar cada detalle en la base de datos
    }

    // Actualizar el número de factura en la tabla invoice_counters
    if (invoiceCounter) {
      await InvoiceCounter.update(
        { last_invoice_number: invoiceNumber },
        { where: { company_id: companyId } }
      );
    } else {
      await InvoiceCounter.create({
        company_id: companyId,
        last_invoice_number: invoiceNumber,
      });
    }

    // Respuesta exitosa
    res.status(201).json({ message: "Factura creada exitosamente." });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({ error: "Error al crear la factura." });
  }
};

const generateInvoicePDF = async (req, res) => {
  const invoiceData = req.body;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const filePath = path.join(__dirname, "invoice.pdf");
  const stream = fs.createWriteStream(filePath);
  const showIVA = invoiceData.type_invoice === "Factura A";

  const invoiceCounter = await InvoiceCounter.findOne({
    where: { company_id: invoiceData.company.id_user },
  });

  if (!invoiceCounter) {
    console.error("No se encontró el contador de facturas.");
    res.status(500).json({ error: "Error al generar la factura." });
    return;
  }

  doc.pipe(stream);

  // Header
  doc.fontSize(20).text(`${invoiceData.type_invoice}`, { align: "center" });
  doc.moveDown(0.5);

  // Invoice info (right-aligned)
  doc.fontSize(12);
  doc.text(`Punto de venta: ${formatPointSale(invoiceData.point_sale)}`, {
    align: "right",
  });
  doc.text(`Número de factura: ${formatDocNumber(invoiceCounter)}`, {
    align: "right",
  });
  const date = new Date(invoiceData.issue_date).toLocaleDateString("es-AR");
  doc.text(`Fecha de emisión: ${formatDate(date)}`, { align: "right" });
  doc.text(`Condición de venta: ${invoiceData.sale_condition}`, {
    align: "right",
  });
  doc.moveDown(1);

  // Company info
  doc
    .fontSize(18) // Cambiar el tamaño de la fuente a 14
    .font("Helvetica-Bold")
    .text(`${invoiceData.company.company_name}`);
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.company.cuit}`);
  doc.font("Helvetica-Bold").text("Domicilio comercial: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.company.business_address}`);
  doc
    .font("Helvetica-Bold")
    .text("Condición frente al IVA: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.company.IVA_condition}`);
  doc.font("Helvetica-Bold").text("Ingresos brutos: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.company.gross_revenue}`);
  const startDate = new Date(invoiceData.company.start_date).toLocaleDateString(
    "es-AR"
  );
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
  doc.font("Helvetica").text(`${invoiceData.buyer_name}`);
  doc.font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.buyer_cuit}`);
  doc.font("Helvetica-Bold").text("Condición IVA: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.buyer_IVA_condition}`);
  doc.font("Helvetica-Bold").text("Domicilio: ", { continued: true });
  doc.font("Helvetica").text(`${invoiceData.buyer_address}`);
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
  (invoiceData.details || []).forEach((detail) => {
    const salePrice = showIVA ? detail.sale_price : detail.sale_price * 1.21;
    const subtotal = showIVA
      ? detail.amount * detail.sale_price
      : detail.amount * detail.sale_price * 1.21;

    const currentY = doc.y;
    // Definir posiciones centrales según un ancho de página estándar
    const productX = 50;
    const amountX = 300;
    const priceX = 400;
    const subtotalX = 500;

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
    doc.text(`Subtotal: $${invoiceData.subtotal}`, 450, doc.y, {
      align: "right",
    });
    doc.text(`IVA: $${invoiceData.IVA_total}`, 450, doc.y, {
      align: "right",
    });
    doc
      .fontSize(14)
      .text(`Total: $${invoiceData.total}`, 450, doc.y, { align: "right" });
  } else {
    doc
      .fontSize(14)
      .text(`Total: $${invoiceData.total}`, 450, doc.y, { align: "right" });
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
    doc.text(`IVA Contenido: $${invoiceData.IVA_total}`, 50, doc.y, {
      align: "left",
    });
  }

  // Footer
  doc.moveDown(2);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Gracias por su compra.", 50, doc.y, { align: "center" });
  doc.text("Esta factura ha sido generada automáticamente.", {
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
    res.download(filePath, "invoice.pdf", (error) => {
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
  getInvoices,
  addInvoice,
  generateInvoicePDF,
  getInvoicesByCompany,
};
