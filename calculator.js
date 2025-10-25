/**
 * Scott & Liz Family Benefits Calculator
 * Calculate costs for family of 4 including medical, dental, and vision
 */

// Calculator state - Family of 4 (Scott, Liz, Wills, Jack)
const calculatorState = {
  inputs: {
    // Medical usage (annual, for entire family)
    primaryVisits: 8,
    specialistVisits: 2,
    urgentCareVisits: 1,
    erVisits: 0,
    // Prescriptions (monthly, for entire family)
    genericRx: 2,
    preferredRx: 1,
    nonpreferredRx: 0,
    // Dental & Vision (if enrolled)
    includeDental: true,
    includeVision: true,
    dentalVisits: 8,
    dentalWork: 0,
    visionExams: 4,
    glassesContacts: 2
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
  // Benefits checkboxes
  const includeDental = document.getElementById('include-dental');
  if (includeDental) {
    includeDental.addEventListener('change', (e) => {
      calculatorState.inputs.includeDental = e.target.checked;
      saveInputs();
    });
  }

  const includeVision = document.getElementById('include-vision');
  if (includeVision) {
    includeVision.addEventListener('change', (e) => {
      calculatorState.inputs.includeVision = e.target.checked;
      saveInputs();
    });
  }

  // Dental work cost
  const dentalWork = document.getElementById('dental-work');
  if (dentalWork) {
    dentalWork.addEventListener('input', (e) => {
      calculatorState.inputs.dentalWork = parseInt(e.target.value) || 0;
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
    { id: 'dental-visits', key: 'dentalVisits' },
    { id: 'vision-exams', key: 'visionExams' },
    { id: 'glasses-contacts', key: 'glassesContacts' }
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

  // Also calculate on Enter key
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
  if (typeof allMedicalPlans === 'undefined') {
    console.error('Medical plans data not loaded');
    alert('Error: Plan data not loaded. Please refresh the page.');
    return;
  }

  // Calculate costs for each medical plan
  const results = allMedicalPlans.map(plan => {
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
  // Base premium (always family for this calculator)
  const monthlyPremium = plan.premiums.family_monthly || 0;
  const annualPremium = plan.premiums.family_annual || 0;

  // Add surcharge if applicable
  const surchargeMonthly = plan.surcharge?.workingSpouse || 0;
  const surchargeAnnual = surchargeMonthly * 12;
  const totalPremium = annualPremium + surchargeAnnual;

  // Calculate medical visit costs
  let visitCosts = 0;

  // Primary care visits
  const pcpCopay = typeof plan.copays?.pcp === 'number' ? plan.copays.pcp : 25;
  visitCosts += inputs.primaryVisits * pcpCopay;

  // Specialist visits
  const specialistCopay = typeof plan.copays?.specialist === 'number' ? plan.copays.specialist : 50;
  visitCosts += inputs.specialistVisits * specialistCopay;

  // Urgent care visits
  const urgentCareCopay = typeof plan.copays?.urgentCare === 'number' ? plan.copays.urgentCare : 50;
  visitCosts += inputs.urgentCareVisits * urgentCareCopay;

  // Emergency room visits
  const erCopay = typeof plan.copays?.er === 'number' ? plan.copays.er : 300;
  visitCosts += inputs.erVisits * erCopay;

  // Calculate prescription costs (monthly input, so multiply by 12)
  let rxCosts = 0;
  const rxDeductible = plan.rx?.deductible ? (plan.deductible.individual || 0) : 0;

  // Estimate Rx costs
  const genericAnnual = inputs.genericRx * 12;
  const preferredAnnual = inputs.preferredRx * 12;
  const nonpreferredAnnual = inputs.nonpreferredRx * 12;

  if (plan.rx?.tier1_retail) {
    rxCosts += genericAnnual * plan.rx.tier1_retail;
  } else if (plan.rx?.tier1) {
    const tier1Cost = plan.rx.tier1.includes('%') ? 10 : parseInt(plan.rx.tier1.replace(/[^0-9]/g, '')) || 10;
    rxCosts += genericAnnual * tier1Cost;
  } else {
    rxCosts += genericAnnual * 7; // default
  }

  if (plan.rx?.tier2_retail) {
    rxCosts += preferredAnnual * plan.rx.tier2_retail;
  } else if (plan.rx?.tier2) {
    const tier2Cost = parseInt(plan.rx.tier2.replace(/[^0-9]/g, '')) || 35;
    rxCosts += preferredAnnual * tier2Cost;
  } else {
    rxCosts += preferredAnnual * 35; // default
  }

  if (plan.rx?.tier3_retail) {
    rxCosts += nonpreferredAnnual * plan.rx.tier3_retail;
  } else {
    rxCosts += nonpreferredAnnual * 75; // default
  }

  // Add Rx deductible if required (only once per family member on prescriptions)
  if (plan.rx?.deductible && (inputs.genericRx + inputs.preferredRx + inputs.nonpreferredRx > 0)) {
    rxCosts += rxDeductible;
  }

  // Total medical costs before OOP max
  let totalMedicalCosts = visitCosts + rxCosts;

  // Apply out-of-pocket maximum
  const oopMax = plan.oopMax?.family || plan.oopMax?.individual || 15000;
  totalMedicalCosts = Math.min(totalMedicalCosts, oopMax);

  // HSA contribution (reduces net cost)
  const hsaContribution = plan.hsa?.eligible ? (plan.hsa.employerContribution || 0) : 0;

  // Calculate dental costs if included
  let dentalCosts = 0;
  if (inputs.includeDental && typeof dentalPlans !== 'undefined') {
    const employerDental = plan.employer.includes('USG') ? dentalPlans.usg[1] : dentalPlans.zaxbys; // USG High recommended
    dentalCosts = calculateDentalCosts(employerDental, inputs);
  }

  // Calculate vision costs if included
  let visionCosts = 0;
  if (inputs.includeVision && typeof visionPlans !== 'undefined') {
    const employerVision = plan.employer.includes('USG') ? visionPlans.usg : visionPlans.zaxbys;
    visionCosts = calculateVisionCosts(employerVision, inputs);
  }

  // Total annual cost
  const totalAnnualCost = totalPremium + totalMedicalCosts + dentalCosts + visionCosts - hsaContribution;

  return {
    planId: plan.id,
    planName: plan.name,
    planCategory: plan.category,
    employer: plan.employer,
    monthlyPremium,
    annualPremium: totalPremium,
    surcharge: surchargeAnnual,
    visitCosts,
    rxCosts,
    totalMedicalCosts,
    dentalCosts,
    visionCosts,
    hsaContribution,
    totalAnnualCost,
    deductible: plan.deductible.family || plan.deductible.individual || 0,
    oopMax,
    breakdown: {
      premiums: totalPremium,
      primaryCare: inputs.primaryVisits * pcpCopay,
      specialist: inputs.specialistVisits * specialistCopay,
      urgentCare: inputs.urgentCareVisits * urgentCareCopay,
      emergency: inputs.erVisits * erCopay,
      prescriptions: rxCosts,
      dental: dentalCosts,
      vision: visionCosts,
      hsaCredit: -hsaContribution,
      surcharge: surchargeAnnual
    }
  };
}

/**
 * Calculate dental costs
 */
function calculateDentalCosts(dentalPlan, inputs) {
  if (!dentalPlan) return 0;

  const annualPremium = dentalPlan.premiums?.family_annual || dentalPlan.premiums?.annual || 0;

  // Preventive care (cleanings, exams) typically 100% covered
  let dentalWork = 0;

  // Apply deductible and coverage percentages to additional dental work
  if (inputs.dentalWork > 0) {
    const deductible = dentalPlan.deductible?.family || 150;
    const afterDeductible = Math.max(0, inputs.dentalWork - deductible);

    // Assume mix of basic (80%) and major (50%) work
    const basicPortion = afterDeductible * 0.6; // 60% is basic work
    const majorPortion = afterDeductible * 0.4; // 40% is major work

    const basicCoverage = dentalPlan.coverage?.basic === '80%' ? 0.8 : 0.8;
    const majorCoverage = dentalPlan.coverage?.major === '80%' ? 0.8 : 0.5;

    dentalWork = (basicPortion * (1 - basicCoverage)) + (majorPortion * (1 - majorCoverage));

    // Apply annual maximum
    const annualMax = dentalPlan.annualMax || 1500;
    const insurancePays = Math.min(
      (basicPortion * basicCoverage) + (majorPortion * majorCoverage),
      annualMax - deductible
    );
    dentalWork = inputs.dentalWork - insurancePays;
  }

  return annualPremium + dentalWork;
}

/**
 * Calculate vision costs
 */
function calculateVisionCosts(visionPlan, inputs) {
  if (!visionPlan) return 0;

  const annualPremium = visionPlan.premiums?.family_annual || visionPlan.premiums?.annual || 0;

  // Exam copay
  const examCopay = visionPlan.benefits?.examCopay || 10;
  const examCosts = inputs.visionExams * examCopay;

  // Glasses/contacts - allowance typically covers most of cost
  // Estimate $150 average cost per person, plan covers $120-150
  const avgOutOfPocket = 30; // after allowance
  const glassesContactsCosts = inputs.glassesContacts * avgOutOfPocket;

  return annualPremium + examCosts + glassesContactsCosts;
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
      <div class="summary-label">Best Plan for Your Family</div>
      <div class="summary-value">${bestPlan.planName}</div>
      <div class="summary-sublabel">$${Math.round(bestPlan.totalAnnualCost).toLocaleString()} / year</div>
      <div class="summary-sublabel">${bestPlan.employer}</div>
    </div>

    <div class="summary-card">
      <div class="summary-label">Potential Savings</div>
      <div class="summary-value">$${Math.round(savings).toLocaleString()}</div>
      <div class="summary-sublabel">vs. highest cost option</div>
    </div>

    <div class="summary-card">
      <div class="summary-label">Average Cost</div>
      <div class="summary-value">$${Math.round(avgCost).toLocaleString()}</div>
      <div class="summary-sublabel">across all plan options</div>
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
          <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: 4px;">${result.employer}</p>
          <div class="result-total-cost">
            <div class="cost-label">Total Annual Cost</div>
            <div class="cost-value">$${Math.round(result.totalAnnualCost).toLocaleString()}</div>
          </div>
        </div>

        <div class="cost-breakdown">
          <div class="breakdown-row">
            <span class="breakdown-label">Annual Premiums (Medical)</span>
            <span class="breakdown-value">$${result.annualPremium.toLocaleString()}</span>
          </div>
          ${result.surcharge > 0 ? `
          <div class="breakdown-row" style="color: var(--danger-color);">
            <span class="breakdown-label">⚠️ Spouse Surcharge</span>
            <span class="breakdown-value">$${result.surcharge.toLocaleString()}</span>
          </div>
          ` : ''}
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
          ${result.dentalCosts > 0 ? `
          <div class="breakdown-row">
            <span class="breakdown-label">Dental (Premium + Work)</span>
            <span class="breakdown-value">$${Math.round(result.dentalCosts).toLocaleString()}</span>
          </div>
          ` : ''}
          ${result.visionCosts > 0 ? `
          <div class="breakdown-row">
            <span class="breakdown-label">Vision</span>
            <span class="breakdown-value">$${Math.round(result.visionCosts).toLocaleString()}</span>
          </div>
          ` : ''}
          ${result.hsaContribution > 0 ? `
          <div class="breakdown-row" style="color: var(--success-color);">
            <span class="breakdown-label">Employer HSA Match</span>
            <span class="breakdown-value">-$${result.hsaContribution.toLocaleString()}</span>
          </div>
          ` : ''}
          <div class="breakdown-row" style="border-top: 2px solid var(--border-color); margin-top: var(--space-sm); padding-top: var(--space-sm); font-weight: var(--font-weight-bold);">
            <span class="breakdown-label">Total Out-of-Pocket Medical</span>
            <span class="breakdown-value">$${Math.round(result.totalMedicalCosts).toLocaleString()}</span>
          </div>
        </div>

        <div style="margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; font-size: var(--font-size-sm); color: var(--text-tertiary);">
            <span>Family Deductible: $${result.deductible.toLocaleString()}</span>
            <span>OOP Max: $${result.oopMax.toLocaleString()}</span>
          </div>
          <div style="margin-top: var(--space-sm); font-size: var(--font-size-sm); color: var(--text-tertiary);">
            Monthly: $${Math.round(result.totalAnnualCost / 12).toLocaleString()}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Table view (simplified for readability)
  if (tableView) {
    const tbody = tableView.querySelector('#breakdown-tbody');
    if (tbody) {
      const categories = [
        { label: 'Medical Premiums', key: 'premiums' },
        { label: 'Primary Care', key: 'primaryCare' },
        { label: 'Specialist', key: 'specialist' },
        { label: 'Urgent Care', key: 'urgentCare' },
        { label: 'Emergency Room', key: 'emergency' },
        { label: 'Prescriptions', key: 'prescriptions' },
        { label: 'Dental', key: 'dental' },
        { label: 'Vision', key: 'vision' },
        { label: 'Spouse Surcharge', key: 'surcharge' },
        { label: 'HSA Match', key: 'hsaCredit' },
        { label: 'TOTAL ANNUAL COST', key: 'total' }
      ];

      // Update table headers
      const thead = tableView.querySelector('thead tr');
      if (thead) {
        thead.innerHTML = '<th scope="col">Cost Category</th>' +
          results.map(r => `<th scope="col">${r.planName}<br><small>${r.employer}</small></th>`).join('');
      }

      tbody.innerHTML = categories.map(cat => {
        const cells = results.map(r => {
          let value;
          if (cat.key === 'total') {
            value = Math.round(r.totalAnnualCost);
          } else {
            value = Math.round(r.breakdown[cat.key] || 0);
          }

          if (value === 0) return '<td>--</td>';

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

  const bestPlan = results[0];
  const secondBest = results[1];

  const premiumDiff = bestPlan.monthlyPremium - secondBest.monthlyPremium;
  const costDiff = secondBest.totalAnnualCost - bestPlan.totalAnnualCost;

  container.innerHTML = `
    <div class="breakeven-card">
      <h4>${bestPlan.planName} vs ${secondBest.planName}</h4>
      <p><strong>Best Choice:</strong> ${bestPlan.planName} saves you $${Math.round(costDiff).toLocaleString()}/year for your family's expected usage.</p>
      <p style="margin-top: var(--space-sm); font-size: var(--font-size-sm); color: var(--text-secondary);">
        Even though ${bestPlan.planName} may have ${premiumDiff > 0 ? 'higher' : 'lower'} premiums,
        the total cost with your family's healthcare needs makes it the better value.
      </p>
    </div>
  `;
}

/**
 * Display savings comparison
 */
function displaySavingsComparison(results) {
  const container = document.getElementById('savings-content');
  if (!container || results.length < 2) return;

  const bestPlan = results[0];

  container.innerHTML = results.slice(1, 4).map(plan => {
    const savings = plan.totalAnnualCost - bestPlan.totalAnnualCost;
    const monthlySavings = savings / 12;

    return `
      <div class="savings-card">
        <h4>${bestPlan.planName} vs ${plan.planName}</h4>
        <div class="savings-amount">$${Math.round(savings).toLocaleString()}</div>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary);">
          Annual savings by choosing ${bestPlan.planName}<br>
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

  // Determine recommendation based on family needs
  const totalVisits = inputs.primaryVisits + inputs.specialistVisits + inputs.urgentCareVisits + inputs.erVisits;

  if (totalVisits > 15 || inputs.dentalWork > 2000) {
    recommendation = `For Scott, Liz, Wills & Jack with frequent healthcare needs, ${bestPlan.planName} provides the best value with predictable copays and comprehensive coverage.`;
    reasoning.push('Lower out-of-pocket costs for frequent medical visits');
    reasoning.push('Predictable copays help with family budgeting');
    reasoning.push('Good coverage for dental and vision needs');
  } else if (totalVisits <= 10) {
    recommendation = `For your family's moderate healthcare usage, ${bestPlan.planName} offers the best balance of premiums and coverage.`;
    reasoning.push('Competitive premiums while maintaining good coverage');
    if (bestPlan.hsaContribution > 0) {
      reasoning.push(`Employer HSA contribution of $${bestPlan.hsaContribution.toLocaleString()} adds significant value`);
    }
    reasoning.push('Protection for unexpected healthcare needs');
  } else {
    recommendation = `${bestPlan.planName} provides the optimal balance for your family of 4, considering all healthcare, dental, and vision needs.`;
    reasoning.push('Best total value across medical, dental, and vision');
    reasoning.push('Balanced premium and out-of-pocket costs');
    if (bestPlan.surcharge === 0) {
      reasoning.push('No spouse surcharge saves your family money');
    }
  }

  const reasoningHTML = reasoning.map(r => `<li>${r}</li>`).join('');

  container.innerHTML = `
    <h4>Recommended: ${bestPlan.planName}</h4>
    <p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 4px;">${bestPlan.employer}</p>
    <p style="font-size: var(--font-size-lg); margin: var(--space-md) 0;">
      ${recommendation}
    </p>

    <div style="margin-top: var(--space-lg);">
      <strong>Why this plan is best for your family:</strong>
      <ul style="margin-top: var(--space-sm); padding-left: var(--space-xl);">
        ${reasoningHTML}
      </ul>
    </div>

    <div style="margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--border-color);">
      <strong>Estimated total costs for Scott, Liz, Wills & Jack:</strong>
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
  localStorage.setItem('familyCalculatorInputs', JSON.stringify(calculatorState.inputs));
}

function loadSavedInputs() {
  const saved = localStorage.getItem('familyCalculatorInputs');
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

  const scenarios = JSON.parse(localStorage.getItem('familySavedScenarios') || '[]');

  const scenario = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    inputs: { ...calculatorState.inputs },
    results: calculatorState.results.slice(0, 3).map(r => ({
      planName: r.planName,
      employer: r.employer,
      totalAnnualCost: Math.round(r.totalAnnualCost)
    }))
  };

  scenarios.push(scenario);
  localStorage.setItem('familySavedScenarios', JSON.stringify(scenarios));

  loadScenarios();
  alert('Scenario saved successfully!');
}

function loadScenarios() {
  const container = document.getElementById('scenarios-list');
  if (!container) return;

  const scenarios = JSON.parse(localStorage.getItem('familySavedScenarios') || '[]');

  if (scenarios.length === 0) {
    container.innerHTML = '<p class="empty-state">No saved scenarios yet. Use the "Save Scenario" button to save your calculations.</p>';
    return;
  }

  container.innerHTML = scenarios.reverse().map(scenario => `
    <div class="scenario-card">
      <div class="scenario-info">
        <h4>Scenario from ${scenario.date}</h4>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: var(--space-xs);">
          Best: ${scenario.results[0].planName} (${scenario.results[0].employer}) - $${scenario.results[0].totalAnnualCost.toLocaleString()}/year
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
  const scenarios = JSON.parse(localStorage.getItem('familySavedScenarios') || '[]');
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

  const scenarios = JSON.parse(localStorage.getItem('familySavedScenarios') || '[]');
  const filtered = scenarios.filter(s => s.id !== id);
  localStorage.setItem('familySavedScenarios', JSON.stringify(filtered));
  loadScenarios();
}

function clearAllScenarios() {
  if (!confirm('Are you sure you want to delete all saved scenarios?')) return;

  localStorage.removeItem('familySavedScenarios');
  loadScenarios();
}

function resetCalculator() {
  if (!confirm('Reset calculator to default values?')) return;

  // Reset state to defaults for family of 4
  calculatorState.inputs = {
    primaryVisits: 8,
    specialistVisits: 2,
    urgentCareVisits: 1,
    erVisits: 0,
    genericRx: 2,
    preferredRx: 1,
    nonpreferredRx: 0,
    includeDental: true,
    includeVision: true,
    dentalVisits: 8,
    dentalWork: 0,
    visionExams: 4,
    glassesContacts: 2
  };

  calculatorState.results = null;

  loadSavedInputs();
  localStorage.removeItem('familyCalculatorInputs');

  // Clear results
  const summaryContainer = document.getElementById('results-summary');
  if (summaryContainer) {
    summaryContainer.innerHTML = '<p class="empty-state">Enter your family\'s information and click "Calculate Costs" to see personalized results for Scott, Liz, Wills & Jack.</p>';
  }
}

// Make functions globally available for inline onclick handlers
window.loadScenario = loadScenario;
window.deleteScenario = deleteScenario;
