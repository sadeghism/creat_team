const path = require("path");
const fs = require("fs");

const multer = require("multer");
const uuid = require("short-uuid");

function addressFileForUpload(...addressFileUpload){
  return path.join(...addressFileUpload)
}

function multerFile(addressFileUpload, endFile) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const addressFile = addressFileUpload;
      fs.mkdirSync(addressFile, { recursive: true });
      const imageAdress = path.join("public", "uploads", endFile);
      cb(null, imageAdress);
    },
    filename: (req, file, cb) => {
      const typeIMage = path.extname(file.originalname);
      const shortId = uuid();
      cb(null, String(shortId.new() + typeIMage));
    },
  });
  const upload = multer({ storage });
  return upload;
}
module.exports = {
  multerFile,
  addressFileForUpload
};
