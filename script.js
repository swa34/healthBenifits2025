/**
 * Health Benefits Advisor - Main Script
 * Handles interactivity for recommendations page
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
  if (!container || typeof healthPlans === 'undefined') return;

  // Sort plans by estimated cost for healthy individual
  const sortedPlans = [...healthPlans].sort((a, b) => {
    return a.estimatedAnnualCosts.averageIndividual.total - b.estimatedAnnualCosts.averageIndividual.total;
  });

  // Mark best value plan
  const bestValueIndex = 0;

  sortedPlans.forEach((plan, index) => {
    const card = createRecommendationCard(plan, index === bestValueIndex);
    container.appendChild(card);
  });
}

/**
 * Create Recommendation Card Element
 */
function createRecommendationCard(plan, isBestValue) {
  const card = document.createElement('div');
  card.className = `recommendation-card ${isBestValue ? 'best-value' : ''}`;

  const prosHTML = plan.pros.map(pro => `<li>${pro}</li>`).join('');
  const consHTML = plan.cons.map(con => `<li>${con}</li>`).join('');

  card.innerHTML = `
    <div class="plan-header">
      <h3 class="plan-name">${plan.name}</h3>
      <p class="plan-category">${plan.category}</p>
      <p class="plan-carrier">${plan.carrier}</p>
    </div>

    <div class="plan-cost">
      <span class="cost-amount">$${plan.premiums.monthly.employee}</span>
      <span class="cost-period">/month (employee only)</span>
    </div>

    <div class="plan-details">
      <div class="detail-row">
        <span class="detail-label">Annual Premium</span>
        <span class="detail-value">$${plan.premiums.annual.employee.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Deductible</span>
        <span class="detail-value">$${plan.deductible.individual.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Out-of-Pocket Max</span>
        <span class="detail-value">$${plan.outOfPocketMax.individual.toLocaleString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Network</span>
        <span class="detail-value">${plan.network.type}</span>
      </div>
      ${plan.hsaEligible ? `
      <div class="detail-row">
        <span class="detail-label">Employer HSA Contribution</span>
        <span class="detail-value">$${plan.employerHSAContribution.employee.toLocaleString()}</span>
      </div>
      ` : ''}
      <div class="detail-row">
        <span class="detail-label">Est. Annual Cost (Avg.)</span>
        <span class="detail-value">$${plan.estimatedAnnualCosts.averageIndividual.total.toLocaleString()}</span>
      </div>
    </div>

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

    <div class="best-for-tags">
      ${plan.bestFor.map(persona => {
        const personaData = personas[persona];
        return `<span class="persona-tag" title="${personaData ? personaData.description : ''}">${personaData ? personaData.name : persona}</span>`;
      }).join('')}
    </div>

    <div style="margin-top: var(--space-lg);">
      <a href="calculator.html" class="btn btn-primary btn-block">Calculate My Costs</a>
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

  const prioritiesHTML = persona.priorities.map(priority => `<li>${priority}</li>`).join('');

  card.innerHTML = `
    <h3 class="persona-name">${persona.name}</h3>
    <p class="persona-description">${persona.description}</p>

    <div class="persona-priorities">
      <h4>Top Priorities</h4>
      <ul>
        ${prioritiesHTML}
      </ul>
    </div>

    <p style="margin-top: var(--space-md); font-size: var(--font-size-sm); color: var(--text-tertiary);">
      <strong>Typical Usage:</strong> ${persona.typicalUsage}
    </p>
  `;

  // Add click handler
  card.addEventListener('click', () => {
    // Remove selected class from all cards
    document.querySelectorAll('.persona-card').forEach(c => c.classList.remove('selected'));

    // Add selected class to clicked card
    card.classList.add('selected');

    // Show recommended plans for this persona
    highlightRecommendedPlans(key);

    // Scroll to recommendations
    document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  return card;
}

/**
 * Highlight Recommended Plans for Persona
 */
function highlightRecommendedPlans(personaKey) {
  const recommendationCards = document.querySelectorAll('.recommendation-card');

  recommendationCards.forEach(card => {
    const tags = card.querySelectorAll('.persona-tag');
    let isRecommended = false;

    tags.forEach(tag => {
      const personaData = Object.values(personas).find(p => p.name === tag.textContent);
      if (personaData) {
        const personaId = Object.keys(personas).find(k => personas[k] === personaData);
        if (personaId === personaKey) {
          isRecommended = true;
          tag.style.background = 'var(--primary-color)';
          tag.style.color = 'white';
        } else {
          tag.style.background = '';
          tag.style.color = '';
        }
      }
    });

    // Add subtle highlight to recommended cards
    if (isRecommended) {
      card.style.borderColor = 'var(--primary-color)';
      card.style.transform = 'scale(1.02)';
    } else {
      card.style.borderColor = '';
      card.style.transform = '';
      card.style.opacity = '0.6';
    }
  });

  // Reset after 5 seconds
  setTimeout(() => {
    recommendationCards.forEach(card => {
      card.style.opacity = '';
      card.style.borderColor = '';
      card.style.transform = '';
      const tags = card.querySelectorAll('.persona-tag');
      tags.forEach(tag => {
        tag.style.background = '';
        tag.style.color = '';
      });
    });
  }, 5000);
}

/**
 * Initialize Comparison Table
 */
function initComparisonTable() {
  const table = document.getElementById('comparison-table');
  const tbody = document.getElementById('comparison-tbody');

  if (!table || !tbody || typeof healthPlans === 'undefined') return;

  // Add plan headers
  const thead = table.querySelector('thead tr');
  healthPlans.forEach(plan => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.innerHTML = `<strong>${plan.name}</strong><br><small>${plan.carrier}</small>`;
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
      { label: 'Monthly Premium (Employee)', getValue: p => `$${p.premiums.monthly.employee}` },
      { label: 'Annual Premium (Employee)', getValue: p => `$${p.premiums.annual.employee.toLocaleString()}` },
      { label: 'Deductible (Individual)', getValue: p => `$${p.deductible.individual.toLocaleString()}` },
      { label: 'Out-of-Pocket Max', getValue: p => `$${p.outOfPocketMax.individual.toLocaleString()}` },
      { label: 'Network Type', getValue: p => p.network.type },
      { label: 'Network Size', getValue: p => p.network.size },
      { label: 'HSA Eligible', getValue: p => p.hsaEligible ? 'Yes' : 'No' },
      { label: 'Employer HSA Contribution', getValue: p => p.hsaEligible ? `$${p.employerHSAContribution.employee}` : 'N/A' }
    ],
    costs: [
      { label: 'Monthly Premium (Employee)', getValue: p => `$${p.premiums.monthly.employee}` },
      { label: 'Monthly Premium (Family)', getValue: p => `$${p.premiums.monthly.family}` },
      { label: 'Annual Premium (Employee)', getValue: p => `$${p.premiums.annual.employee.toLocaleString()}` },
      { label: 'Annual Premium (Family)', getValue: p => `$${p.premiums.annual.family.toLocaleString()}` },
      { label: 'Deductible (Individual)', getValue: p => `$${p.deductible.individual.toLocaleString()}` },
      { label: 'Deductible (Family)', getValue: p => `$${p.deductible.family.toLocaleString()}` },
      { label: 'Out-of-Pocket Max (Individual)', getValue: p => `$${p.outOfPocketMax.individual.toLocaleString()}` },
      { label: 'Out-of-Pocket Max (Family)', getValue: p => `$${p.outOfPocketMax.family.toLocaleString()}` },
      { label: 'Coinsurance', getValue: p => `${p.coinsurance}%` },
      { label: 'Est. Cost (Healthy Individual)', getValue: p => `$${p.estimatedAnnualCosts.healthyIndividual.total.toLocaleString()}` },
      { label: 'Est. Cost (Average Individual)', getValue: p => `$${p.estimatedAnnualCosts.averageIndividual.total.toLocaleString()}` },
      { label: 'Est. Cost (Chronic Condition)', getValue: p => `$${p.estimatedAnnualCosts.chronicCondition.total.toLocaleString()}` },
      { label: 'Est. Cost (Family)', getValue: p => `$${p.estimatedAnnualCosts.family.total.toLocaleString()}` }
    ],
    coverage: [
      { label: 'Primary Care Visit', getValue: p => p.coverage.primaryCare.cost },
      { label: 'Specialist Visit', getValue: p => p.coverage.specialist.cost },
      { label: 'Urgent Care', getValue: p => p.coverage.urgentCare.cost },
      { label: 'Emergency Room', getValue: p => p.coverage.emergency.cost },
      { label: 'Generic Rx', getValue: p => p.coverage.prescription.generic },
      { label: 'Preferred Brand Rx', getValue: p => p.coverage.prescription.preferred },
      { label: 'Non-Preferred Rx', getValue: p => p.coverage.prescription.nonPreferred },
      { label: 'Specialty Rx', getValue: p => p.coverage.prescription.specialty },
      { label: 'Dental Coverage', getValue: p => p.coverage.dental.included ? 'Included' : 'Not Included' },
      { label: 'Dental Preventive', getValue: p => p.coverage.dental.preventive },
      { label: 'Vision Coverage', getValue: p => p.coverage.vision.included ? 'Included' : 'Not Included' },
      { label: 'Vision Exam', getValue: p => p.coverage.vision.exam }
    ]
  };

  const selectedRows = rows[view] || rows.overview;

  selectedRows.forEach(row => {
    const tr = document.createElement('tr');

    const labelCell = document.createElement('td');
    labelCell.className = 'sticky-col';
    labelCell.textContent = row.label;
    tr.appendChild(labelCell);

    healthPlans.forEach(plan => {
      const td = document.createElement('td');
      td.textContent = row.getValue(plan);
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
  if (!canvas || typeof healthPlans === 'undefined' || typeof Chart === 'undefined') return;

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

  // Initial chart
  updateCostChart('healthyIndividual');
}

/**
 * Update Cost Chart Based on Scenario
 */
function updateCostChart(scenario) {
  const canvas = document.getElementById('costComparisonChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const labels = healthPlans.map(p => p.name);
  const data = healthPlans.map(p => p.estimatedAnnualCosts[scenario].total);
  const minCost = Math.min(...data);

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
              const plan = healthPlans[context.dataIndex];
              const scenarioData = plan.estimatedAnnualCosts[scenario];
              return [
                `Premiums: $${scenarioData.premiums.toLocaleString()}`,
                `Medical: $${scenarioData.expectedMedical.toLocaleString()}`,
                scenarioData.hsaContribution < 0 ? `HSA Credit: $${Math.abs(scenarioData.hsaContribution).toLocaleString()}` : ''
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
            color: textColor
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
    const currentScenario = document.querySelector('.chart-btn.active')?.dataset.scenario || 'healthyIndividual';
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
