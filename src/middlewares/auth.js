const jwt = require("jsonwebtoken");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");


module.exports.checkUserToken = async (req, res, next) => {
  let token = req.get("Authorization");

  try {
    let decodedToken = await jwt.verify(token, process.env.TOKEN_SEED);
    req.user = decodedToken.user
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports.checkUserRole = (req, res, next) => {
  let token = req.get("Authorization");
  let decodedToken = jwt.decode(token);
  let user = decodedToken.user;

  if (!user.role.match("ADMIN_ROLE")) {
    return res.status(401).json({ error: "User is not admin" });
  }

  next();
};