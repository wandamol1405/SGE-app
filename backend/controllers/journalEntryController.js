const JournalEntry = require("../models").JournalEntry;
const AccountingEntry = require("../models").AccountingEntry;
const Account = require("../models").Account;

const getJournalEntries = async (req, res) => {
  try {
    const JournalEntries = await JournalEntry.findAll();
    res.json({ msg: "Journal Entry list", JournalEntries });
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

module.exports = {
  getJournalEntries,
  getJournalEntriesByCompany,
  addJournalEntry,
};
