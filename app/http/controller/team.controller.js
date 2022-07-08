const { TeamsModel } = require("../../model/teamModel");

class TeamController {
  async creatTeam(req, res, next) {}
  async inviteUserById() {}
  async removeTeamById() {}
  async updateTeam() {}
  async removeUserOfTeam() {}
}

module.exports = {
  TeamController: new TeamController(),
};
