const Invoice = require("../models").Invoice;
const DebitNote = require("../models").DebitNote;
const CreditNote = require("../models").CreditNote;
const { Op } = require("sequelize");

const getIvaSalesLedgers = async (req, res) => {
  const { from, to, id_company } = req.params;
  const invoices = await Invoice.findAll({
    where: {
      id_company,
      issue_date: {
        [Op.between]: [from, to],
      },
    },
  });

  const debitNotes = await DebitNote.findAll({
    where: {
      id_company,
      issue_date: {
        [Op.between]: [from, to],
      },
    },
  });

  const creditNotes = await CreditNote.findAll({
    where: {
      id_company,
      issue_date: {
        [Op.between]: [from, to],
      },
    },
  });

  const allEntries = [...invoices, ...debitNotes, ...creditNotes];
  res.json({ message: "List Docs", docs: allEntries });
};

/*
const getIvaPurchasesLedgers = async (req, res) => {
  const { from, to, id_company } = req.query;
  const invoicesReceived = await Invoice.findAll({
    where: {
      id_company,
      date: {
        [Op.between]: [from, until],
      },
    },
  });

  const debitNotesReceived = await DebitNote.findAll({
    where: {
      id_company,
      date: {
        [Op.between]: [from, until],
      },
    },
  });

  const creditNotesReceived = await CreditNote.findAll({
    where: {
      id_company,
      date: {
        [Op.between]: [from, until],
      },
    },
  });

  const allEntries = [...invoices, ...debitNotes, ...creditNotes];
};
*/

module.exports = { getIvaSalesLedgers };
