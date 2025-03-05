const express = require("express");
const creditNoteReceivedRouter = express.Router();
const {
  addCreditNoteReceived,
  getCreditNotesReceived,
  getCreditNotesReceivedByCompany,
} = require("../controllers/creditNoteReceivedController");

creditNoteReceivedRouter.get("/", getCreditNotesReceived);
creditNoteReceivedRouter.get("/find/:id", getCreditNotesReceivedByCompany);
creditNoteReceivedRouter.post("/", addCreditNoteReceived);

module.exports = creditNoteReceivedRouter;
