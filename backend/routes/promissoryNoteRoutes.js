const express = require("express");
const { Model } = require("sequelize");
const promissoryNoteRouter = express.Router();
const {
  getPromissoryNotes,
  addPromissoryNote,
  generatePromissoryNotePDF,
  getPromissoryNotesByCompany,
} = require("../controllers/promissoryNoteController");

promissoryNoteRouter.get("/", getPromissoryNotes);
promissoryNoteRouter.post("/", addPromissoryNote);
promissoryNoteRouter.post("/generate-pdf", generatePromissoryNotePDF);
promissoryNoteRouter.get("/find/:id", getPromissoryNotesByCompany);

module.exports = promissoryNoteRouter;
