const router = require("express").Router();
const { TeamController } = require("../http/controller/team.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const { teamValidatoin } = require("../http/validation/team");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");

router.post(
  "/creat",
  autoLogin,
  teamValidatoin(),
  expressValidatorMapper,
  TeamController.creatTeam
);

module.exports = {
  teamRouter: router,
};
