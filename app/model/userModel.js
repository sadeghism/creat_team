const { Schema, model, Types } = require("mongoose");

const inviteRequestsUser = new Schema({
  teamId: { type: Types.ObjectId, required: true },
  caller: { type: String, required: true, lowercase: true },
  requireDate: { type: Date, default: new Date() },
  status: { type: String, default: "pending" }, //pending , rejected , accepted
});

const User = new Schema(
  {
    firts_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    profile_image: { type: String },
    password: { type: String, required: true },
    rols: { type: [String], default: ["USER"] },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    token: { type: String, default: "" },
    inviteRequests: { type: [inviteRequestsUser] },
  },
  {
    timestamps: true,
  }
);



const UserModel = model("user", User);
module.exports = {
  UserModel,
};
