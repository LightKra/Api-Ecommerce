const {validateId, validateName, validateDescription, validatePrice, validateStock, validateImage, validateCreatedAt, validateCategory} = require("../validations/product.validations")
const {deleteFileStorage} = require("../utils/storage.files");

const createproductMiddleware = async (req, res, next)=>{
    let newImage;
    try{
        const productJson = req.body;
        newImage = productJson.image;
        validateName(productJson.name);
        validateDescription(productJson.description);
        validatePrice(productJson.price);
        validateStock(productJson.stock);
        validateImage(productJson.image);
        validateCategory(productJson.category);
        next();
    }catch(error){
        deleteFileStorage(newImage);
        res.status(400).json({result: [], message: error.message});
    }
}
const updateProductIdMiddleware = async (req, res, next)=>{
    let newImage;
    try{
        const productJson = req.body;
        const id = req.params.id;
        newImage = productJson.image;
        validateId(id);
        validateName(productJson.name);
        validateDescription(productJson.description);
        validatePrice(productJson.price);
        validateStock(productJson.stock);
        validateImage(productJson.image);
        validateCategory(productJson.category);
        next();
    }catch(error){
        deleteFileStorage(newImage);
        res.status(400).json({result: [], message: error.message});
    }
}
const findProductsMiddleware = async (req, res, next)=>{
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
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}   
const deleteProductIdMiddleware = async (req, res, next)=>{
    try{
        const id = req.params.id;
        validateId(id);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

module.exports = {createproductMiddleware, updateProductIdMiddleware, findProductsMiddleware, deleteProductIdMiddleware}