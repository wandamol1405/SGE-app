const JournalEntry = require("../models").JournalEntry;
const AccountingEntry = require("../models").AccountingEntry;
const Account = require("../models").Account;
const User = require("../models").User;
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

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
  const {user} = req.body;
  const doc = new PDFDocument({size: "A4", margin: 50});
  const filePath = path.join(__dirname, `journalEntries-${user}.pdf`);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  try {
    const journalEntries = await JournalEntry.findAll({
      where: { id_company: user.id_user },
      include: [{ model: AccountingEntry, as: "accountingEntries" }],
      order: [["id_entry", "ASC"]],
    });
    doc.fontSize(20).text(`Libros Diarios - ${company.company_name}`, { align: "center" });
    doc.moveDown(1);
    journalEntries.forEach((entry) => {
      doc.fontSize(14).text(`Asiento ID: ${entry.id_entry} - Fecha: ${entry.entry_date}`);
      doc.moveDown(0.5);
      entry.accountingEntries.forEach((accEntry) => {
        doc.fontSize(12).text(`Cuenta ID: ${accEntry.id_account} - Débito: ${accEntry.debit} - Crédito: ${accEntry.credit}`);
      });
      doc.moveDown(1);
    });

    doc.end();
  } catch (error) {
    console.error("Error al generar el PDF de libros diarios:", error);
    res.status(500).json({ error: "Error al generar el PDF de libros diarios." });
  }
};

module.exports = {
  getJournalEntries,
  getJournalEntriesByCompany,
  addJournalEntry,
  generateJournalEntriesPDF,
};
