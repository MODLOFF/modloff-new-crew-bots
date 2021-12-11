const mongoose = require("mongoose");

module.exports = mongoose.model("Root_uyarılar", new mongoose.Schema({
   user: String,
   uyarılar: Array,
}));