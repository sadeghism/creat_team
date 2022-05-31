const { body } = require("express-validator");

function validaitonProject() {
  return [
    body("title").notEmpty().withMessage("فیلد نمی تواند خالی باشد"),
    body("text")
      .notEmpty()
      .isLength({ min: 30 })
      .withMessage("نمی تواند کاراکتر کمتر از 30 حرف باشد"),
  ];
}

module.exports = {
  validaitonProject,
};
