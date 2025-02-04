const { get } = require("../routes/usersRoutes");

const User = require("../models").User;

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ msg: "Users list", users });
};

const addUser = async (req, res) => {
  try {
    const user = req.body;

    // Crear el nuevo usuario
    const createdUser = await User.create(user);

    // Crear un registro en la tabla invoicecounters asociado al id_company del usuario
    if (createdUser.id_company) {
      await InvoiceCounter.create({
        companyId: createdUser.id_company,
        lastInvoiceNumber: 0,
      });
    }

    // Responder con éxito
    res.json({ msg: "User created", user: createdUser });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
};

const loginUser = (req, res) => {
  const user = req.body;
  if (!req.session) {
    return res.status(500).json({ msg: "Session is not initialized" });
  }
  req.session.username = user.email;
  res.json({ msg: "User logged in", user });
};

const logoutUser = (req, res) => {
  if (!req.session) {
    return res.status(500).json({ msg: "Session is not initialized" });
  }
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error logging out" });
    } else {
      res.json({ msg: "User logged out" });
    }
  });
};

async function findUser(email) {
  try {
    const userFound = await User.findOne({ where: { email: email } });
    console.log("User found: ", userFound);
    return userFound.toJSON();
  } catch (error) {
    console.error("Error finding user: ", error);
    return false;
  }
}

const getUser = async (req, res) => {
  const { email } = req.params;
  const user = await findUser(email);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json({ msg: "User found", user });
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
  logoutUser,
  findUser,
  getUser,
};
