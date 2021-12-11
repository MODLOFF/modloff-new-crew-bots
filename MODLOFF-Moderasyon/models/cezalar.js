const mongoose = require("mongoose")

const Root_cezalar = new mongoose.Schema({
    user: String,
    ihlal: Number,
    yetkili: String,
    ceza: String,
    tarih: String,
    bitiş: String,
    sebep: String
})

module.exports = mongoose.model("Root_cezalar", Root_cezalar)