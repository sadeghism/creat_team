const { param } = require("express-validator");
function mongoIdValidation() {
  return [param("id").isMongoId().withMessage("شناسه ی ورودی معتبر نمیباشد")];
}
module.exports = {
  mongoIdValidation,
};
