for (const link of document.querySelectorAll('.js-btn-copy-link')) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.getSelection().removeAllRanges();
    const range = document.createRange();
    range.selectNode(link.querySelector(".btn-copy-link-hash"));
    window.getSelection().addRange(range);

    try {
      document.execCommand('copy');
      link.querySelector('.btn-link-action').hidden = true;
      link.querySelector('.btn-link-success').hidden = false;
      setTimeout(() => {
        link.querySelector('.btn-link-action').hidden = false;
        link.querySelector('.btn-link-success').hidden = true;
      }, 2000)
    } catch(err) {
      return;
    }

    window.getSelection().removeAllRanges();
  });
}

const menuObserver = new IntersectionObserver(updateMenuState, { rootMargin: `0% 0% -30% 0%`, threshold: 0.01 })

for (const navItem of document.querySelectorAll('.js-nav-item')) {
  const href = navItem.hash;
  const section = document.querySelector(href);
  menuObserver.observe(section);

  navItem.addEventListener('click', hideMenu);
}

function updateMenuState(intersectionEntries) {
  for (const entry of intersectionEntries) {
    if (!entry.isIntersecting) continue;
    const id = entry.target.id;
    document.querySelector('.js-nav-item.selected').classList.remove('selected');
    const navItem = document.querySelector(`.js-nav-item[href*='${id}']`);
    navItem.classList.add('selected');
    document.querySelector('.js-site-jump-to-active').textContent = navItem.textContent;
  }
}

let menuIsVisible = false;

document.querySelector('.js-site-jump-to').addEventListener('click', toggleMenu);
document.querySelector('.js-nav-menu-close').addEventListener('click', hideAll);
document.querySelector('.js-nav-read-report').addEventListener('click', showSelectReport);
document.querySelector('.js-site-nav-backdrop').addEventListener('click', hideAll);
document.querySelector('.js-nav-menu-back-to-menu').addEventListener('click', () => {
  hideSelectReport();
  showMenu();
});

function toggleMenu() { menuIsVisible ? hideMenu() : showMenu(); }

function showMenu() {
  hideSelectReport();
  document.querySelector('.js-nav-items').classList.add('active');
  document.querySelector('.js-nav-read-report').classList.add('active');
  document.querySelector('.js-nav-menu-close').classList.add('active');
  document.querySelector('.js-site-nav-backdrop').classList.add('active');
  menuIsVisible = true;
}

function hideAll() {
  hideMenu();
  hideSelectReport();
}

function hideMenu() {
  document.querySelector('.js-nav-items').classList.remove('active');
  document.querySelector('.js-nav-read-report').classList.remove('active');
  document.querySelector('.js-nav-menu-close').classList.remove('active');
  document.querySelector('.js-site-nav-backdrop').classList.remove('active');
  menuIsVisible = false;
}

function showSelectReport(e) {
  e.preventDefault();
  hideMenu();
  document.querySelector('.js-nav-menu-close').classList.add('active');
  document.querySelector('.js-nav-menu-back-to-menu').classList.add('active');
  document.querySelector('.js-site-reports').classList.add('active');
  document.querySelector('.js-site-nav-backdrop').classList.add('active');
}

function hideSelectReport () {
  document.querySelector('.js-nav-menu-close').classList.remove('active');
  document.querySelector('.js-nav-menu-back-to-menu').classList.remove('active');
  document.querySelector('.js-site-reports').classList.remove('active');
  document.querySelector('.js-site-nav-backdrop').classList.remove('active');
}

for (const link of document.querySelectorAll('.share-underline')) {
  const textContent = link.textContent[0].toUpperCase() + link.textContent.slice(1);
  const quoteText = `“${textContent}”`;
  link.href = `https://twitter.com/intent/tweet?url=${encodeURI(window.location.href)}&text=${encodeURI(quoteText)}`;
  link.setAttribute('aria-label', `Tweet: ${quoteText}`);
  link.setAttribute('target', `_blank`);
  link.setAttribute('rel', `noopener`);

  // Construct tweet links
  const tooltip = document.createElement('span');
  tooltip.classList.add('share-underline-tooltip');
  tooltip.classList.add('text-mono');
  const tooltipContent = document.createElement('span');
  tooltipContent.textContent = 'Tweet';
  tooltipContent.classList.add('share-underline-tooltip-content');
  tooltip.appendChild(tooltipContent);

  link.appendChild(tooltip);
}

