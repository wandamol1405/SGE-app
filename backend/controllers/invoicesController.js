const Invoice = require("../models").Invoice;

const getInvoices = async (req, res) => {
  const invoices = await Invoice.findAll();
  res.json({ msg: "Invoices list", invoices });
};

const addInvoice = async (req, res) => {
  const invoice = req.body;
  await Invoice.create(invoice);
  res.json({ msg: "Invoice created", invoice });
};

module.exports = { getInvoices, addInvoice };
