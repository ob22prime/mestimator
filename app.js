// ===================================================================
// Mestimator Presentation Deck Logic & Kitchen Recommender Sandbox
// Clean, modular, zero-bloat vanilla JavaScript
// ===================================================================

const TOTAL_SLIDES = 11;
let currentSlideIndex = 1;

// Speaker notes & viva defense tips for students
const speakerNotes = {
  1: {
    heading: "Slide 1: Title & Operational Hook",
    points: [
      "Start by stating: 'Mestimator is an operational decision-support system specifically tailored for hostel mess managers to forecast item-level meal demand and avoid daily overcooking.'",
      "Emphasize that this is NOT a hypothetical donation app, but an active, approved 17-week campus software engineering project in our hostel mess.",
      "Highlight our core thesis: Predicting turnout and dish popularity directly converts into physical kitchen preparation batches (deghs, kg, liters)."
    ],
    vivaQ: "Professor Question: 'Why did you change from your original donation project?'",
    vivaA: "Answer: 'MediMatch relied on third-party NGOs and regulatory medicine sharing which is impractical in one semester. Mestimator focuses on an immediate, measurable campus operational problem with accessible stakeholders and real prospective data.'"
  },
  2: {
    heading: "Slide 2: Structure & Roadmap",
    points: [
      "Quickly introduce the 10-point presentation structure covering requirements, user model, decision architecture, offline PWA, and 17-week empirical pilot.",
      "Keep it under 30 seconds: 'We will walk through the kitchen decision loop, mathematical quantization, security model, and our longitudinal evaluation.'"
    ],
    vivaQ: "Professor Question: 'Is this just a simple database CRUD app?'",
    vivaA: "Answer: 'No, sir. The defensible contribution is the asymmetric decision model, kitchen vessel quantization, and live comparative evaluation against existing manager baselines.'"
  },
  3: {
    heading: "Slide 3: Problem Context & Urgency",
    points: [
      "Explain the mess manager's current dilemma: Cooking for 800 registered residents based purely on intuition leads to huge waste on weekends and exam days.",
      "Cite the manager interview: 'Perishable cooked food like Paneer or Dal cannot be saved overnight; once prepared, surplus is pure financial and environmental loss.'",
      "State our objective: Practical preparation recommendations before the cook lights the stove."
    ],
    vivaQ: "Professor Question: 'Why can't the mess simply cook when students arrive?'",
    vivaA: "Answer: 'Institutional mess cooking operates in large 20 to 40 kg batches requiring 2+ hours of simmering. Food must be ready before the dining hall opens.'"
  },
  4: {
    heading: "Slide 4: Project Scope & Non-Goals",
    points: [
      "Clearly delineate what is IN scope (PWA, forecasting engine, batch optimizer, multi-mess config) and what is OUT of scope.",
      "Strongly emphasize non-goals: NO medicine, NO student-to-student marketplace, NO black-box LLMs as forecasting core, NO automatic robotic kitchen control.",
      "Show that staff retain 100% override control with audit logging."
    ],
    vivaQ: "Professor Question: 'Why not make student voting mandatory?'",
    vivaA: "Answer: 'Students frequently vote and don't show up, or show up without voting. Student preferences are only an optional signal, not the core attendance foundation.'"
  },
  5: {
    heading: "Slide 5: Operational Flow & Pipeline",
    points: [
      "Walk through the 6 stages: Menu ingest &rarr; Turnout prediction &rarr; Dish demand splitting &rarr; Batch recipe quantization &rarr; Staff override &rarr; Outcome feedback.",
      "Point out the circular feedback loop at the bottom: Post-meal leftover weighing adaptively refines future model weights."
    ],
    vivaQ: "Professor Question: 'What happens when staff reject the recommendation?'",
    vivaA: "Answer: 'Staff can override in 1 click by entering their adjusted quantity and reason (e.g., unexpected rain). The system logs this for model calibration.'"
  },
  6: {
    heading: "Slide 6: Target Users & Kitchen UX",
    points: [
      "Highlight the three distinct user roles: Mess Manager (planner), Head Cook (execution in physical vessels), and Hostel Warden (weekly waste/cost audit).",
      "Mention UX considerations: High contrast UI, large touch targets, physical units (kg, liters, deghs), and zero-training requirement."
    ],
    vivaQ: "Professor Question: 'Will the kitchen cooks actually use a complex web app?'",
    vivaA: "Answer: 'Yes, because we display physical container counts (e.g. 2 large deghs) rather than statistical probabilities, taking under 30 seconds per meal.'"
  },
  7: {
    heading: "Slide 7: System Features & Decision Engine",
    points: [
      "Explain the 4 mathematical building blocks: Turnout ML &rarr; Dish preference matrix &rarr; Recipe batch rounding &rarr; Asymmetric risk matrix.",
      "Highlight the asymmetric loss formula: Stockout penalty is weighted 3.5x higher than surplus to ensure students never go hungry while still trimming 70%+ of waste.",
      "Mention the Multi-Mess SaaS configuration for different hostel menus and dining schedules."
    ],
    vivaQ: "Professor Question: 'Why does the model use an asymmetric penalty?'",
    vivaA: "Answer: 'Under-preparing causes student agitation and mess stockout crises, which is far worse than a slight 2 kg surplus buffer. The asymmetric loss aligns ML with mess operational realities.'"
  },
  8: {
    heading: "Slide 8: Interfaces & Live Sandbox Demo",
    points: [
      "Demonstrate the interactive sandbox right on this slide! Drag the slider and change meal context to show dynamic batch calculations live.",
      "Show how an 800-student weekend dinner is predicted at ~560 diners, saving ~18.5 kg food and ₹1,480 in a single meal shift without risk.",
      "Mention offline resilience via IndexedDB caching during campus Wi-Fi drops."
    ],
    vivaQ: "Professor Question: 'How do you handle offline connectivity in the basement kitchen?'",
    vivaA: "Answer: 'The PWA caches the latest daily model locally. Calculations run client-side in Javascript and sync automatically when internet reconnects.'"
  },
  9: {
    heading: "Slide 9: Performance, Security & Quality Goals",
    points: [
      "Emphasize the strict zero-PII privacy guarantee: System only stores aggregate meal counts and food weights, never individual student biometric or card records.",
      "Cover response latency (<400ms) and fallback mechanism (defaults to 14-day median if ML engine is unavailable).",
      "Explain RBAC permissions (Manager vs Cook vs Warden)."
    ],
    vivaQ: "Professor Question: 'Are there any data privacy risks under GDPR/DPDP Act?'",
    vivaA: "Answer: 'No, because we do not collect or store any personal student identifiers. All logs are aggregate mess-level operational figures.'"
  },
  10: {
    heading: "Slide 10: Initial Planning, Feasibility & 17-Week Pilot",
    points: [
      "Explain our 4-phase semester roadmap: Baseline logging (Weeks 1-4), Model/PWA dev (Weeks 5-8), Supervised Live Pilot (Weeks 9-14), Longitudinal evaluation (Weeks 15-17).",
      "Highlight our active data collection: Operational log started on 10 August 2026 via WhatsApp message records mapped to structured tables.",
      "Show the standardized vessel mapping agreed with the manager."
    ],
    vivaQ: "Professor Question: 'How long will your live pilot run?'",
    vivaA: "Answer: 'A continuous 6-week supervised live intervention in our hostel mess, comparing recommendation adherence against baseline weeks.'"
  },
  11: {
    heading: "Slide 11: Conclusion, Baselines & References",
    points: [
      "Summarize the quantitative validation framework: Baseline 0 (Manager Status Quo), Baseline 1 (Previous Week), Baseline 2 (7-Day SMA) vs. Mestimator.",
      "Highlight target KPIs: WAPE/MAE reduction, >25% food waste cut per 100 diners, zero unmanaged stockouts.",
      "Reference the MDPI Sustainability 2025 dining study and official FSSAI campus surplus guidelines."
    ],
    vivaQ: "Professor Question: 'What if your model has high accuracy but cooks ignore it?'",
    vivaA: "Answer: 'That is why recommendation acceptance rate and staff override logs are primary operational KPIs in our live evaluation, not just offline ML accuracy.'"
  }
};

