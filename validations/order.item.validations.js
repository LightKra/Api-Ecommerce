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

const validateProductId = (product_id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(product_id);
    if (error) throw new Error(`Invalid product_id: ${error.message}`);
    return value;
  }

const validateQuantity = (quantity) => {
    const schema = Joi.number().integer().min(1).required();
    const { error, value } = schema.validate(quantity);
    if (error) throw new Error(`Invalid quantity: ${error.message}`);
    return value;
  }

const validatePrice = (price) => {
    const schema = Joi.number().positive().precision(2).required();
    const { error, value } = schema.validate(price);
    if (error) throw new Error(`Invalid price: ${error.message}`);
    return value;
  }

module.exports = {validateId, validateOrderId, validateProductId, validateQuantity, validateQuantity, validatePrice}