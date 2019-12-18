const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
