const express = require("express");
const ivaLedgerRouter = express.Router();
const {
  getIvaSalesLedgers,
  getIvaPurchasesLedgers,
} = require("../controllers/ivaLedgerController");

ivaLedgerRouter.get(
  "/sales/from/:from/to/:to/id_company/:id_company",
  getIvaSalesLedgers
);
ivaLedgerRouter.get(
  "/purchases/from/:from/to/:to/id_company/:id_company",
  getIvaPurchasesLedgers
);

module.exports = ivaLedgerRouter;
