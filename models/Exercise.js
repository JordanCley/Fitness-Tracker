const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String,
    reps: Number,
    weight: Number,
    duration: Number,
    distance: Number,
    isTypeCardio: false 
});

ExerciseSchema.methods.setIsCardio = function() {
    return this.isTypeCardio = true;
};

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;