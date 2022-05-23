const { validationResult } = require("express-validator");
const { UserModel } = require("../../model/userModel");
const { hashPassword, tokenGenerator } = require("../../module/functions");
const bcrypt = require("bcrypt");
class AuthController {
  async register(req, res, next) {
    try {
      const { username, mobile, email, password } = req.body;
      const result = await UserModel.create({
        username,
        email,
        mobile,
        password: hashPassword(password),
      });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      const comparPassword = bcrypt.compareSync(password, user.password);
      if (!comparPassword)
        throw {
          status: 401,
          message: "تام کاربری یا رمز عبور اشتباه وارد شده است",
        };
      const token = tokenGenerator({ username });
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ورود موفقیت آمیز بود",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
