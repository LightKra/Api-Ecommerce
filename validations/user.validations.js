const Joi = require("joi");

const validateId = (id) => {
    const schema = Joi.number().integer().positive().required();
    const { error, value } = schema.validate(id);
    if (error) {
      throw new Error(`Invalid id: ${error.message}`);
    }
    return value;
  }

const  validateName = (name) => {
    const schema = Joi.string().min(3).max(255).required();
    const { error, value } = schema.validate(name);
    if (error) {
      throw new Error(`Invalid name: ${error.message}`);
    }
    return value;
  }

const validateEmail = (email) => {
    const schema = Joi.string().email().required();
    const { error, value } = schema.validate(email);
    if (error) {
      throw new Error(`Invalid email: ${error.message}`);
    }
    return value;
  }
const validateAddress = (address) =>{
    const schema = Joi.string().min(3).required();
    const { error, value } = schema.validate(address);
    if (error) {
      throw new Error(`Invalid address: ${error.message}`);
    }
    return value;
  }
  const validateImage = (image) =>{
    const schema = Joi.string().min(3).required();
    const { error, value } = schema.validate(image);
    if (error) {
      throw new Error(`Invalid image: ${error.message}`);
    }
    return value;
  }
const validatePassword = (password) => {
    const schema = Joi.string().min(6).max(255).required();
    const { error, value } = schema.validate(password);
    if (error) {
      throw new Error(`Invalid password: ${error.message}`);
    }
    return value;
  }
const validateRole = (role)=>{
  if(role !== "user" && role!=="admin"){
    throw new Error(`Invalid role`)
  }
    return role;
}
const validateCreatedAt = (created_at) => {
    const schema = Joi.date().iso().required();
    const { error, value } = schema.validate(created_at);
    if (error) {
      throw new Error(`Invalid created_at: ${error.message}`);
    }
    return value.toISOString();
  }

module.exports = {validateId, validateName, validateEmail, validateAddress, validateImage, validatePassword, validateRole, validateCreatedAt}
