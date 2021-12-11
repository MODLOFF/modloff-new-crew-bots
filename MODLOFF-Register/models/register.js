const mongoose = require('mongoose');

let reg = mongoose.Schema({
    guildID: String,
    userID: String,
    Name: String,
    Sex: String,
    Date: Number,
    Man: { type: Number, default: 0 },
    Woman: { type: Number, default: 0 },
    Total: { type: Number, default: 0 },
    tagMode: Boolean,
    nameMode: Boolean,
})

module.exports = mongoose.model("register", reg)