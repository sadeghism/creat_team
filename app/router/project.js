const { ProjectController } = require("../http/controller/project.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { validaitonProject } = require("../http/validation/project");

const router = require("express").Router();

router.post(
  "/creat",
  autoLogin,
  validaitonProject(),
  expressValidatorMapper,
  ProjectController.creatProject
);

module.exports = {
  projectRouter: router,
};
