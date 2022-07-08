const { body } = require("express-validator");

function validaitonProject() {
  return [
    body("title").notEmpty().withMessage("فیلد نمی تواند خالی باشد"),
    body("text")
      .notEmpty()
      .isLength({ min: 30 })
      .withMessage("نمی تواند کاراکتر کمتر از 30 حرف باشد"),
    body("tags")
      .isLength({ min: 0, max: 10 })
      .withMessage("تعداد حداکثر تگ ها بیتشر از 10 تا نمیتواند باشد"),
  ];
}

module.exports = {
  validaitonProject,
};
