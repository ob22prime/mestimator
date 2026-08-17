// Presentation deck controls and kitchen recommender sandbox

const TOTAL_SLIDES = 11;
let currentSlideIndex = 1;

// Slide navigation and state management
function initPresentation() {
  buildThumbnails();
  buildSlideDots();
  setupEventListeners();
  
  // Restore slide from URL hash if valid
  const hash = window.location.hash;
  if (hash && hash.startsWith('#slide-')) {
    const slideNum = parseInt(hash.replace('#slide-', ''), 10);
    if (slideNum >= 1 && slideNum <= TOTAL_SLIDES) {
      currentSlideIndex = slideNum;
    }
  }
  
  goToSlide(currentSlideIndex);
  updateKitchenDemo();
}

function goToSlide(index) {
  if (index < 1 || index > TOTAL_SLIDES) return;
  
  // Remove active from all slides
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => slide.classList.remove('active'));
  
  // Activate selected slide
  const targetSlide = document.getElementById(`slide-${index}`);
  if (targetSlide) {
    targetSlide.classList.add('active');
    currentSlideIndex = index;
  }
  
  // Update header indicator and progress
  document.getElementById('slideIndicator').textContent = `Slide ${currentSlideIndex} of ${TOTAL_SLIDES}`;
  const progressPct = ((currentSlideIndex) / TOTAL_SLIDES) * 100;
  document.getElementById('progressFill').style.width = `${progressPct}%`;
  
  // Update footer button states
  document.getElementById('btnPrev').disabled = (currentSlideIndex === 1);
  document.getElementById('btnNext').disabled = (currentSlideIndex === TOTAL_SLIDES);
  
  // Update dots and thumbnail active state
  updateDotsState();
  updateThumbnailsState();
  
  // Update URL hash without scrolling
  history.replaceState(null, null, `#slide-${currentSlideIndex}`);
}

function nextSlide() {
  if (currentSlideIndex < TOTAL_SLIDES) {
    goToSlide(currentSlideIndex + 1);
  }
}

function prevSlide() {
  if (currentSlideIndex > 1) {
    goToSlide(currentSlideIndex - 1);
  }
}

