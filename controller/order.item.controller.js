const {createOrderItemServices, updateOrderItemIdServices, findOrderItemsIdServices, findOrderItemsServices, deleteOrderItemIdServices} = require("../services/order.item.services");
const {OrderItem} = require("../model/order.item.model");

const createOrderItemController = async (req, res)=>{
    try{
       const jsonOrderItem = req.body;
       const orderItem = new OrderItem("", jsonOrderItem.orderid, jsonOrderItem.productid, jsonOrderItem.quantity, jsonOrderItem.price);
       const [resultCreate, fieldsCreate] = await createOrderItemServices(orderItem);
       const [result, fields] = await findOrderItemsIdServices(resultCreate.insertId);
       result[0].price = Number(result[0].price);
       res.status(200).json({result, message: "The order item was created successfully"})
    }catch(error){
        res.status(500).json({result: [], message: `Error creating order item: ${error.message}`});
    }
}

const updateOrderItemIdController = async (req, res)=>{
    try{
        const id = req.params.id;
        const jsonOrderItem = req.body;
        const orderItem = new OrderItem("", jsonOrderItem.orderid, jsonOrderItem.productid, jsonOrderItem.quantity, jsonOrderItem.price);
        await updateOrderItemIdServices(id, orderItem);
        const [result, fields] = await findOrderItemsIdServices(id);
        result[0].price = Number(result[0].price);
        res.status(200).json({result, message: "The order item was updated successfully"});
    }catch(error){
        res.status(500).json({result: [], message: `Error updating order item: ${error.message}`});
    }
}
      
const findOrderItemsController = async (req, res)=>{
    try{
        const id  = req.query.id;
        const orderId = req.query.orderid;
        const productId = req.query.productid;
        const quantityLow = req.query.quantitylow;
        const quantityUp = req.query.quantityup;
        const priceLow = req.query.pricelow;
        const priceUp = req.query.priceup;
        const limit = req.query.limit;
        const offset = req.offset;
        const [resultFind, fieldsFind] = await findOrderItemsServices(id, orderId, productId, quantityLow, quantityUp, priceLow, priceUp, limit, offset);
        const result = resultFind.map(item=>{
            item.price = Number(item.price);
            return item;
        })
        res.status(200).json({result, message: "Order items successfully obtained"});
    }catch(error){
        res.status(500).json({result: [], message: `Error getting order item: ${error.message}`});
    }
}   

const findOrderItemIdController = async (req, res)=>{
    try{
        const id = req.params.id;
        const [result, fields] = await findOrderItemsIdServices(id);
        result[0].price = Number(result[0].price);
        res.status(200).json({result, message: "Order item successfully obtained"});
    }catch(error){
        res.status(200).json({result: [], message: `Error getting order: ${error.message}`});
    }
}

const deleteOrderItemIdController = async (req, res)=>{
    try{
       const id = req.params.id;
       const [result, fields] = await findOrderItemsIdServices(id);
       result[0].price = Number(result[0].price);
       await deleteOrderItemIdServices(id);
       res.status(200).json({result, message: "Order deleted successfully"});
    }catch(error){
        res.status(500).json({result: [], message: `Error delete order: ${error.message}`});
    }
}

module.exports = {createOrderItemController, updateOrderItemIdController, findOrderItemIdController, findOrderItemsController, deleteOrderItemIdController}