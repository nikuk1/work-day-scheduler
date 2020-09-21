// This is a javascript file
// This is the array to hold my task objects
var buttonEl = document.querySelector("#button");
var tasks = [];
var text1 = document.createElement("li");
var tasksToDoEl = document.querySelector("#hour1")

// Display current day and use moment to format
$("#currentDay").append(moment().format('dddd, MMMM Do'));

// Function to save tasks to local storage
$(".saveBtn").on('click', function (event) {
    // Grab the text from the task input
   var newTask = $(this).prev(".description").val();
   console.log(newTask)
   var time = $(this).siblings(".description").attr("id")
   console.log(time)
localStorage.setItem(time, newTask);    
});

// for (var i = 1; i < 10; i++) {
//     loadTasks("hour" + i);
//   }

// $( ".inner" ).append( "<p>Test</p>" );

var loadTasks = function(time) {
        var retrieve = localStorage.getItem(time);
        console.log(retrieve);
        // store the value of all time slots in an array in 'tasks'
        tasks = [retrieve];
        console.log(tasks);
        //attempting to print entered content back to page
        $("#" + time).siblings(".description").val(retrieve);

        //to continue loop and not get stuck by setting that localstorage value to null
        // if (localStorage == null) {
        //     localStorage.setItem();
        //  }
    }
    // create new element with jQuery
    // add localstorage value to the element
    // append the element to the page
    // given hour1 use jquery to find the textarea of the item we want to append to
    // "#" + time will be the jquery selector, will give the element(s) that match the selector
    // use jquery's relation such as sibling hour1.sibling.textarea 
    // #hour1.append     // append the element to the page

      


// var masterList;

// window.onload = function(){
//   masterList = JSON.parse(localStorage.getItem('masterList')); //get data from storage
//   if (masterList !== null) { //if data exist (todos are in storage)
//     masterList.forEach(function(v){ //append each element into the dom
//       var task = v;
//       var entry = document.createElement('li'); //2
//       var list = document.getElementById('orderedList'); //2
//       entry.appendChild(document.createTextNode(task)); //2
//       list.appendChild(entry); //2
//     })
//   } else { //if nothing exist in storage, keep todos array empty
//     masterList = [];
//   }
// }



// populates textareas with respective tasks from local storage
// var loadTasks = function() {

//     localStorage.getItem();
//     // tasks = JSON.parse(localStorage.getItem("tasks"));

//     // if local storage is null, recreate the array to hold tasks
//     if (!tasks) {
//         tasks = [];
//     }

//     // Loop through our saved tasks and assign text to proper textareas
//     for (i = 0; i < tasks.length; i++) {
//         // Grab the id of each object in tasks array
//         var taskId = tasks[i].identifier;
//         // Find the textarea with the same id
//         var test = $("#" + taskId);
//         // Set the textarea to the saved task text
//         test.val(tasks[i].text);
//     }
// };

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

for (var i = 1; i < 10; i++) {
    loadTasks("hour" + i);
  }
colorTask();
