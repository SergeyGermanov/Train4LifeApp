var myTimer;
var timeLeft = 60;
var audio = new Audio("./audio/win95.ogv");

var btnStart = document.querySelector("#btnStart");
var btnStop = document.querySelector("#btnStop");
var btnPause = document.querySelector("#btnPause");
var progressBar = document.querySelector("#progress");
progressBar.setAttribute("max", timeLeft);

btnStart.addEventListener("click", newTimer);
btnStop.addEventListener("click", stopTimer);
btnPause.addEventListener("click", pauseTimer);

function pauseTimer() {
  clearInterval(myTimer);
  btnStart.removeAttribute("disabled");
}

function stopTimer() {
  clearInterval(myTimer);
  btnStart.removeAttribute("disabled");
  timeLeft = 60;
  progressBar.setAttribute("max", timeLeft);
  progressBar.setAttribute("value", timeLeft);
  document.querySelector("#countdown").innerHTML = timeLeft;
}

function newTimer() {
  btnStart.setAttribute("disabled", true);
  myTimer = setInterval(function() {
    document.querySelector("#countdown").innerHTML = timeLeft;
    timeLeft -= 1;
    progressBar.setAttribute("value", timeLeft);
    if (timeLeft <= 0) {
      clearInterval(myTimer);
      audio.play();
      document.querySelector("#countdown").innerHTML = "Finished";
      btnStart.removeAttribute("disabled");
      timeLeft = 60;
    }
  }, 1000);
}
