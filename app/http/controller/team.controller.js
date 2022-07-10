const { TeamsModel } = require("../../model/teamModel");

class TeamController {
  async creatTeam(req, res, next) {
    try {
      const { name, description, idName } = req.body;
      const owner = req.user._id;
      const team = await TeamsModel.create({
        name,
        description,
        idName,
        owner,
      });
      if (!team) throw { status: 500, message: "ایجاد تیم با مشکل مواجه شده" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "تیم با موففیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllTeam(req, res, next) {
    try {
      const allTeam = await TeamsModel.find();
      return res.status(200).json({
        status: 200,
        success: true,
        allTeam,
      });
    } catch (error) {
      next(error);
    }
  }
  async inviteUserById(req, res, next) {}
  async removeTeamById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateTeam(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeUserOfTeam(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  TeamController: new TeamController(),
};
