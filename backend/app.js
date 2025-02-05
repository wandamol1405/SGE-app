const express = require("express");
const app = express();
const PORT = 3000;
const session = require("express-session");
const usersRouter = require("./routes/usersRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const invoiceDetailRouter = require("./routes/invoiceDetailRoutes");
const buyOrderRouter = require("./routes/buyOrderRoutes");
const buyOrderDetailRouter = require("./routes/buyOrderDetailRoutes");
const creditNoteDetailRouter = require("./routes/creditNoteDetailRoutes");
const creditNoteRouter = require("./routes/creditNoteRoutes");
const debitNoteRouter = require("./routes/debitNoteRoutes");
const debitNoteDetailRouter = require("./routes/debitNoteDetailRoutes");
const cors = require("cors");

app.use(cors());
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
app.use("/buyOrder", buyOrderRouter);
app.use("/buyOrderDetail", buyOrderDetailRouter);
app.use("/creditNote", creditNoteRouter);
app.use("/creditNoteDetail", creditNoteDetailRouter);
app.use("/debitNote", debitNoteRouter);
app.use("/debitNoteDetail", debitNoteDetailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
