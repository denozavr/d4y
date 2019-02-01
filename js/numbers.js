var element = document.querySelector('.numbers');
var isNumberFired = false;

var qualityElement = element.querySelector('#quality');
var yearsElement = element.querySelector('#years');
var projectsElement = element.querySelector('#projects');

function makeNumbersZeroes() {
  qualityElement.textContent = '0';
  yearsElement.textContent = '0';
  projectsElement.textContent = '0';
}
makeNumbersZeroes();

function myFunction() {
  animateValue("quality", 0, 100, 4000);
  animateValue("years", 0, 5, 4000);
  animateValue("projects", 0, 20, 4000);

  isNumberFired = true;
}

window.addEventListener('scroll', function (e) {
  var docViewTop = document.body.scrollTop;
  var docViewBottom = window.scrollY + window.innerHeight; //current top scroll position
  //var docViewBottom = docViewTop + document.body.scrollHeight; //window.innerHeight;

  var elemTop = element.offsetTop;
  var elemBottom = elemTop + element.offsetHeight;

  if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop) && !isNumberFired) {
    myFunction();
  }
});

function animateValue(id, start, end, duration) {
  // assumes integer values for start and end

  var obj = document.getElementById(id);
  var range = end - start;
  // no timer shorter than 50ms (not really visible any way)
  var minTimer = 50;
  // calc step time to show all interediate values
  var stepTime = Math.abs(Math.floor(duration / range));

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer);

  // get current time and calculate desired end time
  var startTime = new Date().getTime();
  var endTime = startTime + duration;
  var timer;

  function run() {
    var now = new Date().getTime();
    var remaining = Math.max((endTime - now) / duration, 0);

    // for big values and time make bigger step
    var stepJump = Math.floor(end/(duration/2000));

    var value = Math.round(end - (remaining * range)) ;
    obj.innerHTML = value;
    if (value >= end) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}
