// Variables
var mainHeader = $('.main-header'),
    headerHeight = mainHeader.outerHeight();

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

// Circle Type

new CircleType(document.getElementById('curve')).radius(400);