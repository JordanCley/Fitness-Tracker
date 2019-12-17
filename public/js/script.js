$(document).ready(function() {
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

  $("#workoutForm").on("submit", function() {
    event.preventDefault();
    const type = $("#exerciseType").val();
    const name = $("#exerciseName").val();
    const reps = $("#reps").val();
    const weight = $("#weight").val();
    const duration = $("#duration").val();
    const distance = $("#distance").val();
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
      url: "/api/session/new",
      method: "POST"
    }).then(function(data) {
    });
  });
});
