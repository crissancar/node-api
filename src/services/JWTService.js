const jwt = require("jsonwebtoken");

module.exports.create = async (user) => {
  let token = await jwt.sign(
    {
      user,
    },
    process.env.TOKEN_SEED,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
  
  return token;
};