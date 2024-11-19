const {validateId, validateName, validateAddress, validateEmail, validateImage, validatePassword, validateRole} = require("../validations/user.validations");
const {deleteFileStorage} = require("../utils/storage.files");

const createUserMiddleware = (req, res, next)=>{
    let newImage;
    try{
        req.body.role = "user";
        const userjson = req.body;
        newImage = userjson.image;
        validateName(userjson.name);
        validateEmail(userjson.email);
        validateAddress(userjson.address);
        validateImage(userjson.image);
        validatePassword(userjson.password);
        validateRole(userjson.role);
        next();
    }catch(error){
        deleteFileStorage(newImage);
        res.status(400).json({result: [], message: error.message});
    }
}
const updateUserIdMiddleware = (req, res, next)=>{
    let newImage;
    try{
        req.body.role = req.user.role;
        const userjson = req.body;
        const id = req.user.id;
        newImage = userjson.image;
        validateId(id);
        validateName(userjson.name);
        validateEmail(userjson.email);
        validateAddress(userjson.address);
        validateImage(userjson.image);
        validatePassword(userjson.password);
        validateRole(userjson.role);
        next();
    }catch(error){
        deleteFileStorage(newImage);
        res.status(400).json({result: [], message: error.message});
    }
}
const findUsersMiddleware = (req, res, next)=>{
    try{
        //pag:     0    (1x20)    (2x20)   (3x20)
        //offset:  0      20       40       60
        //limit;   20     20       20       20
        //logica de paginas
        let page = req.query.page || 1;
        let limit = req.query.limit || 20;
        page = Number(page) - 1;
        limit = Number(limit);
        if(page<0 || limit<=0){
            return res.status(400).json({result: [], message: `Invalid page or limit`})
        }
        req.query.page = page;
        req.query.limit = limit;
        req.offset = page*limit;
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}
const findUserNameMiddleware = (req, res, next)=>{
    try{
        let page = req.query.page || 1;
        let limit = req.query.limit || 20;
        page = Number(page) - 1;
        limit = Number(limit);
        if(page<0 || limit<=0){
            return res.status(400).json({result: [], message: `Invalid page or limit`})
        }
        req.query.page = page;
        req.query.limit = limit;
        req.offset = page*limit;
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}
const deleteUserIdMiddleware = (req, res, next)=>{
    try{
        const id = req.user.id;
        validateId(id);
        next();
    }catch(error){
        res.status(400).json({result: [], message: error.message});
    }
}

module.exports = {createUserMiddleware, updateUserIdMiddleware, findUserNameMiddleware, findUsersMiddleware, deleteUserIdMiddleware}