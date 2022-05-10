const {validationResult} = require('express-validator');
const { UserModel } = require('../../model/userModel');
const { hashPassword } = require('../../module/functions');
const { expressValidatorMapper } = require('../middleware/checkErrorValidator');
class AuthController {
  register(req, res, next) {
    const { username, mobile, email, password } = req.body;
<<<<<<< HEAD
    const result = await UserModel.create({username , email , mobile , password:hashPassword(password)});
=======
    const result = await UserModel.create({username , email , mobile , password:hashPassword});
>>>>>>> 10c24b02385c3832e989816f375e83c8e0890282
    return res.json(result);
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
