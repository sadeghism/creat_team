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
  async getTeamById(req, res, next) {
    try {
      const idTeam = req.params.id;
      const result = await TeamsModel.findById(idTeam);
      if (!result) throw { status: 404, message: "همچین تیمی وجود ندارد" };
      return res.status(200).json({
        status: 200,
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeam(req, res, next) {
    try {
      const userId = req.user._id;
      const result = await TeamsModel.find({
        $or: [{ owner: userId }, { users: userId }],
      });
      if (!result)
        throw { status: 404, message: "شما در هیچ تیمی عضو نمی باشید" };
      return res.status(200).json({
        status: 200,
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async inviteUserById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeTeamById(req, res, next) {
    try {
      const teamId = req.params.id;
      const existTeam = await TeamsModel.findOne({ _id: teamId });
      if (!existTeam) throw { status: 404, message: "تیمی یافت نشد" };
      const result = await TeamsModel.deleteOne({ _id: teamId });
      if (result.deletedCount === 0)
        throw { status: 500, message: "خطایی رخ داده است" };
      return res.status(200).json({
        status: 200,
        success: true,
        result,
      });
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
