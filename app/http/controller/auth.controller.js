const {validationResult} = require('express-validator');
const { expressValidatorMapper } = require('../middleware/checkErrorValidator');
class AuthController {
  register(req, res, next) {
    const { username, mobile, email, password } = req.body;
    const result = validationResult(req);
    return res.json(result);
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
