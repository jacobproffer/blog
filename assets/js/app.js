// Variables
var mainHeader = $('.main-header'),
    headerHeight = mainHeader.outerHeight(),
    sections = ['main'];

// Set reset to true for ScrollReveal
window.sr = ScrollReveal({ reset: true });

// Loop over array of sections
$.each(sections, function(i, val) {
  sr.reveal(val, { duration: 1000, origin: 'left', scale: 1 });
});

// Headroom.js settings and functions
mainHeader.headroom({
  offset    : 0,
  tolerance   : 0,
  classes : {
    pinned   : "pinned",
    unpinned : "unpinned",
    top      : "onTop",
    bottom   : "onBottom",
    notTop   : "scrolled"
  },
	onUnpin : function() {
		if ( mainHeader.hasClass('open') ) {
			mainHeader.removeClass('unpinned');
		}
	},
  onTop : function() {
    mainHeader.removeClass('pinned');
  }
});