const express = require("express");
const { Model } = require("sequelize");
const invoiceRouter = express.Router();
const {
  getInvoices,
  addInvoice,
  generateInvoicePDF,
} = require("../controllers/invoicesController");

invoiceRouter.get("/", getInvoices);
invoiceRouter.post("/", addInvoice);
invoiceRouter.post("/generate-pdf", generateInvoicePDF);

module.exports = invoiceRouter;
