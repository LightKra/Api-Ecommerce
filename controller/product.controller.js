const {Product} = require("../model/product.model");
const {createproductServices, updateProductIdServices, findProductsServices, findProductIdServices, deleteProductIdServices} = require("../services/product.services");
const { deleteFileStorage, getPathServerStatic} = require("../utils/storage.files");

const createproductController = async (req, res)=>{
    let newImage;
    try{
        const productJson = req.body;
        newImage = productJson.image;
        const product = new Product("", productJson.name, productJson.description, productJson.price, productJson.stock, productJson.image, "", productJson.category);
        const [resultCreate, fieldsCreate] = await createproductServices(product);
        const [result, fields] = await findProductIdServices(resultCreate.insertId);
        result[0].image = getPathServerStatic(result[0].image);
        result[0].price = Number(result[0].price);
        res.status(200).json({result, message: "The product was created successfully"});
    }catch(error){
        await deleteFileStorage(newImage);
        res.status(500).json({result:[], message: `Error creating product: ${error.message}`});
    }
}
const updateProductIdController = async (req, res)=>{
    let newImage;
    try{
        const productJson = req.body;
        const id = req.params.id;
        newImage = productJson.image;
        const [oldProductResult, oldProductFields] = await findProductIdServices(id);
        if(!oldProductResult[0]){
            await deleteFileStorage(productJson.image);
            return res.status(200).json({result: [], message: "Product not found"});
        }
        const oldNameImage = oldProductResult[0].image;
        const product = new Product("", productJson.name, productJson.description, productJson.price, productJson.stock, productJson.image, "", productJson.category);
        await updateProductIdServices(id, product);
        const [result, fields] = await findProductIdServices(id);
        result[0].image = getPathServerStatic(result[0].image);
        result[0].price = Number(result[0].price);
        await deleteFileStorage(oldNameImage);
        res.status(200).json({result, message: "The product was updated successfully"});
    }catch(error){
        await deleteFileStorage(newImage);
        res.status(500).json({result:[], message: `Error updating product: ${error.message}`});
    }
}
const findProductsController = async (req, res)=>{
    try{
        const name = req.query.name;
        const priceLow = req.query.pricelow;
        const priceUp = req.query.priceup;
        const created_atLow = req.query.createdatlow;
        const created_atUp = req.query.createdatup;
        const category = req.query.category;
        const limit = req.query.limit;
        const offset = req.offset;
        const [result, fields] = await findProductsServices(name, priceLow, priceUp, created_atLow, created_atUp, category, limit, offset);
        const newResult = result.map(item=>{
            item.image = getPathServerStatic(item.image);
            item.price = Number(item.price);
            return item;
        });
        res.status(200).json({result: newResult, message: "Products successfully obtained"});
    }catch(error){
        res.status(500).json({result:[], message: `Error getting products: ${error.message}`});
    }
}   

const deleteProductIdController = async (req, res)=>{
    try{
        const id = req.params.id;
        const image = req.user.image;
        const [result, fields] = await findProductIdServices(id);
        result[0].image = getPathServerStatic(result[0].image);
        result[0].price = Number(result[0].price);
        await deleteProductIdServices(id);
        deleteFileStorage(image);
        res.status(200).json({result, message: "Delete Product"});
    }catch(error){
        res.status(500).json({result:[], message: `Error delete products: ${error.message}`});
    }
}

module.exports = {createproductController, updateProductIdController, findProductsController, deleteProductIdController}
