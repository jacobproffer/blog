var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 18) {
  greeting = 'Good evening';
} else if (hourNow >= 12) {
  greeting = 'Good afternoon';
} else {
  greeting = 'Good morning';
}

function updateMessage() {
  var el = document.querySelector('span');
  el.textContent = greeting;
}

updateMessage();
