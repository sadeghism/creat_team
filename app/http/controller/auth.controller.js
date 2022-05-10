const {validationResult} = require('express-validator');
const { UserModel } = require('../../model/userModel');
const { hashPassword } = require('../../module/functions');
class AuthController {
  register(req, res, next) {
    const { username, mobile, email, password } = req.body;
    const result = await UserModel.create({username , email , mobile , password:hashPassword(password)});
    return res.json(result);
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
