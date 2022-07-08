const { Schema, model, Types } = require("mongoose");
const Project = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, default: "/default/default.png" },
    owner: { type: Types.ObjectId, required: true },
    private: { type: Boolean, default: true },
    tags:{Types:[String]}
  },
  {
    timestamps: true,
  }
);
const ProjectModel = model("project", Project);
module.exports = {
  ProjectModel,
};
