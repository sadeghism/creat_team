const router = require("express").Router();
const { TeamController } = require("../http/controller/team.controller");
const { autoLogin } = require("../http/middleware/autoLogin");
const { teamValidatoin } = require("../http/validation/team");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkErrorValidator");
const { mongoIdValidation } = require("../http/validation/public");

router.post(
  "/creat",
  autoLogin,
  teamValidatoin(),
  expressValidatorMapper,
  TeamController.creatTeam
);

router.get("/list-teams", autoLogin, TeamController.getAllTeam);
router.get("/me", autoLogin, TeamController.getMyTeam);
router.get(
  "/:id",
  autoLogin,
  mongoIdValidation,
  expressValidatorMapper,
  TeamController.getTeamById
);
router.get(
  "/remov-team/:id",
  autoLogin,
  mongoIdValidation,
  expressValidatorMapper,
  TeamController.removeTeamById
);
module.exports = {
  teamRouter: router,
};
