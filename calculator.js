/**
 * Health Benefits Calculator
 * Real-time cost calculation engine with interactive features
 */

// Calculator state
const calculatorState = {
  inputs: {
    coverageTier: 'employee',
    age: 35,
    numDependents: 0,
    primaryVisits: 2,
    specialistVisits: 0,
    urgentCareVisits: 0,
    erVisits: 0,
    genericRx: 0,
    preferredRx: 0,
    nonpreferredRx: 0,
    specialtyRx: 0,
    plannedProcedures: 0,
    hasChronicCondition: false
  },
  results: null
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  initCalculatorInputs();
  initSliders();
  initCalculateButton();
  initSavedScenarios();
  initViewToggles();
  loadSavedInputs();
});

/**
 * Initialize all calculator inputs
 */
function initCalculatorInputs() {
  // Coverage tier
  const coverageTier = document.getElementById('coverage-tier');
  if (coverageTier) {
    coverageTier.addEventListener('change', (e) => {
      calculatorState.inputs.coverageTier = e.target.value;
      saveInputs();
    });
  }

  // Age
  const age = document.getElementById('age');
  if (age) {
    age.addEventListener('input', (e) => {
      calculatorState.inputs.age = parseInt(e.target.value) || 35;
      saveInputs();
    });
  }

  // Number of dependents
  const numDependents = document.getElementById('num-dependents');
  if (numDependents) {
    numDependents.addEventListener('input', (e) => {
      calculatorState.inputs.numDependents = parseInt(e.target.value) || 0;
      saveInputs();
    });
  }

  // Planned procedures
  const plannedProcedures = document.getElementById('planned-procedures');
  if (plannedProcedures) {
    plannedProcedures.addEventListener('input', (e) => {
      calculatorState.inputs.plannedProcedures = parseInt(e.target.value) || 0;
      saveInputs();
    });
  }

  // Chronic condition checkbox
  const hasChronicCondition = document.getElementById('has-chronic-condition');
  if (hasChronicCondition) {
    hasChronicCondition.addEventListener('change', (e) => {
      calculatorState.inputs.hasChronicCondition = e.target.checked;
      saveInputs();
    });
  }
}

/**
 * Initialize all range sliders with live updates
 */
function initSliders() {
  const sliders = [
    { id: 'primary-visits', key: 'primaryVisits' },
    { id: 'specialist-visits', key: 'specialistVisits' },
    { id: 'urgent-care-visits', key: 'urgentCareVisits' },
    { id: 'er-visits', key: 'erVisits' },
    { id: 'generic-rx', key: 'genericRx' },
    { id: 'preferred-rx', key: 'preferredRx' },
    { id: 'nonpreferred-rx', key: 'nonpreferredRx' },
    { id: 'specialty-rx', key: 'specialtyRx' }
  ];

  sliders.forEach(({ id, key }) => {
    const slider = document.getElementById(id);
    if (slider) {
      const output = slider.nextElementSibling;

      slider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (output) {
          output.textContent = value;
        }
        calculatorState.inputs[key] = value;
        saveInputs();
      });
    }
  });
}

/**
 * Initialize calculate button
 */
function initCalculateButton() {
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', performCalculation);
  }

  // Also calculate on Enter key in input fields
  document.querySelectorAll('.form-control, .form-slider').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performCalculation();
      }
    });
  });
}

/**
 * Perform the main calculation
 */
