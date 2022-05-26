const { UserModel } = require("../../model/userModel");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
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
        // console.log(data);
        if (!kayForEditProfile.includes(kay)) delete data[kay];
        if (badValue.includes(value)) delete data[kay];
        // console.log(data);
      });
      let validationSkill;
      if (data.skills) {
        if (data.skills.length == 0) delete data.skills;
        data.skills.forEach((e) => {
          validationSkill = badValue.includes(e);
          console.log(validationSkill);
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
  addSkill() {}
  editSkill() {}
  acceptInvitInTeam() {}
  rejectInvitInTeam() {}
}

module.exports = {
  UserController: new UserController(),
};
