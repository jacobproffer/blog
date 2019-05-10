/* eslint-disable no-undef */
var bLazy = new Blazy({
  error: function(ele, msg) {
    if(msg === 'missing') {
      console.log('Data-src is missing');
    } else if (msg === 'invalid') {
      console.log('Data-src is invalid');
      console.log(ele);
    }
  }
});
var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var headroom = new Headroom(mainHeader, {
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
    if (mainHeader.classList.contains("open")) {
      mainHeader.classList.remove("unpinned");
    }
  },
  onTop: function() {
    mainHeader.classList.remove("pinned");
  }
});
/* eslint-enable no-undef */
headroom.init();
