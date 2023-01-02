const mainHeader = document.querySelector(".main-header");
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
