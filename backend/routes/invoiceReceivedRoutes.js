const express = require("express");
const invoiceReceivedRouter = express.Router();
const {
  addInvoiceReceived,
  getInvoicesReceived,
  getInvoicesReceivedByCompany,
} = require("../controllers/invoicesReceivedController");

invoiceReceivedRouter.get("/", getInvoicesReceived);
invoiceReceivedRouter.get("/find/:id", getInvoicesReceivedByCompany);
invoiceReceivedRouter.post("/", addInvoiceReceived);

module.exports = invoiceReceivedRouter;