// Hover effect for nav section
const navItems = document.querySelectorAll('.js-section-nav-item');
for (const navItem of navItems) {
  navItem.addEventListener('mouseenter', () => {
    const index = [...navItems].indexOf(navItem);
    const active = document.querySelector('.js-chapter-thumbnail.active');
    if (active !== null) active.classList.remove('active');

    const activeTab = document.querySelector('.js-section-nav-item.active');
    if (activeTab) activeTab.classList.remove('active');
    navItem.classList.add('active');
    document.querySelector(`.js-chapter-thumbnail:nth-child(${index+1})`).classList.add('active');
  });
}

for (const link of document.querySelectorAll('.js-download-reports')) {
  link.addEventListener('click', (e) => showDownloadModal(e));
}

for (const link of document.querySelectorAll('.js-close-modal')) {
  link.addEventListener('click', (e) => hideDownloadModal(e));
}

function showDownloadModal(e) {
  e.preventDefault();
  document.querySelector('.js-confirmation-modal').classList.add('confirmation-modal-visible');
}

function hideDownloadModal(e) {
  e.preventDefault();
  document.querySelector('.js-confirmation-modal').classList.remove('confirmation-modal-visible');
}

const worldMapTabs = document.querySelectorAll('.js-world-map-tab')
for (const worldMapTab of worldMapTabs) {
  worldMapTab.addEventListener('click', () => {
    const index = [...worldMapTabs].indexOf(worldMapTab);
    const activeTab = document.querySelector('.js-world-map-tab.active');
    if (activeTab !== null) activeTab.classList.remove('active');
    const activeMap = document.querySelector('.js-world-map.active');
    if (activeMap !== null) activeMap.classList.remove('active');

    worldMapTab.classList.add('active');
    document.querySelector(`.js-world-map:nth-child(${index+1})`).classList.add('active');
    document.querySelector('.js-world-map-slider').value = index;
  });
}

const worldMapSlider = document.querySelector('.js-world-map-slider');
if (worldMapSlider !== null) {
  worldMapSlider.addEventListener('input', (e) => {
    const index = parseInt(e.target.value);
    const activeTab = document.querySelector('.js-world-map-tab.active');
    if (activeTab !== null) activeTab.classList.remove('active');
    const activeMap = document.querySelector('.js-world-map.active');
    if (activeMap !== null) activeMap.classList.remove('active');
    document.querySelector(`.js-world-map:nth-child(${index+1})`).classList.add('active');
    document.querySelector('.js-world-map-slider').value = index;
    document.querySelector(`.js-world-map-tab:nth-child(${index+2})`).classList.add('active');
  });
}

// Header hover effect
const defaultSquareColor = "#3D368F";
const squareSize = 16;
const squareMargin = 49;
const gradientColors = [];
const updateColorDistanceThreshold = 400;
const colorStopResolution = 100;
let columnCount;
let rowCount;
let geoMap = []; // array of arrays, geoMap[x][y] -> {opacity, x, y, width, height, centerX, centerY}
let scale = window.devicePixelRatio || 1;
let safeArea; // don't draw squares here
let finishedDrawing = false;
scale = parseInt(scale);

function setResolution(canvas) {
  const ctx = canvas.getContext("2d")
  const clientRect = canvas.getBoundingClientRect();
  finishedDrawing = false;
  canvas.width = clientRect.width * scale;
  canvas.height = clientRect.height * scale;
  columnCount =  parseInt((clientRect.width) / (squareSize + squareMargin));
  rowCount = parseInt((clientRect.height) / (squareSize + squareMargin) + 0.5);
  safeAreaRect = document.querySelector('.js-canvas-safe-area').getBoundingClientRect();
  canvasRect = canvas.getBoundingClientRect();
  safeArea = {
    x: (safeAreaRect.left - canvasRect.left)*scale,
    y: (safeAreaRect.top - canvasRect.top)*scale,
    width: (safeAreaRect.width)*scale,
    height: (safeAreaRect.height)*scale
  }

  const offsetX = (clientRect.width - (columnCount * (squareSize + squareMargin) - squareMargin))/2;
  const offsetY = 10;

  // Init geometry and colors
  geoMap = [];
  for (let x = 0; x < columnCount; x++) {
    let geoRow = [];
    for (let y = 0; y < rowCount; y++) {
      const xPos = offsetX + x * (squareSize + squareMargin);
      const yPos = offsetY + y * (squareSize + squareMargin);

      const geo = {
        opacity: 1,
        x: xPos*scale,
        y: yPos*scale,
        width: squareSize*scale,
        height: squareSize*scale,
        centerX: xPos*scale + squareSize*scale/2,
        centerY: yPos*scale + squareSize*scale/2,
      };
      geo.draw = !rectOverlapsRect(safeArea, geo);
      geoRow.push(geo);
    }
    geoMap.push(geoRow);
  }
}

