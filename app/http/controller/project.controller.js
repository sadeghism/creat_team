const { ProjectModel } = require("../../model/projectModel");
const fs = require("fs");
const autoBind = require("auto-bind");
class ProjectController {
  constructor() {
    autoBind(this);
  }
  async creatProject(req, res, next) {
    try {
      const { title, text, image } = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({ title, text, owner, image });
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
      const owner = req.user._id;
      const result = await ProjectModel.find({ owner });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "لیست پروژه ها",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async findeProject(ProjectId, owner) {
    const project = await ProjectModel.find({ owner, _id: ProjectId });
    if (!project) throw { status: 404, message: "چنین پروژه ایی وجود ندارد" };
    return project;
  }
  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      const project = await this.findeProject(projectId, owner);
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleltProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      await this.findeProject(projectId, owner);
      const deleltProject = await ProjectModel.deleteOne({
        owner,
        _id: projectId,
      });
      if (deleltProject.deletedCount == 0)
        throw { status: 400, message: "حذف پروژه با مشکل مواجه شد" };
      return res.status(200).json({
        status: 200,
        message: "پروژه حذف شد",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      await this.findeProject(projectId, owner);
      const data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!["title", "text", "tag"].includes(key)) delete data[key];
        if (["", " ", null, undefined, NaN].includes(value)) delete data[key];
        if (data[key] === "tags" && data[key].constructor === Array) {
          data["tags"] = data[tags].filter((e) => {
            if (!["title", "text", "tag"].includes(e)) return e;
          });
        }
        if (data["tags"].length === 0) delete data["tags"];
      });
      const updateProject = await ProjectModel.updateOne(
        { _id: projectId },
        { $set: data }
      );
      if (updateProject.modifiedCount == 0)
        throw { status: 400, message: "آپدیت انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "بروزرسانی انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateImage(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      const { image } = req.body;
      await this.findeProject(projectId, owner);
      const updateImage = await ProjectModel.updateOne(
        { _id: projectId },
        { $set: image }
      );
      if (updateImage.matchedCount === 0)
        throw { status: 400, message: "بروزرسانی انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "بروزرسانی انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  getAllProjectOfTeam(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getAllProjectOfUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProjectController: new ProjectController(),
};
