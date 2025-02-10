const express = require("express");
const { Model } = require("sequelize");
const creditNoteRouter = express.Router();
const {
  getCreditNote,
  addCreditNote,
  generateCreditNotePDF,
  getCreditNotesByCompany,
} = require("../controllers/creditNoteController");

creditNoteRouter.get("/", getCreditNote);
creditNoteRouter.post("/", addCreditNote);
creditNoteRouter.post("/generate-pdf", generateCreditNotePDF);
creditNoteRouter.get("/find/:id", getCreditNotesByCompany);

module.exports = creditNoteRouter;
