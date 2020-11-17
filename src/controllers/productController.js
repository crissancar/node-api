const Product = require("../models/Product");
const _ = require("underscore");

module.exports.products = async (req, res) => {
  let from = Number(req.query.from || 0);
  let to = Number(req.query.to || 5);

  try {
    let products = await Product.find({})
      .populate("user", "name email")
      .populate("category", "name description")
      .skip(from)
      .limit(to);
    let count = await Product.countDocuments();
    res.json({ count, products });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.product = async (req, res) => {
  let productId = req.params.id;

  try {
    let product = await Product.findById(productId)
      .populate("user", "name email")
      .populate("category", "name description");
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.productById = async (id) => {
  let productId = id;

  try {
    let product = await Product.findById(productId);
    return product;
  } catch (error) {
    return error;
  }
};

module.exports.create = async (req, res) => {
  let product = new Product(req.body);
  product.user = req.user._id;

  try {
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.update = async (req, res) => {
  let productId = req.params.id;

  try {
    let product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: "Product not exists", error });
  }
};
module.exports.delete = async (req, res) => {
  let productId = req.params.id;

  try {
    await Product.findByIdAndRemove(productId);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Product not exists", error });
  }
};

module.exports.search = async (req, res) => {
  let term = req.params.term;
  let regExp = new RegExp(term, 'i');

  let products = await Product.find({ name: regExp })
    .populate("category","name");

  res.json(products);
};

exports.image = async (product, fileName) => {
  product.img = fileName;
  const body = _.pick(product, ["img"]);

  try {
    let updatedProduct = await Product.findByIdAndUpdate(product._id, body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    return updatedProduct;
  } catch (error) {
    return error;
  }
};