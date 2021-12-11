const mongoose = require("mongoose");

module.exports = mongoose.model("Root_kayıt", new mongoose.Schema({
   guildId: String,
   userId: String,
   totalRegister: Number,
   womanRegister: Number,
   manRegister: Number,
   kayıtlar: Array,
   userNames: { type: Array, default: [] }
}));