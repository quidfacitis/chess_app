const whitePause = () => {

  let buttonSymbol = document.querySelector(".white-pause-play-button").innerHTML;
  let buttonCode = buttonSymbol.charCodeAt(0);

  if (buttonCode === 32) { //"pause" button
    document.querySelector(".white-pause-play-button").innerHTML = "&#9658;"; //'play' button
    document.querySelector(".white-play-stop-button").classList.add("gray");
    document.querySelector(".white-play-stop-button").removeAttribute("onclick");

    whiteTimerRunning = false;

    if (whiteTimerInterval) {
      clearInterval(whiteTimerInterval)
    }

  } else {
    document.querySelector(".white-pause-play-button").innerHTML = " &#10073;&#10073;"; //'pause' button
    document.querySelector(".white-play-stop-button").classList.remove("gray");
    document.querySelector(".white-play-stop-button").setAttribute("onclick", "whiteTimer()");
    return whiteTimer();
  }
}
