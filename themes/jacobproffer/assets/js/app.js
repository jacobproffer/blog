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

headroom.init();

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
