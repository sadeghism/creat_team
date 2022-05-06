const { AuthController } = require("../http/controller/auth.controller");
const { expressValidatorMapper } = require("../http/middleware/checkErrorValidator");
const { registerValidation } = require("../http/validation/auth");

const router = require("express").Router();

router.post("/register",registerValidation() , expressValidatorMapper , AuthController.register)

module.exports = {
  authRouter: router,
};
