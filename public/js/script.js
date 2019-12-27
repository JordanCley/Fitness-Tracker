$(document).ready(function() {
  // SELECTION OF CONTAINERS FOR HIDE AND SHOW
  const welcomeContainer = $("#welcomeContainer");
  const formContainer = $("#formContainer");
  const bottomForm = $("#bottomForm");

  // GETTING UTC STAMPS VIA GETSESSIONS CONVERTING TO DATESTRING
  getTimestamps = item => {
    let date = new Date(item.createdAt);
    return date.toDateString();
  };

  // GETTING ALL EXERCISES FOR EACH SESSION VIA GETSESSIONS
  getExercises = item => {
    return item.exercises;
  };

  // addDuration = item => {
  //   let sum = 0;
  //   let duration = item.duration;
  //   console.log(duration)
  //   return sum += duration;

  // SHOWING BOTTOM FORM
  showForm = () => {
    bottomForm.show(300);
  };

  // GET REQUEST FUNCTION GETTING SESSION DATA AND HANDLING
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
      // CHECKING IF THERE IS ANY DATA FIRST
      if (sessionArray.length != 0) {
        let length = sessionArray.length;

        // CHECKING IF THERE ARE LESS THAN 5 SESSIONS
        // IF LESS THAN 5 SESSIONS 
        if (sessionArray.length <= 5) {
          for (let i = 0; i < length; i++) {
            chartSessions.push(sessionArray.pop());
          }
          // MORE THAN 5 SESSION RUN FOLLOWING CODE
        } else {
          for (let i = 0; i < 5; i++) {
            chartSessions.push(sessionArray.pop());
          }
        }

        // MAPPING THROUGH LATEST SESSIONS GETTING TIMESTAMPS
        // AND EXERCISES FOR EACH ONE
        sessionExercises = chartSessions.map(getExercises);
        timeStamps = chartSessions.map(getTimestamps);

        // LOOPING THROUGH SESSIONS AND EXH SESSION EXERCISES
        // AND ADDING TOTAL DURATION OF EXERCISES PER SESSION
        let durationArray = [];
        for(let i = 0;i < sessionExercises.length; i++){
          let sum = 0;
          for(let j = 0;j < sessionExercises[i].length; j++){
            sum += sessionExercises[i][j].duration;
          }
          durationArray.push(sum);
        }

        // SETTING DATA FOR WELCOME CONTAINER TO CONSTANTS
        const lastSession = chartSessions[0];
        const date = new Date(lastSession.createdAt).toLocaleString();
        const numExercises = lastSession.exercises.length;
        const exerciseArray = lastSession.exercises;

        // LOOPING THROUGH LAST SESSIONS EXERCISES AND
        // ADDING TOTAL MINUTES OF DURATION FOR ALL
        // ALSO GETTING ALL NAMES OF EXERCISES WITH DURATION FOR EACH
        let exerciseNames = [];
        let exerciseDurations = [];
        for (let i = 0; i < exerciseArray.length; i++) {
          let name = exerciseArray[i].name;
          let duration = exerciseArray[i].duration;
          exerciseDurations.push(duration);
          exerciseNames.push(name);
          sum += duration;
        }

         // PASSING DATA TO CHARTS FOR DISPLAY
         charts(timeStamps, durationArray, exerciseNames, exerciseDurations);

        // INSERTING DATA INTO WELCOM CONTAINER
        $("#sessionDate").text(` ${date}`);
        $("#totalDuration").text(` ${sum} minutes`);
        $("#numExercises").text(` ${numExercises}`);
      }
    });
  };

  // HIDING AND SHOWING APPROPRIATE INPUTS
  showInputs = () => {
    const exerciseType = $("#exerciseType").val();
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

  // EVENT TO CALL SHOWINPUTS FUNCTION
  exerciseTypeEvent = () => {
    $("#exerciseType")
      .mouseleave(showInputs)
      .click(showForm);
  };

  // EVENT TO CREATE A SESSION FROM CREATE BUTTON
  createSessionEvent = () => {
    $("#createSessionBtn").on("click", function() {
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

  // APPLYING EVENTS TO WORKOUT FORM
  workoutExcerciseForm = () => {
    // CLICK EVENT TO RELOAD PAGE ON COMPLETE
    $("#complete").on("click", function() {
      location.reload();
    });

    // SUBMIT EVENT FOR WORKOUT FORM
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

  // ==============================
  //       <<<  CHARTS  >>>
  // ==============================

  // CHARTS FUNCTION
  charts = (timeStamps, durationArray, exerciseNames, exerciseDurations) => {
    Chart.defaults.global.defaultFontColor = "#FFFFFF";
    Chart.defaults.global.defaultFontSize = 16;

    const myChart = $("#myChart");
    const durationChart = new Chart(myChart, {
      type: "bar",
      data: {
        labels: timeStamps,
        datasets: [
          {
            label: "Recent Session Durations In Minutes",
            data: durationArray,
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
            hoverBackgroundColor: "#c98e26"
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
        labels: exerciseNames,
        datasets: [
          {
            label: "Duration In Minutes",
            data: exerciseDurations,
            backgroundColor: [
              "#2bbfcc",
              "#296369",
              "#033a40",
              "#86ecf7",
              "#637d80"
            ],
            borderWidth: 2,
            borderColor: "#FFFFFF",
            hoverBorderWidth: 4,
            hoverBackgroundColor: "#c98e26"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Latest Session Exercises Performed",
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
