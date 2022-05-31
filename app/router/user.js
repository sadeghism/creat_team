const { UserController } = require("../http/controller/user.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { validationImage } = require("../http/validation/user");
const { multerFile, addressFileForUpload } = require("../module/multer");

const router = require("express").Router();
const resultAddress = addressFileForUpload(__dirname , ".." , "..",".." , "public", "upload" ,"img");

router.get("/profile", autoLogin, UserController.getProfile);
router.post("/profile", autoLogin, UserController.editProfile);
router.post(
  "/profile_image",
  multerFile(resultAddress , "img").single("image"),
  autoLogin,
  validationImage(),
  expressValidatorMapper,
  UserController.uploadImageProfile
);

module.exports = {
  userRouter: router,
};