// -------------------------------------------------------------------
// Slide Navigation & State Management
// -------------------------------------------------------------------
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
  
  // Update header indicator & progress
  document.getElementById('slideIndicator').textContent = `Slide ${currentSlideIndex} of ${TOTAL_SLIDES}`;
  const progressPct = ((currentSlideIndex) / TOTAL_SLIDES) * 100;
  document.getElementById('progressFill').style.width = `${progressPct}%`;
  
  // Update footer button states
  document.getElementById('btnPrev').disabled = (currentSlideIndex === 1);
  document.getElementById('btnNext').disabled = (currentSlideIndex === TOTAL_SLIDES);
  
  // Update dots & thumbnail active state
  updateDotsState();
  updateThumbnailsState();
  
  // Update presenter notes
  renderSpeakerNotes(currentSlideIndex);
  
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

// -------------------------------------------------------------------
// Dots & Thumbnails UI Generators
// -------------------------------------------------------------------
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

// -------------------------------------------------------------------
// Speaker Notes Panel
// -------------------------------------------------------------------
function renderSpeakerNotes(slideNum) {
  const contentEl = document.getElementById('notesContent');
  const note = speakerNotes[slideNum];
  if (!note) {
    contentEl.innerHTML = `<p class="dim">No additional presenter notes for Slide ${slideNum}.</p>`;
    return;
  }
  
  let pointsHtml = note.points.map(pt => `<li>${pt}</li>`).join('');
  contentEl.innerHTML = `
    <div class="notes-section">
      <h5>${note.heading}</h5>
      <ul>${pointsHtml}</ul>
    </div>
    <div class="viva-qa-box">
      <div class="viva-q">${note.vivaQ}</div>
      <div class="viva-a">${note.vivaA}</div>
    </div>
  `;
}

