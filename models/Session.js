const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],
    duration: Number
},{timestamps: true});

const Session = mongoose.model("Session", SessionSchema);
 module.exports = Session;