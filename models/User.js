const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: "Your First name is required."
    },

    lastname: {
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
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password must be more than 6 characters."]
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

const User = mongoose.model("User", UserSchema);

module.exports = User;