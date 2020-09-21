const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
    summary: String,
    stepsToReproduce: String,
    expectedResults: String,
    actualResults: String
});


module.exports = mongoose.model("Bug", BugSchema);