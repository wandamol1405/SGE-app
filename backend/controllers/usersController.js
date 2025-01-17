const User = require("../models").User;

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ msg: "Users list", users });
};

const addUser = async (req, res) => {
  const user = req.body;
  await User.create(user);
  res.json({ msg: "User created", user });
};

const loginUser = (req, res) => {
  const user = req.body;
  req.session.username = user.email;
  res.json({ msg: "User logged in", user });
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.json({ msg: "User logged out" });
    }
  });
};

async function findUser(email) {
  try {
    const userFound = await User.findOne({ where: { email: email } });
    return userFound.toJSON();
  } catch (error) {
    console.error("Error finding user: ", error);
    return false;
  }
}

module.exports = { getUsers, addUser, loginUser, logoutUser, findUser };