function performCalculation() {
  if (typeof healthPlans === 'undefined') {
    console.error('Health plans data not loaded');
    return;
  }

  // Calculate costs for each plan
  const results = healthPlans.map(plan => {
    return calculatePlanCost(plan, calculatorState.inputs);
  });

  // Sort by total cost
  results.sort((a, b) => a.totalAnnualCost - b.totalAnnualCost);

  calculatorState.results = results;

  // Display results
  displayResults(results);

  // Scroll to results
  const resultsSection = document.querySelector('.calculator-results');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Calculate cost for a specific plan
 */
function calculatePlanCost(plan, inputs) {
  const tierKey = inputs.coverageTier;

  // Base premium
  const annualPremium = plan.premiums.annual[tierKey] || plan.premiums.annual.employee;
  const monthlyPremium = plan.premiums.monthly[tierKey] || plan.premiums.monthly.employee;

  // Calculate visit costs
  let visitCosts = 0;

  // Primary care visits
  visitCosts += calculateVisitCost(
    inputs.primaryVisits,
    plan.coverage.primaryCare.cost,
    plan
  );

  // Specialist visits
  visitCosts += calculateVisitCost(
    inputs.specialistVisits,
    plan.coverage.specialist.cost,
    plan
  );

  // Urgent care visits
  visitCosts += calculateVisitCost(
    inputs.urgentCareVisits,
    plan.coverage.urgentCare.cost,
    plan
  );

  // Emergency room visits
  visitCosts += calculateVisitCost(
    inputs.erVisits,
    plan.coverage.emergency.cost,
    plan
  );

  // Calculate prescription costs (monthly, so multiply by 12)
  let rxCosts = 0;
  rxCosts += calculateRxCost(inputs.genericRx * 12, plan.coverage.prescription.generic, plan);
  rxCosts += calculateRxCost(inputs.preferredRx * 12, plan.coverage.prescription.preferred, plan);
  rxCosts += calculateRxCost(inputs.nonpreferredRx * 12, plan.coverage.prescription.nonPreferred, plan);
  rxCosts += calculateRxCost(inputs.specialtyRx * 12, plan.coverage.prescription.specialty, plan);

  // Planned procedures
  let procedureCosts = 0;
  if (inputs.plannedProcedures > 0) {
    // Apply deductible and coinsurance
    const afterDeductible = Math.max(0, inputs.plannedProcedures - plan.deductible.individual);
    procedureCosts = afterDeductible * (plan.coinsurance / 100);
  }

  // Total medical costs before OOP max
  let totalMedicalCosts = visitCosts + rxCosts + procedureCosts;

  // Apply chronic condition modifier (estimate 20% increase in costs)
  if (inputs.hasChronicCondition) {
    totalMedicalCosts *= 1.2;
  }

  // Apply out-of-pocket maximum
  const oopMax = tierKey === 'family' || tierKey === 'employeeChildren' || tierKey === 'employeeSpouse'
    ? plan.outOfPocketMax.family
    : plan.outOfPocketMax.individual;

  totalMedicalCosts = Math.min(totalMedicalCosts, oopMax);

  // HSA contribution (reduces net cost)
  const hsaContribution = plan.hsaEligible
    ? (tierKey === 'family' ? plan.employerHSAContribution.family : plan.employerHSAContribution.employee)
    : 0;

  // Total annual cost
  const totalAnnualCost = annualPremium + totalMedicalCosts - hsaContribution;

  return {
    planId: plan.id,
    planName: plan.name,
    planCategory: plan.category,
    monthlyPremium,
    annualPremium,
    visitCosts,
    rxCosts,
    procedureCosts,
    totalMedicalCosts,
    hsaContribution,
    totalAnnualCost,
    deductible: tierKey === 'family' ? plan.deductible.family : plan.deductible.individual,
    oopMax,
    breakdown: {
      premiums: annualPremium,
      primaryCare: calculateVisitCost(inputs.primaryVisits, plan.coverage.primaryCare.cost, plan),
      specialist: calculateVisitCost(inputs.specialistVisits, plan.coverage.specialist.cost, plan),
      urgentCare: calculateVisitCost(inputs.urgentCareVisits, plan.coverage.urgentCare.cost, plan),
      emergency: calculateVisitCost(inputs.erVisits, plan.coverage.emergency.cost, plan),
      prescriptions: rxCosts,
      procedures: procedureCosts,
      hsaCredit: -hsaContribution
    }
  };
}

/**
 * Calculate cost for a specific type of visit
 */
function calculateVisitCost(numVisits, costStructure, plan) {
  if (numVisits === 0) return 0;

  // Parse cost structure
  if (costStructure.includes('copay')) {
    // Extract copay amount
    const copay = parseInt(costStructure.replace(/[^0-9]/g, ''));
    return numVisits * copay;
  } else if (costStructure.includes('%')) {
    // Coinsurance after deductible
    // Estimate average visit cost
    const avgVisitCost = costStructure.includes('primary') ? 150 : 250;
    return numVisits * avgVisitCost * (plan.coinsurance / 100);
  } else if (costStructure.includes('Covered') || costStructure.includes('100%')) {
    return 0;
  }

  // Default estimation
  return numVisits * 50;
}

/**
 * Calculate prescription costs
 */
function calculateRxCost(numPrescriptions, costStructure, plan) {
  if (numPrescriptions === 0) return 0;

  if (costStructure.includes('copay')) {
    const copay = parseInt(costStructure.replace(/[^0-9]/g, ''));
    return numPrescriptions * copay;
  } else if (costStructure.includes('%')) {
    // Estimate average Rx cost by type
    let avgCost = 30; // Default
    if (costStructure.includes('specialty')) avgCost = 500;
    else if (costStructure.includes('nonPreferred')) avgCost = 100;
    else if (costStructure.includes('preferred')) avgCost = 60;

    const percentage = parseInt(costStructure.replace(/[^0-9]/g, '')) || plan.coinsurance;
    return numPrescriptions * avgCost * (percentage / 100);
  }

  return numPrescriptions * 20; // Default
}

/**
 * Display calculation results
 */
function displayResults(results) {
  displaySummaryCards(results);
  displayDetailedBreakdown(results);
  displayResultsChart(results);
  displayMonthlyBreakdown(results);
  displayBreakevenAnalysis(results);
  displaySavingsComparison(results);
  displayPersonalizedRecommendation(results);
}

/**
 * Display summary cards
 */
function displaySummaryCards(results) {
  const container = document.getElementById('results-summary');
  if (!container) return;

  const bestPlan = results[0];
  const worstPlan = results[results.length - 1];
  const avgCost = results.reduce((sum, r) => sum + r.totalAnnualCost, 0) / results.length;
  const savings = worstPlan.totalAnnualCost - bestPlan.totalAnnualCost;

  container.innerHTML = `
    <div class="summary-card winner">
      <div class="summary-label">Best Plan</div>
      <div class="summary-value">${bestPlan.planName}</div>
      <div class="summary-sublabel">$${Math.round(bestPlan.totalAnnualCost).toLocaleString()} / year</div>
    </div>

    <div class="summary-card">
      <div class="summary-label">Potential Savings</div>
      <div class="summary-value">$${Math.round(savings).toLocaleString()}</div>
      <div class="summary-sublabel">vs. highest cost plan</div>
    </div>

    <div class="summary-card">
      <div class="summary-label">Average Annual Cost</div>
      <div class="summary-value">$${Math.round(avgCost).toLocaleString()}</div>
      <div class="summary-sublabel">across all plans</div>
    </div>
  `;
}

/**
 * Display detailed breakdown
 */
function displayDetailedBreakdown(results) {
  const cardsView = document.getElementById('results-cards-view');
  const tableView = document.getElementById('results-table-view');

  if (cardsView) {
    cardsView.innerHTML = results.map((result, index) => `
      <div class="result-card ${index === 0 ? 'best-plan' : ''}">
        <div class="result-card-header">
          <h4 class="result-plan-name">${result.planName}</h4>
          <div class="result-total-cost">
            <div class="cost-label">Total Annual Cost</div>
            <div class="cost-value">$${Math.round(result.totalAnnualCost).toLocaleString()}</div>
          </div>
        </div>

        <div class="cost-breakdown">
          <div class="breakdown-row">
            <span class="breakdown-label">Annual Premiums</span>
            <span class="breakdown-value">$${result.annualPremium.toLocaleString()}</span>
          </div>
          <div class="breakdown-row">
            <span class="breakdown-label">Primary Care Visits</span>
            <span class="breakdown-value">$${Math.round(result.breakdown.primaryCare).toLocaleString()}</span>
          </div>
          <div class="breakdown-row">
            <span class="breakdown-label">Specialist Visits</span>
            <span class="breakdown-value">$${Math.round(result.breakdown.specialist).toLocaleString()}</span>
          </div>
          <div class="breakdown-row">
            <span class="breakdown-label">Urgent Care Visits</span>
            <span class="breakdown-value">$${Math.round(result.breakdown.urgentCare).toLocaleString()}</span>
          </div>
          <div class="breakdown-row">
            <span class="breakdown-label">Emergency Room Visits</span>
            <span class="breakdown-value">$${Math.round(result.breakdown.emergency).toLocaleString()}</span>
          </div>
          <div class="breakdown-row">
            <span class="breakdown-label">Prescriptions</span>
            <span class="breakdown-value">$${Math.round(result.breakdown.prescriptions).toLocaleString()}</span>
          </div>
          ${result.breakdown.procedures > 0 ? `
          <div class="breakdown-row">
            <span class="breakdown-label">Planned Procedures</span>
            <span class="breakdown-value">$${Math.round(result.breakdown.procedures).toLocaleString()}</span>
          </div>
          ` : ''}
          ${result.hsaContribution > 0 ? `
          <div class="breakdown-row" style="color: var(--success-color);">
            <span class="breakdown-label">Employer HSA Contribution</span>
            <span class="breakdown-value">-$${result.hsaContribution.toLocaleString()}</span>
          </div>
          ` : ''}
          <div class="breakdown-row" style="border-top: 2px solid var(--border-color); margin-top: var(--space-sm); padding-top: var(--space-sm); font-weight: var(--font-weight-bold);">
            <span class="breakdown-label">Total Medical Costs</span>
            <span class="breakdown-value">$${Math.round(result.totalMedicalCosts).toLocaleString()}</span>
          </div>
        </div>

        <div style="margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; font-size: var(--font-size-sm); color: var(--text-tertiary);">
            <span>Deductible: $${result.deductible.toLocaleString()}</span>
            <span>OOP Max: $${result.oopMax.toLocaleString()}</span>
          </div>
          <div style="margin-top: var(--space-sm); font-size: var(--font-size-sm); color: var(--text-tertiary);">
            Monthly: $${Math.round(result.totalAnnualCost / 12).toLocaleString()}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Table view
  if (tableView) {
    const tbody = tableView.querySelector('#breakdown-tbody');
    if (tbody) {
      const categories = [
        { label: 'Annual Premiums', key: 'premiums' },
        { label: 'Primary Care', key: 'primaryCare' },
        { label: 'Specialist', key: 'specialist' },
        { label: 'Urgent Care', key: 'urgentCare' },
        { label: 'Emergency Room', key: 'emergency' },
        { label: 'Prescriptions', key: 'prescriptions' },
        { label: 'Procedures', key: 'procedures' },
        { label: 'HSA Contribution', key: 'hsaCredit' },
        { label: 'Total Medical', key: 'totalMedical' },
        { label: 'TOTAL ANNUAL COST', key: 'total' }
      ];

      // Update table headers
      const thead = tableView.querySelector('thead tr');
      if (thead) {
        thead.innerHTML = '<th scope="col">Cost Category</th>' +
          results.map(r => `<th scope="col">${r.planName}</th>`).join('');
      }

      tbody.innerHTML = categories.map(cat => {
        const cells = results.map(r => {
          let value;
          if (cat.key === 'total') {
            value = Math.round(r.totalAnnualCost);
          } else if (cat.key === 'totalMedical') {
            value = Math.round(r.totalMedicalCosts);
          } else {
            value = Math.round(r.breakdown[cat.key] || 0);
          }

          const displayValue = value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${value.toLocaleString()}`;
          const style = cat.key === 'total' ? 'font-weight: var(--font-weight-bold);' : '';

          return `<td style="${style}">${displayValue}</td>`;
        }).join('');

        const rowStyle = cat.key === 'total'
          ? 'background: var(--bg-tertiary); font-weight: var(--font-weight-bold);'
          : '';

        return `<tr style="${rowStyle}"><td class="sticky-col">${cat.label}</td>${cells}</tr>`;
      }).join('');
    }
  }
}

