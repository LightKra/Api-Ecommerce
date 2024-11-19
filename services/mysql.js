const mysql = require("mysql2/promise");
const {logger} = require("../utils/winston.logs");
const {variablesBb} =require("../utils/variables");

const mysqlBd = ()=>{
    try{
        const pool = mysql.createPool({
            host: variablesBb.HOST_BD,
            user: variablesBb.USER_BD,
            database: variablesBb.DATA_BASE,
            port: variablesBb.PORT_BD,
            password: variablesBb.PASSWORD_BD
        });
        return pool;
    }catch(error){
        logger.error("Error connecting to database");
        return undefined;
    }
}
const connection = mysqlBd();
module.exports = {connection}