const path = require("path");
const fs = require("fs");

const multer = require("multer");
const uuid = require("short-uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const addressFile = path.join(__dirname, "..", "..", "public", "uploads","img");
    fs.mkdirSync(addressFile, { recursive: true });
    const imageAdress = path.join("public", "uploads", "img");
    cb(null, imageAdress);
  },
  filename: (req, file, cb) => {
    const typeIMage = path.extname(file.originalname);
    const shortId = uuid();
    cb(null, String(shortId.new() + typeIMage));
  },
});
const upload = multer({ storage });
module.exports = {
  upload,
};
