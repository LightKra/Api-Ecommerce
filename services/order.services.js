const {connection} = require("./mysql");
const {logger} = require("../utils/winston.logs");
/**
 * 
 * @param {Order} Order 
 * @returns {Promise} [result, fields] - result = Array
 */
const createOrderServices = async (Order)=>{
    try{
        const sql = "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)";
        const value = [Order.getUserId(), Order.getTotalAmount(), Order.getStatus()];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, createOrderServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createOrderServices() - message: ${error.message}`);
    }
}
/**
 * 
 * @param {Number} id 
 * @param {Order} Order 
 * @returns {Promise} [result, fields] - result = Array
 */
const updateOrderIdServices = async (id, Order)=>{
    try{
        const sql = "UPDATE orders SET total_amount = ?, status = ? WHERE id = ?";
        const value = [Order.getTotalAmount(), Order.getStatus(), id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, updateOrderIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, updateOrderIdServices() - message: ${error.message}`);
    }
}
/**
 * 
 * @param {Number} id 
 * @param {Number} userId 
 * @param {Number} totalAmountLow 
 * @param {Number} totalAmountUp 
 * @param {String} status 
 * @param {Number} created_atLow 
 * @param {Number} created_atUp 
 * @param {Number} limit 
 * @param {Number} offset 
 * @returns {Promise} [result, fields] - result = Array
 */        
const findOrdersServices = async (id, userId, totalAmountLow, totalAmountUp, status, created_atLow, created_atUp, limit, offset)=>{
    try{
        let sql = "select * from orders where 1=1";
        if(id) sql = `${sql} and id = ?`;
        if(userId) sql = `${sql} and user_id = ?`;
        if(totalAmountLow >= 0 && totalAmountUp >= 0) sql = `${sql} and total_amount between ? and ?`;
        if(status) sql = `${sql} status = ?`;
        if(created_atLow && created_atUp) sql = `${sql} and created_at between ? and ?`;
        sql = `${sql} limit ? offset ?`;
        const value = [
            `${id ? id : "null"}`,
            `${userId ? `${userId}%` : "null"}`, 
            `${totalAmountLow >= 0 && totalAmountUp >= 0 ? totalAmountLow : "null"}`, 
            `${totalAmountLow >= 0 && totalAmountUp >= 0 ? totalAmountUp: "null"}`,
             status ? status : "null",
            created_atLow && created_atUp ? created_atLow : "null", 
            created_atLow && created_atUp ? created_atUp : "null", 
            `${limit ? limit : "null"}`, 
            `${offset >= 0 ? offset : "null"}`
        ]
        const newValue = value.filter(item=>item!== "null");
        const [result, fields] = await connection.execute(sql, newValue);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findOrdersServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findOrdersServices() - message: ${error.message}`);
    }
}   
/**
 * 
 * @param {Number} id 
 * @returns {Promise} [result, fields] - result = Array
 */
const findOrdersIdServices = async (id)=>{
    try{
        const sql = "select * from orders where id = ?";
        const [result, fields] = await connection.execute(sql, [id]);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findOrdersServices()",
            errorName: error.name,
            errorMessage: error.message
        })
        throw new Error(`Error in services, findOrdersIdServices() - message: ${error.message}`)
    }
}
/**
 * 
 * @param {Number} id 
 * @param {String} status 
 * @param {Number} createdAtLow 
 * @param {Number} createdAtUp 
 * @param {Number} limit 
 * @param {Number} offset 
 * @returns {Promise} [result, fields] - result = Array
 */
const findOrderIdJoinItemProductsServices = async (id, status, createdAtLow, createdAtUp, limit, offset)=>{
    try{
        let sql = "select orders.id, products.name, products.category, products.description, products.image, order_items.quantity, order_items.price, orders.total_amount, orders.status, orders.created_at from orders inner join order_items on orders.id = order_items.order_id inner join products on products.id = order_items.product_id where orders.id = ?";
        if(status) sql = `${sql} and orders.status = ?`;
        if(createdAtLow && createdAtUp ) sql = `${sql} and orders.created_at > ? and orders.created_at < ?`;
        sql = `${sql} limit ? offset ?`;
        const value = [
            `${id ? id : "null"}`,
            `${status ? status : "null"}`,
            `${createdAtLow && createdAtUp ? createdAtLow : "null"}`,
            `${createdAtLow && createdAtUp ? createdAtUp : "null"}`,
            `${limit ? limit : "null"}`,
            `${offset >=0 ? offset : "null"}`
        ];
        const newValue = value.filter(item=> item!== "null");
        const [result, fields] = await connection.execute(sql, newValue);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findOrderIdJoinItemProductsServices()",
            errorName: error.name,
            errorMessage: error.message
        })
        throw new Error(`Error in services, findOrderIdJoinItemProductsServices() - message: ${error.message}`)
    }
}
/**
 * 
 * @param {Number} id 
 * @returns {Promise} [result, fields] - result = Array
 */
const deleteOrderIdServices = async (id)=>{
    try{
        const sql = "DELETE FROM orders WHERE id = ?";
        const value = [id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, deleteOrderId()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, deleteOrderId() - message: ${error.message}`);
    }
}

module.exports = {createOrderServices, updateOrderIdServices, findOrdersServices, findOrdersIdServices, findOrderIdJoinItemProductsServices, deleteOrderIdServices}