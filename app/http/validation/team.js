const { body } = require("express-validator");
const { TeamsModel } = require("../../model/teamModel");

function teamValidatoin() {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("نام نمی تواند کمتر از 3 کاراکتر باشد"),
    body("description").notEmpty().withMessage("توضیحات نمی تواند خالی باشد"),
    body("idName").custom(async (idName) => {
      if (idName.match(/^[a-z]+[a-z0-9\_\.]{3,}/)) {
        const team = await TeamsModel.findOne({ idName });
        if (team) throw "اسم تیم قبلاانتخاب شده است";
        return true;
      }
      throw "فرمت نام کاربری صحیح نمیباشد";
    }),
  ];
}

module.exports = {
  teamValidatoin,
};
