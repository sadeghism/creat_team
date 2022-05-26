const { UserController } = require("../http/controller/user.controller");
const { autoLogin } = require("../http/middleware/autoLogin");

const router = require("express").Router();

router.get("/profile" , autoLogin ,UserController.getProfile)
router.post("/profile" , autoLogin ,UserController.editProfile)


module.exports = {
  userRouter: router,
};
