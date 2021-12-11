const mongoose = require("mongoose");

module.exports = mongoose.model("Root_extramute", new mongoose.Schema({
    user: String, 
    array: Array
}));