var config = {
    apiKey: "AIzaSyBqa5wlEPHt9kmWw2rpLftNtTv1CJT4zSA",
authDomain: "choo-choo-train-f76dd.firebaseapp.com",
databaseURL: "https://choo-choo-train-f76dd.firebaseio.com",
projectId: "choo-choo-train-f76dd",
storageBucket: "choo-choo-train-f76dd.appspot.com",
messagingSenderId: "82102735021"
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var TrainInput = "";
  var destinyInput = "";
  var dtimeInput = 0;
  var frequencyInput = "";

  // Capture Button Click
  $("#add-user").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
  TrainInput = $("#TrainInput").val().trim();
  destinyInput = $("#destinyInput").val().trim();
  dtimeInput = $("#dtimeInput").val().trim();
  frequencyInput = $("#frequencyInput").val().trim();

  var train = {

        TrainInput : TrainInput,
        destinyInput: destinyInput,
        dtimeInput: dtimeInput,
        frequencyInput: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  console.log(train);

  //   // Code for the push
    dataRef.ref().push(train);
  });

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  dataRef.ref().on("child_added", function(childSnapshot) {

  //   // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().TrainInput);
    console.log(childSnapshot.val().TrainInput);
    console.log(childSnapshot.val().destinyInput);
    console.log(childSnapshot.val().dtimeInput);
    console.log(childSnapshot.val().frequencyInput);
    console.log(childSnapshot.val().joinDate);

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#TrainInput-display").text(snapshot.val().TrainInput);
    $("#destinyInput-display").text(snapshot.val().destinyInput);
    $("#dtimeInput-display").text(snapshot.val().dtimeInput);
    $("#frequencyInput-display").text(snapshot.val().frequencyInput);
  });

  $("#add-user").on("click", function(event) {
        event.preventDefault();
  
      //set user input values to variables
      var  TrainInput= $("#TrainInput")
        .val()
        .trim();
      var  destinyInput= $("#destinyInput")
        .val()
        .trim();

      //converts user input to usable info
      var  dtimeInput= moment(
        $("#dtimeInput")
          .val()
          .trim(),
        "hh:mm"
      )
        .subtract(1, "years")
        .format("X");

      var frequencyInput = $("#frequencyInput")
        .val()
        .trim();

      //current time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      console.log(TrainInput);
      console.log(destinyInput);
      console.log(firstTime);
      console.log(dtimeInput);
      console.log(frequencyInput);

      //gathers together all our new train info
      var newTrain = {
        train: TrainInput,
        trainGoing: destinyInput,
        trainComing: dtimeInput,
        everyXMin: frequencyInput
      };

      //uploads newTrain to firebase
      database.ref().push(newTrain);
      //*push* adds to info already in firebase. *set* overwrites preexisting info

      //clears elements before adding new text
      $("#TrainInput").val("");
      $("#destinyInput").val("");
      $("#dtimeInput").val("");
      $("#frequencyInput").val("");
    });
    //figure out what this does
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      //store in variables
      var  TrainInput= childSnapshot.val().train;
      var  destinyInput= childSnapshot.val().trainGoing;
      var  dtimeInput= childSnapshot.val().trainComing;
      var  frequencyInput= childSnapshot.val().everyXMin;

              console.log(TrainInput);
              console.log(destinyInput);
              console.log(dtimeInput);
              console.log(frequencyInput);

      //makes first train time neater
      var dtimeInput = moment.unix(firstTime).format("hh:mm");
      //calculate difference between times
      var difference = moment().diff(moment(trainTime), "minutes");

      //time apart(remainder)
      var trainRemain = difference % frequency;

      //minutes until arrival
      var minUntil = frequency - trainRemain;

      //next arrival time
      var nextArrival = moment()
        .add(minUntil, "minutes")
        .format("hh:mm");

      //adding info to DOM table
      $("#recent-member").append(
        "<tr><td>" +
          trainName +
          "</td><td>" +
          destination +
          "</td><td>" +
          frequency +
          
          "</td><td>" +
          nextArrival +
          "</td><td>" +
          minUntil +
          "</td></tr>"
      );
    });