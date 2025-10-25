/**
 * Scott & Liz Family Benefits - Main Script
 * Handles interactivity for family benefits comparison page
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initBackToTop();
  initAnimations();
  initRecommendationCards();
  initPersonaCards();
  initComparisonTable();
  initCostChart();
  initStatCounters();
});

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Add animation class
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 300);
    });
  }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);

      // Toggle hamburger animation
      const hamburger = menuToggle.querySelector('.hamburger');
      if (hamburger) {
        hamburger.style.transform = isOpen ? 'rotate(45deg)' : '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a link
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');

  if (progressBar) {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;

      progressBar.style.width = scrolled + '%';
      progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
    });
  }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Scroll Animations
 */
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animatedElements = document.querySelectorAll('.recommendation-card, .persona-card, .step, .faq-item');
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Generate Recommendation Cards
 */
function initRecommendationCards() {
  const container = document.getElementById('recommendation-cards');
  if (!container || typeof allMedicalPlans === 'undefined') return;

  // Sort plans by estimated moderate cost
  const sortedPlans = [...allMedicalPlans].sort((a, b) => {
    const aCost = a.estimatedAnnualCost ? a.estimatedAnnualCost.moderate : 999999;
    const bCost = b.estimatedAnnualCost ? b.estimatedAnnualCost.moderate : 999999;
    return aCost - bCost;
  });

  // Show top recommended plans and alternatives
  sortedPlans.forEach((plan, index) => {
    const card = createRecommendationCard(plan, plan.recommended === true);
    container.appendChild(card);
  });
}

/**
 * Create Recommendation Card Element
 */
function createRecommendationCard(plan, isRecommended) {
  const card = document.createElement('div');
  card.className = `recommendation-card ${isRecommended ? 'best-value' : ''} ${plan.badge ? 'has-badge' : ''}`;

  const prosHTML = plan.pros ? plan.pros.map(pro => `<li>${pro}</li>`).join('') : '';
  const consHTML = plan.cons ? plan.cons.map(con => `<li>${con}</li>`).join('') : '';

  // Get the appropriate premium (family is what we care about)
  const monthlyPremium = plan.premiums.family_monthly || plan.premiums.monthly?.family || 0;
  const annualPremium = plan.premiums.family_annual || plan.premiums.annual?.family || 0;

  // Get deductibles
  const deductibleIndividual = plan.deductible.individual || 0;
  const deductibleFamily = plan.deductible.family || 0;

  // Get OOP max
  const oopMax = plan.oopMax ? (plan.oopMax.family || plan.oopMax.individual || 0) : 0;

  // Get estimated costs
  const estimatedLow = plan.estimatedAnnualCost ? plan.estimatedAnnualCost.low : null;
  const estimatedMod = plan.estimatedAnnualCost ? plan.estimatedAnnualCost.moderate : null;
  const estimatedHigh = plan.estimatedAnnualCost ? plan.estimatedAnnualCost.high : null;

  // Display badge if it exists
  const badgeHTML = plan.badge ? `<span class="plan-badge">${plan.badge}</span>` : '';

  card.innerHTML = `
    ${badgeHTML}
    <div class="plan-header">
      <h3 class="plan-name">${plan.name}</h3>
      <p class="plan-category">${plan.category}</p>
      <p class="plan-carrier">${plan.employer} - ${plan.carrier}</p>
    </div>

    <div class="plan-cost">
      <span class="cost-amount">$${monthlyPremium.toFixed(2)}</span>
      <span class="cost-period">/month (family of 4)</span>
    </div>

    <div class="plan-details">
      <div class="detail-row">
        <span class="detail-label">Annual Premium</span>
        <span class="detail-value">$${annualPremium.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Individual Deductible</span>
        <span class="detail-value">$${deductibleIndividual.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Family Deductible</span>
        <span class="detail-value">$${deductibleFamily.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Family Out-of-Pocket Max</span>
        <span class="detail-value">$${oopMax.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Network</span>
        <span class="detail-value">${plan.network || 'N/A'}</span>
      </div>
      ${plan.hsa && plan.hsa.eligible ? `
      <div class="detail-row">
        <span class="detail-label">HSA Employer Match</span>
        <span class="detail-value">$${plan.hsa.employerContribution.toLocaleString()}</span>
      </div>
      ` : ''}
      ${estimatedMod ? `
      <div class="detail-row">
        <span class="detail-label">Est. Annual Total (Moderate Use)</span>
        <span class="detail-value">$${estimatedMod.toLocaleString()}</span>
      </div>
      ` : ''}
    </div>

    ${prosHTML && consHTML ? `
    <div class="pros-cons">
      <h4 style="color: var(--success-color);">Advantages</h4>
      <ul class="pros">
        ${prosHTML}
      </ul>

      <h4 style="color: var(--danger-color);">Considerations</h4>
      <ul class="cons">
        ${consHTML}
      </ul>
    </div>
    ` : ''}

    ${plan.bestFor ? `
    <div class="best-for-tags">
      <strong style="display: block; margin-bottom: 8px; font-size: 0.9em;">Best For:</strong>
      <p style="font-size: 0.9em; color: var(--text-secondary);">${plan.bestFor}</p>
    </div>
    ` : ''}

    <div style="margin-top: var(--space-lg);">
      <a href="calculator.html" class="btn btn-primary btn-block">Calculate Costs for Your Family</a>
    </div>
  `;

  return card;
}

