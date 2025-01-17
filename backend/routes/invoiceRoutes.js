const express = require("express");
const { Model } = require("sequelize");
const invoiceRouter = express.Router();
const {
  getInvoices,
  addInvoice,
} = require("../controllers/invoicesController");

invoiceRouter.get("/", getInvoices);
invoiceRouter.post("/", addInvoice);

module.exports = invoiceRouter;
