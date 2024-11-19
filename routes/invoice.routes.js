const express = require("express");
const {createInvoiceController, updateInvoiceIdController, findInvoicesController, findInvoiceIdController, deleteInvoiceIdController} = require("../controller/invoice.controller");
const {createInvoiceMiddleware, updateInvoiceIdMiddleware, findInvoiceIdMiddleware, findInvoicesMiddleware, deleteInvoiceIdMiddleware} = require("../middleware/invoice.middleware");
const {verifyTokenLogin, verifyRol} = require("../middleware/auth.user.middleware");

const routerInvoice = express.Router();
routerInvoice.post("/create", verifyTokenLogin, verifyRol(["user", "admin"]), createInvoiceMiddleware, createInvoiceController);
routerInvoice.put("/update-id/:id", verifyTokenLogin, verifyRol(["user", "admin"]), updateInvoiceIdMiddleware, updateInvoiceIdController);
routerInvoice.get("/find", verifyTokenLogin, verifyRol("user", "admin"), findInvoicesMiddleware, findInvoicesController);
routerInvoice.get("/find-id/:id", verifyTokenLogin, verifyRol(["user", "admin"]), findInvoiceIdMiddleware, findInvoiceIdController);
routerInvoice.delete("/delete-id/:id", verifyTokenLogin, verifyRol(["user", "admin"]), deleteInvoiceIdMiddleware, deleteInvoiceIdController);

module.exports = {routerInvoice}
