const { ProjectController } = require("../http/controller/project.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { validaitonProject } = require("../http/validation/project");
const { uploadFile } = require("../module/express_fileupload");
const fileUpload = require("express-fileupload");
const { mongoIdValidation } = require("../http/validation/public");

const router = require("express").Router();
router.get("/projects", autoLogin, ProjectController.getAllProject);
router.get(
  "/:id",
  autoLogin,
  mongoIdValidation(),
  expressValidatorMapper,
  ProjectController.getProjectById
);
router.post(
  "/creat",
  autoLogin,
  fileUpload(),
  validaitonProject(),
  expressValidatorMapper,
  uploadFile,
  ProjectController.creatProject
);
router.post("/delet/:id", autoLogin, ProjectController.deleltProject);
router.put("/edit/:id" ,autoLogin , ProjectController.updateProject);
router.patch("/edit-image/:id",autoLogin , fileUpload(),expressValidatorMapper ,ProjectController.updateImage)
module.exports = {
  projectRouter: router,
};
