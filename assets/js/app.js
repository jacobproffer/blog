var today = new Date();
var hourNow = today.getHours();
var greeting;

function message() {
  if (hourNow > 17) {
    greeting = 'Good evening';
  } else if (hourNow > 11) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good morning';
  }
  var el = document.querySelector('span');
  el.textContent = greeting;
}

message();