// Dots and thumbnails UI generators
function buildSlideDots() {
  const container = document.getElementById('slideDots');
  container.innerHTML = '';
  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 1 ? 'active' : ''}`;
    dot.title = `Go to Slide ${i}`;
    dot.addEventListener('click', () => goToSlide(i));
    container.appendChild(dot);
  }
}

function updateDotsState() {
  const dots = document.querySelectorAll('.slide-dots .dot');
  dots.forEach((dot, idx) => {
    if (idx + 1 === currentSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function buildThumbnails() {
  const grid = document.getElementById('thumbnailsGrid');
  grid.innerHTML = '';
  const slides = document.querySelectorAll('.slide');
  
  slides.forEach((slide, idx) => {
    const num = idx + 1;
    const title = slide.getAttribute('data-title') || `Slide ${num}`;
    
    const card = document.createElement('div');
    card.className = `thumb-card ${num === 1 ? 'active' : ''}`;
    card.id = `thumb-${num}`;
    card.innerHTML = `
      <div class="thumb-num">Slide ${num}</div>
      <div class="thumb-title">${title}</div>
    `;
    card.addEventListener('click', () => {
      goToSlide(num);
      toggleOverview(false);
    });
    grid.appendChild(card);
  });
}

function updateThumbnailsState() {
  const thumbs = document.querySelectorAll('.thumb-card');
  thumbs.forEach((thumb, idx) => {
    if (idx + 1 === currentSlideIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

function toggleOverview(forceState) {
  const modal = document.getElementById('overviewModal');
  if (typeof forceState === 'boolean') {
    modal.classList.toggle('open', forceState);
  } else {
    modal.classList.toggle('open');
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Fullscreen error: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Event listeners and keyboard shortcuts
function setupEventListeners() {
  // Navigation buttons
  document.getElementById('btnNext').addEventListener('click', nextSlide);
  document.getElementById('btnPrev').addEventListener('click', prevSlide);
  
  // Header buttons
  document.getElementById('btnOverview').addEventListener('click', () => toggleOverview());
  document.getElementById('btnCloseOverview').addEventListener('click', () => toggleOverview(false));
  document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);

  // Close modal when clicking backdrop
  document.getElementById('overviewModal').addEventListener('click', (e) => {
    if (e.target.id === 'overviewModal') {
      toggleOverview(false);
    }
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(TOTAL_SLIDES);
        break;
      case 'o':
      case 'O':
        e.preventDefault();
        toggleOverview();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        toggleOverview(false);
        break;
    }
  });

  // Touch Swipe for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }
}

// Kitchen batch recommendation logic for slide 8
function updateKitchenDemo() {
  const capacity = parseInt(document.getElementById('rngCapacity').value, 10);
  document.getElementById('lblCapacity').textContent = capacity;

  const mealContext = document.getElementById('selMealContext').value;
  const menuDish = document.getElementById('selMenuDish').value;

  // Turnout multiplier based on meal and day context
  let turnoutMultiplier = 0.85;
  if (mealContext === 'weekday_lunch') {
    turnoutMultiplier = 0.78;
  } else if (mealContext === 'weekend_dinner') {
    turnoutMultiplier = 0.70;
  } else if (mealContext === 'exam_dinner') {
    turnoutMultiplier = 0.94;
  } else if (mealContext === 'fest_lunch') {
    turnoutMultiplier = 0.62;
  }

  // Estimated Diners with confidence range
  const estDiners = Math.round(capacity * turnoutMultiplier);
  const confidenceMargin = Math.round(estDiners * 0.06);
  document.getElementById('dispEstDiners').textContent = `${estDiners} ± ${confidenceMargin}`;

  // Status Quo comparison
  const oldPrepPortions = Math.round(capacity * 0.90);
  document.getElementById('dispOldPrep').textContent = `${oldPrepPortions} portions`;

  // Safety buffer to guard against shortages
  const targetPortions = Math.round(estDiners * 1.065);

  // Dish breakdown based on selection
  let dish1 = { name: "Shahi Paneer", portionKg: 0.16, split: 0.72, vesselCap: 35, unit: "kg" };
  let dish2 = { name: "Dal Makhani", portionKg: 0.18, split: 0.85, vesselCap: 35, unit: "L" };
  let dish3 = { name: "Basmati Rice", portionKg: 0.15, split: 0.75, vesselCap: 20, unit: "kg" };
  let dish4 = { name: "Tandoori Roti", portionKg: 2.5, split: 0.95, vesselCap: 150, unit: "pcs" };

  if (menuDish === 'mixveg') {
    dish1 = { name: "Mixed Vegetable Gravy", portionKg: 0.14, split: 0.58, vesselCap: 35, unit: "kg" };
    dish2 = { name: "Arhar Dal Tadka", portionKg: 0.18, split: 0.80, vesselCap: 35, unit: "L" };
    dish3 = { name: "Jeera Rice", portionKg: 0.15, split: 0.75, vesselCap: 20, unit: "kg" };
    dish4 = { name: "Phulka Chapati", portionKg: 2.6, split: 0.95, vesselCap: 150, unit: "pcs" };
  } else if (menuDish === 'lauki') {
    dish1 = { name: "Lauki Kofta Curry", portionKg: 0.13, split: 0.45, vesselCap: 35, unit: "kg" };
    dish2 = { name: "Yellow Moong Dal", portionKg: 0.18, split: 0.75, vesselCap: 35, unit: "L" };
    dish3 = { name: "Plain Rice", portionKg: 0.15, split: 0.70, vesselCap: 20, unit: "kg" };
    dish4 = { name: "Phulka Chapati", portionKg: 2.4, split: 0.95, vesselCap: 150, unit: "pcs" };
  }

  const items = [dish1, dish2, dish3, dish4];
  const listEl = document.getElementById('prepList');
  listEl.innerHTML = '';

  let totalMestimatorKg = 0;
  let totalOldKg = 0;

  items.forEach(item => {
    let reqQty = 0;
    let vesselText = "";
    
    if (item.unit === 'pcs') {
      reqQty = Math.round(targetPortions * item.portionKg * item.split);
      reqQty = Math.ceil(reqQty / 25) * 25;
      vesselText = `${Math.ceil(reqQty / item.vesselCap)} Hot Cases`;
      totalMestimatorKg += (reqQty * 0.035);
      totalOldKg += (oldPrepPortions * item.portionKg * item.split * 0.035);
    } else {
      reqQty = (targetPortions * item.portionKg * item.split);
      reqQty = Math.ceil(reqQty / 2.5) * 2.5;
      const deghs = (reqQty / item.vesselCap).toFixed(1);
      vesselText = `${reqQty} ${item.unit} (${deghs} standard deghs)`;
      totalMestimatorKg += reqQty;
      totalOldKg += (oldPrepPortions * item.portionKg * item.split);
    }

    const row = document.createElement('div');
    row.className = 'prep-item-row';
    row.innerHTML = `
      <div>
        <span class="item-name">${item.name}</span>
      </div>
      <div class="item-batch-info">
        <div class="item-qty">${reqQty} ${item.unit}</div>
        <div class="item-vessels">${vesselText}</div>
      </div>
    `;
    listEl.appendChild(row);
  });

  // Calculate waste prevented
  const savedKg = Math.max(0, Math.round(totalOldKg - totalMestimatorKg));
  const savedInr = Math.round(savedKg * 80);
  document.getElementById('dispSavedKg').textContent = `~${savedKg} kg cooked food (₹${savedInr.toLocaleString('en-IN')} saved)`;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initPresentation);
