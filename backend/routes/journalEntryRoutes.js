const express = require("express");
const journalEntryRouter = express.Router();
const {
  getJournalEntries,
  addJournalEntry,
  getJournalEntriesByCompany,
  generateJournalEntriesPDF,
} = require("../controllers/journalEntryController");

journalEntryRouter.get("/", getJournalEntries);
journalEntryRouter.post("/", addJournalEntry);
journalEntryRouter.get("/find/:id_company", getJournalEntriesByCompany);
journalEntryRouter.post("/pdf", generateJournalEntriesPDF);

module.exports = journalEntryRouter;
