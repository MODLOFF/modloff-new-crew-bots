const mongoose = require("mongoose")

const Root_sunucu = new mongoose.Schema({
   guild: String,
   ihlal: Number
})

module.exports = mongoose.model("Root_sunucu", Root_sunucu)