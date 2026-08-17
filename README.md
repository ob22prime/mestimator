# Mestimator: Mess Food Surplus Estimator & Food-Waste Reduction System

> **UCS503 Software Engineering Course Project | 3rd Year (Semester 5) | Batch 3C15**  
> **Thapar Institute of Engineering and Technology, Patiala**  
> **Live Presentation Slide Deck:** [https://ob22prime.github.io/mestimator/](https://ob22prime.github.io/mestimator/)

---

## 📌 Project Overview & Core Thesis
Hostel messes face unpredictable student dining turnout due to exam schedules, weekend outings, campus events, and fluctuating dish popularity. Today, kitchen staff rely on static rules-of-thumb and total resident counts (~800 residents), leading to massive daily overcooking of perishable dishes.

**Mestimator** is an operational decision-support system tailored for hostel mess managers. It forecasts meal attendance and dish-level demand, and converts expected diners into practical kitchen batch units (e.g., standard deghs, kg of rice, liters of dal) with safety buffers to eliminate food waste without risking shortages.

---

## 🚀 Live Presentation Slide Deck Structure
The interactive web-based presentation deck (`index.html`) is structured strictly according to the UCS503 project planning guidelines:

1. **Title & Overview**: Domain context, hostel setting, team batch details, and core thesis.
2. **Table of Contents**: 10-point roadmap covering requirements, architecture, and pilot design.
3. **Introduction**: Campus food waste reality, urgency, and project objectives.
4. **Project Scope & Boundaries**: In-scope deliverables vs. strict non-goals (NO medicine, NO open student-to-student redistribution, NO black-box LLM wrappers).
5. **Proposed Functions & Kitchen Pipeline**: 6-stage kitchen operational cycle and data flow diagram.
6. **Target Users & Personas**: Mess Manager (Planner), Head Cook (Physical Batches), and Warden (Audit & ROI).
7. **System Features & Decision Engine**: Turnout ML + Dish Preference Matrix + Recipe Batch Yields + Asymmetric Loss Function.
8. **Interfaces & Interactive Decision Sandbox**: High-contrast Kitchen PWA mockup with live dynamic batch calculator.
9. **Performance, Security & Quality Goals**: Sub-400ms latency, offline resilience via IndexedDB, and zero-PII privacy guarantee.
10. **Initial Planning, Feasibility & 17-Week Live Pilot**: Gantt chart roadmap, vessel capacity mapping, and active prospective data collection protocol (started 10 Aug 2026).
11. **Conclusion, Baselines & References**: Comparative benchmark against Manager Rule-of-Thumb, 7-Day SMA, and academic citations (MDPI Sustainability 2025, FSSAI Orange Book).

---

## 🛠️ Slide Deck Interactive Keyboard Controls
- `→` / `Space` / `PageDown`: Next Slide
- `←` / `PageUp`: Previous Slide
- `Home` / `End`: Jump to First / Last Slide
- `N`: Toggle Presenter Speaking Notes & Viva Q&A Drawer
- `O`: Toggle Slide Overview Grid
- `F`: Toggle Fullscreen Presentation Mode
- `Escape`: Close Overlays

---

## 📊 Evaluation Baselines & Metrics
Mestimator is quantitatively benchmarked across 4 operational baselines:
- **Baseline 0 (Status Quo):** Mess Manager rough plate count intuition.
- **Baseline 1:** Same Day Previous Week attendance.
- **Baseline 2:** 7-Day / 14-Day Rolling Moving Average (SMA).
- **Mestimator (Proposed):** Multi-factor Gradient Boosted Trees + Recipe Yield Quantizer + Asymmetric Shortage Guard.

### Primary Metrics:
- **WAPE & MAE** for attendance and item-level demand forecasting.
- **Waste per 100 Diners (kg)** (Target: reduce surplus from ~12 kg to < 4 kg per 100 diners).
- **Zero Shortage Rate:** 0% unmanaged dining stockouts during active meal shifts.
- **Staff Override Adherence Rate:** Target > 80% recommendation acceptance.

---

## 📚 Key References
1. *Forecasting Meal Demand in University Dining Facilities: A Practical Machine Learning Approach*, MDPI Sustainability (2025), 17(2), 379.
2. *Orange Book for Campuses: Food Safety & Waste Management Guidelines*, Food Safety and Standards Authority of India (FSSAI).
3. *Food Safety and Standards (Recovery & Distribution of Surplus Food) Regulations*, FSSAI.
