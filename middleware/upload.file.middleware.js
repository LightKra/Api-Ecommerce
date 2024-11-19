const path = require("path");
const fs = require("fs/promises");
const {renameFileStorage} = require("../utils/storage.files");

const uploadFile = (req, res, next)=>{
    try{
        let image;
        let uploadPath;
        const imageFormats = ['jpeg','jpg','png'];
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({result: [], message: "No files were uploaded"});
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        image = req.files.image;
        const imageFormat = image.name.split(".").pop().toLowerCase();
        if(!imageFormats.includes(imageFormat)){
            return res.status(400).json({result: [], message: "Invalid file format"});
        }
        uploadPath = path.join(__dirname, "../", "storage/", `${image.name}`);
        // Use the mv() method to place the file somewhere on your server
        image.mv(uploadPath, async function(err) {
            if (err){
                return res.status(500).json({result:[], message: `Error uploading file: ${err.message}`});
            }
            const newNameImage = await renameFileStorage(image.name);
            req.body.image = newNameImage;
            next();
        });
    }catch(error){
        res.status(500).json({result:[], message: `Error uploading file: ${error.message}`});
    }
}
module.exports = {uploadFile}