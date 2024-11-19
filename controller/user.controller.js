const {User} = require("../model/user.model");
const {createUserServices, updateUserIdServices, findUserIdServices, findUsersServices, findUserNameServices, deleteUserIdServices} = require("../services/user.services");
const {deleteFileStorage, getPathServerStatic} = require("../utils/storage.files");
const {getHash} = require("../utils/encryption.password");

const createUserController = async (req, res)=>{
    let newImage;
    try{
        const userjson = req.body;
        newImage = userjson.image;
        userjson.password = await getHash(userjson.password);
        const user = new User("", userjson.name, userjson.email, userjson.address, userjson.image, userjson.password, userjson.role, "");
        const [resultCreate, fieldsCreate] = await createUserServices(user);
        const [result, fields] = await findUserIdServices(resultCreate.insertId);
        result[0].image = getPathServerStatic(result[0].image);
        const {password, ...newResult} = result[0];
        res.status(200).json({result: newResult, message: "The user was created successfully"});
    }catch(error){
        await deleteFileStorage(newImage);
        res.status(500).json({result:[], message: `Error creating user: ${error.message}`});
    }
}
const updateUserIdController = async (req, res)=>{
    let newImage;
    try{
        const userjson = req.body;
        const id = req.user.id;
        const oldNameImage = req.user.image;
        newImage = userjson.image;
        if(!id){
            await deleteFileStorage(userjson.image);
            return res.status(200).json({result: [], message: "User not found"});
        }
        userjson.password = await getHash(userjson.password);
        const user = new User("", userjson.name, userjson.email, userjson.address, userjson.image, userjson.password, userjson.role, "");
        await updateUserIdServices(id, user);
        const [result, fields] = await findUserIdServices(id);
        result[0].image = getPathServerStatic(result[0].image);
        const {password, ...newResult} = result[0];
        await deleteFileStorage(oldNameImage);
        res.status(200).json({result: newResult, message: "The user was updated successfully"});
    }catch(error){
        await deleteFileStorage(newImage);
        res.status(500).json({result:[], message: `Error updating user: ${error.message}`});
    }
}
const findUsersController = async (req, res)=>{
    try{
        let limit = req.query.limit;
        let offset = req.offset;
        const [resultUserServices, fields] = await findUsersServices(limit, offset);
        const resultFilter = resultUserServices.map(item=>{
            const {password, ...newItem} = item;
            newItem.image = getPathServerStatic(item.image);
            return newItem;
        });
        res.status(200).json({result: resultFilter, message: "Users successfully obtained"});
    }catch(error){
        res.status(500).json({result:[], message: `Error getting users: ${error.message}`});
    }
}
const findUserIdController = async (req, res) =>{
    try{
        const id = req.user.id;
        const [resultUserServices, fields] = await findUserIdServices(id);
        resultUserServices[0].image = getPathServerStatic(resultUserServices[0].image);
        const {password, ...result} = resultUserServices[0];
        res.status(200).json({result, message: `User id successfully obtained`});
    }catch (error){
        res.status(500).json({result: [], message: `Error getting user id: ${error.message}`});
    }
}
const findUserNameController = async (req, res)=>{
    try{
        const name = req.params.name;
        let limit = req.query.limit;
        let offset = req.offset;
        const [resultUserNameServices, fields] = await findUserNameServices(name, limit, offset);
        const resultFilter = resultUserNameServices.map(item=>{
            const {password, ...newItem} = item;
            newItem.image = getPathServerStatic(item.image);
            return newItem;
        });
        res.status(200).json({result: resultFilter, message: "Users successfully obtained"});
    }catch(error){
        res.status(500).json({result:[], message: `Error creating user: ${error.message}`});
    }
}
const deleteUserIdController = async (req, res)=>{
    try{
        const id = req.user.id;
        const image = req.user.image;
        const [result, fields] = await findUserIdServices(id)
        result[0].image = getPathServerStatic(result[0].image);
        await deleteUserIdServices(id);
        deleteFileStorage(image);
        res.status(200).json({result, message: "user deleted successfully"});
    }catch(error){
        res.status(500).json({result:[], message: `Error delete user: ${error.message}`});
    }
}

module.exports = {createUserController, updateUserIdController, findUsersController, findUserIdController, findUserNameController, deleteUserIdController}