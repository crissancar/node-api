const bcrypt = require("bcrypt");

module.exports.hash = async(password) => {
    let hashedPassword = await bcrypt.hash(":)", 12)

    return hashedPassword;
}

module.exports.compare = async(password, userPassword) => {
    let passwordMatch = await bcrypt.compareSync(password, userPassword);
    
    return passwordMatch;
}