const express = require("express");
const routerUsers = express.Router();
const {createUserController, updateUserIdController, findUserNameController, findUserIdController, findUsersController, deleteUserIdController} = require('../controller/user.controller');
const {createUserMiddleware, updateUserIdMiddleware, findUserNameMiddleware, findUsersMiddleware, deleteUserIdMiddleware} = require("../middleware/user.middleware");
const { uploadFile } = require("../middleware/upload.file.middleware");
const {verifyTokenLogin, verifyRol} = require("../middleware/auth.user.middleware");

routerUsers.post("/create", uploadFile, createUserMiddleware, createUserController);
routerUsers.put("/update", verifyTokenLogin, verifyRol(["user", "admin"]), uploadFile, updateUserIdMiddleware, updateUserIdController);
routerUsers.get("/find-name/:name", verifyTokenLogin, verifyRol(["user", "admin"]), findUserNameMiddleware, findUserNameController);
routerUsers.get("/find", verifyTokenLogin, verifyRol(["user", "admin"]), findUsersMiddleware, findUsersController);
routerUsers.get("/find-info", verifyTokenLogin, verifyRol(["user", "admin"]), findUserIdController)
routerUsers.delete("/delete", verifyTokenLogin, verifyRol(["user", "admin"]), deleteUserIdMiddleware, deleteUserIdController);

module.exports = {routerUsers}