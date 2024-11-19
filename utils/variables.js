const path = require("path")
require("dotenv").config({path: path.join(__dirname, "../", ".env")});

const variablesBb = {
    HOST_BD: process.env.HOST_BD,
    USER_BD: process.env.USER_BD,
    DATA_BASE: process.env.DATA_BASE,
    PORT_BD: Number(process.env.PORT_BD),
    PASSWORD_BD: process.env.PASSWORD_BD
}
const variablesApi = {
    PORT_API: Number(process.env.PORT_API)
}
const privateKey = process.env.PRIVATE_KEY;
const privateKeyRefresh = process.env.PRIVATE_KEY_REFRESH;

module.exports = {variablesApi, variablesBb, privateKey, privateKeyRefresh}