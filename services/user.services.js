const {connection} = require("./mysql");
const {logger} = require("../utils/winston.logs");

const createUserServices = async (user)=>{
    try{
        const sql = "INSERT INTO users (name, email, address, image, password, role) VALUES (?, ?, ?, ?, ?, ?)";
        const value = [user.getName(), user.getEmail(), user.getAddress(), user.getImage(), user.getPassword(), user.getRole()];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, createUser()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createUser() - message: ${error.message}`);
    }
}
const updateUserIdServices = async (id, user)=>{
    try{
        const sql = "UPDATE users SET name = ?, email = ?, address = ?, image = ?, password = ?, role = ? WHERE id = ?";
        const value = [user.getName(), user.getEmail(), user.getAddress(), user.getImage(), user.getPassword(), user.getRole(), id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, updateUser()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, updateUser() - message: ${error.message}`);
    }
}
const findUsersServices = async (limit, offset)=>{
    try{
        const sql = "select * from users  limit ? offset ?";
        const [result, fields] = await connection.execute(sql, [`${limit}`, `${offset}`]);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findUsers()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findUsers() - message: ${error.message}`);
    }
}   
const findUserNameServices = async (name, limit, offset)=>{
    try{
        const sql = "select * from users where name like ? limit ? offset ?";
        const [result, fields] = await connection.execute(sql, [`${name}%`, `${limit}`, `${offset}`]);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findUserName()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findUserName() - message: ${error.message}`);
    }
}
const findUserIdServices = async (id)=>{
    try{
        const sql = "select * from users where id = ?";
        const [result, field] = await connection.execute(sql, [id]);
        return [result, field];
    }catch(error){
        logger.error({
            location: "Error in services, findUserIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findUserIdServices() - message: ${error.message}`);
    }
}
const findUserEmailServices = async (email)=>{
    try{
        const sql = "select * from users where email = ?";
        const [result, field] = await connection.execute(sql, [email]);
        return [result, field];
    }catch(error){
        logger.error({
            location: "Error in services, findUserIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findUserIdServices() - message: ${error.message}`);
    }
}
const deleteUserIdServices = async (id)=>{
    try{
        const sql = "DELETE FROM users WHERE id = ?";
        const value = [id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, deleteUserId()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, deleteUserId() - message: ${error.message}`);
    }
}

module.exports = {createUserServices, updateUserIdServices, findUsersServices, findUserEmailServices, findUserIdServices, findUserNameServices, deleteUserIdServices}