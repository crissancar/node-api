const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWTService = require("../services/JWTService");
const _ = require("underscore");

exports.users = async (req, res) => {

  let from = Number(req.query.from || 0);
  let to = Number(req.query.to || 5);

  try {
    const users = await User.find({}, "name email").skip(from).limit(to);
    const count = await User.countDocuments();
    res.json({ count, users });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.user = async (req, res) => {

  userId = req.params.id;

  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "User not exists",
      error,
    });
  }
};

exports.register = async (req, res) => {

  const user = new User(req.body);
  user.password = await bcrypt.hash(req.body.password, 12);

  try {
    await user.save();
    res.json({
      user,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.update = async (req, res) => {

  const userId = req.params.id;
  const body = _.pick(req.body, ["name", "email", "img", "role", "active"]);

  try {
    const user = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json({
      user,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  
  const userId = req.params.id;

  try {
    await User.findByIdAndRemove(userId);
    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "User not found",
      error,
    });
  }
};

exports.auth = async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  
  if (!user) {
    await res.status(401).json({ message: "User not exist" });
    return next();
  }

  if (!bcrypt.compareSync(password, user.password)) {
    await res.status(401).json({ message: "User or password incorrect" });
    return next();
  }

  let token = JWTService.create(user);

  res.json({
    user,
    token,
  });
};