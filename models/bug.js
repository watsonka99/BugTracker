const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
    summary: String,
    stepsToReproduce: String,
    expectedResults: String,
    actualResults: String,
    Severity: String,
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reported: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Bug", BugSchema);