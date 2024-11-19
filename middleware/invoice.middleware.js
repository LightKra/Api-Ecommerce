const {validateId, validateOrderId, validateInvoiceDate, validateTotalAmount} = require("../validations/invoice.validations");

const createInvoiceMiddleware = async (req, res, next)=>{
    try{
        const jsonInvoice = req.body;
        validateOrderId(jsonInvoice.orderid);
        validateTotalAmount(jsonInvoice.totalamount);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

const updateInvoiceIdMiddleware = async (req, res, next)=>{
    try{
        const jsonInvoice = req.body;
        validateId(jsonInvoice.id);
        validateOrderId(jsonInvoice.orderid);
        validateTotalAmount(jsonInvoice.totalamount);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

const findInvoicesMiddleware = async (req, res, next)=>{
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
        //correccion de datos
        req.query.id = Number(req.query.id);
        req.query.orderid = Number(req.query.orderid);
        req.query.totalamount = Number(req.query.totalamount);
        next();
    }catch(error){
       res.status(400).json({result: [], message: error.message});
    }
}   

const findInvoiceIdMiddleware = async (req, res, next)=>{
    try{
        const id = req.params.id;
        validateId(id);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

const deleteInvoiceIdMiddleware = async (req, res, next)=>{
    try{
        const id = req.params.id;
       validateId(id);
       next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

module.exports = {createInvoiceMiddleware, updateInvoiceIdMiddleware, findInvoiceIdMiddleware, findInvoicesMiddleware, deleteInvoiceIdMiddleware}