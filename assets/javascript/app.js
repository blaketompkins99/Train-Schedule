var config = {
    apiKey: "AIzaSyDtGlbiTHMJaTLT6PWEuTvx16HnaOubDb0",
    authDomain: "nbatrainschedule.firebaseapp.com",
    databaseURL: "https://nbatrainschedule.firebaseio.com",
    projectId: "nbatrainschedule",
    storageBucket: "nbatrainschedule.appspot.com",
    messagingSenderId: "1045915598377",
    appId: "1:1045915598377:web:c03edcdc239241f2386638"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

$("#thunderDepart").append(moment('2016-03-12 13:00:00').add(24, 'hours').format('LLL'));

$("#addTrain").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#nameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainTime = $("#timeInput").val().trim();
    var trainFreq = $("#frequencyInput").val().trim();
    var nextTrain = moment().startOf('trainTime').fromNow();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFreq,
        next : nextTrain
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    console.log(newTrain.next);

    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = parseInt(childSnapshot.val().frequency);
    var nextTrain = childSnapshot.val().next;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFreq);
    console.log(nextTrain);

    var timeFormat = moment(trainTime).format('LT');

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(timeFormat),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain)
    );

    // Append the new row to the table
    $("#chooChoo > tbody").append(newRow);
});

