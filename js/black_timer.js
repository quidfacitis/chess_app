const blackTimer = () => {

  if (!blackTimerRunning) {

    blackTimerRunning = true;

    document.getElementById("black-timer-hour").disabled = true;
    document.getElementById("black-timer-minute").disabled = true;
    document.getElementById("black-timer-second").disabled = true;

    if (blackTimerInterval) {
      clearInterval(blackTimerInterval)
    }

    let hours = document.getElementById("black-timer-hour").value;
    if (hours > 9) {
      hours = 9;
    }
    let minutes = document.getElementById("black-timer-minute").value;
    if (minutes > 59) {
      minutes = 59;
    }
    let seconds = document.getElementById("black-timer-second").value;
    if (seconds > 59) {
      seconds = 59;
    }

    let total = Number(seconds) + Number(minutes) * 60 + Number(hours) * 60 * 60;

    blackTimerInterval = setInterval(() => {
      if (total === 0) {
        document.getElementById("black-timer-hour").value = "";
        document.getElementById("black-timer-minute").value = "";
        document.getElementById("black-timer-second").value = "";

        document.getElementById("black-timer-hour").disabled = false;
        document.getElementById("black-timer-minute").disabled = false;
        document.getElementById("black-timer-second").disabled = false;

        clearInterval(blackTimerInterval);
        blackTimerInterval = '';
        blackTimerRunning = false;

        document.querySelector(".black-stop-button").classList.add('gray');
        document.querySelector(".black-stop-button").removeAttribute("onclick");
        document.querySelector(".black-pause-play-button").classList.add("gray");
        document.querySelector(".black-pause-play-button").removeAttribute("onclick");

        document.querySelector(".white-play-stop-button").classList.remove('gray');
        document.querySelector(".white-play-stop-button").setAttribute("onclick", "whiteTimer()");
        document.querySelector(".white-play-stop-button").innerHTML = "&#9658;"; //'play' button

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

        document.getElementById("black-timer-hour").value = runningHours;
        document.getElementById("black-timer-minute").value = runningMinutes;
        document.getElementById("black-timer-second").value = runningSeconds;

        total -= 1;
      }
    }, 1000);
  } else {

    blackTimerRunning = false;
    document.querySelector(".black-stop-button").removeAttribute("onclick");
    document.querySelector(".black-stop-button").classList.add("gray");
    document.querySelector(".black-pause-play-button").removeAttribute("onclick");
    document.querySelector(".black-pause-play-button").classList.add("gray");

    document.querySelector(".white-play-stop-button").setAttribute("onclick", "whiteTimer()");
    document.querySelector(".white-play-stop-button").classList.remove("gray");
    document.querySelector(".white-pause-play-button").setAttribute("onclick", "whitePause()");
    document.querySelector(".white-pause-play-button").classList.remove("gray");

    document.getElementById("black-timer-hour").disabled = false;
    document.getElementById("black-timer-minute").disabled = false;
    document.getElementById("black-timer-second").disabled = false;

    clearInterval(blackTimerInterval);

    return whiteTimer();
  }

}
