const mainHeader = document.querySelector('[data-header]');
const mainNavigation = document.querySelector('[data-navigation]');
const mobileNavigationTrigger = document.querySelector('[data-navigation-toggle]');
const mobileNavigation = document.querySelector('[data-navigation-list]');

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'max',
  onEnter: () => mainHeader.classList.add('main-header--faded'),
  onLeaveBack: () => mainHeader.classList.remove('main-header--faded'),
});

/**
 * Trap focus within navigation
 */
function navigationFocus() {
  const focusableElements = mainNavigation.querySelectorAll('a[href], button');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  mainNavigation.addEventListener('keydown', function (e) {
    if (e.target === firstFocusableElement && e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (e.target === lastFocusableElement && e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  });
}

/**
 * Close navigation if escape key is pressed
 */
function handleEscape() {
  document.addEventListener('keyup', function (e) {
    const escape = e.key;

    if (escape === 'Escape' && mobileNavigation.classList.contains('open')) {
      mobileNavigationTrigger.setAttribute('aria-expanded', 'false');
      mobileNavigationTrigger.focus();
      mobileNavigation.classList.remove('open');
      mainHeader.classList.remove('main-header--navigation-open');
      mobileNavigationTrigger.innerHTML = "Open Menu";
    }
  });
}

mobileNavigationTrigger.addEventListener("click", function () {
  mainHeader.classList.toggle('main-header--navigation-open');
  mobileNavigation.classList.toggle("open")
  this.classList.toggle("nav-open");

  navigationFocus();
  handleEscape();

  if (mobileNavigation.classList.contains('open')) {
    this.setAttribute('aria-expanded', 'true');
    this.innerHTML = "Close Menu";
  } else {
    this.setAttribute('aria-expanded', 'false');
    this.innerHTML = "Open Menu";
  }
});

// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);
