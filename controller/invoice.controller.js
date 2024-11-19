const {Invoice} = require("../model/invoice.model");
const {createInvoiceServices, updateInvoiceIdServices, findInvoiceIdServices, findInvoicesServices, deleteInvoiceIdServices} = require("../services/invoice.services");

const createInvoiceController = async (req, res)=>{
    try{
         const jsonInvoice = req.body;
         const invoice = new Invoice(jsonInvoice.id, jsonInvoice.orderid, jsonInvoice.invoicedate, jsonInvoice.totalamount);
         const [resultInvoice, fieldsInvoice] = await createInvoiceServices(invoice);
         const [result, fields] = await findInvoiceIdServices(resultInvoice.insertId);
         result[0].total_amount = Number(result[0].total_amount);
         res.status(200).json({result, message: `The invoice was created successfully`});
    }catch(error){
        res.status(500).json({result: [], message: `Error creating invoice: ${error.message}` });
    }
}

const updateInvoiceIdController = async (req, res)=>{
    try{
       const jsonInvoice = req.body;
       const id = req.params.id;
       const invoice = new Invoice("", "", "", jsonInvoice.totalamount);
       await updateInvoiceIdServices(id, invoice);
       const [result, fields] = await findInvoiceIdServices(id);
       result[0].total_amount = Number(result[0].total_amount);
       res.status(200).json({result, message: `The invoice was updated successfully`});
    }catch(error){
        res.status(500).json({result: [], message: `Error updating invoice: ${error.message}`});
    }
}

const findInvoicesController = async (req, res)=>{
    try{
        const id = req.query.id;
        const orderId = req.query.orderid;
        const invoiceDateLow = req.query.invoicedatelow;
        const invoiceDateUp = req.query.invoicedateup;
        const totalAmountLow = req.query.totalamountlow;
        const totalAmountUp = req.query.totalamountup;
        const limit = req.query.limit;
        const offset = req.offset;
        const [result, fields] = await findInvoicesServices(id, orderId, invoiceDateLow, invoiceDateUp, totalAmountLow, totalAmountUp, limit, offset);
        const newResult = result.map(item=>{
            item.total_amount = Number(item.total_amount);
            return item;
        });
        res.status(200).json({result: newResult, message: `Invoices successfully obtained`});
    }catch(error){
        res.status(500).json({result: [], message: `Error getting invoices: ${error.message}`});
    }
}   

const findInvoiceIdController = async (req, res)=>{
    try{
         const id = req.params.id;
         const [result, fields] = await findInvoiceIdServices(id);
         result[0].total_amount = Number(result[0].total_amount);
         res.status(200).json({result, message: `Invoice successfully obtained`});
    }catch(error){
        res.status(500).json({result: [], message: `Error getting invoice: ${error.message}`});
    }
}

const deleteInvoiceIdController = async (req, res)=>{
    try{
        const id = req.params.id;
        const [result, fields] = await findInvoiceIdServices(id);
        await deleteInvoiceIdServices(id);
        res.status(200).json({result, message: `Invoice deleted successfully`});
    }catch(error){
        res.status(500).json({result: [], message: `Error delete invoice: ${error.message}`});
    }
}

module.exports = {createInvoiceController, updateInvoiceIdController, findInvoicesController, findInvoiceIdController, deleteInvoiceIdController}