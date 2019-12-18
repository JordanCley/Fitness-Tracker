$(document).ready(function() {
  const welcomeContainer = $("#welcomeContainer");
  const formContainer = $("#formContainer");
  const bottomForm = $("#bottomForm");
  formContainer.hide();
  bottomForm.hide();

  getSessions = () => {
    $.ajax({
      method: "GET",
      url: "/api/user/session"
    }).then(data => {
      const lastSession = data.sessions.pop();
      const date = new Date(lastSession.createdAt).toString();
      const numExercises = lastSession.exercises.length;
      const exerciseArray = lastSession.exercises;
      let sum = 0;
      for (let i = 0; i < exerciseArray.length; i++) {
        let duration = exerciseArray[i].duration;
        sum += duration;
      }
      console.log(sum);
      $("#sessionDate").text(`Date: ${date}`);
      $("#totalDuration").text(`Total Duration: ${sum} minutes`);
      $("#numExercises").text(`Total Number Of Exercises: ${numExercises}`);
      // console.log(lastSession);
      console.log(date);
      console.log(numExercises);
    });
  };

  showInputs = () => {
    const exerciseType = $("#exerciseType").val();
    console.log(exerciseType);
    const reps = $("#reps");
    const weight = $("#weight");
    const repLabel = $("#repLabel");
    const weightLabel = $("#weightLabel");
    const distance = $("#distance");
    const distanceLabel = $("#distanceLabel");
    if (exerciseType === "cardio") {
      reps.hide();
      repLabel.hide();
      weight.hide();
      weightLabel.hide();
      distance.show();
      distanceLabel.show();
    } else {
      reps.show();
      repLabel.show();
      weight.show();
      weightLabel.show();
      distance.hide();
      distanceLabel.hide();
    }
  };

  showForm = () => {
    bottomForm.show();
  };

  $("#exerciseType")
    .mouseleave(showInputs)
    .click(showForm);

  $("#createSession").on("click", function() {
    event.stopPropagation();
    welcomeContainer.hide();
    formContainer.show();
    $.ajax({
      data: { test: "dumby data" },
      url: "/api/session/new",
      method: "POST"
    }).then(function(data) {});
  });

  $("#complete").on("click", function() {
    location.reload();
    // formContainer.hide();
    // welcomeContainer.show();
  });

  $("#workoutForm").on("submit", function() {
    event.preventDefault();
    const reps = $("#reps").val();
    const weight = $("#weight").val();
    const duration = $("#duration").val();
    const distance = $("#distance").val();
    const type = $("#exerciseType").val();
    const name = $("#exerciseName").val();
    $("#reps").val("");
    $("#weight").val("");
    $("#distance").val("");
    $("#duration").val("");
    $("#exerciseName").val("");
    console.log(type, name, reps, weight, duration);
    $.ajax({
      data: {
        type: type,
        name: name,
        reps: reps,
        weight: weight,
        duration: duration,
        distance: distance
      },
      url: "/api/exercise/new",
      method: "POST"
    }).then(function(data) {});
  });

  getSessions();
});
