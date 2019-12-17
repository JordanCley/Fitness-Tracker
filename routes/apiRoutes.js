const router = require("express").Router();
const db = require("../models");
// const passport = require("passport");
// const middleware = require("../middleware");

router.post("/session/new", function(req, res) {
  let newExercise = {};
  const name = req.body.name;
  const reps = req.body.reps;
  const weight = req.body.weight;
  const duration = req.body.duration;
  const distance = req.body.distance;
  let type = false;
  if (req.body.type === "cardio") {
    type = true;
    newExercise = {
      type: type,
      name: name,
      duration: duration,
      distance: distance
    };
  } else {
    newExercise = {
      type: type,
      name: name,
      reps: reps,
      weight: weight,
      duration: duration
    };
  }

  const user = req.user._id;
  db.Exercise.create(newExercise, function(err, createdExercise) {
    if (err) {
      console.log(err);
    } else {
      db.Session.create({ user: user }, function(err, createdSession) {
        const sessionId = createdSession._id;
        if (err) {
          console.log(err);
        } else {
          db.User.findByIdAndUpdate(
            user,
            { $push: { sessions: sessionId } },
            function(err, updatedUser) {
              if (err) {
                console.log(err);
              } else {
                db.Session.findByIdAndUpdate(
                  sessionId,
                  { $push: { exercises: createdSession._id } },
                  function(err, updatedSession) {
                    if (err) {
                      console.log(err);
                    } else {
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
});



module.exports = router;
