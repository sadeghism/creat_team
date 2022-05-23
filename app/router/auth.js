const { AuthController } = require("../http/controller/auth.controller");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const {
  registerValidation,
  loginValidaitons,
} = require("../http/validation/auth");

const router = require("express").Router();

router.post(
  "/register",
  registerValidation(),
  expressValidatorMapper,
  AuthController.register
);
router.post(
  "/login",
  loginValidaitons(),
  expressValidatorMapper,
  AuthController.login
);
module.exports = {
  authRouter: router,
};
