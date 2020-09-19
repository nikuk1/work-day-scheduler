// This is a javascript file
// This is the array to hold my task objects
var buttonEl = document.querySelector("#button");
var tasks = [];
var text1 = document.createElement("li");
var tasksToDoEl = document.querySelector("#hour1")


//General click event setup

// $(".saveBtn").on('click', function (event) {}




// Display the current day at the top of the page
$("#currentDay").append(moment().format('dddd, MMMM Do'));

// populates textareas with respective tasks from local storage
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if local storage is null, recreate the array to hold tasks
    if (!tasks) {
        tasks = [];
    }

    // Loop through our saved tasks and assign text to proper textareas
    for (i = 0; i < tasks.length; i++) {
        // Grab the id of each object in tasks array
        var taskId = tasks[i].identifier;
        // Find the textarea with the same id
        var test = $("#" + taskId);
        // Set the textarea to the saved task text
        test.val(tasks[i].text);
    }
};

// Function to save tasks to local storage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

// I need to create a function to save the shiz to local storage
$(".description").on("click", ".saveBtn", function() {
    // Grab the text from the task input
    newTask = $(this).prev();
    taskId = newTask.attr("id");
    
    tasks.push({
        text: newTask.val().trim(),
        identifier: taskId
    });

    saveTasks();
});

// Function to color-code my tasks
var colorTask = function() {
    //iterate through this loop 9 times to check status of each task time
    for (i = 1; i < 10; i++){
    // get string representing time for each time block
    var hourString = $("#row" + i).find("h6").html();
    // Turn this time into a date object
    var hourObject = moment(hourString, "HHA");
    // format so it only displays military hours
    var taskHour = hourObject.format("HH");

    var now = moment().format("HH");
    // Create a reference for the textarea to be colored
    var coloredArea = $("#row" + i).find("textarea");
    // Find the difference between the task hour and the current time
    var difference = now - taskHour;

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
}
};

// Check task statuses every 5 minutes
setInterval(function() {
    colorTask();
}, 60000);

loadTasks();
colorTask();