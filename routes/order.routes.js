const express = require("express");
const routerOrder = express.Router();
const {createOrderController, updateOrderIdController, findOrdersController, findOrderIdJoinItemProductsController, deleteOrderIdController} = require("../controller/order.controller");
const {createOrderMiddleware, updateOrderIdMiddleware, findOrdersMiddleware, findOrderIdJoinItemProductsMiddleware, deleteOrderIdMiddleware} = require("../middleware/order.middleware");
const {verifyTokenLogin, verifyRol} = require("../middleware/auth.user.middleware");

routerOrder.post("/create", verifyTokenLogin, verifyRol(["admin", "user"]), createOrderMiddleware, createOrderController);
routerOrder.put("/update-id/:id", verifyTokenLogin, verifyRol(["admin", "user"]), updateOrderIdMiddleware, updateOrderIdController);
routerOrder.get("/find", verifyTokenLogin, verifyRol(["admin", "user"]), findOrdersMiddleware, findOrdersController);
routerOrder.get("/find-products/:id", verifyTokenLogin, verifyRol(["user", "admin"]), findOrderIdJoinItemProductsMiddleware, findOrderIdJoinItemProductsController);
routerOrder.delete("/delete-id/:id", verifyTokenLogin, verifyRol(["admin", "user"]), deleteOrderIdMiddleware, deleteOrderIdController);

module.exports = {routerOrder}