const express = require("express");
const routerOrderItem = express.Router();
const {createOrderItemController, updateOrderItemIdController, findOrderItemIdController, findOrderItemsController, deleteOrderItemIdController} = require("../controller/order.item.controller");
const {createOrderItemMiddleware, updateOrderItemIdMiddleware, findOrderItemIdMiddleware, findOrderItemsMiddleware, deleteOrderItemIdMiddleware} = require("../middleware/order.item.middleware");
const {verifyTokenLogin, verifyRol} = require("../middleware/auth.user.middleware");

routerOrderItem.post("/create", verifyTokenLogin, verifyRol(["user", "admin"]), createOrderItemMiddleware, createOrderItemController);
routerOrderItem.put("/update-id/:id", verifyTokenLogin, verifyRol(["user", "admin"]), updateOrderItemIdMiddleware, updateOrderItemIdController);
routerOrderItem.get("/find", verifyTokenLogin, verifyRol(["user", "admin"]), findOrderItemsMiddleware, findOrderItemsController);
routerOrderItem.get("/find-id/:id", verifyTokenLogin, verifyRol(["user", "admin"]), findOrderItemIdMiddleware, findOrderItemIdController);
routerOrderItem.delete("/delete-id/:id", verifyTokenLogin, verifyRol(["user", "admin"]), deleteOrderItemIdMiddleware, deleteOrderItemIdController);

module.exports = {routerOrderItem}