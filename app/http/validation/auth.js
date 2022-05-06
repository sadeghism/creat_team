const { body } = require("express-validator");

function registerValidation() {
  return [
    body("username").custom((value, ctx) => {
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(value)) {
          return true;
        }
        throw "نام کاربری اشتباه میباشد";
      }
      throw "نام کاربری نمیتواند خالی باشد";
    }),
    body("email").isEmail().withMessage("ایمیل وارد شده درست نمیباشد"),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل وارد شده صحیح نمیباشد"),
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
