const FileService = require("../services/FileService");
const UserService = require("../services/UserService");
const ProductService = require("../services/ProductService");
const fileSystem = require("fs");
const path = require("path");

module.exports.upload = async (req, res, next) => {
  let file = req.files.file;
  let fileType = req.params.type;
  let fileExtension = req.extension;
  let user = req.user;
  let uploadFile, userUpdated, fileName;

  if (fileType === "user") {
    let userId = req.params.id;

    if (req.params.id !== user._id) {
      await res.status(500).json({ message: "Access denied" });
      return next();
    }

    fileName = await FileService.createFileName(userId, fileExtension);
    uploadFile = await UserService.uploadFile(userId, fileName, file);
    userUpdated = await UserService.updatedFile(userId, fileName);

    if (!uploadFile || !userUpdated) {
      await res.status(400).json({ message: "Error uploading user file" });
      return next();
    }
  }

  if (fileType === "product") {
    let productId = req.params.id;

    fileName = await FileService.createFileName(productId, fileExtension);
    uploadFile = await ProductService.uploadFile(productId, fileName, file);
    productUpdated = await ProductService.updatedFile(
      productId,
      fileName,
      file
    );

    if (!uploadFile || !productUpdated) {
      await res.status(400).json({ message: "Error uploading product file" });
      return next();
    }
  }

  res.json({ message: "File uploaded" });
};

module.exports.file = async (req, res, next) => {
  let fileType = req.params.type;
  let fileId = req.params.id;

  let pathFile = path.resolve(__dirname, `../uploads/${fileType}/${fileId}`);

  let noImagePath = path.resolve(__dirname, "../../src/assets/img/no-image.jpg");

  if(fileSystem.existsSync(pathFile)){
    res.sendFile(pathFile);
  }

  res.sendFile(noImagePath);
};
