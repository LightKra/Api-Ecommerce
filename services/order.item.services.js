const {connection} = require("./mysql");
const {OrderItem} = require("../model/order.item.model");
const {logger} = require("../utils/winston.logs");
/**
 * 
 * @param {OrderItem} orderItem 
 */
const createOrderItemServices = async (orderItem)=>{
    try{
        const sql = "insert into order_items (order_id, product_id, quantity, price) values (?, ?, ?, ?)";
        const value = [orderItem.getOrderId(), orderItem.getProductId(), orderItem.getQuantity(), orderItem.getPrice()];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, createOrderItemServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createOrderItemServices() - message: ${error.message}`);
    }
}
/**
 * 
 * @param {Number} id 
 * @param {OrderItem} orderItem 
 */
const updateOrderItemIdServices = async (id, orderItem)=>{
    try{
        const sql = "update order_items set product_id = ?, quantity = ?, price = ? where id = ?";
        const value = [orderItem.getProductId(), orderItem.getQuantity(), orderItem.getPrice(), id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, updateOrderItemIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, updateOrderItemIdServices() - message: ${error.message}`);
    }
}
/**
 * 
 * @param {Number} id 
 * @param {Number} orderId 
 * @param {Number} productId 
 * @param {Number} quantityLow 
 * @param {Number} quantityUp 
 * @param {Number} priceLow 
 * @param {Number} priceUp 
 */       
const findOrderItemsServices = async (id, orderId, productId, quantityLow, quantityUp, priceLow, priceUp, limit, offset)=>{
    try{
        let sql = "select * from order_items where 1 = 1";
        if(id) sql = `${sql} and id = ?`;
        if(orderId) sql = `${sql} and order_id = ?`;
        if(productId) sql = `${sql} and product_id = ?`;
        if(quantityLow > 0 && quantityUp > 0) sql = `${sql} and quantity between ? and ?`;
        if(priceLow > 0 && priceUp > 0) sql = `${sql} and price between ? and ?`;
        sql = `${sql} limit ? offset ?`;
        const value = [
            `${id ? id : "null"}`,
            `${orderId ? orderId : "null"}`,
            `${productId ? productId : "null"}`,
            `${quantityLow > 0 && quantityUp > 0 ? quantityLow : "null"}`,
            `${quantityLow > 0 && quantityUp > 0 ? quantityUp : "null"}`,
            `${priceLow > 0 && priceUp > 0 ? priceLow : "null"}`,
            `${priceLow > 0 && priceUp > 0 ? priceUp : "null"}`,
            `${limit ? limit : "null"}`,
            `${offset >= 0 ? offset : "null"}`
        ];
        const newValue = value.filter(item=>item !== "null");
        const [result, fields] = await connection.execute(sql, newValue);
        return [result, fields]
    }catch(error){
        logger.error({
            location: "Error in services, findOrderItemsServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findOrderItemsServices() - message: ${error.message}`);
    }
}   
/**
 * 
 * @param {Number} id 
 */
const findOrderItemsIdServices = async (id)=>{
    try{
        const sql = "select * from order_items where id = ?";
        const [result, fields] = await connection.execute(sql, [id]);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findOrderItemsServices()",
            errorName: error.name,
            errorMessage: error.message
        })
        throw new Error(`Error in services, findOrderItemsIdServices() - message: ${error.message}`)
    }
}
/**
 * 
 * @param {Number} id 
 */
const deleteOrderItemIdServices = async (id)=>{
    try{
       const sql = "delete from order_items where id = ?";
       const [result, fields] = await connection.execute(sql, [id]);
       return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, deleteOrderItemId()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, deleteOrderItemId() - message: ${error.message}`);
    }
}

module.exports = {createOrderItemServices, updateOrderItemIdServices, findOrderItemsIdServices, findOrderItemsServices, deleteOrderItemIdServices}