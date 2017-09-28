// Array of sections
var sections = ['.info', '.work-row', '.social', '.contact'];

// Set reset to true for ScrollReveal
window.sr = ScrollReveal({ reset: true });

// Loop over array of sections
$.each(sections, function(i, val) {
  sr.reveal(val, { duration: 1000, origin: 'left', scale: 1 });
});

// Fit text

function checkSize() {
  if ($(".contact").css("text-align") == "center" ) {
    $("#hero-heading").fitText(0.42, {});
  }
}

checkSize();

$(window).resize(checkSize);
