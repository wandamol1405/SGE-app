const BuyOrder = require("../models").BuyOrder;
const BuyOrderDetail = require("../models").BuyOrderDetail;
const BuyOrderCounter = require("../models").BuyOrderCounter;
const User = require("../models").User;
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const formatDate = require("../utils/formatDate");
const formatDocNumber = require("../utils/formatDocNumber");
const formatPrice = require("../utils/formatPrice");

const getBuyOrders = async (req, res) => {
  const buyOrders = await BuyOrder.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id_user", "company_name"],
      },
      {
        model: BuyOrderDetail,
        as: "details",
        attributes: ["product", "amount", "unit_price"],
      },
    ],
  });
  res.json({ msg: "Buy Orders list", buyOrders });
};

const addBuyOrder = async (req, res) => {
  try {
    let { details, ...buyOrder } = req.body;
    const companyId = buyOrder.id_company;

    const buyOrderCounter = await BuyOrderCounter.findOne({
      where: { company_id: companyId },
    });
    const buyOrderNumber = buyOrderCounter.last_buy_order_number
      ? buyOrderCounter.last_buy_order_number + 1
      : 1;
    const formattedBuyOrderNumber = String(buyOrderNumber).padStart(8, "0");

    buyOrder.order_number = formattedBuyOrderNumber;
    const createdBuyOrder = await BuyOrder.create(buyOrder);
    const buyOrderId = createdBuyOrder.id_order;

    details = details || [];
    for (const detail of details) {
      detail.id_order = buyOrderId;
      await BuyOrderDetail.create(detail);
    }

    if (buyOrderCounter) {
      await BuyOrderCounter.update(
        { last_buy_order_number: buyOrderNumber },
        { where: { company_id: companyId } }
      );
    } else {
      await BuyOrderCounter.create({
        company_id: companyId,
        last_buy_order_number: buyOrderNumber,
      });
    }

    res.status(201).json({ message: "Orden de compra creada exitosamente." });
  } catch (error) {
    console.error("Error al crear la orden de compra:", error);
    res.status(500).json({ error: "Error al crear la orden de compra." });
  }
};

const getBuyOrdersbyCompany = async (req, res) => {
  const companyId = req.params.id;
  if (!companyId) {
    return res
      .status(400)
      .json({ error: "No se proporcionó el id de la empresa." });
  }
  const buyOrders = await BuyOrder.findAll({
    where: { id_company: companyId },
  });
  res.json({ buyOrders });
};

const generateBuyOrderPDF = async (req, res) => {
  const buyOrderData = req.body;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const pdfPath = path.join(__dirname, "buyOrder.pdf");
  const stream = fs.createWriteStream(pdfPath);

  const buyOrderCounter = await BuyOrderCounter.findOne({
    where: { company_id: buyOrderData.company.id_user },
  });

  doc.pipe(stream);
  doc.fontSize(20).text("X - Orden de Compra", { align: "center" });
  doc.moveDown(0.5);

  doc.fontSize(12);
  doc.text(
    `Número de Orden: ${formatDocNumber(
      buyOrderCounter.last_buy_order_number
    )}`,
    {
      align: "right",
    }
  );
  doc.text(`Fecha de Emisión: ${formatDate(buyOrderData.issue_date)}`, {
    align: "right",
  });
  doc.text(`Fecha de Entrega: ${formatDate(buyOrderData.delivery_date)}`, {
    align: "right",
  });
  doc.text(`Condición de Venta: ${buyOrderData.sale_condition}`, {
    align: "right",
  });
  doc.moveDown(1);

  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .text(`${buyOrderData.company.company_name}`);
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.company.cuit}`);
  doc.font("Helvetica-Bold").text("Domicilio comercial: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.company.business_address}`);
  doc
    .font("Helvetica-Bold")
    .text("Condición frente al IVA: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.company.IVA_condition}`);
  doc.font("Helvetica-Bold").text("Ingresos brutos: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.company.gross_revenue}`);
  doc.font("Helvetica-Bold").text("Fecha de inicio de actividades:", {
    continued: true,
  });
  doc.font("Helvetica").text(`${formatDate(buyOrderData.company.start_date)}`);
  doc.moveDown(1);

  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").text("Nombre y apellido: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.supplier_name}`);
  doc.font("Helvetica-Bold").text("CUIT: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.supplier_cuit}`);
  doc.font("Helvetica-Bold").text("Condición IVA: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.supplier_condition}`);
  doc.font("Helvetica-Bold").text("Domicilio: ", { continued: true });
  doc.font("Helvetica").text(`${buyOrderData.supplier_address}`);
  doc.moveDown(1);

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
  (buyOrderData.details || []).forEach((detail) => {
    const salePrice = detail.unit_price;
    const subtotal = detail.amount * detail.unit_price;

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

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);
  });

  doc.fontSize(12).font("Helvetica-Bold");
  doc
    .fontSize(14)
    .text(`Total: $${formatPrice(buyOrderData.total)}`, 400, doc.y, {
      align: "right",
    });

  doc.moveDown(2);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Gracias por su compra.", 50, doc.y, { align: "center" });
  doc.text("Esta orden de compra ha sido generada automáticamente.", {
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
    res.download(pdfPath, "buyOrder.pdf", (error) => {
      if (error) {
        console.error("Error al descargar el archivo:", error);
        res.status(500).json({ error: "Error al descargar el archivo." });
      } else {
        fs.unlink(pdfPath, (error) => {
          if (error) {
            console.error("Error al eliminar el archivo:", error);
          }
        });
      }
    });
  });
};

module.exports = {
  getBuyOrders,
  addBuyOrder,
  generateBuyOrderPDF,
  getBuyOrdersbyCompany,
};
