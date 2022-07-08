const { ProjectController } = require("../http/controller/project.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { multerValidation } = require("../http/validation/multerValidation");
const { validaitonProject } = require("../http/validation/project");
const { uploadFile } = require("../module/express_fileupload");
const fileUpload = require('express-fileupload');

const router = require("express").Router();

router.post(
  "/creat",
  autoLogin,
  fileUpload(),
  validaitonProject(),
  expressValidatorMapper,
  uploadFile,
  ProjectController.creatProject
);

module.exports = {
  projectRouter: router,
};
