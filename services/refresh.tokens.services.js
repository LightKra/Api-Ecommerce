const {connection} = require("./mysql");
const {logger} = require("../utils/winston.logs");

const createRefreshToken = async (refreshTokenObject)=>{
    try {
        const sql = "insert into tokens (user_id, refresh_token) values (?, ?)";
        const value = [refreshTokenObject.getUserId(), refreshTokenObject.getRefreshToken()];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    } catch (error) {
        logger.error({
            location: "Error in services, createRefreshToken()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createRefreshToken() - message: ${error.message}`);
    }
}
const findRefreshTokenUserIdServices = async (userId)=>{
    try {
        const sql = "select * from tokens where user_id = ?";
        const [result, fields] = await connection.execute(sql, [userId]);
        return [result, fields];
    } catch (error) {
        logger.error({
            location: "Error in services, findRefreshTokenUserIdServices()",
            errorName: error.name,
            errorMessage: error.message
        })
        throw new Error(`Error in services, finTokenUserIdServices() - message: ${error.message}`);
    }
}
const deleteRefreshTokenUserIdServices = async (userId)=>{
    try {
        const sql = "delete from tokens where user_id = ?";
        const [result, fields] = await connection.execute(sql, [userId]);
        return [result, fields];
    } catch (error) {
        logger.error({
            location: "Error in services, deleteRefreshTokenUserIdServices()",
            errorName: error.name,
            errorMessage: error.message
        })
        throw new Error(`Error in services, deleteRefreshTokenUserIdServices() - message: ${error.message}`);
    }
}

module.exports = {createRefreshToken, findRefreshTokenUserIdServices, deleteRefreshTokenUserIdServices}