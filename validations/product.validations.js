const Joi = require("joi");

const validateId = (id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(id);
    if (error) throw new Error(`Invalid id: ${error.message}`);
    return value;
  }

const validateName = (name) => {
    const schema = Joi.string().min(3).max(255).required();
    const { error, value } = schema.validate(name);
    if (error) throw new Error(`Invalid name: ${error.message}`);
    return value;
  }

const validateDescription = (description) => {
    const schema = Joi.string().max(1000).allow('');
    const { error, value } = schema.validate(description);
    if (error) throw new Error(`Invalid description: ${error.message}`);
    return value;
  }

const validatePrice = (price) => {
    const schema = Joi.number().positive().precision(2).required();
    const { error, value } = schema.validate(price);
    if (error) throw new Error(`Invalid price: ${error.message}`);
    return value;
  }

const validateStock = (stock) => {
    const schema = Joi.number().integer().min(0).required();
    const { error, value } = schema.validate(stock);
    if (error) throw new Error(`Invalid stock: ${error.message}`);
    return value;
  }

const validateImage = (image) => {
    const schema = Joi.string().min(3).required();
    const { error, value } = schema.validate(image);
    if (error) throw new Error(`Invalid image: ${error.message}`);
    return value;
  }

const validateCreatedAt = (created_at) => {
    const schema = Joi.date().iso().required();
    const { error, value } = schema.validate(created_at);
    if (error) throw new Error(`Invalid created_at: ${error.message}`);
    return value.toISOString();
}

const validateCategory = (category)=>{
  const schema = Joi.string().min(3).required();
  const {error, value} = schema.validate(category);
  if(error) throw new Error(`Invalid category: ${category}`);
  return value;
}

module.exports = {validateId, validateName, validateDescription, validatePrice, validateStock, validateImage, validateCreatedAt, validateCategory}