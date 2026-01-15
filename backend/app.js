const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 8080;
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
const deliveryNoteRouter = require("./routes/deliveryNoteRoutes");
const deliveryNoteDetailRouter = require("./routes/deliveryNoteDetailRoutes");
const chequeRouter = require("./routes/chequeRoutes");
const promissoryNoteRouter = require("./routes/promissoryNoteRoutes");
const cors = require("cors");
const accountRouter = require("./routes/accountRoutes");
const accountingEntryRouter = require("./routes/accountingEntryRoutes");
const journalEntryRouter = require("./routes/journalEntryRoutes");
const ivaLedgerRouter = require("./routes/ivaLedgerRoutes");
const documentsRouter = require("./routes/documentsRoutes");
const invoiceReceivedRouter = require("./routes/invoiceReceivedRoutes");
const debitNoteReceivedRouter = require("./routes/debitNotesRoutes");
const creditNoteReceivedRouter = require("./routes/creditNoteReceivedRoutes");
const exportExcelRouter = require("./routes/exportExcelRoutes");

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
app.use("/deliveryNote", deliveryNoteRouter);
app.use("/deliveryNoteDetail", deliveryNoteDetailRouter);
app.use("/cheque", chequeRouter);
app.use("/promissoryNote", promissoryNoteRouter);
app.use("/account", accountRouter);
app.use("/accountingEntry", accountingEntryRouter);
app.use("/journalEntry", journalEntryRouter);
app.use("/ivaLedger", ivaLedgerRouter);
app.use("/documents", documentsRouter);
app.use("/invoiceReceived", invoiceReceivedRouter);
app.use("/debitNoteReceived", debitNoteReceivedRouter);
app.use("/creditNoteReceived", creditNoteReceivedRouter);
app.use("/exportExcel", exportExcelRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
