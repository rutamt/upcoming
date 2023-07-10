

// List stored in localstorage that keeps track of timers
var tempCountdowns = []
var countdowns = localStorage.getItem('countdowns');
// Function to create a countdown timer
function createCountdownTimer(date = "", time = "", name = "") {
  var countdownInput = document.createElement("div");
  countdownInput.classList.add("countdown-input");
  var countdownBox = document.createElement("div");
  countdownBox.classList.add("countdown-box");
  countdownBox.classList.add("countdown-timer");

  var editButton = document.createElement("button");
  editButton.innerText = "Edit Countdown";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", function () {
    editCountdown(countdownInput);
  });
  countdownInput.appendChild(editButton);

  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add("timer-name");
  nameInput.placeholder = "Timer Name";
  if (name) { nameInput.value = name; }

  var dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("date-input");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  var minDate = yyyy + '-' + mm + '-' + dd;
  dateInput.setAttribute("min", minDate);
  if (date) { dateInput.value = date; }

  var timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.classList.add("time-input");
  if (time) { timeInput.value = time; }

  var startButton = document.createElement("button");
  startButton.innerText = "Start Countdown";
  startButton.classList.add("start-button");
  startButton.addEventListener("click", startCountdown);

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCountdown(countdownInput);
  });

  if (time && date && name) {
    startCountdown;
  }
  var countdownOutput = document.createElement("h1");
  countdownOutput.classList.add("countdown-output");

  var countdownName = document.createElement("p");
  countdownName.classList.add("countdown-name");

  countdownInput.appendChild(nameInput);
  countdownInput.appendChild(dateInput);
  countdownInput.appendChild(timeInput);
  countdownInput.appendChild(startButton);
  countdownInput.appendChild(countdownOutput);
  countdownInput.appendChild(countdownName);
  countdownBox.appendChild(countdownInput);
  countdownInput.appendChild(deleteButton);

  var countdownForm = document.getElementById("countdown-form");
  countdownForm.appendChild(countdownInput);
}

function editCountdown(countdownInput) {
  var nameInput = countdownInput.querySelector(".timer-name");
  var dateInput = countdownInput.querySelector(".date-input");
  var timeInput = countdownInput.querySelector(".time-input");
  var startButton = countdownInput.querySelector(".start-button");

  nameInput.style.display = "block";
  dateInput.style.display = "block";
  timeInput.style.display = "block";
  startButton.style.display = "block";
}

// Function to start the countdown for a specific input section
function startCountdown(event) {
  var countdownInput = event.target.parentNode;
  var nameInput = countdownInput.querySelector(".timer-name").value;
  var dateInput = countdownInput.querySelector(".date-input").value;
  var timeInput = countdownInput.querySelector(".time-input").value;
  var nameOutput = countdownInput.querySelector(".countdown-name");
  var countdownOutput = countdownInput.querySelector(".countdown-output");

  if (nameInput && dateInput && timeInput) {
    var targetDate = new Date(dateInput + "T" + timeInput).getTime();

    // Clear any previous countdown interval
    clearInterval(countdownInput.intervalId);

    // Appending the countdown to the array of countdowns
    tempCountdowns.push([dateInput, timeInput, nameInput]);

    // Update localstorage
    updateLocalStorage();

    // Hide the inputs
    countdownInput.querySelector(".timer-name").style.display = "none";
    countdownInput.querySelector(".date-input").style.display = "none";
    countdownInput.querySelector(".time-input").style.display = "none";
    countdownInput.querySelector(".start-button").style.display = "none";

    // Update the countdown immediately
    updateCountdown(targetDate, countdownOutput, nameInput, nameOutput);

    // Update the countdown every second
    countdownInput.intervalId = setInterval(function () {
      updateCountdown(targetDate, countdownOutput, nameInput, nameOutput);
    }, 1000);
  } else {
    alert("Please fill in all the values");
  }
}



// Function to update the countdown
function updateCountdown(targetDate, countdownOutput, name, nameOut) {
  var currentDate = new Date().getTime();
  var timeDifference = targetDate - currentDate;

  if (timeDifference > 0) {
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    nameOut.innerText = name;
    countdownOutput.textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  } else {
    countdownOutput.textContent = "Countdown Complete!";

    // Trigger confetti
    const canvas = document.getElementById('your_custom_canvas_id')
    const jsConfetti = new JSConfetti(canvas);
    jsConfetti.addConfetti();

    // Play the notification sound
    var notificationSound = document.getElementById("notificationSound");
    notificationSound.play();

    // Stop confetti and audio after 3 seconds (adjust the duration as needed)
    setTimeout(function () {
      jsConfetti.clearCanvas();
      notificationSound.pause();
      notificationSound.currentTime = 0;
    }, 3000);
  }
}

function deleteCountdown(countdownInput) {
  var countdownForm = document.getElementById("countdown-form");
  var index = Array.from(countdownForm.children).indexOf(countdownInput);

  // Remove the countdown from the tempCountdowns array
  tempCountdowns.splice(index, 1);

  // Update local storage
  updateLocalStorage();

  // Remove the HTML element
  countdownForm.removeChild(countdownInput);
}

function updateLocalStorage() {
  localStorage.setItem('countdowns', JSON.stringify(tempCountdowns));
}
// Add event listener to the "Add Timer" button
var addTimerButton = document.getElementById("add-timer-button");
addTimerButton.addEventListener("click", createCountdownTimer);

// Content to do when the page loads 
document.addEventListener("DOMContentLoaded", function () {
  var DOMcountDowns = JSON.parse(localStorage.getItem("countdowns"));
  if (DOMcountDowns != null) {
    tempCountdowns = DOMcountDowns;
    for (var i = 0; i < DOMcountDowns.length; i++) {
      createCountdownTimer(DOMcountDowns[i][0], DOMcountDowns[i][1], DOMcountDowns[i][2]);
    }
  }
});


// Clearing all timers
var clearButton = document.getElementById("clear-timer-button");
clearButton.addEventListener("click", function (e) { //e => event
  if (!confirm("Do you really want to do this?")) {
    e.preventDefault(); // ! => don't want to do this
  } else {
    //want to do this! => maybe do something about it?
    localStorage.clear();
    alert("Cleared all countdowns");
    location.reload();
  }
});