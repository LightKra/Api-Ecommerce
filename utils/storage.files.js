const fs = require("fs/promises");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const {logger} = require("../utils/winston.logs");
const pathStorage = path.join(__dirname, "../", "storage");

const getPathStorage = ()=>{
    return pathStorage;
}
const getPathServerStatic = (nameImage)=>{
    return `http://localhost:3000/storage/${nameImage}`;
}
const renameFileStorage = async (nameFile)=>{
    try{
        const extension = nameFile.split(".").pop();
        const newName = `${uuidv4()}.${extension}`;
        const oldPath = path.join(`${getPathStorage()}/`, `${nameFile}`);
        const newPath = path.join(`${getPathStorage()}/`, `${newName}`);
        await fs.rename(oldPath, newPath);
        return newName;
    }catch(error){
        logger.error({
            location: "Error in utils, renameFileStorage()",
            errorName: error.name,
            errorMessage: error.message
        });
        return undefined;
    }
}
const deleteFileStorage = async (nameFile)=>{
    try{
        await fs.unlink(path.join(`${getPathStorage()}/`, `${nameFile}`));
        return nameFile;
    }catch(error){
        logger.error({
            location: "Error in utils, renameFileStorage()",
            errorName: error.name,
            errorMessage: error.message
        });
        return undefined;
    }
}

module.exports = {renameFileStorage, deleteFileStorage, getPathStorage, getPathServerStatic}