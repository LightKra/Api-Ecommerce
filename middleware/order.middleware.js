const {validateId, validateUserId, validateTotalAmount, validateStatus} = require("../validations/order.validations");

const createOrderMiddleware = async (req, res, next)=>{
    try{
        const jsonOrder = req.body;
        validateUserId(jsonOrder.userid);
        validateTotalAmount(jsonOrder.totalamount);
        validateStatus(jsonOrder.status);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}
const updateOrderIdMiddleware = async (req, res, next)=>{
    try{
        const jsonOrder = req.body;
        const id = req.params.id;
        validateId(id);
        validateTotalAmount(jsonOrder.totalamount)
        validateStatus(jsonOrder.status);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}
const findOrdersMiddleware = async (req, res, next)=>{
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
        //correccion datos
        req.query.amountlow = Number(req.query.amountlow);
        req.query.amountup = Number(req.query.amountup);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}      
const findOrderIdJoinItemProductsMiddleware = (req, res, next)=>{
    try {
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
        const id = req.params.id;
        validateId(id);
        next();
    } catch (error) {   
        res.status(400).json({result: [], message: error.message});
    }
}
const deleteOrderIdMiddleware = async (req, res, next)=>{
    try{
        const id = req.params.id;
        validateId(id);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

module.exports = {createOrderMiddleware, updateOrderIdMiddleware, findOrdersMiddleware, findOrderIdJoinItemProductsMiddleware, deleteOrderIdMiddleware}