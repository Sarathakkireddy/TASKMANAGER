const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
});
const accountModel = mongoose.model("accounts", accountSchema);

module.exports = accountModel;
