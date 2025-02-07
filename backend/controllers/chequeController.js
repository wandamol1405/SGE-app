const Cheque = require("../models").Cheque;
const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const { NumerosALetras } = require("numero-a-letras");

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
  const isAlDia = chequeData.emission_mode === "A la orden";
  const isCert = chequeData.certified === "Sí";
  const isCrossed = chequeData.crossed === "Sí";
  const amountInWords = NumerosALetras(chequeData.amount);

  const { width, height } = page.getSize();
  const fontSize = 12;

  // Título "Cheque" en el centro
  page.drawText("CHEQUE", {
    x: width / 2 - 30,
    y: height - 30,
    size: fontSize + 4,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  // Banco y fecha
  page.drawText(`Banco: ${chequeData.bank_name}`, {
    x: 20,
    y: height - 60,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });
  const issueDateWords = new Date(chequeData.issue_date).toLocaleDateString(
    "es-AR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  page.drawText(`Fecha: ${issueDateWords}`, {
    x: width - 200,
    y: height - 60,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });
  page.drawText(`Lugar: ${chequeData.issue_place}`, {
    x: width - 200,
    y: height - 80,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });
  page.drawText(`Nº Cheque: ${chequeData.cheque_num}`, {
    x: 20,
    y: height - 80,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 90 },
    end: { x: width - 20, y: height - 90 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Cheque diferido
  if (isDif) {
    const collectioDateWords = new Date(
      chequeData.collection_date
    ).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    page.drawText(`(Cheque Diferido - Fecha de pago: ${collectioDateWords})`, {
      x: 20,
      y: height - 110,
      size: fontSize,
      color: rgb(1, 0, 0),
    });
    // Línea divisoria
    page.drawLine({
      start: { x: 20, y: height - 120 },
      end: { x: width - 20, y: height - 120 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  }

  // Beneficiario
  page.drawText(`Páguese `, {
    x: 20,
    y: height - 140,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  {
    isAlDia
      ? page.drawText(`a la orden de: ${chequeData.receiver_name}`, {
          x: 70,
          y: height - 140,
          size: fontSize,
          color: rgb(0, 0, 0),
        })
      : page.drawText(`al portador`, {
          x: 70,
          y: height - 140,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
  }

  // Monto
  page.drawText(`la suma de:`, {
    x: 20,
    y: height - 170,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(amountInWords.toUpperCase(), {
    x: 90,
    y: height - 170,
    size: fontSize,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${chequeData.amount}`, {
    x: width - 100,
    y: height - 170,
    size: fontSize + 2,
    color: rgb(0, 0, 0),
  });

  // Cuenta
  page.drawText(`Cuenta Nº: ${chequeData.account_number}`, {
    x: 20,
    y: height - 200,
    size: fontSize - 1,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
  });

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 210 },
    end: { x: width - 20, y: height - 210 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Firma
  page.drawText(`Firma:`, {
    x: width - 150,
    y: height - 240,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  // Cheque certificado
  if (isCert) {
    page.drawText(`CERTIFICADO`, {
      x: width / 2 - 40,
      y: height - 240,
      size: fontSize + 2,
      color: rgb(0, 0, 1),
    });
  }

  // Cheque cruzado
  if (isCrossed) {
    const lineMargin = 10;
    const lineLength = 50;
    const lineY = height - 20;
    const lineX = 50; // Moved to the right
    const angle = (3 * Math.PI) / 4; // 135 degrees in radians

    page.drawLine({
      start: { x: lineX, y: lineY },
      end: {
        x: lineX + lineLength * Math.cos(angle),
        y: lineY - lineLength * Math.sin(angle),
      },
      thickness: 2,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: lineX, y: lineY - lineMargin },
      end: {
        x: lineX + lineLength * Math.cos(angle),
        y: lineY - lineMargin - lineLength * Math.sin(angle),
      },
      thickness: 2,
      color: rgb(0, 0, 0),
    });
    page.drawText(`CRUZADO`, {
      x: width / 2 - 40,
      y: height - 60,
      size: fontSize + 2,
      color: rgb(0, 0, 1),
    });
  }

  // Mensaje de footer
  page.drawText(
    "Documento de práctica - No válido para operaciones comerciales.",
    { x: width / 3, y: height - 280, size: 10, color: rgb(0, 0, 0) }
  );
  page.drawText("Este cheque ha sido generado automáticamente.", {
    x: width / 4,
    y: height - 290,
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
