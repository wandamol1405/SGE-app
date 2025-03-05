const InvoiceRecieved = require("../models").InvoiceRecieved;
const User = require("../models").User;

const getInvoicesReceived = async (req, res) => {
  const invoicesReceived = await InvoiceRecieved.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id_user", "company_name"],
      },
    ],
  });
  res.json({ msg: "Invoices received list", invoicesReceived });
};

const getInvoicesReceivedByCompany = async (req, res) => {
  const companyId = req.params.id;
  const invoicesReceived = await InvoiceRecieved.findAll({
    where: { company_id: companyId },
  });
  res.json({ msg: "Invoices received list", invoicesReceived });
};

const addInvoiceReceived = async (req, res) => {
  try {
    const { newInvoice } = req.body;
    const createdInvoice = await InvoiceRecieved.create(newInvoice);
    res.json({ msg: "Invoice received created", createdInvoice });
  } catch (error) {
    res.json({ msg: "Error", error });
  }
};

module.exports = {
  getInvoicesReceived,
  getInvoicesReceivedByCompany,
  addInvoiceReceived,
};
