const Joi = require("joi");

const validateId = (id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(id);
    if (error) throw new Error(`Invalid id: ${error.message}`);
    return value;
  }

const validateOrderId = (order_id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(order_id);
    if (error) throw new Error(`Invalid order_id: ${error.message}`);
    return value;
  }

const validateInvoiceDate = (invoice_date) => {
    const schema = Joi.date().iso().required();
    const { error, value } = schema.validate(invoice_date);
    if (error) throw new Error(`Invalid invoice_date: ${error.message}`);
    return value.toISOString();
  }

const validateTotalAmount = (total_amount) => {
    const schema = Joi.number().positive().precision(2).required();
    const { error, value } = schema.validate(total_amount);
    if (error) throw new Error(`Invalid total_amount: ${error.message}`);
    return value;
  }

module.exports = {validateId, validateOrderId, validateInvoiceDate, validateTotalAmount}