const express = require("express");

const {
  getUsers,
  addUser,
  loginUser,
  getUser,
  logoutUser,
} = require("../controllers/usersController");
const {
  validatorAdmin,
  validatorRegister,
  validatorRegisterUser,
  validatorLogin,
  validatorLoginUser,
} = require("../middlewares/userValidator");
const usersRouter = express.Router();

usersRouter.get("/", validatorAdmin, getUsers);
usersRouter.post(
  "/register",
  validatorRegister,
  validatorRegisterUser,
  addUser
);
usersRouter.post("/login", validatorLogin, validatorLoginUser, loginUser);
usersRouter.post("/logout", logoutUser);
usersRouter.get("/find/:email", getUser);
module.exports = usersRouter;
