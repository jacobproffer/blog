// Variables
var mainHeader = $(".main-header");
var headerHeight = mainHeader.outerHeight();
var background = $(".main-header-background");

// Headroom.js settings and functions
mainHeader.headroom({
  offset: 0,
  tolerance: 0,
  classes: {
    pinned: "pinned",
    unpinned: "unpinned",
    top: "onTop",
    bottom: "onBottom",
    notTop: "scrolled"
  },
  onUnpin: function() {
    if (mainHeader.hasClass("open")) {
      mainHeader.removeClass("unpinned");
    }
  },
  onTop: function() {
    mainHeader.removeClass("pinned");
  }
});