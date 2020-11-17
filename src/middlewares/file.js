module.exports.validateFileExtension = (req, res, next) => {
  let validExtensions = ["jpg", "png"];

  if (!req.files) {
    return res.status(400).json({ message: "No files selected" });
  }

  let file = req.files.file;
  let splitFileExtension = file.name.split(".");
  let fileExtension = splitFileExtension[splitFileExtension.length - 1];

  if (validExtensions.indexOf(fileExtension) < 0) {
    return res.status(400).json({ message: "File extension is not valid" });
  }

  req.extension = fileExtension;

  next();
};

module.exports.validateFileType = (req, res, next) => {
  let validTypes = ["user", "product"];

  if (!req.params.type) {
    return res.status(400).json({ message: "No arguments" });
  }

  let fileType = req.params.type;

  if (validTypes.indexOf(fileType) < 0) {
    return res.status(400).json({ message: "File type is not valid" });
  }

  next();
};
