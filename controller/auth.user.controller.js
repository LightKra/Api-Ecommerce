const {getToken, verifyToken, getRefreshToken, verifyRefreshToken} = require("../utils/json.web.token");
const {comparePasswords, getHash} = require("../utils/encryption.password");
const {findUserEmailServices} = require("../services/user.services");
const {findRefreshTokenUserIdServices, createRefreshToken, deleteRefreshTokenUserIdServices} = require("../services/refresh.tokens.services");
const {RefreshTokenClass} = require('../model/token.model');
const {logger} = require("../utils/winston.logs");
const {getPathServerStatic} = require("../utils/storage.files");

const login = async (req, res)=>{
    try{
        const jsonUser = req.body;
        let [result, fields] = await findUserEmailServices(jsonUser.email);
        if(!result[0]){
            return res.status(400).json({result, message: "The user does not exist"});
        }
        const state = await comparePasswords(jsonUser.password, result[0].password);
        if(!state){
            return res.status(400).json({result: [], message: "Incorrect username or password"})
        }
        const token = getToken({id: result[0].id});
        const refreshToken = getRefreshToken({id: result[0].id});
        const hashRefreshToken = await getHash(refreshToken);
        const refreshTokenObject = new RefreshTokenClass("", result[0].id, hashRefreshToken, "");
        const [resultFind, fieldsFind] = await findRefreshTokenUserIdServices(result[0].id);
        if(resultFind[0]){
            await deleteRefreshTokenUserIdServices(result[0].id);
        }
        await createRefreshToken(refreshTokenObject);
        result[0].image = getPathServerStatic(result[0].image);
        const {password, ...newJson} = result[0];
        res.status(200).json({result: [{user: newJson}, {token}, {refreshToken}], message: "User session successful"});
    }catch(error){
        logger.error({
            location: "Error in middleware, login()",
            errorName: error.name,
            errorMessage: error.message
        })
       res.status(500).json({result: [], message: `Unexpected error when logging in: ${error.message}`});
    }
}
const logout = async (req, res)=>{
    try{
        if(!req.headers.authorization){
            return res.status(400).json({result: [], message: "Token isn't exist"})
        }
        const token = req.headers.authorization.split(" ").pop();
        const id = verifyToken(token).id;
        const [result, fields] = await deleteRefreshTokenUserIdServices(id);
        res.status(200).json({result, message: "User session closed"})
    }catch(error){
        if(error.message.includes("Error token")){
            return res.status(401).json({result: [], message: `Error verifying token: ${error.message}`});
        }
        logger.error({
            location: "Error in middleware, logout()",
            errorName: error.name,
            errorMessage: error.message
        })
       res.status(500).json({result: [], message: `Error closing session: ${error.message}`});
    }
}
const getAccessToken = async (req, res)=>{
    try{
        if(!req.headers.refreshtoken){
            return res.status(400).json({result: [], message: "Refresh Token isn't exist"});
        }
        const refreshToken = req.headers.refreshtoken.split(" ").pop();
        let userId = verifyRefreshToken(refreshToken).id;
        const [result, fields] = await findRefreshTokenUserIdServices(userId);
       if(!result[0]){
            return res.status(400).json({result: [], message: "The Refresh Token does not correspond to any user"})
       }
       const state = await comparePasswords(refreshToken, result[0].refresh_token)
       if(!state){
            return res.status(400).json({result: [], message: "Refresh Token invalid"});
       }
       const token = getToken({id: userId});
       res.status(200).json({result:[{token}], message: `Token obtained`});
    }catch(error){
        if(error.message.includes("Error token")){
            return res.status(401).json({result: [], message: `Error verifying token: ${error.message}`});
        }
        res.status(500).json({result: [], message: `Error getting access token: ${error.message}`});
    }
}

module.exports = {login, logout, getAccessToken}