const { UserController } = require("../http/controller/user.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { multerValidation } = require("../http/validation/multerValidation");
const { validaitonProject } = require("../http/validation/project");
const { multerFile, addressFileForUpload } = require("../module/multer");

const router = require("express").Router();
const resultAddress = addressFileForUpload(__dirname , ".." , "..",".." , "public", "upload" ,"img");

router.get("/profile", autoLogin, UserController.getProfile);
router.post("/profile", autoLogin, UserController.editProfile);
router.post(
  "/profile_image",
  multerFile(resultAddress , "img").single("image"),
  autoLogin,
  multerValidation(),
  validaitonProject(),
  expressValidatorMapper,
  UserController.uploadImageProfile
);
router.get("/request" , autoLogin , UserController.getAllInvite)
module.exports = {
  userRouter: router,
};
