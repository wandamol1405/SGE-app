const express = require("express");
const journalEntryRouter = express.Router();
const {
  getJournalEntries,
  addJournalEntry,
  getJournalEntriesByCompany,
} = require("../controllers/journalEntryController");

journalEntryRouter.get("/", getJournalEntries);
journalEntryRouter.post("/", addJournalEntry);
journalEntryRouter.get("/find/:id_company", getJournalEntriesByCompany);

module.exports = journalEntryRouter;
