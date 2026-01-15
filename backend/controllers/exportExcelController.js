const User = require("../models").User;
const ExcelJS = require("exceljs");
const Invoice = require("../models").Invoice;
const BuyOrder = require("../models").BuyOrder;
const CreditNote = require("../models").CreditNote;
const DebitNote = require("../models").DebitNote;
const DeliveryNote = require("../models").DeliveryNote;
const Cheque = require("../models").Cheque;
const PromissoryNote = require("../models").PromissoryNote;

const exportDataToExcel = async (req, res) => {
    const users = await User.findAll();
    const invoices = await Invoice.findAll();
    const buyOrders = await BuyOrder.findAll();
    const creditNotes = await CreditNote.findAll();
    const debitNotes = await DebitNote.findAll();
    const deliveryNotes = await DeliveryNote.findAll();
    const cheques = await Cheque.findAll();
    const promissoryNotes = await PromissoryNote.findAll();

    const workbook = new ExcelJS.Workbook();
    users.forEach(user => {
        const worksheet = workbook.addWorksheet(user.company_name);
        const facturasRow = worksheet.addRow(['Facturas']);
        facturasRow.font = { bold: true };
        invoices.filter(inv => inv.id_company === user.id_user)
            .forEach(inv => {
                constworksheet.addRow(["Número", "Tipo de Factura", "Punto de Venta", "Fecha de Emisión", "Nombre del Comprador", "Condición IVA del Comprador", "Subtotal", "IVA Total", "Total"]);
                worksheet.addRow([inv.num_invoice, inv.type_invoice, inv.point_sale, inv.issue_date, inv.buyer_name, inv.buyer_IVA_condition, inv.subtotal, inv.IVA_total, inv.total]);
            });
        worksheet.addRow([]);
        const ordenesCompraRow = worksheet.addRow(['Órdenes de Compra']);
        ordenesCompraRow.font = { bold: true };         
        
        buyOrders.filter(order => order.id_company === user.id_user)
            .forEach(order => {
                worksheet.addRow(["Número", "Fecha de Emisión", "Fecha de Entrega", "Nombre del Proveedor", "Condición IVA del Proveedor", "Total"]);
                worksheet.addRow([order.order_number, order.issue_date, order.delivery_date, order.supplier_name, order.supplier_condition, order.total]);
            });
        worksheet.addRow([]);
        const notasCreditoRow = worksheet.addRow(['Notas de Crédito']);
        notasCreditoRow.font = { bold: true };
        creditNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow(["Número", "Tipo de Nota de Crédito","Punto de Venta", "Fecha de Emisión", "Nombre del Comprador", "Total"]);
                worksheet.addRow([note.num_credit_note, note.type_credit_note, note.point_sale, note.issue_date, note.buyer_name, note.total]);
            });
        worksheet.addRow([]);
        const notasDebitoRow = worksheet.addRow(['Notas de Débito']);
        notasDebitoRow.font = { bold: true };
        debitNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow(["Número", "Tipo de Nota de Débito", "Punto de Venta", "Fecha de Emisión", "Nombre del Comprador", "Total"]);
                worksheet.addRow([note.num_debit_note, note.type_debit_note, note.point_sale, note.issue_date, note.buyer_name, note.total]);
            });
        worksheet.addRow([]);
        const remitosRow = worksheet.addRow(['Remitos']);
        remitosRow.font = { bold: true };
        deliveryNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow(["Número", "Punto de Venta", "Fecha de Emisión", "Nombre del Cliente"]);
                worksheet.addRow([note.num_delivery_note, note.point_sale, note.issue_date, note.buyer_name]);
            });
        worksheet.addRow([]);
        const chequesRow = worksheet.addRow(['Cheques']);
        chequesRow.font = { bold: true };
        cheques.filter(cheque => cheque.id_company === user.id_user)
            .forEach(cheque => {
                worksheet.addRow(["Número de Cheque", "Tipo de Cheque", "Modo de emision", "Nombre del Beneficiario","Banco Emisor", "Fecha de Emisión", "Monto"]);
                worksheet.addRow([cheque.cheque_num, cheque.cheque_type, cheque.emission_mode, cheque.receiver_name, cheque.bank_name, cheque.issue_date, cheque.amount]);
            });
        worksheet.addRow([]);
        const pagaresRow = worksheet.addRow(['Pagarés']);
        pagaresRow.font = { bold: true };
        promissoryNotes.filter(note => note.id_company === user.id_user)
            .forEach(note => {
                worksheet.addRow(["Fecha de Emisión", "Lugar de Emisión","Nombre del Beneficiario","Lugar de Pago", "Monto"]);
                worksheet.addRow([note.issue_date, note.issue_place, note.receiver_name, note.pay_place, note.amount]);
            });
    });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
    await workbook.xlsx.write(res);
    res.end();
};
    module.exports = { exportDataToExcel };