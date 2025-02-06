const Cheque = require("../models").Cheque;
const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");
const numeroALetras = require("numero-a-letras");

const getCheques = async (req, res) => {
  const cheques = await Cheque.findAll();
  res.json({ msg: "Cheques list", cheques });
};

const addCheque = async (req, res) => {
  try {
    const cheque = req.body;

    cheque.crossed = cheque.crossed === "Sí" ? true : false;
    cheque.certified = cheque.certified === "Sí" ? true : false;

    if (cheque.collection_date === "No corresponde") {
      cheque.collection_date = null;
    }

    await Cheque.create(cheque);
    res.status(201).json({ message: "Cheque creado exitosamente." });
  } catch (error) {
    console.error("Error al crear el cheque:", error);
    res.status(500).json({ error: "Error al crear el cheque." });
  }
};

const generateChequePDF = async (req, res) => {
  const chequeData = req.body;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 300]); // Tamaño aproximado de un cheque
  const filePath = path.join(__dirname, "cheque.pdf");

  const isDif = chequeData.cheque_type === "Diferido";
  const isAlDia = chequeData.cheque_type === "A la orden";
  const isCert = chequeData.certified === "Sí";
  const isCrossed = chequeData.crossed === "Sí";
  const amountInWords = numeroALetras.NumerosALetras(chequeData.amount);

  const { width, height } = page.getSize();
  const fontSize = 12;

  // Banco y fecha
  page.drawText(`Banco: ${chequeData.bank_name}`, {
    x: 20,
    y: height - 40,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Fecha: ${chequeData.issue_date}`, {
    x: width - 150,
    y: height - 40,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Lugar: ${chequeData.issue_place}`, {
    x: width - 150,
    y: height - 60,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Nº Cheque: ${chequeData.cheque_num}`, {
    x: 20,
    y: height - 60,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 70 },
    end: { x: width - 20, y: height - 70 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Cheque diferido
  if (isDif) {
    page.drawText(
      `(Cheque Diferido - Fecha de pago: ${chequeData.collection_date})`,
      { x: 20, y: height - 90, size: fontSize, color: rgb(1, 0, 0) }
    );
  }

  // Beneficiario
  const textBenef = `Páguese ${isAlDia ? "a la orden de" : "únicamente a"}:`;
  page.drawText(textBenef, {
    x: 20,
    y: height - 120,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(chequeData.receiver_name, {
    x: 200,
    y: height - 120,
    size: fontSize + 2,
    color: rgb(0, 0, 0),
  });

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 130 },
    end: { x: width - 20, y: height - 130 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Monto
  page.drawText(`La suma de:`, {
    x: 20,
    y: height - 150,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(amountInWords, {
    x: 120,
    y: height - 150,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${chequeData.amount}`, {
    x: width - 100,
    y: height - 150,
    size: fontSize + 2,
    color: rgb(0, 0, 0),
  });

  // Cuenta
  page.drawText(`Cuenta Nº: ${chequeData.account_number}`, {
    x: 20,
    y: height - 180,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 190 },
    end: { x: width - 20, y: height - 190 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Firma
  page.drawText(`Firma:`, {
    x: width - 150,
    y: height - 220,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Cheque certificado
  if (isCert) {
    page.drawText(`CERTIFICADO`, {
      x: width / 2 - 40,
      y: height - 200,
      size: fontSize + 2,
      color: rgb(0, 0, 1),
    });
  }

  // Cheque cruzado
  if (isCrossed) {
    page.drawLine({
      start: { x: 50, y: height - 80 },
      end: { x: width - 50, y: height - 240 },
      thickness: 2,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: width - 50, y: height - 80 },
      end: { x: 50, y: height - 240 },
      thickness: 2,
      color: rgb(0, 0, 0),
    });
  }

  // Mensaje de footer
  page.drawText(
    "Documento de práctica - No válido para operaciones comerciales.",
    { x: width / 3, y: height - 260, size: 10, color: rgb(0, 0, 0) }
  );
  page.drawText("Este cheque ha sido generado automáticamente.", {
    x: width / 4,
    y: height - 270,
    size: 10,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile(filePath, pdfBytes);

  res.download(filePath, "cheque.pdf", (error) => {
    if (error) console.error("Error al descargar el archivo:", error);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error al eliminar el archivo:", err);
    });
  });
};

module.exports = { getCheques, addCheque, generateChequePDF };
