document.addEventListener("DOMContentLoaded", function () {
  // Function to create a countdown timer
  function createCountdownTimer() {
    var countdownInput = document.createElement("div");
    countdownInput.classList.add("countdown-input");

    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("timer-name");
    nameInput.placeholder = "Timer Name";

    var dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.classList.add("date-input");

    var timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.classList.add("time-input");

    var startButton = document.createElement("button");
    startButton.innerText = "Start Countdown";
    startButton.classList.add("start-button");
    startButton.addEventListener("click", startCountdown);

    var countdownOutput = document.createElement("p");
    countdownOutput.classList.add("countdown-output");

    countdownInput.appendChild(nameInput);
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
    var nameInput = countdownInput.querySelector(".timer-name");
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

    // Display the timer name
    countdownOutput.textContent = nameInput.value;
  }

  // Function to update the countdown
  function updateCountdown(targetDate, countdownOutput) {
    // Code for updating the countdown (same as before)
    // ...
  }

  // Add event listener to the "Add Timer" button
  var addTimerButton = document.getElementById("add-timer-button");
  addTimerButton.addEventListener("click", createCountdownTimer);
});
