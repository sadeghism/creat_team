const { Schema, model, Types } = require("mongoose");
const User = new Schema(
  {
    firts_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rols: { type: [String], default: ["USER"] },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    token: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", User);
module.exports = {
  UserModel,
};
