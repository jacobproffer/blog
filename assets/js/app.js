// Array of sections
var sections = ['.hero-heading', '.info', '.work-row', '.social', '.contact'];

// Set reset to true for ScrollReveal
window.sr = ScrollReveal({ reset: true });

// Loop over array of sections
$.each(sections, function(i, val) {
  sr.reveal(val, { duration: 1000, origin: 'left', scale: 1 });
});
