const { UserModel } = require("../../model/userModel");
const { createLink } = require("../../module/functions");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image = req.protocol + createLink(req, user.profile_image);
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
  async getAllInvite(req, res, next) {
    try {
      const userId = req.user._id;
      const { inviteRequests } = await UserModel.findById(userId, {
        inviteRequests: 1,
      });
      if (inviteRequests.length === 0)
        throw { status: 404, message: "هیچ در خواستی برای شما وجود ندارد" };
      return res.status(200).json({
        request: inviteRequests,
      });
    } catch (error) {
      next(error);
    }
  }
  async statusInviteRequest(req, res, next) {
    try {
      const { status } = req.params;
      const userId = req.user._id;
      const inviteRequests = await UserModel.aggregate([
        { $match: { _id: userId } },
        {
          $project: {
            _id: 0,
            inviteRequests: 1,
            inviteRequests: {
              $filter: {
                input: "$inviteRequests",
                as: "request",
                cond: {
                  $eq: ["$$request.status", status],
                },
              },
            },
          },
        },
      ]);
      return res.status(200).json({
        status: 200,
        success: true,
        request: inviteRequests,
      });
    } catch (error) {
      next(error);
    }
  }
  async changeStatus(req, res, next) {
    try {
      const { id, status } = req.params;
      const request = await UserModel.findOne({ "inviteRequests._id": id });
      if (!request)
        throw { status: 404, message: "درخواستی با این مشخصات پیدا نشد" };
      const findRequest = request.inviteRequests.find((item) => item._id == id);
      if (!["accepted", "rejected"].includes(status))
        throw { status: 400, message: "اطلاعات درخواست درست نمی باشد" };
      if (findRequest.status !== "pending")
        throw { status: 400, message: "درخواست قبلا رد یا پذیرفته شده است" };
      const result = await UserModel.updateOne(
        { "inviteRequests._id": id },
        {
          $set: { "initeRequest.$.status": status },
        }
      );
      if (result.modifiedCount === 0)
        throw {
          status: 500,
          message: "خطایی در رد یا قبول درخواست به وجود آمد",
        };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "درخواست با رد یا قبول شد",
      });
    } catch (error) {
      next(error);
    }
  }
  addSkill(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  editSkill(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
