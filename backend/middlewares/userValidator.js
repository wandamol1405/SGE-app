const { body, validationResult } = require("express-validator");
const { findUser } = require("../controllers/usersController");

const validatorRegister = [
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
  body("company_name")
    .notEmpty()
    .isString()
    .withMessage("Company name must be a string"),
  body("cuit").notEmpty().isString().withMessage("CUIT must be a string"),
  body("gross_revenue")
    .notEmpty()
    .isInt()
    .withMessage("Gross revenue must be an integer"),
  body("business_address")
    .notEmpty()
    .isString()
    .withMessage("Business address must be a string"),
  body("IVA_condition")
    .notEmpty()
    .isString()
    .withMessage("IVA condition must be a string"),
  body("start_date")
    .notEmpty()
    .isDate()
    .withMessage("Start date must be a date"),
];

const validatorLogin = [
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
];

const validatorRegisterUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

const validatorLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const user = await findUser(email);
    if (!user) {
      return res.status(400).json({ errors: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ errors: "Invalid password" });
    }
    next();
  } catch (error) {
    console.error("Error finding user: ", error);
    return res.status(500).json({ errors: "Error finding user" });
  }
};

const validatorAdmin = (req, res, next) => {
  const user = req.session.email;
  if (user !== "admin") {
    return res.status(400).json({ errors: "Unauthorized" });
  }
};

module.exports = {
  validatorRegister,
  validatorLogin,
  validatorRegisterUser,
  validatorLoginUser,
  validatorAdmin,
};
