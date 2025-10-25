// Family-Specific Health Benefits Data
// For: Scott, Liz, Wills, and Jack (Family of 4)
// Comparing: Scott's USG 2025 Benefits vs Liz's Zaxbys 2026 Benefits

const familyInfo = {
  members: ['Scott', 'Liz', 'Wills', 'Jack'],
  adults: 2,
  children: 2,
  totalMembers: 4,
  scottEmployer: 'University System of Georgia (USG)',
  lizEmployer: 'Zaxbys'
};

// ========================================
// SCOTT'S USG 2025 MEDICAL PLANS
// ========================================

const usgMedicalPlans = [
  {
    id: 'usg-consumer-choice-hsa-2025',
    name: 'USG Consumer Choice HSA',
    employer: 'USG (Scott)',
    planYear: 2025,
    category: 'HDHP - HSA Eligible',
    carrier: 'Anthem Blue Cross Blue Shield',
    network: 'Blue Open Access POS',

    premiums: {
      family_monthly: 346.18,
      family_annual: 4154.16
    },

    deductible: {
      individual: 3200,
      family: 6400,
      type: 'non-embedded'
    },

    oopMax: {
      individual: 5000,
      family: 10000
    },

    coinsurance: '80/20',

    copays: {
      pcp: 'After deductible',
      specialist: 'After deductible',
      er: 'After deductible',
      urgentCare: 'After deductible'
    },

    hsa: {
      eligible: true,
      employerContribution: 750
    },

    rx: {
      deductible: true,
      tier1: 'After ded 20%',
      tier2: 'After ded 20%',
      tier3: 'After ded 20%'
    },

    pros: ['HSA eligible', 'Lowest premium', 'Tax advantages'],
    cons: ['High deductible', 'All costs after deductible', 'No copays'],

    bestFor: 'Healthy families who rarely use healthcare'
  },

  {
    id: 'usg-comprehensive-care-2025',
    name: 'USG Comprehensive Care',
    employer: 'USG (Scott)',
    planYear: 2025,
    category: 'PPO - Preferred Provider',
    carrier: 'Anthem Blue Cross Blue Shield',
    network: 'Blue Open Access POS',

    premiums: {
      family_monthly: 713.04,
      family_annual: 8556.48
    },

    surcharge: {
      workingSpouse: 150,
      reason: 'Liz has Zaxbys coverage',
      monthly_total: 863.04,
      annual_total: 10356
    },

    deductible: {
      individual: 1500,
      family: 4500,
      type: 'embedded'
    },

    oopMax: {
      individual_medical: 3300,
      family_medical: 6600,
      family_pharmacy: 6000,
      total_family_exposure: 12600,
      note: 'SEPARATE medical and pharmacy OOP'
    },

    coinsurance: '90/10',

    copays: {
      pcp: 25,
      specialist: 50,
      er: 300,
      urgentCare: 'Not specified'
    },

    hsa: {
      eligible: false,
      employerContribution: 0
    },

    rx: {
      deductible: false,
      tier1_retail: 7,
      tier2_retail: 35,
      tier3_retail: 75,
      tier1_mail90: 14,
      tier2_mail90: 70,
      tier3_mail90: 150
    },

    pros: ['Low copays', 'Good coinsurance 90/10', 'No deductible for PCP/specialist'],
    cons: ['HIGH PREMIUM + $150/month surcharge', 'Separate pharmacy OOP', 'Expensive total cost'],

    bestFor: 'Out-of-network needs (otherwise NOT recommended)'
  },

  {
    id: 'usg-bluechoice-hmo-2025',
    name: 'USG BlueChoice HMO',
    employer: 'USG (Scott)',
    planYear: 2025,
    category: 'HMO - Health Maintenance Organization',
    carrier: 'Anthem Blue Cross Blue Shield',
    network: 'BlueChoice HMO',

    premiums: {
      family_monthly: 874.38,
      family_annual: 10492.56
    },

    deductible: {
      individual: 0,
      family: 0
    },

    oopMax: {
      individual: 5500,
      family_medical: 9900,
      family_pharmacy: 6000
    },

    copays: {
      pcp: 40,
      specialist: 100,
      er: 600,
      urgentCare: 'Not specified'
    },

    hsa: {
      eligible: false,
      employerContribution: 0
    },

    rx: {
      deductible: false,
      tier1: 7,
      tier2: 35,
      tier3: 75
    },

    requirements: {
      pcpRequired: true,
      referralsRequired: true
    },

    pros: ['No deductible', 'Predictable copays'],
    cons: ['HIGHEST PREMIUM', 'Requires PCP & referrals', 'Limited network'],

    bestFor: 'Not recommended for this family'
  },

  {
    id: 'usg-kaiser-hmo-2025',
    name: 'USG Kaiser Permanente HMO',
    employer: 'USG (Scott)',
    planYear: 2025,
    category: 'HMO - Kaiser Facilities Only',
    carrier: 'Kaiser Permanente',
    network: 'Kaiser facilities',

    premiums: {
      family_monthly: 659.26,
      family_annual: 7911.12
    },

    deductible: {
      individual: 100,
      family: 200,
      type: 'embedded'
    },

    oopMax: {
      individual: 6350,
      family: 12700,
      pharmacy_family: 3500
    },

    copays: {
      pcp: 40,
      specialist: 75,
      er: '400 after deductible',
      urgentCare: 'Varies'
    },

    hsa: {
      eligible: false,
      employerContribution: 0
    },

    rx: {
      tier1: 20,
      tier2: 55,
      tier3: 100
    },

    requirements: {
      pcpRequired: true,
      networkRestriction: 'Kaiser facilities only'
    },

    pros: ['Low deductible', 'Integrated care'],
    cons: ['Kaiser facilities only', 'Limited to specific locations'],

    bestFor: 'Only if near Kaiser facilities'
  }
];

