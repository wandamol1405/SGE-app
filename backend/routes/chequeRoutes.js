const express = require("express");
const { Model } = require("sequelize");
const chequeRouter = express.Router();
const {
  getCheques,
  addCheque,
  generateChequePDF,
} = require("../controllers/chequeController");

chequeRouter.get("/", getCheques);
chequeRouter.post("/", addCheque);
chequeRouter.post("/generate-pdf", generateChequePDF);

module.exports = chequeRouter;
