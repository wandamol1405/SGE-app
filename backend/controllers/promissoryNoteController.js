const PromissoryNote = require("../models").PromissoryNote;
const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const { NumerosALetras } = require("numero-a-letras");

const getPromissoryNotes = async (req, res) => {
  const promissoryNote = await PromissoryNote.findAll();
  res.json({ msg: "Promissory notes list", promissoryNote });
};

const getPromissoryNotesByCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res
        .status(400)
        .json({ error: "No se proporcionó el id de la empresa." });
    }
    const promissoryNotes = await PromissoryNote.findAll({
      where: { id_company: companyId },
    });
    res.json({ promissoryNotes });
  } catch (error) {
    console.error("Error al obtener los pagaré:", error);
    res.status(500).json({ error: "Error al obtener los pagaré." });
  }
};

const addPromissoryNote = async (req, res) => {
  try {
    const { manturity_type, ...promissoryNote } = req.body;

    if (promissoryNote.manturity_date === "No corresponde") {
      promissoryNote.manturity_date = null;
    }
    if (promissoryNote.manturity_days === "No corresponde") {
      promissoryNote.manturity_days = null;
    }

    await PromissoryNote.create(promissoryNote);
    res.status(201).json({ message: "Pagaré creado exitosamente." });
  } catch (error) {
    console.error("Error al crear el pagaré:", error);
    res.status(500).json({ error: "Error al crear el pagaré." });
  }
};

const generatePromissoryNotePDF = async (req, res) => {
  const promissoryNoteData = req.body;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 300]);
  const filePath = path.join(__dirname, "promissoryNote.pdf");

  const { width, height } = page.getSize();
  const fontSize = 12;

  const amountInWords = NumerosALetras(promissoryNoteData.amount);

  page.drawText("PAGARÉ", {
    x: 20,
    y: height - 30,
    size: fontSize + 4,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  let manturityDateWords = "";
  if (promissoryNoteData.manturity_type === "Tantos días") {
    manturityDateWords = `a los ${promissoryNoteData.manturity_days} días`;
  } else if (promissoryNoteData.manturity_type === "Día fijo") {
    manturityDateWords = new Date(
      promissoryNoteData.manturity_date
    ).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    manturityDateWords = "a la vista";
  }
  page.drawText(`Fecha de vencimiento: ${manturityDateWords}`, {
    x: 20,
    y: height - 80,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  page.drawText(`Lugar de pago: ${promissoryNoteData.pay_place}`, {
    x: width - 300,
    y: height - 40,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });
  page.drawText(`$${promissoryNoteData.amount} pesos argentinos`, {
    x: width - 300,
    y: height - 80,
    size: fontSize + 2,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 100 },
    end: { x: width - 20, y: height - 100 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText(
    `Por éste pagaré me comprometo a pagar el dia de vencimiento indicado a ${promissoryNoteData.receiver_name}`,
    {
      x: 20,
      y: height - 120,
      size: fontSize,
      color: rgb(0, 0, 0),
    }
  );

  // Cuenta
  page.drawText(
    `el monto de : ${amountInWords.toUpperCase()} pesos argentinos`,
    {
      x: 20,
      y: height - 140,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    }
  );

  // Línea divisoria
  page.drawLine({
    start: { x: 20, y: height - 180 },
    end: { x: width - 20, y: height - 180 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Fecha de emision
  const issueDateWords = new Date(
    promissoryNoteData.issue_date
  ).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  page.drawText(`Fecha de emisión: ${issueDateWords}`, {
    x: 20,
    y: height - 200,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  //Lugar de emision
  page.drawText(`Lugar de emisión: ${promissoryNoteData.issue_place}`, {
    x: width - 250,
    y: height - 200,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Firma
  page.drawText(`Firma:`, {
    x: width - 150,
    y: height - 220,
    size: fontSize,
    color: rgb(0, 0, 0),
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  });

  // Mensaje de footer
  page.drawText(
    "Documento de práctica - No válido para operaciones comerciales.",
    { x: width / 3, y: height - 280, size: 10, color: rgb(0, 0, 0) }
  );
  page.drawText("Este pagaré ha sido generado automáticamente.", {
    x: width / 4,
    y: height - 290,
    size: 10,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile(filePath, pdfBytes);

  res.download(filePath, "pagare.pdf", (error) => {
    if (error) console.error("Error al descargar el archivo:", error);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error al eliminar el archivo:", err);
    });
  });
};

module.exports = {
  getPromissoryNotes,
  addPromissoryNote,
  generatePromissoryNotePDF,
  getPromissoryNotesByCompany,
};