/**
 * Generate Persona Cards
 */
function initPersonaCards() {
  const container = document.getElementById('persona-cards');
  if (!container || typeof personas === 'undefined') return;

  // Show the current family persona
  Object.entries(personas).forEach(([key, persona]) => {
    const card = createPersonaCard(key, persona);
    container.appendChild(card);
  });
}

/**
 * Create Persona Card Element
 */
function createPersonaCard(key, persona) {
  const card = document.createElement('div');
  card.className = 'persona-card';
  card.setAttribute('data-persona', key);

  const prioritiesHTML = persona.priorities ? persona.priorities.map(priority => `<li>${priority}</li>`).join('') : '';

  card.innerHTML = `
    <h3 class="persona-name">${persona.name}</h3>
    <p class="persona-description">${persona.description}</p>

    ${prioritiesHTML ? `
    <div class="persona-priorities">
      <h4>Top Priorities</h4>
      <ul>
        ${prioritiesHTML}
      </ul>
    </div>
    ` : ''}

    ${persona.recommendedMedical ? `
    <div style="margin-top: var(--space-md); padding: var(--space-sm); background: var(--bg-secondary); border-radius: 8px;">
      <strong>Recommended Medical:</strong> ${allMedicalPlans.find(p => p.id === persona.recommendedMedical)?.name || persona.recommendedMedical}
    </div>
    ` : ''}

    ${persona.recommendedDental ? `
    <div style="margin-top: var(--space-sm); padding: var(--space-sm); background: var(--bg-secondary); border-radius: 8px;">
      <strong>Recommended Dental:</strong> ${persona.recommendedDental}
    </div>
    ` : ''}
  `;

  return card;
}

/**
 * Initialize Comparison Table
 */
function initComparisonTable() {
  const table = document.getElementById('comparison-table');
  const tbody = document.getElementById('comparison-tbody');

  if (!table || !tbody || typeof allMedicalPlans === 'undefined') return;

  // Add plan headers
  const thead = table.querySelector('thead tr');
  allMedicalPlans.forEach(plan => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.innerHTML = `<strong>${plan.name}</strong><br><small class="employer-badge">${plan.employer}</small><br><small>${plan.planYear}</small>`;
    thead.appendChild(th);
  });

  // Table view toggle
  const tableToggles = document.querySelectorAll('.table-toggle');
  tableToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      tableToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');

      const view = toggle.dataset.view;
      updateComparisonTable(view);
    });
  });

  // Initial load
  updateComparisonTable('overview');
}

