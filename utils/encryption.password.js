const bcrypt = require("bcryptjs");

const getHash = async (textPlainPassword)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(textPlainPassword, salt);
        return hash;
    }catch(error){
        throw new Error(`Error generating hash: ${error.message}`);
    }
}

const comparePasswords = async (textPlainPassword, hash)=>{
    try{
        return await bcrypt.compare(textPlainPassword, hash)
    }catch(error){
        throw new Error(`Error comparing passwords: ${error.message}`);
    }
}

module.exports = {getHash, comparePasswords}