const { ProjectModel } = require("../../model/projectModel");

class ProjectController {
  async creatProject(req, res, next) {
    try {
      const { title, text } = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({ title, text, owner });
      if (!result)
        throw { status: 400, message: "ساخت پروژه با مشکل مواجه شد" };
      return res.status(201).json({
        status: 201,
        message: "پروژه با موفقیت ساخته شد",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProject(req, res, next) {
    try {
      const result = await ProjectModel.find();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "لیست پروژه ها",
        result,
      });
    } catch (error) {
      next(error)
    }
  }
  getAllProjectOfTeam() {}
  getProjectById() {}
  getAllProjectOfUser() {}
  removeProject() {}
  updateProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
