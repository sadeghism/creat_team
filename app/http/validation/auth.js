const { body } = require("express-validator");
const { UserModel } = require("../../model/userModel");

function registerValidation() {
  return [
    body("username").custom(async (username, ctx) => {
      if (username) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (!usernameRegex.test(username)) {
          const existUsername = await UserModel.findOne({ username });
          if (existUsername) throw "نام کاربری موجود میباشد";
          return true;
        }
        throw "نام کاربری اشتباه میباشد";
      }
      throw "نام کاربری نمیتواند خالی باشد";
    }),
    body("email")
      .isEmail()
      .withMessage("ایمیل وارد شده درست نمیباشد")
      .custom(async (email) => {
        const existEmail = await UserModel.findOne({ email });
        if (existEmail) throw "ایمل قبلا ثبت شده است";
        return true;
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل وارد شده صحیح نمیباشد")
      .custom(async (mobile) => {
        const existMobile = await UserModel.findOne({ mobile });
        if (existMobile) throw "شماره موبایل تکراری میباشد";
        return true;
      }),
    body("password")
      .isLength({ min: 6, max: 64 })
      .withMessage("حداکثر 64 کاراکتر و حداقل 6 کاراکتر")
      .custom((value, ctx) => {
        if (!value) throw "پسوورد نمیتواند خالی باشد";
        if (value !== ctx?.req?.body?.confirm_password)
          throw "رمز عبور با تکرار آن با هم مغایرت ندارند";
        return true;
      }),
  ];
}

module.exports = {
  registerValidation,
};
