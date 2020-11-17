const userController = require("../controllers/userController");
const FileService = require("../services/FileService");

module.exports.updatedFile = async (userId, fileName) => {
  let oldUser = await userController.userById(userId);
  let updatedUser = await userController.image(oldUser, fileName);
  console.log(userId);

  console.log(oldUser);
//   console.log(updatedUser);

  return updatedUser;
};

module.exports.uploadFile = async (userId, fileName, file) => {
  let fileType = "user";
  let user = await userController.userById(userId);
  let oldFile = user.img;

  await FileService.deleteOldFile(fileType, oldFile);

  await FileService.saveFileInDirectory(fileType, fileName, file);

  return true;
};
