const { UserModel } = require("../../model/userModel");
const { createLink } = require("../../module/functions");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image =
        req.protocol + createLink(req,user.profile_image)
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      const data = { ...req.body };
      const userId = req.user._id;
      const kayForEditProfile = ["firts_name", "last_name", "skills"];
      const badValue = ["", " ", NaN, null, undefined, {}, []];
      Object.entries(data).forEach(([kay, value]) => {
        if (!kayForEditProfile.includes(kay)) delete data[kay];
        if (badValue.includes(value)) delete data[kay];
      });
      let validationSkill;
      if (data.skills) {
        if (data.skills.length == 0) delete data.skills;
        data.skills.forEach((e) => {
          validationSkill = badValue.includes(e);
        });
        if (validationSkill) delete data.skills;
      }
      const result = await UserModel.updateOne({ _id: userId }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "آپدیت پروفایل انجام شد",
        });
      }
      throw "بروزرسانی پروفایل انجام نشد";
    } catch (error) {
      next(error);
    }
  }
  async uploadImageProfile(req, res, next) {
    try {
      const userID = req.user._id;
      const filePath = req.file?.path.substring(7);
      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      );
      if (result.modifiedCount == 0)
        throw { status: 400, message: "بروزرسانی انجام نشد" };
      return res.json({
        status: 200,
        message: "آپلود موفقیت آمیز بو",
      });
    } catch (error) {
      next(error);
    }
  }
  addSkill() {}
  editSkill() {}
  acceptInvitInTeam() {}
  rejectInvitInTeam() {}
}

module.exports = {
  UserController: new UserController(),
};
