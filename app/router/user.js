const { UserController } = require("../http/controller/user.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { validationImage } = require("../http/validation/user");
const { upload } = require("../module/multer");

const router = require("express").Router();

router.get("/profile", autoLogin, UserController.getProfile);
router.post("/profile", autoLogin, UserController.editProfile);
router.post(
  "/profile_image",
  upload.single("image"),
  autoLogin,
  validationImage(),
  expressValidatorMapper,
  UserController.uploadImageProfile
);

module.exports = {
  userRouter: router,
};
