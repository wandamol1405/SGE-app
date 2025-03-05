const Invoice = require("../models").Invoice;
const DebitNote = require("../models").DebitNote;
const CreditNote = require("../models").CreditNote;
const InvoiceReceived = require("../models").InvoiceReceived;
const DebitNoteReceived = require("../models").DebitNoteReceived;
const CreditNoteReceived = require("../models").CreditNoteReceived;
const { Op } = require("sequelize");

const getIvaSalesLedgers = async (req, res) => {
  const { from, to, id_company } = req.params;
  const fromDate = new Date(from);
  fromDate.setDate(fromDate.getDate() - 1); // Include the 'from' date
  const toDate = new Date(to);
  toDate.setDate(toDate.getDate() + 1); // Include the 'to' date

  const invoices = await Invoice.findAll({
    where: {
      id_company,
      issue_date: {
        [Op.between]: [fromDate, toDate],
      },
    },
  });

  const debitNotes = await DebitNote.findAll({
    where: {
      id_company,
      issue_date: {
        [Op.between]: [fromDate, toDate],
      },
    },
  });

  const creditNotes = await CreditNote.findAll({
    where: {
      id_company,
      issue_date: {
        [Op.between]: [fromDate, toDate],
      },
    },
  });

  const allEntries = [...invoices, ...debitNotes, ...creditNotes];
  res.json({ message: "List Docs", docs: allEntries });
};

const getIvaPurchasesLedgers = async (req, res) => {
  const { from, to, id_company } = req.params;
  const fromDate = new Date(from);
  fromDate.setDate(fromDate.getDate() - 1); // Include the 'from' date
  const toDate = new Date(to);
  toDate.setDate(toDate.getDate() + 1); // Include the 'to' date
  const invoicesReceived = await InvoiceReceived.findAll({
    where: {
      company_id: id_company,
      issue_date: {
        [Op.between]: [fromDate, toDate],
      },
    },
  });

  const debitNotesReceived = await DebitNoteReceived.findAll({
    where: {
      company_id: id_company,
      issue_date: {
        [Op.between]: [fromDate, toDate],
      },
    },
  });

  const creditNotesReceived = await CreditNoteReceived.findAll({
    where: {
      company_id: id_company,
      issue_date: {
        [Op.between]: [fromDate, toDate],
      },
    },
  });

  const allEntries = [
    ...invoicesReceived,
    ...debitNotesReceived,
    ...creditNotesReceived,
  ];
  res.json({ message: "List Docs", docs: allEntries });
};

module.exports = { getIvaSalesLedgers, getIvaPurchasesLedgers };
