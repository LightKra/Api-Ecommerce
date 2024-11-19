const {connection} = require("./mysql");
const {logger} = require("../utils/winston.logs");

/**
 * 
 * @param {Invoice} invoice 
 * @returns {Promise} Array 
 */
const createInvoiceServices = async (invoice)=>{
    try{
        const sql = "INSERT INTO invoices (order_id, total_amount) values (?, ?)";
        const value = [invoice.getOrderId(), invoice.getTotalAmount()];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, createInvoiceServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createInvoiceServices() - message: ${error.message}`)
    }
}
/**
 * @param {Number} id - id del registro del la factura
 * @param {Invoice} invoice
 * @returns {Promise} Array
 */
const updateInvoiceIdServices = async (id, invoice)=>{
    try{
        const sql = "UPDATE invoices set total_amount = ? where id = ?";
        const value = [invoice.getTotalAmount(), id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields]
    }catch(error){
        logger.error({
            location: "Error in services, updateInvoiceIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, updateInvoiceServices() - message: ${error.message}`)   
    }
}
/**
 * 
 * @param {Number} id - Id del registro de la factura
 * @param {Number} orderId - Id de la orden de la factura 
 * @param {String} invoiceDateLow - fecha inferior
 * @param {String} invoiceDateUp - fecha superior
 * @param {Number} totalAmountLow - Precio total inferior 
 * @param {Number} totalAmountUp - Precio total superior
 * @returns {Promise} Array
 */
const findInvoicesServices = async (id, orderId, invoiceDateLow, invoiceDateUp, totalAmountLow, totalAmountUp, limit, offset)=>{
    try{
        let sql = "SELECT * from invoices where 1 = 1";
        if(id) sql = `${sql} and id = ?`;
        if(orderId) sql = `${sql} and order_id = ?`;
        if(invoiceDateLow && invoiceDateUp) sql = `${sql} and invoice_date > ? AND invoice_date < ? `;
        if(totalAmountLow > 0 && totalAmountUp > 0) sql = `${sql} and total_amount BETWEEN ? AND ?`;
        sql = `${sql} limit ? offset ?`
       const value = [
            `${id ? id : "null"}`,
            `${orderId ? orderId : "null"}`,
            invoiceDateLow  && invoiceDateUp ? invoiceDateLow : "null",
            invoiceDateLow && invoiceDateUp ? invoiceDateUp : "null",
            `${totalAmountLow > 0 && totalAmountUp > 0 ? totalAmountLow  : "null"}`,
            `${totalAmountLow > 0 && totalAmountUp > 0 ? totalAmountUp : "null"}`,
            `${limit ? limit : "null"}`, 
            `${offset >= 0 ? offset : "null"}` 
       ];
       const newValue = value.filter(item=>item!== "null");
       const [result, fields] = await connection.execute(sql, newValue);
       return [result, fields];
    }catch(error){
       logger.error({
            location: "Error in services, findInvoicesServices()",
            errorName: error.message,
            errorMessage: error.message
       });
       throw new Error(`Error in services, findInvoicesServices() - message: ${error.message}`)
    }
}   
/**
 * 
 * @param {Number} id - ide del registro de la facutura
 * @returns {Promise} Array
 */
const findInvoiceIdServices = async (id)=>{
    try{
        const sql = "SELECT * from invoices where id = ?";
        const value = [id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findInvoiceIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createInvoiceIdServices() - message: ${error.message}`)
    }
}
/**
 * @param {Number} id - id del registro de la factura
 * @returns {Promise} Array
 */
const deleteInvoiceIdServices = async (id)=>{
    try{
       const sql = "DELETE FROM invoices where id = ?";
       const value = [id];
       const [result, fields] = await connection.execute(sql, value);
       return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, deleteInvoiceIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, deleteInvoiceIdServices() - message: ${error.message}`)
    }
}

module.exports = {createInvoiceServices, updateInvoiceIdServices, findInvoiceIdServices, findInvoicesServices, deleteInvoiceIdServices}