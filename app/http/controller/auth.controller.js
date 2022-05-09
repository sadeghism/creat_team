const {validationResult} = require('express-validator');
const { expressValidatorMapper } = require('../middleware/checkErrorValidator');
class AuthController {
  register(req, res, next) {
    const { username, mobile, email, password } = req.body;
    return res.json(req.body);
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
