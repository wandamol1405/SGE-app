const express = require("express");
const { Model } = require("sequelize");
const invoiceRouter = express.Router();
const {
  getInvoices,
  addInvoice,
  generateInvoicePDF,
  getInvoicesByCompany,
} = require("../controllers/invoicesController");

invoiceRouter.get("/", getInvoices);
invoiceRouter.post("/", addInvoice);
invoiceRouter.post("/generate-pdf", generateInvoicePDF);
invoiceRouter.get("/find/:id", getInvoicesByCompany);

module.exports = invoiceRouter;
