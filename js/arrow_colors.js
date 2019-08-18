const arrowColors = () => {
  if (currentIndex >= 0) { //set color for 'back' button
    if (document.getElementById("left-arrow").classList.contains("gray")) {
      document.getElementById("left-arrow").classList.remove("gray");
    }
  } else {
    if (!document.getElementById("left-arrow").classList.contains("gray")) {
      document.getElementById("left-arrow").classList.add("gray");
    }
  }

  if (currentIndex < movements.length - 1) { //set color for 'forward' button
    if (document.getElementById("right-arrow").classList.contains("gray")) {
      document.getElementById("right-arrow").classList.remove("gray");
    }
  } else {
    if (!document.getElementById("right-arrow").classList.contains("gray")) {
      document.getElementById("right-arrow").classList.add("gray");
    }
  }
}
