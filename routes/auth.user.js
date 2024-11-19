const express = require("express");
const routerAuth = express.Router();
const {login, getAccessToken, logout} = require("../controller/auth.user.controller");
const {loginMiddleware} = require("../middleware/auth.user.middleware");

routerAuth.post("/login", loginMiddleware, login);
routerAuth.get("/get-access-token", getAccessToken);
routerAuth.delete("/logout", logout);

module.exports = {routerAuth}