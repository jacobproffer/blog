const today = new Date();
const hourNow = today.getHours();
function message() {
  var greeting = 'Good morning';
  if (hourNow > 17) {
    greeting = 'Good evening';
  } else if (hourNow > 11) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good morning';
  }
  const el = document.querySelector('span');
  el.textContent = greeting;
}
message();
