// Animation lib
const BUILDINCLASS = 'build-in-animate'
const DEFAULTMARGINBOTTOM = 30
const DEFAULTMARGINTOP = 0
const DEFAULTTHRESHOLD = 0.01

for (const number of document.querySelectorAll('.js-build-number')) {
  number.dataset.targetValue = number.textContent;
}

function animateNumber(element, currentValue, targetValue) {
  currentValue += isFloat(targetValue) ? Math.max(0.1, targetValue/20) : Math.max(1, parseInt(targetValue/35));
  currentValue = Number(currentValue.toFixed(1));
  if (currentValue > targetValue) currentValue = targetValue;

  const decimals = isFloat(targetValue) ? 1 : 0;
  const newLabel = `${'0'.repeat(targetValue.toFixed(decimals).replace('.', '').length - currentValue.toFixed(decimals).replace('.', '').length)}${currentValue.toFixed(decimals)}`
  element.textContent = newLabel;
  if (currentValue > targetValue) return;
  window.requestAnimationFrame(() => animateNumber(element, currentValue, targetValue));
}

function animateNumbers(entries) {
  for (const entry of entries) {
    for (const element of entry.target.querySelectorAll('.js-build-number')) {
      const targetValue = Number(element.dataset.targetValue);
      if (!entry.isIntersecting) {
        element.textContent = '0'.repeat(targetValue.toString().replace('.', '').length);
      } else {
        animateNumber(element, 0, targetValue);
      }
    }
  }
}

const defaultObserver = new IntersectionObserver(animateNumbers, {
  rootMargin: `-${DEFAULTMARGINTOP}% 0% -${DEFAULTMARGINBOTTOM}% 0%`,
  threshold: DEFAULTTHRESHOLD
});

const triggers = document.querySelectorAll('.js-build-number-trigger');
for (const element of triggers) {
  const options = animationOptions(element)
  if (options.isDefault) {
    defaultObserver.observe(element);
    continue;
  }

  const customObserver = new IntersectionObserver(animateNumbers, {
    rootMargin: `-${options.marginTop}% 0% -${options.marginBottom}% 0%`,
    threshold: options.threshold
  })
  customObserver.observe(element)
}

function animationOptions(element) {
  const marginBottom = Number(element.getAttribute('data-build-margin-bottom') || DEFAULTMARGINBOTTOM)
  const marginTop = Number(element.getAttribute('data-build-margin-top') || DEFAULTMARGINTOP)
  const threshold = Number(element.getAttribute('data-build-threshold') || DEFAULTTHRESHOLD)

  return {
    marginBottom,
    marginTop,
    threshold,
    isDefault: marginBottom === DEFAULTMARGINBOTTOM && marginTop === DEFAULTMARGINTOP && threshold === DEFAULTTHRESHOLD
  }
}

const navObserver = new IntersectionObserver(toggleHeader, {
  rootMargin: `-${0}% 0% -${0}% 0%`,
  threshold: 0
});

function toggleHeader(entries) {
  for (const entry of entries) {
    document.querySelector('.site-header').classList.toggle('site-header-visible', !entry.isIntersecting)
  }
}

navObserver.observe(document.querySelector('.site-hero-section'));

function isFloat(n) { return Number(n) === n && n % 1 !== 0 }
