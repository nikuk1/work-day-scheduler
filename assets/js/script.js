// Display current day with jquery and use moment to format
$("#currentDay").append(moment().format('dddd, MMMM Do'));

// function to save tasks to local storage
$(".saveBtn").on('click', function (event) {
    // grab the text from the textarea div with class 'description'
    var newTask = $(this).prev(".description").val();
    // console.log(newTask)
    // find the id value associated with textarea div
    var time = $(this).siblings(".description").attr("id")
    // console.log(time)
    //local storage set
    localStorage.setItem(time, newTask);    
});

//function to load tasks onto page upon refresh from localStorage
var loadTasks = function(time) {
        // store Value variable from corresponding Key
        var retrieve = localStorage.getItem(time);
        // console.log(retrieve);
        // retrieve value at key: time
        $("#" + time).val(retrieve);
}

// function to color code tasks
var colorTask = function(i) {

    // create string variable representing time for each time block
    var hourString = $("#row" + i).find("h6").html();
    //turn that time into a date object
    var hourObject = moment(hourString, "HHA");
    // military hour format
    var taskHour = hourObject.format("HH");
    var now = moment().format("HH");
    //find respective textarea
    var coloredArea = $("#row" + i).find("textarea");
    //find difference between the task hour and current time
    var difference = now - taskHour;

    // console.log(taskHour);
    // console.log(now);
    // console.log(difference);

    // Conditional statements to color the rows
    if (now === taskHour) {
        coloredArea.removeClass("past future");
        coloredArea.addClass("present");
    } else if (difference > 0) {
        coloredArea.removeClass("future present");
        coloredArea.addClass("past");
    } else if (difference < 0){
        coloredArea.removeClass("past present");
        coloredArea.addClass("future");
    } 
// }
};


// FUNCTION CALLS
//check time and reformat every 10 minutes
setInterval(function() {
    for (var i = 1; i < 11; i++) {
        colorTask(i);
    }
}, 100000);

//call function loadtasks - i max value will be 1 more than number of time rows. 
for (var i = 1; i < 11; i++) {
    loadTasks("hour" + i);

    //iterate through this loop 9 times to color codeach task item
    colorTask(i);
  }

  //Problems
        // colorTask function does not work