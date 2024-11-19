const {connection} = require("./mysql");
const {logger} = require("../utils/winston.logs");

const createproductServices = async (product)=>{
    try{
        const sql = "INSERT INTO products (name, description, price, stock, image, category) VALUES (?, ?, ?, ?, ?, ?)";
        const value = [product.getName(), product.getDescription(), product.getPrice(), product.getStock(), product.getImage(), product.getCategory()];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, createproductServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, createproductServices() - message: ${error.message}`);
    }
}
const updateProductIdServices = async (id, product)=>{
    try{
        const sql = "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ?, category = ? WHERE id = ?";
        const value = [product.getName(), product.getDescription(), product.getPrice(), product.getStock(), product.getImage(), product.getCategory(), id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, updateProductIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, updateProductIdServices() - message: ${error.message}`);
    }
}
const findProductsServices = async (name, priceLow, priceUp, created_atLow, created_atUp, category, limit, offset)=>{
    try{
        let sql = "select * from products where 1=1";
        if(name) sql = `${sql} and name like ?`;
        if(priceLow >= 0 && priceUp >= 0) sql = `${sql} and price between ? and ?`
        if(created_atLow && created_atUp) sql = `${sql} and created_at between ? and ?`;
        if(category) sql = `${sql} and category = ?`;
        sql = `${sql} limit ? offset ?`;
        const value = [
            `${name ? `${name}%` : "null"}`, 
            `${priceLow >= 0 && priceUp >= 0 ? priceLow : "null"}`, 
            `${priceLow >= 0 && priceUp >= 0 ? priceUp: "null"}`, 
            created_atLow && created_atUp ? created_atLow : "null", 
            created_atLow && created_atUp ? created_atUp : "null", 
            category ? category : "null",
            `${limit ? limit : "null"}`, 
            `${offset >= 0 ? offset : "null"}`
        ]
        const newValue = value.filter(item=>item!== "null");
        const [result, fields] = await connection.execute(sql, newValue);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findProductsServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findProductsServices() - message: ${error.message}`);
    }
}   

const findProductIdServices = async (id)=>{
    try{
        const sql = "select * from products where id = ?";
        const value = [id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, findProductIdServices()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, findProductIdServices() - message: ${error.message}`);
    }
}

const deleteProductIdServices = async (id)=>{
    try{
        const sql = "DELETE FROM products WHERE id = ?";
        const value = [id];
        const [result, fields] = await connection.execute(sql, value);
        return [result, fields];
    }catch(error){
        logger.error({
            location: "Error in services, deleteproductId()",
            errorName: error.name,
            errorMessage: error.message
        });
        throw new Error(`Error in services, deleteproductId() - message: ${error.message}`);
    }
}

module.exports = {createproductServices, updateProductIdServices, findProductsServices, findProductIdServices, deleteProductIdServices}