/**
 * Update Comparison Table Based on View
 */
function updateComparisonTable(view) {
  const tbody = document.getElementById('comparison-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const rows = {
    overview: [
      { label: 'Monthly Premium (Family)', getValue: p => `$${(p.premiums.family_monthly || p.premiums.monthly?.family || 0).toFixed(2)}` },
      { label: 'Annual Premium (Family)', getValue: p => `$${(p.premiums.family_annual || p.premiums.annual?.family || 0).toLocaleString()}` },
      { label: 'Individual Deductible', getValue: p => `$${(p.deductible.individual || 0).toLocaleString()}` },
      { label: 'Family Deductible', getValue: p => `$${(p.deductible.family || 0).toLocaleString()}` },
      { label: 'Deductible Type', getValue: p => p.deductible.type || 'N/A' },
      { label: 'Family OOP Max', getValue: p => `$${(p.oopMax?.family || p.oopMax?.individual || 0).toLocaleString()}` },
      { label: 'Network', getValue: p => p.network || 'N/A' },
      { label: 'HSA Eligible', getValue: p => p.hsa?.eligible ? 'Yes' : 'No' },
      { label: 'HSA Employer Match', getValue: p => p.hsa?.eligible ? `$${p.hsa.employerContribution}` : 'N/A' }
    ],
    costs: [
      { label: 'Monthly Premium', getValue: p => `$${(p.premiums.family_monthly || 0).toFixed(2)}` },
      { label: 'Annual Premium', getValue: p => `$${(p.premiums.family_annual || 0).toLocaleString()}` },
      { label: 'Surcharge (if applicable)', getValue: p => p.surcharge ? `$${p.surcharge.workingSpouse || 0}/month` : 'None' },
      { label: 'Individual Deductible', getValue: p => `$${(p.deductible.individual || 0).toLocaleString()}` },
      { label: 'Family Deductible', getValue: p => `$${(p.deductible.family || 0).toLocaleString()}` },
      { label: 'Family OOP Max', getValue: p => `$${(p.oopMax?.family || 0).toLocaleString()}` },
      { label: 'Coinsurance', getValue: p => p.coinsurance || 'N/A' },
      { label: 'Est. Cost (Low Usage)', getValue: p => p.estimatedAnnualCost?.low ? `$${p.estimatedAnnualCost.low.toLocaleString()}` : 'N/A' },
      { label: 'Est. Cost (Moderate Usage)', getValue: p => p.estimatedAnnualCost?.moderate ? `$${p.estimatedAnnualCost.moderate.toLocaleString()}` : 'N/A' },
      { label: 'Est. Cost (High Usage)', getValue: p => p.estimatedAnnualCost?.high ? `$${p.estimatedAnnualCost.high.toLocaleString()}` : 'N/A' }
    ],
    coverage: [
      { label: 'Primary Care Visit', getValue: p => typeof p.copays?.pcp === 'number' ? `$${p.copays.pcp}` : (p.copays?.pcp || 'N/A') },
      { label: 'Specialist Visit', getValue: p => typeof p.copays?.specialist === 'number' ? `$${p.copays.specialist}` : (p.copays?.specialist || 'N/A') },
      { label: 'Urgent Care', getValue: p => typeof p.copays?.urgentCare === 'number' ? `$${p.copays.urgentCare}` : (p.copays?.urgentCare || 'N/A') },
      { label: 'Emergency Room', getValue: p => typeof p.copays?.er === 'number' ? `$${p.copays.er}` : (p.copays?.er || 'N/A') },
      { label: 'Generic Rx (Tier 1)', getValue: p => p.rx?.tier1_retail ? `$${p.rx.tier1_retail}` : (p.rx?.tier1 || 'N/A') },
      { label: 'Preferred Brand Rx (Tier 2)', getValue: p => p.rx?.tier2_retail ? `$${p.rx.tier2_retail}` : (p.rx?.tier2 || 'N/A') },
      { label: 'Non-Preferred Rx (Tier 3)', getValue: p => p.rx?.tier3_retail ? `$${p.rx.tier3_retail}` : (p.rx?.tier3 || 'N/A') },
      { label: 'Rx Deductible Required', getValue: p => p.rx?.deductible ? 'Yes' : 'No' },
      { label: 'PCP Required', getValue: p => p.requirements?.pcpRequired ? 'Yes' : 'No' },
      { label: 'Referrals Required', getValue: p => p.requirements?.referralsRequired ? 'Yes' : 'No' }
    ]
  };

  const selectedRows = rows[view] || rows.overview;

  selectedRows.forEach(row => {
    const tr = document.createElement('tr');

    const labelCell = document.createElement('td');
    labelCell.className = 'sticky-col';
    labelCell.textContent = row.label;
    tr.appendChild(labelCell);

    allMedicalPlans.forEach(plan => {
      const td = document.createElement('td');
      try {
        td.textContent = row.getValue(plan);
      } catch (e) {
        td.textContent = 'N/A';
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

/**
 * Initialize Cost Comparison Chart
 */
let costChart = null;

function initCostChart() {
  const canvas = document.getElementById('costComparisonChart');
  if (!canvas || typeof allMedicalPlans === 'undefined' || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');

  // Chart button controls
  const chartButtons = document.querySelectorAll('.chart-btn');
  chartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chartButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const scenario = btn.dataset.scenario;
      updateCostChart(scenario);
    });
  });

  // Initial chart - use "averageIndividual" as fallback scenario name
  updateCostChart('moderate');
}

/**
 * Update Cost Chart Based on Scenario
 */
function updateCostChart(scenario) {
  const canvas = document.getElementById('costComparisonChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Map old scenario names to new ones
  const scenarioMap = {
    'healthyIndividual': 'low',
    'averageIndividual': 'moderate',
    'chronicCondition': 'high',
    'family': 'moderate'
  };

  const actualScenario = scenarioMap[scenario] || scenario || 'moderate';

  const labels = allMedicalPlans.map(p => p.name);
  const data = allMedicalPlans.map(p => p.estimatedAnnualCost?.[actualScenario] || 0);
  const minCost = Math.min(...data.filter(d => d > 0));

  // Destroy existing chart
  if (costChart) {
    costChart.destroy();
  }

  // Get theme colors
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  costChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Annual Cost',
        data: data,
        backgroundColor: data.map(d => d === minCost ? 'rgba(16, 185, 129, 0.8)' : 'rgba(37, 99, 235, 0.8)'),
        borderColor: data.map(d => d === minCost ? 'rgba(16, 185, 129, 1)' : 'rgba(37, 99, 235, 1)'),
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Total Cost: $' + context.parsed.y.toLocaleString();
            },
            afterLabel: function(context) {
              const plan = allMedicalPlans[context.dataIndex];
              return [
                `Premium: $${(plan.premiums.family_annual || 0).toLocaleString()}`,
                plan.hsa?.eligible ? `HSA Match: $${plan.hsa.employerContribution}` : ''
              ].filter(Boolean);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            },
            color: textColor
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          ticks: {
            color: textColor,
            maxRotation: 45,
            minRotation: 45
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * Animated Stat Counters
 */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  };

  // Intersection observer for counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Skip if it's just "#"
    if (href === '#') return;

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Update chart colors when theme changes
 */
document.documentElement.addEventListener('themechange', () => {
  if (costChart) {
    const currentScenario = document.querySelector('.chart-btn.active')?.dataset.scenario || 'moderate';
    updateCostChart(currentScenario);
  }
});

// Trigger theme change event when theme is toggled
const originalSetAttribute = HTMLElement.prototype.setAttribute;
HTMLElement.prototype.setAttribute = function(name, value) {
  const oldValue = this.getAttribute(name);
  originalSetAttribute.call(this, name, value);

  if (this === document.documentElement && name === 'data-theme' && oldValue !== value) {
    this.dispatchEvent(new Event('themechange'));
  }
};
