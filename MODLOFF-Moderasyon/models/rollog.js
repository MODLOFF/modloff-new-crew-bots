const mongoose = require("mongoose");

module.exports = mongoose.model("Root_roller", new mongoose.Schema({
    user: String, 
    roller: Array
}));
