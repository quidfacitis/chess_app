const whiteTimer = () => {

  let buttonSymbol = document.querySelector(".white-play-stop-button").innerHTML;
  let buttonCode = buttonSymbol.charCodeAt(0);

  if (buttonCode === 9658) { //"play" button
    document.querySelector(".white-play-stop-button").innerHTML = "&#9724;"; //'stop' button
    document.querySelector(".white-pause-play-button").classList.remove("gray");
    document.querySelector(".white-pause-play-button").setAttribute("onclick", "whitePause()");
  }

  if (!whiteTimerRunning) {

    whiteTimerRunning = true;

    document.getElementById("white-timer-hour").disabled = true;
    document.getElementById("white-timer-minute").disabled = true;
    document.getElementById("white-timer-second").disabled = true;

    if (whiteTimerInterval) {
      clearInterval(whiteTimerInterval)
    }

    let hours = document.getElementById("white-timer-hour").value;
    if (hours > 9) {
      hours = 9;
    }
    let minutes = document.getElementById("white-timer-minute").value;
    if (minutes > 59) {
      minutes = 59;
    }
    let seconds = document.getElementById("white-timer-second").value;
    if (seconds > 59) {
      seconds = 59;
    }

    let total = Number(seconds) + Number(minutes) * 60 + Number(hours) * 60 * 60;

    whiteTimerInterval = setInterval(() => {
      if (total === 0) {
        document.getElementById("white-timer-hour").value = "";
        document.getElementById("white-timer-minute").value = "";
        document.getElementById("white-timer-second").value = "";

        document.getElementById("white-timer-hour").disabled = false;
        document.getElementById("white-timer-minute").disabled = false;
        document.getElementById("white-timer-second").disabled = false;

        document.querySelector(".white-pause-play-button").classList.add("gray");
        document.querySelector(".white-pause-play-button").removeAttribute("onclick");

        document.querySelector(".white-play-stop-button").innerHTML = "&#9658;"; //'play' button

        clearInterval(whiteTimerInterval);
        whiteTimerInterval = '';
        whiteTimerRunning = false;

      } else {
        let runningHours = Math.floor(total / (60 * 60));
        let runningMinutes = Math.floor((total % (60 * 60)) / 60);
        if (runningMinutes < 10) {
          runningMinutes = "0" + runningMinutes.toString();
        }
        let runningSeconds = Math.floor(total % 60);
        if (runningSeconds < 10) {
          runningSeconds = "0" + runningSeconds.toString();
        }

        document.getElementById("white-timer-hour").value = runningHours;
        document.getElementById("white-timer-minute").value = runningMinutes;
        document.getElementById("white-timer-second").value = runningSeconds;

        total -= 1;
      }
    }, 1000);
  } else {

    whiteTimerRunning = false;
    document.querySelector(".white-play-stop-button").removeAttribute("onclick");
    document.querySelector(".white-play-stop-button").classList.add('gray');
    document.querySelector(".white-pause-play-button").removeAttribute("onclick");
    document.querySelector(".white-pause-play-button").classList.add("gray");

    document.querySelector(".black-stop-button").setAttribute("onclick", "blackTimer()");
    document.querySelector(".black-stop-button").classList.remove("gray");
    document.querySelector(".black-pause-play-button").setAttribute("onclick", "blackPause()");
    document.querySelector(".black-pause-play-button").classList.remove("gray");

    document.getElementById("white-timer-hour").disabled = false;
    document.getElementById("white-timer-minute").disabled = false;
    document.getElementById("white-timer-second").disabled = false;

    clearInterval(whiteTimerInterval);

    return blackTimer();
  }

}
