const { body } = require("express-validator");
const path = require("path");
const fs = require('fs');

function validationImage() {
  return [
    body("image").custom((image, { req }) => {
      if (!req.file) throw "عکسی انتخاب کنید";
      console.log(req.file);
      const ext = path.extname(req.file.originalname);
      const exts = [".png", ".jpg", ".gif"];
      const pathImage = path.join(__dirname , ".." , ".." , '..' , "public" , "uploads" , "img" ,`${req.file.path.substring(19)}` )
      if (!exts.includes(ext)) {
        fs.unlinkSync(pathImage)
        throw "پسوند اشتباهی انتخاب شده است"
      }
      if (req.file.size > 2 * 1024 * 1024){
        fs.unlinkSync(pathImage)
        throw "عکس انتخابی نمی تواند بیشتر از 2 مگابایت باشد";
      }
      return true;
    }),
  ];
}

module.exports = {
  validationImage,
};
