const Users = require("../models").Users;
const ExcelJS = require("exceljs");
const Invoices = require("../models").Invoices;
const BuyOrders = require("../models").BuyOrders;
const CreditNotes = require("../models").CreditNotes;
const DebitNotes = require("../models").DebitNotes;
const DeliveryNotes = require("../models").DeliveryNotes;
const Cheques = require("../models").Cheques;
const PromissoryNotes = require("../models").PromissoryNotes;

const exportDataToExcel = async (req, res) => {
    const users = await Users.findAll();
    const invoices = await Invoices.findAll();
    const buyOrders = await BuyOrders.findAll();
    const creditNotes = await CreditNotes.findAll();
    const debitNotes = await DebitNotes.findAll();
    const deliveryNotes = await DeliveryNotes.findAll();
    const cheques = await Cheques.findAll();
    const promissoryNotes = await PromissoryNotes.findAll();

    const workbook = new ExcelJS.Workbook();
    users.forEach(user => {
        const worksheet = workbook.addWorksheet(user.company_name);
        worksheet.addRow(['Facturas']);
        invoices.filter(inv => inv.id_company === user.id_user)
            .forEach(inv => {
                worksheet.addRow([inv.num_invoice, inv.point_sale, inv.issue_date, inv.buyer_name, inv.buyer_IVA_condition, inv.subtotal, inv.IVA_total, inv.total]);
            });
        worksheet.addRow([]);
        worksheet.addRow(['Órdenes de Compra']);
        buyOrders.filter(order => order.id_company === user.id_user)
            .forEach(order => {
                worksheet.addRow([order.num_buy_order, order.point_sale, order.issue_date, order.supplier_name, order.total]);
            });
        worksheet.addRow([]);
        worksheet.addRow(['Notas de Crédito']);
        creditNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow([note.num_credit_note, note.point_sale, note.issue_date, note.buyer_name, note.total]);
            });
        worksheet.addRow([]);
        worksheet.addRow(['Notas de Débito']);
        debitNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow([note.num_debit_note, note.point_sale, note.issue_date, note.buyer_name, note.total]);
            });
        worksheet.addRow([]);
        worksheet.addRow(['Remitos']);
        deliveryNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow([note.num_delivery_note, note.point_sale, note.issue_date, note.client_name]);
            });
        worksheet.addRow([]);
        worksheet.addRow(['Cheques']);
        cheques.filter(cheque => cheque.id_company === user.id_user)
            .forEach(cheque => {
                worksheet.addRow([cheque.cheque_number, cheque.bank_name, cheque.issue_date, cheque.amount]);
            });
        worksheet.addRow([]);
        worksheet.addRow(['Pagarés']);
        promissoryNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow([note.num_promissory_note, note.issue_date, note.payee_name, note.amount]);
            });
    });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
    await workbook.xlsx.write(res);
    res.end();
};
    module.exports = { exportDataToExcel };