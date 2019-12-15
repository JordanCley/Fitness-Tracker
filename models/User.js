const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: "Your First name is required."
    },

    lastName: {
        type: String,
        trim: true,
        required: "Your Last name is required."
    },

    username: {
        type: String,
        trim: true,
        required: "Username is required."
    },

    password: {
        type: String,
        trim: true
      },

    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Session"
        }
    ] 
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);

module.exports = User;