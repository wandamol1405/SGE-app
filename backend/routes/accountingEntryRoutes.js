const express = require("express");
const accountingEntryRouter = express.Router();
const {
  getAccountingEntries,
  addAccountingEntry,
} = require("../controllers/accountingEntryController");

accountingEntryRouter.get("/", getAccountingEntries);
accountingEntryRouter.post("/", addAccountingEntry);

module.exports = accountingEntryRouter;
