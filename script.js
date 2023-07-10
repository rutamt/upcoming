varcountdownTimers = [];
document.addEventListener("DOMContentLoaded", function () {

  // Load countdown timers from local storage
  function loadCountdownTimers() {
    var savedCountdowns = localStorage.getItem("countdownTimers");

    if (savedCountdowns) {
      countdownTimers = JSON.parse(savedCountdowns);

      // Clear the countdown form
      var countdownForm = document.getElementById("countdown-form");
      countdownForm.innerHTML = "";

      countdownTimers.forEach(function (countdown) {
        createCountdownTimer(countdown.name, countdown.date, countdown.time);
      });
    }
  }

  // Save countdown timers to local storage
  function saveCountdownTimers() {
    localStorage.setItem("countdownTimers", JSON.stringify(countdownTimers));
  }

  // Function to create a countdown timer
  function createCountdownTimer(name = "", date = "", time = "") {
    var countdownInput = document.createElement("div");
    countdownInput.classList.add("countdown-input");
    countdownInput.setAttribute("data-index", countdownTimers.length); // Assign unique index

    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("timer-name");
    nameInput.placeholder = "Timer Name";
    nameInput.value = name;

    var dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.classList.add("date-input");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();
    var minDate = yyyy + '-' + mm + '-' + dd;
    dateInput.setAttribute("min", minDate);
    dateInput.value = date;

    var timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.classList.add("time-input");
    timeInput.value = time;

    var saveButton = document.createElement("button");
    saveButton.innerText = "Start Timer";
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", function () {
      saveTimer(countdownInput);
      startCountdown(countdownInput);
    });

    var closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", function () {
      closeCountdown(countdownInput);
    });

    countdownInput.appendChild(closeButton);
    var countdownOutput = document.createElement("p");
    countdownOutput.classList.add("countdown-output");

    countdownInput.appendChild(nameInput);
    countdownInput.appendChild(dateInput);
    countdownInput.appendChild(timeInput);
    countdownInput.appendChild(saveButton);
    countdownInput.appendChild(countdownOutput);

    var countdownForm = document.getElementById("countdown-form");
    countdownForm.appendChild(countdownInput);

    // Store the countdown in the array
    countdownTimers.push({
      name: nameInput.value,
      date: dateInput.value,
      time: timeInput.value,
      countdownOutput: countdownOutput,
      intervalId: null
    });
  }

  // Save the countdown timer in local storage
  function saveTimer(countdownInput) {
    var nameInput = countdownInput.querySelector(".timer-name");
    var dateInput = countdownInput.querySelector(".date-input");
    var timeInput = countdownInput.querySelector(".time-input");

    // Update the countdown timer in the array
    var index = Array.from(countdownInput.parentElement.children).indexOf(countdownInput);
    countdownTimers[index].name = nameInput.value;
    countdownTimers[index].date = dateInput.value;
    countdownTimers[index].time = timeInput.value;

    // Save countdown timers to local storage
    saveCountdownTimers();
  }

  // Function to start the countdown for a specific input section
  function startCountdown(countdownInput) {
    var nameInput = countdownInput.querySelector(".timer-name").value;
    var dateInput = countdownInput.querySelector(".date-input");
    var timeInput = countdownInput.querySelector(".time-input");
    var countdownOutput = countdownInput.querySelector(".countdown-output");

    var targetDate = new Date(dateInput.value + "T" + timeInput.value).getTime();

    // Clear any previous countdown interval
    clearInterval(countdownInput.intervalId);

    // Update the countdown immediately
    updateCountdown(targetDate, countdownOutput, nameInput);

    // Update the countdown every second
    countdownInput.intervalId = setInterval(function () {
      updateCountdown(targetDate, countdownOutput, nameInput);
    }, 1000);
  }


  // Function to update the countdown  
  function updateCountdown(targetDate, countdownOutput, name) {
    var currentDate = new Date().getTime();
    var timeDifference = targetDate - currentDate;

    if (timeDifference > 0) {
      var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownOutput.textContent = name + " " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    } else {
      countdownOutput.textContent = "Countdown Complete!";
    }
  }

  // Load countdown timers from local storage
  loadCountdownTimers();

  // Add event listener to the "Add Timer" button
  var addTimerButton = document.getElementById("add-timer-button");
  addTimerButton.addEventListener("click", function () {
    createCountdownTimer();
  });


  function closeCountdown(countdownInput) {
    var index = Array.from(countdownInput.parentNode.children).indexOf(countdownInput);
    countdownInput.parentNode.removeChild(countdownInput);
    countdownTimers.splice(index, 1);

    // Save updated countdown timers to local storage
    saveCountdownTimers();
  }

  // Function to save countdown timers to local storage
  function saveCountdownTimers() {
    localStorage.setItem("countdownTimers", JSON.stringify(countdownTimers));
  }

});
