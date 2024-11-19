const express = require("express");
const routerProduct = express.Router();
const {createproductController, updateProductIdController, findProductsController, deleteProductIdController} = require("../controller/product.controller");
const {uploadFile} = require("../middleware/upload.file.middleware");
const {createproductMiddleware, updateProductIdMiddleware, findProductsMiddleware, deleteProductIdMiddleware} = require("../middleware/product.middleware");
const {verifyTokenLogin, verifyRol} = require('../middleware/auth.user.middleware');

routerProduct.post("/create", verifyTokenLogin, verifyRol(["admin"]), uploadFile, createproductMiddleware, createproductController);
routerProduct.put("/update-id/:id", verifyTokenLogin, verifyRol(["admin"]), uploadFile, updateProductIdMiddleware, updateProductIdController);
routerProduct.get("/find", findProductsMiddleware, findProductsController);
routerProduct.delete("/delete-id/:id", verifyTokenLogin, verifyRol(["admin"]), deleteProductIdMiddleware, deleteProductIdController);

module.exports = {routerProduct}