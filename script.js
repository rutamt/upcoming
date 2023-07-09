var targetDate

function getDate() {
  targetDateTemp = document.getElementById("my-date").value;
  myTime = document.getElementById("my-time").value;
  console.log(myTime)

  targetDate = `${targetDateTemp} ${myTime}`
  // Use the selectedDate for further processing
  console.log(targetDate);
  if (targetDateTemp && myTime) {
    // Update the countdown immediately
    updateCountdown();
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
  }
  else {
    // Display an error message or perform any other action
    alert("Please fill out both date and time inputs.");
  }
}

// Function to update countdown
function updateCountdown() {
  var currentDate = new Date().getTime();
  targetDate = new Date(targetDate).getTime();

  var timeDifference = targetDate - currentDate;
  console.log(timeDifference);
  if (timeDifference > 0) {
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the countdown element
    document.getElementById("countdown").textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }
  else {
    document.getElementById("countdown").textContent = "Countdown Complete!";
  }
}

// Set the minimum date as today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();
var minDate = yyyy + '-' + mm + '-' + dd;
document.getElementById("my-date").setAttribute("min", minDate);