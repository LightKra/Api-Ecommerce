const {createOrderServices, updateOrderIdServices, findOrdersServices, findOrderIdJoinItemProductsServices, findOrdersIdServices, deleteOrderIdServices} = require("../services/order.services");
const {Order} = require("../model/order.model");

const createOrderController = async (req, res)=>{
    try {
        //retornar la informacion que se creo, podria ser util para el frontend. Para guardarlo en el estado.
        const jsonOrder = req.body;
        const userId = req.user.id;
        const order = new Order("", userId, jsonOrder.totalamount, jsonOrder.status, "");
        const [resultCreate, fieldsCreate] = await createOrderServices(order);
        const [result, fields] = await findOrdersIdServices(resultCreate.insertId);
        result[0].total_amount = Number(result[0].total_amount);
        res.status(200).json({result, message: `The order was created successfully`});
    } catch (error) {
        res.status(500).json({result: [], message: `Error creating order: ${error.message}`});
    }    
}
const updateOrderIdController = async (req, res)=>{
    try {
        const id = req.params.id;
        const jsonOrder = req.body;
        const order = new Order("", "", jsonOrder.totalamount, jsonOrder.status, "");
        await updateOrderIdServices(id, order);
        const [result, fields] = await findOrdersIdServices(id);
        result[0].total_amount = Number(result[0].total_amount);
        res.status(200).json({result, message: `The order was updated successfully`});
    } catch (error) {
        res.status(500).json({result: [], message: `Error updating order: ${error.message}`});
    }    
}
const findOrdersController = async (req, res)=>{
    try {
        const id = req.query.id;
        const userId = req.query.userid;
        const totalAmountLow = req.query.amountlow;
        const totalAmountUp = req.query.amountup;
        const status = req.query.status;
        const created_atLow = req.query.createdatlow;
        const created_atUp = req.query.createdatup; 
        const limit = req.query.limit;
        const offset = req.offset;
        const [result, fields] = await findOrdersServices(id, userId, totalAmountLow, totalAmountUp, status, created_atLow, created_atUp, limit, offset);
        const newResult = result.map(item=>{
            item.total_amount = Number(item.total_amount);
            return item;
        });
        res.status(200).json({result: newResult, message: `Order successfully obtained`});
    } catch (error) {
        res.status(500).json({result: [], message: `Error getting orders: ${error.message}`});
    }    
}      
const findOrderIdJoinItemProductsController = async (req, res)=>{
    try {
        const id = req.params.id;
        const status = req.query.status;
        const createdAtLow = req.query.createdatlow;
        const createdAtUp = req.query.createdatup;
        const limit = req.query.limit;
        const offset = req.offset;
        const [result, fields] = await findOrderIdJoinItemProductsServices(id, status, createdAtLow, createdAtUp, limit, offset);
        const newResult = result.map(item=>{
            item.total_amount = Number(item.total_amount);
            return item;
        })
        res.status(200).json({result: newResult, message: `Order and items successfully obtained`});
    } catch (error) {
        res.status(500).json({result: [], message: `Error getting order and items: ${error.message}`});
    }    
} 

const deleteOrderIdController = async (req, res)=>{
    try {
        const id = req.params.id;
        const [result, fields] = await findOrdersIdServices(id);
        result[0].total_amount = Number(result[0].total_amount);
        await deleteOrderIdServices(id);
        res.status(200).json({result, message: `Order deleted successfully`});
    } catch (error) {
        res.status(500).json({result: [], message: `Error delete order: ${error.message}`});
    }    
}

module.exports = {createOrderController, updateOrderIdController, findOrdersController, findOrderIdJoinItemProductsController, deleteOrderIdController}