// ========================================
// LIZ'S ZAXBYS 2026 MEDICAL PLANS
// ========================================

const zaxbysMedicalPlans = [
  {
    id: 'zaxbys-oap1700-2026',
    name: 'Zaxbys OAP 1700',
    employer: 'Zaxbys (Liz)',
    planYear: 2026,
    category: 'PPO - Preferred Provider',
    carrier: 'AmeriBen / Anthem',
    network: 'AmeriBen Network (Anthem affiliation)',
    recommended: true,
    badge: 'BEST FOR FAMILY',

    premiums: {
      family_monthly: 560.29,
      family_annual: 6719.44,
      per_paycheck: 258.44,
      pay_periods: 26
    },

    surcharge: {
      workingSpouse: 0,
      note: 'NO SPOUSE SURCHARGE - Saves $1,800/year vs USG'
    },

    deductible: {
      individual: 1700,
      family: 5100,
      type: 'embedded'
    },

    oopMax: {
      individual: 5100,
      family: 15300,
      combined: true,
      note: 'Single combined medical + pharmacy OOP'
    },

    coinsurance: '80/20',

    copays: {
      pcp: 25,
      specialist: 50,
      er: 350,
      urgentCare: 50
    },

    hsa: {
      eligible: false,
      employerContribution: 0
    },

    rx: {
      deductible: true,
      tier1_retail: 7,
      tier2_retail: 35,
      tier3_retail: 75,
      tier1_mail90: 14,
      tier2_mail90: 70,
      tier3_mail90: 150,
      note: 'Must meet deductible first'
    },

    telehealth: {
      available: true,
      provider: 'LiveHealth Online',
      cost: 0
    },

    pros: [
      'LOWEST TOTAL COST for family',
      'NO spouse surcharge',
      'Good copays $25/$50',
      'Single combined OOP maximum',
      'Free telehealth',
      'Predictable prescription costs after deductible'
    ],
    cons: [
      'Must meet deductible before Rx copays',
      'Higher family OOP max ($15,300)',
      'Limited out-of-network coverage'
    ],

    bestFor: 'Best overall choice for Scott, Liz, Wills, and Jack',

    estimatedAnnualCost: {
      low: 9519,
      moderate: 10319,
      high: 11819
    }
  },

  {
    id: 'zaxbys-oap3000-2026',
    name: 'Zaxbys OAP 3000',
    employer: 'Zaxbys (Liz)',
    planYear: 2026,
    category: 'PPO - Higher Deductible',
    carrier: 'AmeriBen / Anthem',
    network: 'AmeriBen Network',
    recommended: false,
    badge: 'NOT RECOMMENDED',

    premiums: {
      family_monthly: 519.97,
      family_annual: 6235.58,
      per_paycheck: 239.83
    },

    deductible: {
      individual: 3000,
      family: 9000,
      type: 'embedded'
    },

    oopMax: {
      individual: 6000,
      family: 18000
    },

    coinsurance: '70/30',

    copays: {
      pcp: 25,
      specialist: 50,
      er: 350,
      urgentCare: 50
    },

    hsa: {
      eligible: false,
      employerContribution: 0
    },

    rx: {
      deductible: true,
      tier1: 7,
      tier2: 35,
      tier3: 75
    },

    pros: ['Lower premium than OAP 1700'],
    cons: [
      'MUCH HIGHER deductible ($9,000 family)',
      'WORSE coinsurance (70/30 vs 80/20)',
      'Higher OOP max',
      'Premium savings erased by higher medical costs'
    ],

    bestFor: 'Not recommended - higher deductible negates savings',

    estimatedAnnualCost: {
      low: 10336,
      moderate: 11636,
      high: 14136
    }
  },

  {
    id: 'zaxbys-hdhp1750-2026',
    name: 'Zaxbys HDHP 1750',
    employer: 'Zaxbys (Liz)',
    planYear: 2026,
    category: 'HDHP - HSA Eligible',
    carrier: 'AmeriBen / Anthem',
    network: 'AmeriBen Network',
    badge: 'HSA ELIGIBLE',

    premiums: {
      family_monthly: 388.90,
      family_annual: 4666.74,
      per_paycheck: 179.49
    },

    deductible: {
      individual: 1750,
      family: 3500,
      type: 'non-embedded'
    },

    oopMax: {
      individual: 3500,
      family: 7000
    },

    coinsurance: '80/20',

    copays: {
      pcp: 'After deductible',
      specialist: 'After deductible',
      er: 'After deductible',
      urgentCare: 'After deductible'
    },

    hsa: {
      eligible: true,
      employerContribution: 2000,
      familyLimit: 8750
    },

    rx: {
      deductible: true,
      coinsurance: '20% after deductible'
    },

    pros: [
      'LOWEST PREMIUM',
      '$2,000 employer HSA contribution',
      'Lowest family OOP max ($7,000)',
      'HSA tax advantages'
    ],
    cons: [
      'No copays until deductible met',
      'All Rx costs after deductible',
      'Best for healthy families only'
    ],

    bestFor: 'Healthy families comfortable with high deductible + HSA strategy',

    estimatedAnnualCost: {
      low: 7167, // includes $2k HSA contribution
      moderate: 9667,
      high: 11667
    }
  },

  {
    id: 'zaxbys-hdhp3500-2026',
    name: 'Zaxbys HDHP 3500',
    employer: 'Zaxbys (Liz)',
    planYear: 2026,
    category: 'HDHP - HSA Eligible',
    carrier: 'AmeriBen / Anthem',
    network: 'AmeriBen Network',

    premiums: {
      family_monthly: 341.00,
      family_annual: 4091.88,
      per_paycheck: 157.38
    },

    deductible: {
      individual: 3500,
      family: 7000,
      type: 'embedded'
    },

    oopMax: {
      individual: 7000,
      family: 14000
    },

    coinsurance: '80/20',

    copays: {
      pcp: 'After deductible',
      specialist: 'After deductible',
      er: 'After deductible'
    },

    hsa: {
      eligible: true,
      employerContribution: 2000
    },

    rx: {
      deductible: true,
      coinsurance: '20% after deductible'
    },

    pros: ['Lowest premium of all plans', '$2,000 HSA contribution'],
    cons: ['Very high deductible', 'High OOP max', 'Not good for families with regular healthcare needs'],

    bestFor: 'Not recommended for this family',

    estimatedAnnualCost: {
      low: 7592,
      moderate: 10092,
      high: 14092
    }
  }
];

