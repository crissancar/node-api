// const userController = require("../controllers/userController");
const fileSystem = require("fs");
const path = require("path");

module.exports.deleteOldFile = (fileType, oldFile) => {
  let pathFile = path.resolve(__dirname, `../uploads/${fileType}/${oldFile}`);

  if (fileSystem.existsSync(pathFile)) {
    fileSystem.unlinkSync(pathFile);
  }
};

module.exports.createFileName = (id, fileExtension) => {
  let fileName = `${id}-${new Date().getMilliseconds()}.${fileExtension}`;

  return fileName;
};

module.exports.saveFileInDirectory = async (fileType, fileName, file) => {
  try {
    await file.mv(`src/uploads/${fileType}/${fileName}`);
  } catch (error) {
    return error;
  }
};
