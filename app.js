// Presentation deck controls and kitchen recommender sandbox

const TOTAL_SLIDES = 10;
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

// Simple demo logic for slide 7
function updateKitchenDemo() {
  const capacity = parseInt(document.getElementById('rngCapacity').value, 10);
  const mealContext = document.getElementById('selMealContext').value;
  const menuDish = document.getElementById('selMenuDish').value;

  // Multiplier for expected diners
  let multiplier = 0.8;
  if (mealContext === 'weekend') multiplier = 0.65;
  if (mealContext === 'exam') multiplier = 0.95;

  const expectedDiners = Math.round(capacity * multiplier);
  document.getElementById('dispEstDiners').textContent = `~${expectedDiners} Students`;

  // Determine simple pot advice based on menu and diners
  let curryPots = Math.max(1, Math.round(expectedDiners / 280));
  let dalPots = Math.max(1, Math.round(expectedDiners / 250));
  let ricePots = Math.max(1, Math.round(expectedDiners / 350));
  let rotiTrays = Math.max(2, Math.round(expectedDiners / 70));

  let curryName = "Special Paneer";
  let dalName = "Dal Makhani";

  if (menuDish === 'regular') {
    curryName = "Mixed Vegetable";
    dalName = "Yellow Dal";
    curryPots = Math.max(1, Math.round(expectedDiners / 320));
  }

  const items = [
    { name: curryName, count: `${curryPots} Big Pots` },
    { name: dalName, count: `${dalPots} Medium Pots` },
    { name: "Steamed Rice", count: `${ricePots} Big Pot` },
    { name: "Fresh Chapatis", count: `${rotiTrays} Trays` }
  ];

  const listEl = document.getElementById('prepList');
  if (listEl) {
    listEl.innerHTML = '';
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'prep-item-row';
      row.innerHTML = `
        <div>
          <span class="item-name">${item.name}</span>
        </div>
        <div class="item-batch-info">
          <div class="item-qty" style="font-size: 0.9rem;">${item.count}</div>
        </div>
      `;
      listEl.appendChild(row);
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initPresentation);
