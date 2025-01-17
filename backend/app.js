const express = require("express");
const app = express();
const PORT = 3000;
const session = require("express-session");
const usersRouter = require("./routes/usersRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const invoiceDetailRouter = require("./routes/invoiceDetailRoutes");

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/invoice", invoiceRouter);
app.use("/invoiceDetail", invoiceDetailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
