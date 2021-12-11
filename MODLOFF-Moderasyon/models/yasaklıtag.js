const mongoose = require("mongoose");

module.exports = mongoose.model("Root_yasaklıtag", new mongoose.Schema({
    guild: String,
  taglar: Array
}));