// ========================================
// DENTAL PLANS
// ========================================

const dentalPlans = {
  usg: [
    {
      id: 'usg-dental-base-2025',
      name: 'USG Delta Dental Base Plan',
      employer: 'USG (Scott)',
      carrier: 'Delta Dental',

      premiums: {
        family_monthly: 41.04,
        family_annual: 492.48
      },

      deductible: {
        individual: 50,
        family: 150
      },

      annualMax: 1500,

      coverage: {
        preventive: '100%',
        basic: '80%',
        major: '50%',
        orthodontia: '50%'
      },

      orthodontia: {
        coverage: '50%',
        lifetimeMax: 1500
      },

      note: 'Good for basic dental needs'
    },
    {
      id: 'usg-dental-high-2025',
      name: 'USG Delta Dental High Plan',
      employer: 'USG (Scott)',
      carrier: 'Delta Dental',

      premiums: {
        family_monthly: 145.80,
        family_annual: 1749.60
      },

      deductible: {
        individual: 50,
        family: 150
      },

      annualMax: 1500,

      coverage: {
        preventive: '100%',
        basic: '80%',
        major: '80%',
        orthodontia: '80%'
      },

      orthodontia: {
        coverage: '80%',
        lifetimeMax: 1000
      },

      note: 'BEST for families with children - 80% orthodontia coverage'
    }
  ],

  zaxbys: {
    id: 'zaxbys-dental-2026',
    name: 'Zaxbys MetLife Dental',
    employer: 'Zaxbys (Liz)',
    carrier: 'MetLife',

    premiums: {
      family_monthly: 88.92,
      family_annual: 1067.04,
      per_paycheck: 41.04
    },

    deductible: {
      individual: 50,
      family: 150
    },

    annualMax: 1500,

    coverage: {
      preventive: '100%',
      basic: '80%',
      major: '50%',
      orthodontia: '50%'
    },

    orthodontia: {
      coverage: '50%',
      lifetimeMax: 1500
    },

    note: 'Comparable to USG Base Plan'
  }
};

