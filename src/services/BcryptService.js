const bcrypt = require("bcrypt");

module.exports.hash = async(password) => {
    let hashedPassword = await bcrypt.hash(":)", 12)

    return hashedPassword;
}