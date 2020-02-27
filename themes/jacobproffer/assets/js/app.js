var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var LazyImg = document.querySelectorAll('img[data-src]');
var LazyImgSrcSet = document.querySelectorAll('img[data-srcset]');

var rootconfig = {
  root: null,
  rootMargin: '760px 0px',
};

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

var Observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.intersectionRatio > 0) {
        if (entry.target.getAttribute('data-src')) {
          entry.target.src = entry.target.getAttribute('data-src')
        }
        if (entry.target.getAttribute('data-srcset')) {
          entry.target.setAttribute('srcset', entry.target.getAttribute('data-srcset'))
        }
        Observer.unobserve(entry.target);
      }
    });
  },
  rootconfig
);

LazyImg.forEach(function(el) {
  Observer.observe(el);
});

LazyImgSrcSet.forEach(function(el) {
  Observer.observe(el);
});
