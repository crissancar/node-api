const jwt = require("jsonwebtoken");

module.exports.create = (user) => {
  let token = jwt.sign(
    {
      user,
    },
    process.env.TOKEN_SEED,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
  
  return token;
};