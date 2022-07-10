const { Schema, model, Types } = require("mongoose");
const Teams = new Schema({
  name: { type: String, required: true },
  idName: { type: String, required: true, unique: true },
  description: { type: String },
  users: { type: [Types.ObjectId], default: [] },
  owner: { type: Types.ObjectId, required: true },
});

const TeamsModel = model("team", Teams);
module.exports = {
  TeamsModel,
};
