$(document).ready(function() {
const welcomeContainer = $("#welcomeContainer");
const formContainer = $("#formContainer");
formContainer.hide();


  $("#exerciseType").mouseleave(function() {
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
  });

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

  $("#complete").on("click", function(){
    location.reload();
    // formContainer.hide();
    // welcomeContainer.show();
  })

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
});
