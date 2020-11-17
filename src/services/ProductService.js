const productController = require("../controllers/productController");
const FileService = require("../services/FileService");

module.exports.updatedFile = async (productId, fileName) => {
  let oldProduct = await productController.productById(productId);
  let updatedProduct = await productController.image(oldProduct, fileName);

  return updatedProduct;
};

module.exports.uploadFile = async (productId, fileName, file) => {
  let fileType = "product";
  let product = await productController.productById(productId);
  let oldFile = product.img;

  await FileService.deleteOldFile(fileType, oldFile);

  await FileService.saveFileInDirectory(fileType, fileName, file);

  return true;
};