/**
 * Display results chart
 */
let resultsChart = null;

function displayResultsChart(results) {
  const canvas = document.getElementById('resultsChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');

  const labels = results.map(r => r.planName);
  const data = results.map(r => Math.round(r.totalAnnualCost));

  // Destroy existing chart
  if (resultsChart) {
    resultsChart.destroy();
  }

  // Get theme colors
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Annual Cost',
        data: data,
        backgroundColor: data.map((d, i) => i === 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(37, 99, 235, 0.8)'),
        borderColor: data.map((d, i) => i === 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(37, 99, 235, 1)'),
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
 * Display monthly breakdown
 */
function displayMonthlyBreakdown(results) {
  const container = document.getElementById('monthly-cards');
  if (!container) return;

  const bestPlan = results[0];
  const monthlyCost = bestPlan.totalAnnualCost / 12;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  container.innerHTML = months.map(month => `
    <div class="monthly-card">
      <div class="month-name">${month}</div>
      <div class="month-cost">$${Math.round(monthlyCost).toLocaleString()}</div>
    </div>
  `).join('');
}

/**
 * Display break-even analysis
 */
function displayBreakevenAnalysis(results) {
  const container = document.getElementById('breakeven-content');
  if (!container || results.length < 2) return;

  const analysis = [];

  for (let i = 0; i < results.length - 1; i++) {
    const planA = results[i];
    const planB = results[i + 1];

    const premiumDiff = planB.monthlyPremium - planA.monthlyPremium;
    const deductibleDiff = planA.deductible - planB.deductible;

    if (premiumDiff !== 0) {
      const monthsToBreakEven = Math.abs(deductibleDiff / premiumDiff);

      analysis.push({
        planA: planA.planName,
        planB: planB.planName,
        premiumDiff: Math.abs(premiumDiff),
        cheaper: premiumDiff > 0 ? planA.planName : planB.planName,
        monthsToBreakEven: monthsToBreakEven,
        message: monthsToBreakEven < 12
          ? `${planA.planName} becomes more cost-effective after ${Math.round(monthsToBreakEven)} months of high medical usage`
          : `${planB.planName} is more cost-effective for typical usage patterns`
      });
    }
  }

  container.innerHTML = analysis.map(a => `
    <div class="breakeven-card">
      <p><strong>${a.message}</strong></p>
      <p style="margin-top: var(--space-sm); font-size: var(--font-size-sm); color: var(--text-secondary);">
        ${a.planB} has $${Math.round(a.premiumDiff).toLocaleString()} higher monthly premium, but may save money with frequent healthcare use.
      </p>
    </div>
  `).join('');
}

/**
 * Display savings comparison
 */
function displaySavingsComparison(results) {
  const container = document.getElementById('savings-content');
  if (!container || results.length < 2) return;

  const bestPlan = results[0];

  container.innerHTML = results.slice(1).map(plan => {
    const savings = plan.totalAnnualCost - bestPlan.totalAnnualCost;
    const monthlySavings = savings / 12;

    return `
      <div class="savings-card">
        <h4>${bestPlan.planName} vs ${plan.planName}</h4>
        <div class="savings-amount">$${Math.round(savings).toLocaleString()}</div>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary);">
          Annual savings<br>
          ($${Math.round(monthlySavings).toLocaleString()}/month)
        </p>
      </div>
    `;
  }).join('');
}

/**
 * Display personalized recommendation
 */
function displayPersonalizedRecommendation(results) {
  const container = document.getElementById('personalized-rec');
  if (!container) return;

  const bestPlan = results[0];
  const inputs = calculatorState.inputs;

  let recommendation = '';
  let reasoning = [];

  // Determine recommendation reasoning
  if (inputs.hasChronicCondition || inputs.specialistVisits > 4) {
    recommendation = `Based on your chronic condition or frequent specialist visits, ${bestPlan.planName} offers the best value.`;
    reasoning.push('Lower out-of-pocket costs for frequent medical care');
    reasoning.push('Predictable copays help with budgeting');
  } else if (inputs.primaryVisits <= 2 && inputs.specialistVisits === 0 && inputs.erVisits === 0) {
    recommendation = `For your low healthcare usage, ${bestPlan.planName} minimizes costs while maintaining coverage.`;
    reasoning.push('Low premiums save money when you rarely need care');
    if (bestPlan.hsaContribution > 0) {
      reasoning.push(`Employer HSA contribution of $${bestPlan.hsaContribution} provides additional value`);
    }
    reasoning.push('Protection from catastrophic costs');
  } else {
    recommendation = `For your moderate healthcare needs, ${bestPlan.planName} provides the best balance of premium costs and coverage.`;
    reasoning.push('Optimal balance between monthly premiums and out-of-pocket costs');
    reasoning.push('Good coverage for regular medical needs');
  }

  const reasoningHTML = reasoning.map(r => `<li>${r}</li>`).join('');

  container.innerHTML = `
    <h4>${bestPlan.planName}</h4>
    <p style="font-size: var(--font-size-lg); margin: var(--space-md) 0;">
      ${recommendation}
    </p>

    <div style="margin-top: var(--space-lg);">
      <strong>Why this plan:</strong>
      <ul style="margin-top: var(--space-sm); padding-left: var(--space-xl);">
        ${reasoningHTML}
      </ul>
    </div>

    <div style="margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--border-color);">
      <strong>Your estimated costs:</strong>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-md); margin-top: var(--space-md);">
        <div>
          <div style="font-size: var(--font-size-xs); color: var(--text-tertiary);">Monthly</div>
          <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--primary-color);">
            $${Math.round(bestPlan.totalAnnualCost / 12).toLocaleString()}
          </div>
        </div>
        <div>
          <div style="font-size: var(--font-size-xs); color: var(--text-tertiary);">Annual</div>
          <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--primary-color);">
            $${Math.round(bestPlan.totalAnnualCost).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * View toggles (card vs table)
 */
function initViewToggles() {
  const toggles = document.querySelectorAll('.view-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');

      const view = toggle.dataset.view;
      const cardsView = document.getElementById('results-cards-view');
      const tableView = document.getElementById('results-table-view');

      if (view === 'cards') {
        if (cardsView) cardsView.style.display = 'grid';
        if (tableView) tableView.style.display = 'none';
      } else {
        if (cardsView) cardsView.style.display = 'none';
        if (tableView) tableView.style.display = 'block';
      }
    });
  });
}

/**
 * Save/Load inputs to localStorage
 */
function saveInputs() {
  localStorage.setItem('calculatorInputs', JSON.stringify(calculatorState.inputs));
}

function loadSavedInputs() {
  const saved = localStorage.getItem('calculatorInputs');
  if (saved) {
    try {
      const inputs = JSON.parse(saved);
      Object.assign(calculatorState.inputs, inputs);

      // Update UI
      Object.keys(inputs).forEach(key => {
        const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
        if (element) {
          if (element.type === 'checkbox') {
            element.checked = inputs[key];
          } else {
            element.value = inputs[key];
          }

          // Update slider outputs
          if (element.classList.contains('form-slider')) {
            const output = element.nextElementSibling;
            if (output) output.textContent = inputs[key];
          }
        }
      });
    } catch (e) {
      console.error('Error loading saved inputs:', e);
    }
  }
}

/**
 * Saved scenarios functionality
 */
function initSavedScenarios() {
  const saveBtn = document.getElementById('save-scenario');
  const clearBtn = document.getElementById('clear-scenarios');
  const resetBtn = document.getElementById('reset-calculator');

  if (saveBtn) {
    saveBtn.addEventListener('click', saveScenario);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllScenarios);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetCalculator);
  }

  loadScenarios();
}

function saveScenario() {
  if (!calculatorState.results) {
    alert('Please calculate costs first before saving a scenario.');
    return;
  }

  const scenarios = JSON.parse(localStorage.getItem('savedScenarios') || '[]');

  const scenario = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    inputs: { ...calculatorState.inputs },
    results: calculatorState.results.map(r => ({
      planName: r.planName,
      totalAnnualCost: Math.round(r.totalAnnualCost)
    }))
  };

  scenarios.push(scenario);
  localStorage.setItem('savedScenarios', JSON.stringify(scenarios));

  loadScenarios();
  alert('Scenario saved successfully!');
}

function loadScenarios() {
  const container = document.getElementById('scenarios-list');
  if (!container) return;

  const scenarios = JSON.parse(localStorage.getItem('savedScenarios') || '[]');

  if (scenarios.length === 0) {
    container.innerHTML = '<p class="empty-state">No saved scenarios yet. Use the "Save Scenario" button to save your calculations.</p>';
    return;
  }

  container.innerHTML = scenarios.reverse().map(scenario => `
    <div class="scenario-card">
      <div class="scenario-info">
        <h4>Scenario from ${scenario.date}</h4>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: var(--space-xs);">
          Best plan: ${scenario.results[0].planName} ($${scenario.results[0].totalAnnualCost.toLocaleString()}/year)
        </p>
      </div>
      <div class="scenario-actions">
        <button class="btn btn-small btn-secondary" onclick="loadScenario(${scenario.id})">Load</button>
        <button class="btn btn-small btn-secondary" onclick="deleteScenario(${scenario.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function loadScenario(id) {
  const scenarios = JSON.parse(localStorage.getItem('savedScenarios') || '[]');
  const scenario = scenarios.find(s => s.id === id);

  if (scenario) {
    Object.assign(calculatorState.inputs, scenario.inputs);
    loadSavedInputs();
    performCalculation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function deleteScenario(id) {
  if (!confirm('Are you sure you want to delete this scenario?')) return;

  const scenarios = JSON.parse(localStorage.getItem('savedScenarios') || '[]');
  const filtered = scenarios.filter(s => s.id !== id);
  localStorage.setItem('savedScenarios', JSON.stringify(filtered));
  loadScenarios();
}

function clearAllScenarios() {
  if (!confirm('Are you sure you want to delete all saved scenarios?')) return;

  localStorage.removeItem('savedScenarios');
  loadScenarios();
}

function resetCalculator() {
  if (!confirm('Reset calculator to default values?')) return;

  // Reset state to defaults
  calculatorState.inputs = {
    coverageTier: 'employee',
    age: 35,
    numDependents: 0,
    primaryVisits: 2,
    specialistVisits: 0,
    urgentCareVisits: 0,
    erVisits: 0,
    genericRx: 0,
    preferredRx: 0,
    nonpreferredRx: 0,
    specialtyRx: 0,
    plannedProcedures: 0,
    hasChronicCondition: false
  };

  calculatorState.results = null;

  loadSavedInputs();
  localStorage.removeItem('calculatorInputs');

  // Clear results
  const summaryContainer = document.getElementById('results-summary');
  if (summaryContainer) {
    summaryContainer.innerHTML = '<p class="empty-state">Enter your information and click "Calculate Costs" to see personalized results.</p>';
  }
}

// Make functions globally available for inline onclick handlers
window.loadScenario = loadScenario;
window.deleteScenario = deleteScenario;
