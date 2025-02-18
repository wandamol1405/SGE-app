const AccountingEntry = require("../models").AccountingEntry;

const getAccountingEntries = async (req, res) => {
  try {
    const accountingEntries = await AccountingEntry.findAll();
    res.json({ msg: "Accounting entries list", accountingEntries });
  } catch (error) {
    console.error("Error al obtener las partidas:", error);
    res.status(500).json({ error: "Error al obtener las partidas." });
  }
};

const addAccountingEntry = async (req, res) => {
  try {
    const accountingEntry = await AccountingEntry.create(req.body);
    res.json({ msg: "Accounting entry created", accountingEntry });
  } catch (error) {
    console.error("Error al agregar la partida:", error);
    res.status(500).json({ error: "Error al agregar la partida." });
  }
};

module.exports = {
  getAccountingEntries,
  addAccountingEntry,
};