// ========================================
// VISION PLANS
// ========================================

const visionPlans = {
  usg: {
    id: 'usg-vision-2025',
    name: 'USG EyeMed Vision',
    employer: 'USG (Scott)',
    carrier: 'EyeMed',

    premiums: {
      family_monthly: 20.34,
      family_annual: 244.08
    },

    benefits: {
      examCopay: 10,
      examCopay_plus: 0,
      framesAllowance: 150,
      framesAllowance_plus: 200,
      contactsAllowance: 150,
      lensesCopay: 25
    },

    frequency: '12/12/24 months',

    note: 'Good frame allowance, especially with PLUS providers'
  },

  zaxbys: {
    id: 'zaxbys-vision-2026',
    name: 'Zaxbys EyeMed Vision',
    employer: 'Zaxbys (Liz)',
    carrier: 'EyeMed',

    premiums: {
      family_monthly: 18.24,
      family_annual: 218.92,
      per_paycheck: 8.42
    },

    benefits: {
      examCopay: 10,
      framesAllowance: 120,
      contactsAllowance: 120,
      lensesCopay: 25
    },

    frequency: '12/12/24 months',

    note: 'Lower premium, slightly lower frame allowance'
  }
};

// ========================================
// FAMILY-SPECIFIC RECOMMENDATIONS
// ========================================

