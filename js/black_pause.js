const blackPause = () => {

  let buttonSymbol = document.querySelector(".black-pause-play-button").innerHTML;
  let buttonCode = buttonSymbol.charCodeAt(0);

  if (buttonCode === 32) { //"pause" button
    document.querySelector(".black-pause-play-button").innerHTML = "&#9658;"; //'play' button
    document.querySelector(".black-stop-button").classList.add("gray");
    document.querySelector(".black-stop-button").removeAttribute("onclick");

    blackTimerRunning = false;

    if (blackTimerInterval) {
      clearInterval(blackTimerInterval)
    }

  } else {
    document.querySelector(".black-pause-play-button").innerHTML = " &#10073;&#10073;"; //'pause' button
    document.querySelector(".black-stop-button").classList.remove("gray");
    document.querySelector(".black-stop-button").setAttribute("onclick", "blackTimer()");
    return blackTimer();
  }
}
