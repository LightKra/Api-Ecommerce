const {validateEmail, validatePassword} =require("../validations/user.validations");
const {findUserIdServices} = require("../services/user.services");
const {verifyToken} = require("../utils/json.web.token");
const {logger} = require("../utils/winston.logs");

const loginMiddleware = (req, res, next)=>{
    try{
        const jsonUser = req.body;
        validateEmail(jsonUser.email);
        validatePassword(jsonUser.password);
        next();
    }catch(error){
        res.status(400).json({result: [], message: `Invalid data: ${error.message}`});
    }
}
const verifyTokenLogin = async (req, res, next)=>{
    try{
        if(!req.headers.authorization){
            return res.status(400).json({result: [], message: "Token isn't exist"});
        }
        const token = req.headers.authorization.split(" ").pop();
        const id = verifyToken(token).id;
        const [result, fields] = await findUserIdServices(id);
        req.user = result[0];
        next();
    }catch(error){
        if(error.message.includes("Error token")){
            return res.status(401).json({result: [], message: `Error verifying token: ${error.message}`});
        }
        logger.error({
            location: "Error in middleware, verifyTokenLogin()",
            errorName : error.name,
            errorMessage: error.message
        });
        res.status(500).json({result: [], message: `Error verifying token: ${error.message}`});
    }
}
const verifyRol = (roles = ["user"])=> (req, res, next) =>{
        try{
            const userRole = req.user.role;
            if(!roles.includes(userRole)){
                return res.status(403).json({result: [], message: "Access not permitted"});
            }
            next();
        }catch(error){
            logger.error({
                location: "Error in middleware, verifyRol()",
                errorName : error.name,
                errorMessage: error.message
            });
            res.status(500).json({result: [], message: `Error in roles: ${error.message}`});
        }
}
module.exports = {loginMiddleware, verifyTokenLogin, verifyRol}