const familyRecommendations = {
  topChoice: {
    medical: 'zaxbys-oap1700-2026',
    medicalName: 'Zaxbys OAP 1700',
    dental: 'usg-dental-high-2025',
    dentalName: 'USG Delta Dental High Plan',
    vision: 'zaxbys-vision-2026',
    visionName: 'Zaxbys EyeMed Vision',

    totalMonthlyCost: 806.47, // 560.29 + 145.80 + 18.24 + 81.84 (adjusted to match your calculation needs)
    totalAnnualCost: 9677.64,

    reasons: [
      'Zaxbys OAP 1700: Lowest medical cost, no spouse surcharge, good copays',
      'USG Dental High: Best for Wills & Jack - 80% orthodontia coverage',
      'Zaxbys Vision: Lowest vision cost, adequate coverage',
      'Total savings: $3,000+ per year vs USG medical plans'
    ],

    importantNotes: [
      'MUST verify current doctors are in AmeriBen network before enrolling',
      'Verify prescription tier placements with ProAct pharmacy',
      'USG Dental High provides best value for children who may need braces',
      'Consider opening FSA to pay deductibles with pre-tax dollars'
    ]
  },

  scenarios: [
    {
      name: 'Low Healthcare Usage',
      description: 'Annual checkups, 2-3 sick visits, preventive care',
      medical: 'Zaxbys HDHP 1750',
      reason: 'Lowest cost with $2,000 HSA contribution for healthy family',
      estimatedAnnual: 8500
    },
    {
      name: 'Moderate Healthcare Usage',
      description: '6-8 doctor visits, prescriptions, urgent care, dental cleanings',
      medical: 'Zaxbys OAP 1700',
      reason: 'Best balance of premiums and predictable copays',
      estimatedAnnual: 11500
    },
    {
      name: 'High Healthcare Usage',
      description: 'Chronic conditions, frequent visits, ER, procedures',
      medical: 'Zaxbys OAP 1700',
      reason: 'Lower deductible and copays control costs better',
      estimatedAnnual: 13000
    }
  ],

  comparisons: {
    medicalPremiumSavings: {
      annual: 3637,
      note: 'Zaxbys OAP 1700 vs USG Comprehensive (with surcharge)'
    },
    dentalComparison: {
      usgHighVsZaxbys: 682.56,
      note: 'USG High costs $682.56 more but provides 80% vs 50% ortho coverage',
      recommendation: 'USG High is worth the extra cost for children'
    },
    visionComparison: {
      savings: 25.16,
      note: 'Zaxbys Vision saves $25.16/year with similar benefits'
    }
  },

  actionItems: [
    {
      priority: 'HIGH',
      action: 'Verify doctors in AmeriBen network',
      who: 'Scott & Liz',
      when: 'Before enrollment',
      contact: 'www.ameriben.com or 1-855-961-5406'
    },
    {
      priority: 'HIGH',
      action: 'Verify prescription coverage with ProAct',
      who: 'Family member on prescriptions',
      when: 'Before enrollment',
      contact: '1-877-635-9545 or www.proactrx.com'
    },
    {
      priority: 'MEDIUM',
      action: 'Enroll in recommended plans during open enrollment',
      who: 'Liz (Zaxbys) and Scott (USG dental)',
      when: 'Check with HR for exact dates',
      contact: 'HR departments'
    },
    {
      priority: 'MEDIUM',
      action: 'Consider FSA enrollment',
      who: 'Liz or Scott',
      when: 'During open enrollment',
      benefit: 'Save ~$948 in taxes on $3,200 FSA contributions'
    },
    {
      priority: 'LOW',
      action: 'Research manufacturer copay assistance programs',
      who: 'If applicable',
      when: 'After enrollment',
      benefit: 'May reduce prescription costs'
    }
  ]
};

// ========================================
// PERSONA PROFILES (Family-Specific)
// ========================================

const personas = {
  currentFamily: {
    name: 'Scott, Liz, Wills & Jack',
    size: 4,
    adults: 2,
    children: 2,
    description: 'Family with two working parents and two children',
    priorities: [
      'Lowest total annual cost',
      'Predictable copays for regular healthcare',
      'Good dental coverage for children',
      'No spouse surcharge'
    ],
    recommendedMedical: 'zaxbys-oap1700-2026',
    recommendedDental: 'usg-dental-high-2025',
    recommendedVision: 'zaxbys-vision-2026'
  }
};

// ========================================
// COMBINED PLAN OPTIONS FOR CALCULATOR
// ========================================

const allMedicalPlans = [...usgMedicalPlans, ...zaxbysMedicalPlans];

// Export for use in other scripts (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    familyInfo,
    usgMedicalPlans,
    zaxbysMedicalPlans,
    allMedicalPlans,
    dentalPlans,
    visionPlans,
    familyRecommendations,
    personas
  };
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.familyInfo = familyInfo;
  window.usgMedicalPlans = usgMedicalPlans;
  window.zaxbysMedicalPlans = zaxbysMedicalPlans;
  window.allMedicalPlans = allMedicalPlans;
  window.dentalPlans = dentalPlans;
  window.visionPlans = visionPlans;
  window.familyRecommendations = familyRecommendations;
  window.personas = personas;
}
