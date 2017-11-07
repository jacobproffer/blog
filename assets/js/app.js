// Variables
var body = $('html, body'),
		mobileMenu = $('.mobile-nav-button'),
		mainNavigation = $('.main-nav'),
		mainHeader = $('.main-header'),
		links = $('a[href*="#"]'),
		headerHeight = mainHeader.outerHeight(),
    sections = ['.hero', '.info', '.work-row', '.social'];

// Set reset to true for ScrollReveal
window.sr = ScrollReveal({ reset: true });

// Loop over array of sections
$.each(sections, function(i, val) {
  sr.reveal(val, { duration: 1000, origin: 'left', scale: 1 });
});

// Mobile menu function
mobileMenu.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
	mainHeader.toggleClass('open');
	body.toggleClass('body-modal-open');
	body.toggleClass('disable-scrolling');
});

links.click(function() {
	mainNavigation.removeClass('nav-open');
	mainHeader.removeClass('open');
	mobileMenu.removeClass('navOpen');
	body.removeClass('body-modal-open');
	body.removeClass('disable-scrolling');
});

// Headroom.js settings and functions
mainHeader.headroom({
  offset    : headerHeight,
  tolerance   : { up:0, down:0 },
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

/*
	 Removes ability to scroll background
	 content on iOS when a modal is open.
*/
document.ontouchmove = function ( event ) {
	var isTouchMoveAllowed = true, target = event.target;
	while ( target !== null ) {
    if ( target.classList && target.classList.contains( 'disable-scrolling' ) ) {
	    isTouchMoveAllowed = false;
	    break;
    }
	  target = target.parentNode;
	}
	if ( !isTouchMoveAllowed ) {
	  event.preventDefault();
	}
};