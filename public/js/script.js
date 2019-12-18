$(document).ready(function() {
  const welcomeContainer = $("#welcomeContainer");
  const formContainer = $("#formContainer");
  const bottomForm = $("#bottomForm");

  getTimestamps = item => {
    let date = new Date(item.createdAt);
    return date.toDateString();
  };

  getExercises = item => {
    // console.log(item.exercises)
    return item.exercises;
  };

  // addDuration = item => {
  //   let sum = 0;
  //   let duration = item.duration;
  //   console.log(duration)
  //   return sum += duration;
  // };

  showForm = () => {
    bottomForm.show(300);
  };

  getSessions = () => {
    $.ajax({
      method: "GET",
      url: "/api/user/session"
    }).then(data => {
      let sum = 0;
      let timeStamps = [];
      let chartSessions = [];
      let sessionExercises = {};
      const sessionArray = data.sessions;
      if (sessionArray.length != 0) {
        // console.log(sessionArray)
        // console.log(sessionArray.length)
        // console.log(sessionArray)
        // console.log(sessionArray.length)
        let length = sessionArray.length;
        if (sessionArray.length <= 5) {
          for (let i = 0; i < length; i++) {
            chartSessions.push(sessionArray.pop());
          }
        } else {
          for (let i = 0; i < 5; i++) {
            chartSessions.push(sessionArray.pop());
          }
        }

        console.log(chartSessions);
        sessionExercises = chartSessions.map(getExercises);
        timeStamps = chartSessions.map(getTimestamps);
        charts(timeStamps, sessionExercises);
        const lastSession = chartSessions[0];

        const date = new Date(lastSession.createdAt).toString();
        const numExercises = lastSession.exercises.length;
        const exerciseArray = lastSession.exercises;

        for (let i = 0; i < exerciseArray.length; i++) {
          let duration = exerciseArray[i].duration;
          sum += duration;
        }

        $("#sessionDate").text(`Date: ${date}`);
        $("#totalDuration").text(`Total Duration: ${sum} minutes`);
        $("#numExercises").text(`Total Number Of Exercises: ${numExercises}`);
      }
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
      reps.hide(100);
      repLabel.hide(100);
      weight.hide(100);
      weightLabel.hide(100);
      distance.show(100);
      distanceLabel.show(100);
    } else {
      reps.show(100);
      repLabel.show(100);
      weight.show(100);
      weightLabel.show(100);
      distance.hide(100);
      distanceLabel.hide(100);
    }
  };

  exerciseTypeEvent = () => {
    $("#exerciseType")
      .mouseleave(showInputs)
      .click(showForm);
  };

  createSessionEvent = () => {
    $("#createSession").on("click", function() {
      event.stopPropagation();
      welcomeContainer.hide(200);
      formContainer.show(100);
      $.ajax({
        data: { test: "dumby data" },
        url: "/api/session/new",
        method: "POST"
      }).then(function(data) {});
    });
  };

  workoutExcerciseForm = () => {
    $("#complete").on("click", function() {
      location.reload();
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
  };

  charts = timeStamps => {
    Chart.defaults.global.defaultFontColor = "#FFFFFF";
    Chart.defaults.global.defaultFontSize = 16;

    const myChart = $("#myChart");
    const durationChart = new Chart(myChart, {
      type: "bar",
      data: {
        labels: timeStamps,
        datasets: [
          {
            label: "Duration In Minutes",
            data: [22, 11, 10, 9],
            backgroundColor: [
              "#2bbfcc",
              "#2bbfcc",
              "#2bbfcc",
              "#2bbfcc",
              "#2bbfcc"
            ],
            borderWidth: 2,
            borderColor: "#FFFFFF",
            hoverBorderWidth: 4,
            hoverBackgroundColor: "#FFFFFF"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Recent Workout Sessions",
          fontSize: 18
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                color: "#FFFFFF"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                color: "#FFFFFF"
              }
            }
          ]
        }
      }
    });

    const pieChart = $("#pieChart");
    const exerciseChart = new Chart(pieChart, {
      type: "pie",
      data: {
        labels: [
          "Tue Dec 17 2019",
          "Tue Dec 17 2019",
          "Tue Dec 17 2019",
          "Tue Dec 17 2019",
          "Tue Dec 17 2019"
        ],
        datasets: [
          {
            label: "Duration In Minutes",
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
              "#2b36cc",
              "#a80505",
              "#108709",
              "#55057a",
              "#e3eb15"
            ],
            borderWidth: 2,
            borderColor: "#FFFFFF",
            hoverBorderWidth: 4,
            hoverBackgroundColor: "#FFFFFF"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Exercises Performed",
          fontSize: 18
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                color: "#FFFFFF"
              }
            }
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                color: "#FFFFFF"
              }
            }
          ]
        }
      }
    });
  };

  init = () => {
    getSessions();
    exerciseTypeEvent();
    createSessionEvent();
    workoutExcerciseForm();
    formContainer.hide(100);
    bottomForm.hide(100);
  };

  init();
});
