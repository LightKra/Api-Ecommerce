const Joi = require("joi");

const validateId = (id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(id);
    if (error) throw new Error(`Invalid id: ${error.message}`);
    return value;
  }

 const validateUserId = (user_id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(user_id);
    if (error) throw new Error(`Invalid user_id: ${error.message}`);
    return value;
  }

const validateTotalAmount = (total_amount) => {
    const schema = Joi.number().min(0).precision(2).required();
    const { error, value } = schema.validate(total_amount);
    if (error) throw new Error(`Invalid total_amount: ${error.message}`);
    return value;
  }

const validateStatus = (status) => {
    const schema = Joi.string().valid('pending','completed').required();
    const { error, value } = schema.validate(status);
    if (error) throw new Error(`Invalid status: ${error.message}`);
    return value;
  }

const validateCreatedAt = (created_at) => {
    const schema = Joi.date().iso().required();
    const { error, value } = schema.validate(created_at);
    if (error) throw new Error(`Invalid created_at: ${error.message}`);
    return value.toISOString();
  }

module.exports = {validateId, validateUserId, validateTotalAmount, validateStatus, validateCreatedAt}