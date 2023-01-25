const mainHeader = document.querySelector('.main-header');
const mobileNavigationTrigger = document.querySelector('#mobile-navigation-trigger');
const mobileNavigation = document.querySelector('#mobile-navigation');
const fadeIns = document.querySelectorAll('.gsap-fade-in');
const staggerIn = document.querySelectorAll('.gsap-stagger-in');

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'max',
  onEnter: () => mainHeader.classList.add('main-header--pinned'),
  onLeaveBack: () => mainHeader.classList.remove('main-header--pinned'),
});

if (fadeIns.length > 0) {
  fadeIns.forEach((fadeIn) => {
    gsap.from(fadeIn, {
      y: 30,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: fadeIn,
        start: 'top 90%',
        end: 'bottom top',
        once: true,
      }
    })
  });
}

if (staggerIn.length > 0) {
  staggerIn.forEach((staggers) => {
    const staggerElements = staggers.children;

    if (staggerElements.length > 0) {
      ScrollTrigger.batch(staggerElements, {
        start: 'top 90%',
        end: 'bottom top',
        once: true,
        onEnter: batch => gsap.from(batch, {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
        }),
      });
    }
  });
}

mobileNavigationTrigger.addEventListener("click", function() {
  mainHeader.classList.toggle('main-header--navigation-open');
  mobileNavigation.classList.toggle("main-header__mobile-navigation--open")
  this.classList.toggle("nav-open");

  if (mobileNavigation.classList.contains('main-header__mobile-navigation--open')) {
    this.setAttribute('aria-expanded', 'true');
    this.innerHTML = "Close";
  } else {
    this.setAttribute('aria-expanded', 'false');
    this.innerHTML = "Menu";
  }
});