function rectOverlapsRect(rect1, rect2) {
  let overlapX = false;
  let overlapY = false;
  if (rect2.x > rect1.x && rect2.x < rect1.x + rect1.width) overlapX = true;
  if (rect2.x + rect2.width > rect1.x && rect2.x + rect2.width < rect1.x + rect1.width) overlapX = true;
  if (rect2.y > rect1.y && rect2.y < rect1.y + rect1.height) overlapY = true;
  if (rect2.y + rect2.height > rect1.y && rect2.y + rect2.height < rect1.y + rect1.height) overlapY = true;
  return overlapY && overlapX;
}

function initCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  setResolution(canvas);

  const gradientWidth = 500;
  var gradient = ctx.createLinearGradient(0,0, gradientWidth,0);
  gradient.addColorStop(1/6*0, '#FA989C');
  gradient.addColorStop(1/6*1, '#F63487');
  gradient.addColorStop(1/6*2, '#BB2CC1');
  gradient.addColorStop(1/6*3, '#315BF5');
  gradient.addColorStop(1/6*4, '#2D9EF4');
  gradient.addColorStop(1/6*5, '#0BBBA9');
  gradient.addColorStop(1/6*6, '#D1E876');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, gradientWidth, 2);

  for (let i = 0; i < colorStopResolution; i++) {
    const imageData = ctx.getImageData(i * (gradientWidth / colorStopResolution), 1, 1, 1).data;
    gradientColors.push({ r: imageData[0], g: imageData[1], b: imageData[2] });
  }

  drawSquares(canvas);
}

initCanvas(document.querySelector('.site-hero-canvas'));

function drawSquares(canvas) {
  if (finishedDrawing) {
    window.requestAnimationFrame(() => drawSquares(canvas));
    return;
  }
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  let needsUpdate = false;
  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < columnCount; x++) {
      const geo = geoMap[x][y];
      if (geo.draw == false) continue;
      ctx.fillStyle = defaultSquareColor;
      const localScale = 1 + geo.opacity;
      const scaledWidth = geo.width * localScale;
      const scaledHeight = geo.height * localScale;
      const scaleOffset = (scaledWidth - geo.width)/2;
      ctx.fillRect(geo.x - scaleOffset, geo.y - scaleOffset, scaledWidth, scaledHeight);
      // Draw gradient color if it has a colorTarget above 0.02
      if (geo.opacity > 0.02) {
        needsUpdate = true;
        const colorTarget = parseInt(x/columnCount * colorStopResolution + 0.5);

        const colorData = gradientColors[colorTarget];
        ctx.fillStyle = `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, ${geo.opacity})`;
        ctx.fillRect(geo.x - scaleOffset, geo.y - scaleOffset, scaledWidth, scaledHeight);
        geo.opacity = geo.opacity * 0.98;
      }
    }
  }
  if (!needsUpdate) finishedDrawing = true;

  window.requestAnimationFrame(() => drawSquares(canvas));
}

function updateColorGoalsFromMousePosition(position) {
  finishedDrawing = false;
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      const geo = geoMap[x][y];
      const distanceX = Math.abs(position.x*scale - geo.centerX);
      const distanceY = Math.abs(position.y*scale - geo.centerY);
      const distance = Math.sqrt(distanceY * distanceY + distanceX * distanceX);
      if (distance < updateColorDistanceThreshold) {
        const targetOpacity = 1 - distance/updateColorDistanceThreshold;
        geo.opacity = Math.max(targetOpacity, geo.opacity);
      }
    }
  }
}

function handleMouseMove(e) {
  const canvas = e.target;
  const clientRect = canvas.getBoundingClientRect();
  const localX = e.clientX - clientRect.left;
  const localY = e.clientY - clientRect.top;
  updateColorGoalsFromMousePosition({ x: localX, y: localY});
}

document.querySelector('.site-hero-canvas').addEventListener('mousemove', handleMouseMove);

window.addEventListener('resize', () => {
  setResolution(document.querySelector('.site-hero-canvas'));
});
