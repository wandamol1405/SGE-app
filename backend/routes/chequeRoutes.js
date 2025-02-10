const express = require("express");
const { Model } = require("sequelize");
const chequeRouter = express.Router();
const {
  getCheques,
  addCheque,
  generateChequePDF,
  getChequesByCompany,
} = require("../controllers/chequeController");

chequeRouter.get("/", getCheques);
chequeRouter.post("/", addCheque);
chequeRouter.post("/generate-pdf", generateChequePDF);
chequeRouter.get("/find/:id", getChequesByCompany);

module.exports = chequeRouter;
