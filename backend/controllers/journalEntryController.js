const JournalEntry = require("../models").JournalEntry;
const AccountingEntry = require("../models").AccountingEntry;
const Account = require("../models").Account;
const User = require("../models").User;
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const formatDate = require("../utils/formatDate");
const formatPrice = require("../utils/formatPrice");

const getJournalEntries = async (req, res) => {
  try {
    const journalEntries = await JournalEntry.findAll();
    res.json({ msg: "Journal Entry list", journalEntries });
  } catch (error) {
    console.error("Error al obtener los asientos:", error);
    res.status(500).json({ error: "Error al obtener los asientos." });
  }
};

const getJournalEntriesByCompany = async (req, res) => {
  try {
    const { id_company } = req.params;

    const journalEntries = await JournalEntry.findAll({
      where: { id_company },
      include: [
        {
          model: AccountingEntry,
          as: "accountingEntries",
          include: [
            {
              model: Account,
              as: "accounts",
              attributes: ["id_account", "name"],
            },
          ],
          order: [["id_acc_entry", "ASC"]], // Ordenar por id_acc_entry ascendente
        },
      ],
      order: [["id_entry", "ASC"]], // Ordenar las partidas contables por id_entry
    });

    res.json({ msg: "Asientos contables obtenidos", journalEntries });
  } catch (error) {
    console.error("Error al obtener los asientos:", error);
    res.status(500).json({ error: "Error al obtener los asientos." });
  }
};

const addJournalEntry = async (req, res) => {
  try {
    let { accountingEntries, ...journalEntry } = req.body;

    // Crear el asiento contable
    const newJournalEntry = await JournalEntry.create(journalEntry);

    if (!newJournalEntry || !newJournalEntry.id_entry) {
      throw new Error("Failed to create Journal Entry or missing id_entry.");
    }

    accountingEntries = accountingEntries || [];
    for (const accountingEntry of accountingEntries) {
      accountingEntry.id_jor_entry = newJournalEntry.id_entry;
      accountingEntry.debit = accountingEntry.debit || 0;
      accountingEntry.credit = accountingEntry.credit || 0;
      await AccountingEntry.create(accountingEntry);
    }

    res.status(201).json({ message: "Asiento creado exitosamente." });
  } catch (error) {
    console.error("Error al crear el asiento:", error);
    res.status(500).json({ error: "Error al crear el asiento." });
  }
};

const generateJournalEntriesPDF = async (req, res) => {
  const user = req.body;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const filePath = path.join(__dirname, `journalEntries-${user.id_user}.pdf`);
  const stream = fs.createWriteStream(filePath);

  const journalEntries = await JournalEntry.findAll({
    where: { id_company: user.id_user },
    order: [["date", "ASC"]],
  });

  const accounts = await Account.findAll({});

  if (!journalEntries || journalEntries.length === 0) {
    return res.status(404).json({ error: "No journal entries found for this user." });
  }
  doc.pipe(stream);

  doc.fontSize(18).text(`Libro Diario - ${user.company_name}`, { align: "center" });
  doc.moveDown(2);
  let countEntries = 1;
  for (const entry of journalEntries) {
    doc.fontSize(12).font("Helvetica-Bold");
    doc.text(`Fecha: ${formatDate(entry.date)}`, 50);
    doc.text(`Asiento N°: ${countEntries++}`, 300);
    doc.moveDown(0.5);
    doc.font("Helvetica");
    doc.text(`Descripción: ${entry.description}`);
    doc.moveDown(0.8);

    const startY = doc.y;

    doc.font("Helvetica-Bold");
    doc.text("Cuenta", 50, startY);
    doc.text("Descripción", 100, startY);
    doc.text("Debe", 360, startY, { width: 80, align: "right" });
    doc.text("Haber", 460, startY, {width: 80, align: "right" });

    doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();
    doc.moveDown(0.5);

    const accountingEntries = await AccountingEntry.findAll({
      where: { id_jor_entry: entry.id_entry },
    });

    let totalDebit = 0;
    let totalCredit = 0;

    doc.font("Helvetica");
    accountingEntries.forEach((accEntry) => {
      const account = accounts.find((acc) => acc.id_account === accEntry.id_account);
      const y = doc.y;
      console.log({
        rawDebit: accEntry.debit,
        type: typeof accEntry.debit,
      });

      doc.text(accEntry.id_account, 50, y);
      doc.text(account?.name || "Desconocida", 100, y);
      doc.text(accEntry.debit ? formatPrice(accEntry.debit) : "", 360, y, { width: 80, align: "right" });
      doc.text(accEntry.credit ? formatPrice(accEntry.credit) : "", 460, y, { width: 80, align: "right" });

      totalDebit += accEntry.debit || 0;
      totalCredit += accEntry.credit || 0;

      doc.moveDown(0.5);
    });

    doc.moveDown(0.3);
    doc.moveTo(300, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.2);

    doc.font("Helvetica-Bold");
    doc.text("Totales:", 100, doc.y);
    doc.text(formatPrice(totalDebit), 360, doc.y-12, { width: 80, align: "right" });
    doc.text(formatPrice(totalCredit), 460, doc.y-12, { width: 80, align: "right" });

    doc.moveDown(1.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(2);
  }
  doc.end();
  stream.on("finish", () => {
    res.download(filePath, `LibroDiario-${user.company_name}.pdf`, (err) => {
      if (err) {
        console.error("Error al descargar el archivo:", err);
        res.status(500).json({ error: "Error al descargar el archivo." });
      }
      fs.unlinkSync(filePath);
    });
  });
  stream.on("error", (err) => {
    console.error("Error al generar el PDF:", err);
    res.status(500).json({ error: "Error al generar el PDF." });
  });
};

module.exports = {
  getJournalEntries,
  getJournalEntriesByCompany,
  addJournalEntry,
  generateJournalEntriesPDF,
};
