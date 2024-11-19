const { validateId, validateOrderId, validateProductId, validateQuantity, validatePrice } = require("../validations/order.item.validations");

const createOrderItemMiddleware = async (req, res, next)=>{
    try{
        
       const jsonOrderItem = req.body;
       validateOrderId(jsonOrderItem.orderid);
       validateProductId(jsonOrderItem.productid);
       validateQuantity(jsonOrderItem.quantity);
       validatePrice(jsonOrderItem.price);
       next();
    }catch(error){
        res.status(400).json({result: [], message: `Invalid order data: ${error.message}`});
    }
}

const updateOrderItemIdMiddleware = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const jsonOrderItem = req.body;
        validateId(id);
        validateOrderId(jsonOrderItem.orderid);
        validateProductId(jsonOrderItem.productid);
        validateQuantity(jsonOrderItem.quantity);
        validatePrice(jsonOrderItem.price);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}
      
const findOrderItemsMiddleware = async (req, res, next)=>{
    try{
        //logica de paginas
        let page = req.query.page || 1;
        let limit = req.query.limit || 20;
        page = Number(page) - 1;
        limit = Number(limit);
        if(page<0 || limit<=0){
            return res.status(400).json({result: [], message: `Invalid page or limit`})
        }
        req.query.page = page;
        req.query.limit = limit;
        req.offset = page*limit;
        //correcion de datos
        req.query.id = Number(req.query.id);
        req.query.orderid = Number(req.query.orderid);
        req.query.productid = Number(req.query.productid);
        req.query.quantitylow = Number(req.query.quantitylow);
        req.query.quantityup = Number(req.query.quantityup);
        req.query.pricelow = Number(req.query.pricelow);
        req.query.priceup = Number(req.query.priceup);
        next()
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}   

const findOrderItemIdMiddleware = async (req, res, next)=>{
    try{
       const id = req.params.id;
       validateId(id)
       next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

const deleteOrderItemIdMiddleware = async (req, res, next)=>{
    try{
       const id = req.params.id;
       validateId(id);
       next()
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

module.exports = {createOrderItemMiddleware, updateOrderItemIdMiddleware, findOrderItemIdMiddleware, findOrderItemsMiddleware, deleteOrderItemIdMiddleware}