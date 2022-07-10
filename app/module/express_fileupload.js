const fileUpload = require("express-fileupload");
const path = require("path");
const uuid = require("short-uuid");
const uploadFile = async (req, res, next) => {
  try {
    if (req.files === null)
      throw { status: 400, message: "عکس شاخصی برای پروژه ی خود انتخاب کنید" };
    let image = req.files.image;
    const shortId = uuid();
    const type = path.extname(image.name)
    if(![".png", ".jpej"].includes(type)) throw {status:400 , message:"فرمت درست انتخاب کنید"}
    const imageAdress = path.join(
      "public",
      "uploads",
      "img",
      "project",
      shortId.new() + type
    );
    req.body.image = imageAdress.substring(7);
    let addressFile = path.join(__dirname, "..", "..", imageAdress);
    image.mv(addressFile, (err) => {
      if (err) throw { status: 500, message: "خطایی در آپلود عکس رخ داده است" };
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};