function toggleNotes(forceState) {
  const drawer = document.getElementById('notesDrawer');
  if (typeof forceState === 'boolean') {
    drawer.classList.toggle('open', forceState);
  } else {
    drawer.classList.toggle('open');
  }
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

// -------------------------------------------------------------------
// Event Listeners & Shortcuts
// -------------------------------------------------------------------
function setupEventListeners() {
  // Navigation buttons
  document.getElementById('btnNext').addEventListener('click', nextSlide);
  document.getElementById('btnPrev').addEventListener('click', prevSlide);
  
  // Header buttons
  document.getElementById('btnNotes').addEventListener('click', () => toggleNotes());
  document.getElementById('btnCloseNotes').addEventListener('click', () => toggleNotes(false));
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
    // If typing in an input, don't hijack keys
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
      case 'n':
      case 'N':
        e.preventDefault();
        toggleNotes();
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
        toggleNotes(false);
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

// -------------------------------------------------------------------
// Interactive Kitchen Recommender Sandbox (Slide 8)
// -------------------------------------------------------------------
function updateKitchenDemo() {
  const capacity = parseInt(document.getElementById('rngCapacity').value, 10);
  document.getElementById('lblCapacity').textContent = capacity;

  const mealContext = document.getElementById('selMealContext').value;
  const menuDish = document.getElementById('selMenuDish').value;

  // Turnout multiplier based on meal/day context
  let turnoutMultiplier = 0.85; // default
  let contextLabel = "Normal Turnout";
  if (mealContext === 'weekday_lunch') {
    turnoutMultiplier = 0.78;
    contextLabel = "Weekday Lunch (~78% in mess)";
  } else if (mealContext === 'weekend_dinner') {
    turnoutMultiplier = 0.70;
    contextLabel = "Weekend Dinner (~70%, outings high)";
  } else if (mealContext === 'exam_dinner') {
    turnoutMultiplier = 0.94;
    contextLabel = "Exam Week Dinner (~94% high mess turnout)";
  } else if (mealContext === 'fest_lunch') {
    turnoutMultiplier = 0.62;
    contextLabel = "Fest Day Lunch (~62% high food stalls)";
  }

  // Estimated Diners with confidence range
  const estDiners = Math.round(capacity * turnoutMultiplier);
  const confidenceMargin = Math.round(estDiners * 0.06);
  document.getElementById('dispEstDiners').textContent = `${estDiners} ± ${confidenceMargin}`;

  // Old Status-Quo rule-of-thumb: Cook for 90% of total residents fixed
  const oldPrepPortions = Math.round(capacity * 0.90);
  document.getElementById('dispOldPrep').textContent = `${oldPrepPortions} portions`;

  // Safety buffer (+6.5% to guard against shortages)
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
      // round to batch of 25
      reqQty = Math.ceil(reqQty / 25) * 25;
      vesselText = `${Math.ceil(reqQty / item.vesselCap)} Hot Cases`;
      totalMestimatorKg += (reqQty * 0.035); // 35g per roti
      totalOldKg += (oldPrepPortions * item.portionKg * item.split * 0.035);
    } else {
      reqQty = (targetPortions * item.portionKg * item.split);
      // round up to nearest 2.5 kg / L
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
  const savedInr = Math.round(savedKg * 80); // approx ₹80/kg cooked mess food cost
  document.getElementById('dispSavedKg').textContent = `~${savedKg} kg cooked food (₹${savedInr.toLocaleString('en-IN')} saved)`;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initPresentation);
