const today = new Date();
const hourNow = today.getHours();
const body = document.querySelector('body');
function message() {
  var greeting = 'Good morning';
  if (hourNow > 17) {
    greeting = 'Good evening';
    body.classList.add('night');
  } else if (hourNow > 11) {
    greeting = 'Good afternoon';
    body.classList.add('day');
  } else {
    greeting = 'Good morning';
    body.classList.add('morning');
  }
  const el = document.querySelector('span');
  el.textContent = greeting;
}
message();
