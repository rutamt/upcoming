// Function to create a countdown timer
function createCountdownTimer() {
  var countdownInput = document.createElement("div");
  countdownInput.classList.add("countdown-input");

  var dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("date-input");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  var minDate = yyyy + '-' + mm + '-' + dd;
  dateInput.setAttribute("min", minDate);



  var timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.classList.add("time-input");

  var startButton = document.createElement("button");
  startButton.innerText = "Start Countdown";
  startButton.classList.add("start-button");
  startButton.addEventListener("click", startCountdown);

  var countdownOutput = document.createElement("p");
  countdownOutput.classList.add("countdown-output");

  countdownInput.appendChild(dateInput);
  countdownInput.appendChild(timeInput);
  countdownInput.appendChild(startButton);
  countdownInput.appendChild(countdownOutput);

  var countdownForm = document.getElementById("countdown-form");
  countdownForm.appendChild(countdownInput);
}

// Function to start the countdown for a specific input section
function startCountdown(event) {
  var countdownInput = event.target.parentNode;
  var dateInput = countdownInput.querySelector(".date-input");
  var timeInput = countdownInput.querySelector(".time-input");
  var countdownOutput = countdownInput.querySelector(".countdown-output");

  var targetDate = new Date(dateInput.value + "T" + timeInput.value).getTime();

  // Clear any previous countdown interval
  clearInterval(countdownInput.intervalId);

  // Update the countdown immediately
  updateCountdown(targetDate, countdownOutput);

  // Update the countdown every second
  countdownInput.intervalId = setInterval(function () {
    updateCountdown(targetDate, countdownOutput);
  }, 1000);
}

// Function to update the countdown
function updateCountdown(targetDate, countdownOutput) {
  var currentDate = new Date().getTime();
  var timeDifference = targetDate - currentDate;

  if (timeDifference > 0) {
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownOutput.textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  } else {
    countdownOutput.textContent = "Countdown Complete!";
  }
}


function getDate() {
  var dateInput = document.getElementById("my-date");
  var timeInput = document.getElementById("my-time");
  var selectedDate = dateInput.value;
  var selectedTime = timeInput.value;
}

// Add event listener to the "Add Timer" button
var addTimerButton = document.getElementById("add-timer-button");
addTimerButton.addEventListener("click", createCountdownTimer);
