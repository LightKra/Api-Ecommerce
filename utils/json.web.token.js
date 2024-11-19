const jwt = require("jsonwebtoken");
const {privateKey} = require("../utils/variables");
const {privateKeyRefresh} = require("../utils/variables");

const getToken = (dataJson)=>{
    try{
        return jwt.sign(dataJson, privateKey, {expiresIn: "10h"});
    }catch(error){
        throw new Error(`Error generating token: ${error.message}`);
    }
}
const verifyToken = (token)=>{
    try{
        return jwt.verify(token, privateKey);
    }catch(error){
        throw new Error(`Error token: ${error.message}`);
    } 
}
const getRefreshToken = (dataJson)=>{
    try{
        return jwt.sign(dataJson, privateKeyRefresh, {expiresIn: "7d"});
    }catch(error){
        throw new Error(`Error generating refresh token: ${error.message}`);
    }
}
const verifyRefreshToken = (refreshToken)=>{
    try {
        return jwt.verify(refreshToken, privateKeyRefresh);
    } catch (error) {
        throw new Error(`Error Token refresh: ${error.message}`);
    }
}

module.exports = {getToken, verifyToken, getRefreshToken, verifyRefreshToken}