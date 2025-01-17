const InvoiceDetail = require("../models").InvoiceDetail;

const addInvoiceDetail = async (req, res) => {
  const invoiceDetail = req.body;
  await InvoiceDetail.create(invoiceDetail);
  res.json({ msg: "Invoice detail created", invoiceDetail });
};

module.exports = { addInvoiceDetail };
