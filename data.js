// Health Benefits Plan Data Structure
// Real data from USG 2025 and Zaxbys 2026 benefits analysis
// For family of 4: Scott, Liz, and 2 children

const healthPlans = [
  {
    id: 'usg-comprehensive-2025',
    name: 'USG Anthem Comprehensive Care',
    employer: 'USG (University System of Georgia)',
    planYear: 2025,
    category: 'PPO - Preferred Provider Organization',
    carrier: 'Anthem Blue Cross Blue Shield',
    recommended: false,
    rank: 4,
    score: 62,

    // Premium costs (MONTHLY)
    premiums: {
      monthly: {
        employee: 220.00,
        employeeSpouse: 499.14,
        employeeChildren: 427.82,
        family: 713.04
      },
      annual: {
        employee: 2640,
        employeeSpouse: 5990,
        employeeChildren: 5134,
        family: 8556
      }
    },

    // CRITICAL: Spouse surcharge
    surcharges: {
      workingSpouse: {
        applies: true,
        monthlyAmount: 150.00,
        annualAmount: 1800,
        condition: 'Spouse has access to employer-subsidized coverage elsewhere',
        note: 'APPLIES to this family - Liz has Zaxbys coverage'
      },
      tobacco: {
        applies: false,
        monthlyAmount: 150.00,
        condition: 'Tobacco user'
      }
    },

    // Total premium INCLUDING surcharge for family
    actualFamilyCost: {
      monthly: 863.04, // 713.04 + 150 surcharge
      annual: 10356
    },

    // Cost sharing
    deductible: {
      individual: 1500,
      family: 4500,
      structure: 'embedded',
      note: 'Each person has max $1,500, or family hits $4,500 total'
    },
    outOfPocketMax: {
      individualMedical: 3300,
      familyMedical: 6600,
      individualPharmacy: 2000,
      familyPharmacy: 6000,
      combined: false,
      totalFamilyExposure: 12600,
      note: 'SEPARATE medical and pharmacy OOP - potential $12,600 exposure'
    },
    coinsurance: 10, // Member pays 10%, plan pays 90%

    hsaEligible: false,
    employerHSAContribution: {
      employee: 0,
      family: 0
    },

    // Coverage details
    coverage: {
      primaryCare: {
        cost: '$25 copay',
        note: 'No deductible required'
      },
      specialist: {
        cost: '$50 copay',
        note: 'No deductible required, no referral needed'
      },
      urgentCare: {
        cost: 'Not specified',
        note: 'PPO network'
      },
      emergency: {
        cost: '$300 copay',
        note: 'Waived if admitted within 24 hours'
      },
      inpatient: {
        cost: '10% coinsurance after deductible',
        note: 'Member pays 10%, plan pays 90%'
      },
      outpatient: {
        cost: '10% coinsurance after deductible',
        note: 'Member pays 10%, plan pays 90%'
      },
      prescription: {
        pbm: 'CVS Caremark',
        deductibleRequired: false,
        generic: '$20 copay (retail 30-day) / $60 (mail 90-day)',
        preferredBrand: '20% coinsurance ($50-125 retail / $150-375 mail)',
        nonPreferred: '35% coinsurance ($125-250 retail / $375-750 mail)',
        specialty: '20% coinsurance (max $175 per 30-day)',
        ozempic: {
          tier: 'Specialty (assumed)',
          costPer30Day: 175,
          annualCost: 2100,
          deductibleRequired: false,
          note: 'Specialty drugs exempt from deductible'
        }
      }
    },

    // Network information
    network: {
      name: 'Blue Open Access POS',
      size: 'Nationwide via Anthem BlueCard',
      type: 'PPO',
      pcpRequired: false,
      referralsRequired: false,
      outOfNetworkCovered: true,
      outOfNetworkNote: 'Covered at 60% after higher deductible'
    },

    // Best for personas
    bestFor: ['out-of-network-needs', 'usg-employees-only'],

    // Pros and cons
    pros: [
      'Strong PPO network with out-of-network coverage',
      'No deductible required for specialty drugs (Ozempic)',
      'Lower coinsurance (10%) for major medical events',
      'Embedded deductible protects each family member',
      'Single family plan - simple administration'
    ],
    cons: [
      'MOST EXPENSIVE - $10,356/year in premiums with surcharge',
      '$150/month spouse surcharge adds $1,800/year',
      'Separate pharmacy OOP creates $12,600 total exposure',
      'Ozempic costs $1,200-1,680 more annually than Zaxbys',
      'Higher total annual cost in all scenarios'
    ],

    // Estimated annual costs for family of 4
    estimatedAnnualCosts: {
      lowUse: {
        premiums: 10356,
        ozempic: 2100,
        medical: 200,
        total: 12656,
        note: 'Annual physicals, 2-3 sick visits, preventive care'
      },
      moderateUse: {
        premiums: 10356,
        ozempic: 2100,
        medical: 900,
        total: 13356,
        note: '6-8 doctor visits, urgent care, labs, imaging'
      },
      highUse: {
        premiums: 10356,
        ozempic: 2100,
        medical: 3500,
        total: 15956,
        note: 'ER visit, hospitalization, or significant medical event'
      }
    }
  },

  {
    id: 'zaxbys-oap1700-2026',
    name: 'Zaxbys OAP 1700',
    employer: 'Zaxbys',
    planYear: 2026,
    category: 'PPO - Preferred Provider Organization',
    carrier: 'AmeriBen / Anthem',
    recommended: true,
    rank: 1,
    score: 95,
    badge: 'BEST OVERALL',

    // Premium costs (MONTHLY)
    premiums: {
      monthly: {
        employee: 163.39,
        employeeSpouse: 356.27,
        employeeChildren: 327.60,
        family: 559.95
      },
      annual: {
        employee: 1961,
        employeeSpouse: 4275,
        employeeChildren: 3931,
        family: 6719
      }
    },

    // NO surcharges!
    surcharges: {
      workingSpouse: {
        applies: false,
        monthlyAmount: 0,
        annualAmount: 0,
        note: 'Zaxbys has NO spouse surcharge policy - SAVES $1,800/year vs USG'
      }
    },

    // Total premium (no surcharge)
    actualFamilyCost: {
      monthly: 559.95,
      annual: 6719
    },

    // Cost sharing
    deductible: {
      individual: 1700,
      family: 5100,
      structure: 'embedded',
      note: 'Each person max $1,700, or family hits $5,100 total'
    },
    outOfPocketMax: {
      individual: 5100,
      family: 15300,
      combined: true,
      totalFamilyExposure: 15300,
      note: 'SINGLE combined OOP maximum includes both medical AND pharmacy'
    },
    coinsurance: 20, // Member pays 20%, plan pays 80%

    hsaEligible: false,
    employerHSAContribution: {
      employee: 0,
      family: 0
    },

    // Coverage details
    coverage: {
      primaryCare: {
        cost: '$25 copay',
        note: 'No deductible required'
      },
      specialist: {
        cost: '$50 copay',
        note: 'No deductible required, no referral needed'
      },
      urgentCare: {
        cost: '$50 copay',
        note: 'No deductible required'
      },
      emergency: {
        cost: '$350 copay',
        note: 'Waived if admitted'
      },
      inpatient: {
        cost: '20% coinsurance after deductible',
        note: 'Member pays 20%, plan pays 80%'
      },
      outpatient: {
        cost: '20% coinsurance after deductible',
        note: 'Member pays 20%, plan pays 80%'
      },
      prescription: {
        pbm: 'ProAct',
        deductibleRequired: true,
        deductibleNote: 'Must meet medical deductible ($1,700 individual) before copays apply',
        generic: '$7 copay (retail 30-day) / $14 (mail 90-day)',
        preferredBrand: '$35 copay (retail 30-day) / $70 (mail 90-day)',
        nonPreferred: '$75 copay (retail 30-day) / $150 (mail 90-day)',
        specialty: 'Uses tier 2/3 structure',
        ozempic: {
          tier: 'Tier 2 (Preferred) or Tier 3 (Non-Preferred) - assumed',
          costPer30DayTier2: 35,
          costPer30DayTier3: 75,
          annualCostTier2: 420,
          annualCostTier3: 900,
          firstYearCostTier2: 2120, // 1700 deductible + 420
          firstYearCostTier3: 2600, // 1700 deductible + 900
          deductibleRequired: true,
          note: 'MUST VERIFY tier with ProAct - call 1-877-635-9545'
        }
      }
    },

    // Network information
    network: {
      name: 'AmeriBen Network (Anthem affiliation)',
      size: 'Regional with Anthem partnership',
      type: 'PPO',
      pcpRequired: false,
      referralsRequired: false,
      outOfNetworkCovered: false,
      outOfNetworkNote: 'Limited coverage - essentially in-network only',
      telehealth: {
        provider: 'LiveHealth Online',
        cost: '$0 copay'
      }
    },

    // Best for personas
    bestFor: ['families', 'chronic-conditions', 'budget-conscious', 'predictable-rx'],

    // Pros and cons
    pros: [
      'LOWEST total annual cost across all scenarios',
      'BEST pharmacy predictability - flat $35-75 copays for Ozempic',
      'NO spouse surcharge - SAVES $1,800/year vs USG',
      'Simplest administration - one family plan',
      'Single combined OOP maximum (no separate Rx OOP trap)',
      'Embedded deductible structure protects each family member',
      'Free telehealth visits ($0 copay)'
    ],
    cons: [
      'Must meet $1,700 individual deductible before Ozempic copays apply',
      'Higher coinsurance (20%) vs USG (10%) for major medical events',
      'High family OOP maximum ($15,300) - though unlikely to reach',
      'Limited out-of-network coverage compared to USG PPO',
      'Must verify Ozempic tier placement with ProAct before enrollment'
    ],

    // Estimated annual costs for family of 4
    estimatedAnnualCosts: {
      lowUse: {
        premiums: 6719,
        ozempic: 2600,
        medical: 200,
        total: 9519,
        note: 'Annual physicals, 2-3 sick visits, preventive care'
      },
      moderateUse: {
        premiums: 6719,
        ozempic: 2600,
        medical: 1000,
        total: 10319,
        note: '6-8 doctor visits, urgent care, labs, imaging'
      },
      highUse: {
        premiums: 6719,
        ozempic: 2600,
        medical: 2500,
        total: 11819,
        note: 'ER visit or significant medical event'
      }
    }
  },

  {
    id: 'zaxbys-oap3000-2026',
    name: 'Zaxbys OAP 3000',
    employer: 'Zaxbys',
    planYear: 2026,
    category: 'PPO - Higher Deductible Option',
    carrier: 'AmeriBen / Anthem',
    recommended: false,
    rank: 3,
    score: 66,
    badge: 'NOT RECOMMENDED',

    // Premium costs (MONTHLY)
    premiums: {
      monthly: {
        employee: 137.89,
        employeeSpouse: 328.27,
        employeeChildren: 311.16,
        family: 519.63
      },
      annual: {
        employee: 1655,
        employeeSpouse: 3939,
        employeeChildren: 3734,
        family: 6236
      }
    },

    surcharges: {
      workingSpouse: {
        applies: false,
        monthlyAmount: 0,
        annualAmount: 0,
        note: 'No spouse surcharge'
      }
    },

    actualFamilyCost: {
      monthly: 519.63,
      annual: 6236
    },

    // Cost sharing - HIGHER deductibles
    deductible: {
      individual: 3000,
      family: 9000,
      structure: 'embedded',
      note: 'MUCH HIGHER than OAP 1700 - adds $1,300 to Ozempic first-year cost'
    },
    outOfPocketMax: {
      individual: 6000,
      family: 18000,
      combined: true,
      totalFamilyExposure: 18000,
      note: 'Higher OOP max than OAP 1700'
    },
    coinsurance: 30, // Member pays 30%, plan pays 70% - WORSE

    hsaEligible: false,
    employerHSAContribution: {
      employee: 0,
      family: 0
    },

    coverage: {
      primaryCare: {
        cost: '$25 copay',
        note: 'Same copays as OAP 1700'
      },
      specialist: {
        cost: '$50 copay',
        note: 'Same copays as OAP 1700'
      },
      urgentCare: {
        cost: '$50 copay',
        note: 'Same copays as OAP 1700'
      },
      emergency: {
        cost: '$350 copay',
        note: 'Same copays as OAP 1700'
      },
      inpatient: {
        cost: '30% coinsurance after deductible',
        note: 'WORSE - Member pays 30%, plan pays 70%'
      },
      outpatient: {
        cost: '30% coinsurance after deductible',
        note: 'WORSE - Member pays 30%, plan pays 70%'
      },
      prescription: {
        pbm: 'ProAct',
        deductibleRequired: true,
        deductibleNote: 'Must meet $3,000 individual deductible first',
        generic: '$7 copay after deductible',
        preferredBrand: '$35 copay after deductible',
        nonPreferred: '$75 copay after deductible',
        ozempic: {
          tier: 'Tier 2 or 3',
          costPer30DayTier2: 35,
          costPer30DayTier3: 75,
          annualCostTier2: 420,
          annualCostTier3: 900,
          firstYearCostTier2: 3420, // 3000 deductible + 420
          firstYearCostTier3: 3900, // 3000 deductible + 900
          deductibleRequired: true,
          note: 'Higher deductible adds ~$1,300/year to Ozempic costs vs OAP 1700'
        }
      }
    },

    network: {
      name: 'AmeriBen Network (Anthem affiliation)',
      size: 'Same as OAP 1700',
      type: 'PPO',
      pcpRequired: false,
      referralsRequired: false,
      outOfNetworkCovered: false,
      telehealth: {
        provider: 'LiveHealth Online',
        cost: '$0 copay'
      }
    },

    bestFor: [], // Not recommended for anyone

    pros: [
      'Lowest monthly premium ($519.63)',
      'No spouse surcharge',
      'Same copay structure as OAP 1700'
    ],
    cons: [
      'NOT RECOMMENDED - Higher deductible negates premium savings',
      'Much higher $3,000 individual deductible',
      'Adds ~$1,300/year to Ozempic costs in first year',
      'Worse 70/30 coinsurance vs 80/20 on OAP 1700',
      'Higher OOP maximum ($18,000 family)',
      'Premium savings ($40/month) completely erased by higher medical costs'
    ],

    estimatedAnnualCosts: {
      lowUse: {
        premiums: 6236,
        ozempic: 3900,
        medical: 200,
        total: 10336,
        note: 'Higher deductible makes this expensive even with low use'
      },
      moderateUse: {
        premiums: 6236,
        ozempic: 3900,
        medical: 1500,
        total: 11636,
        note: 'More expensive than OAP 1700 due to higher deductible'
      },
      highUse: {
        premiums: 6236,
        ozempic: 3900,
        medical: 4000,
        total: 14136,
        note: 'Significantly more expensive with high usage'
      }
    }
  },

  {
    id: 'split-config-2026',
    name: 'Split: Scott+Kids Zaxbys, Liz Zaxbys',
    employer: 'Zaxbys (both enrollments)',
    planYear: 2026,
    category: 'Split Configuration',
    carrier: 'AmeriBen / Anthem',
    recommended: false,
    rank: 2,
    score: 73,
    badge: 'BUDGET OPTION',

    premiums: {
      monthly: {
        scottAndKids: 327.60,
        liz: 163.39,
        total: 490.99
      },
      annual: {
        scottAndKids: 3931,
        liz: 1961,
        total: 5892
      }
    },

    surcharges: {
      workingSpouse: {
        applies: false,
        monthlyAmount: 0,
        annualAmount: 0,
        note: 'No surcharge - not covering spouse on either plan'
      }
    },

    actualFamilyCost: {
      monthly: 490.99,
      annual: 5892
    },

    deductible: {
      individual: 1700,
      note: 'TWO separate $1,700 deductibles must be met (one for each plan)'
    },
    outOfPocketMax: {
      scottAndKidsPlan: 15300,
      lizPlan: 5100,
      note: 'Two separate OOP maximums - complex to track'
    },
    coinsurance: 20,

    hsaEligible: false,
    employerHSAContribution: {
      employee: 0,
      family: 0
    },

    coverage: {
      note: 'Both plans use Zaxbys OAP 1700 benefits',
      primaryCare: { cost: '$25 copay' },
      specialist: { cost: '$50 copay' },
      urgentCare: { cost: '$50 copay' },
      emergency: { cost: '$350 copay' },
      prescription: {
        pbm: 'ProAct',
        ozempic: {
          firstYearCost: 2600,
          ongoingCost: '420-900',
          note: 'Ozempic user must meet individual $1,700 deductible on their plan'
        }
      }
    },

    network: {
      name: 'AmeriBen Network',
      type: 'PPO',
      note: 'Both plans use same network'
    },

    bestFor: ['budget-conscious', 'administrative-complexity-ok'],

    pros: [
      'LOWEST monthly premium of all scenarios ($490.99)',
      'No spouse surcharge',
      'Good pharmacy predictability after deductibles met',
      'Two separate OOP protections may help with claims'
    ],
    cons: [
      'Administrative complexity - managing TWO separate enrollments',
      'Must meet TWO individual deductibles ($1,700 each = $3,400 total)',
      'More complex claims and EOB tracking',
      'Ozempic user pays full individual deductible before copays',
      'Only saves ~$69/month vs recommended Zaxbys Family plan',
      'Coordination hassle not worth the small savings'
    ],

    estimatedAnnualCosts: {
      lowUse: {
        premiums: 5892,
        ozempic: 2600,
        medical: 175,
        total: 8667,
        note: 'Lowest premium but requires managing 2 plans'
      },
      moderateUse: {
        premiums: 5892,
        ozempic: 2600,
        medical: 1200,
        total: 9692,
        note: 'Good cost but administrative burden'
      },
      highUse: {
        premiums: 5892,
        ozempic: 2600,
        medical: 3500,
        total: 11992,
        note: 'May hit both OOP maximums'
      }
    }
  }
];

// Scenario comparison data
const scenarios = [
  {
    id: 'scenario-3',
    name: 'Entire Family on Zaxbys OAP 1700',
    rank: 1,
    score: 95,
    recommended: true,
    planIds: ['zaxbys-oap1700-2026'],
    monthlyCost: 559.95,
    annualCost: 6719,
    estimatedTotalModerate: 10319,
    savings: {
      vsUSG: 3037,
      vsUSGNote: 'Saves $3,037/year vs USG Comprehensive (moderate use)'
    }
  },
  {
    id: 'scenario-1',
    name: 'Split Configuration',
    rank: 2,
    score: 73,
    recommended: false,
    planIds: ['split-config-2026'],
    monthlyCost: 490.99,
    annualCost: 5892,
    estimatedTotalModerate: 9692,
    note: 'Lowest premium but administrative complexity'
  },
  {
    id: 'scenario-4',
    name: 'Entire Family on Zaxbys OAP 3000',
    rank: 3,
    score: 66,
    recommended: false,
    planIds: ['zaxbys-oap3000-2026'],
    monthlyCost: 519.63,
    annualCost: 6236,
    estimatedTotalModerate: 11636,
    note: 'NOT RECOMMENDED - Higher deductible negates savings'
  },
  {
    id: 'scenario-2',
    name: 'Entire Family on USG Comprehensive',
    rank: 4,
    score: 62,
    recommended: false,
    planIds: ['usg-comprehensive-2025'],
    monthlyCost: 863.04,
    annualCost: 10356,
    estimatedTotalModerate: 13356,
    note: 'MOST EXPENSIVE - $150/month surcharge penalty'
  }
];

// Persona definitions for recommendations
const personas = {
  'families': {
    name: 'Families with Children',
    description: 'Parents with children needing regular care',
    priorities: ['Predictable costs', 'Low copays', 'Good prescription coverage'],
    recommendedPlan: 'zaxbys-oap1700-2026',
    typicalUsage: 'Multiple annual physicals, pediatric visits, prescriptions'
  },
  'chronic-conditions': {
    name: 'Chronic Conditions / Medications',
    description: 'Managing ongoing health conditions requiring regular medications (like Ozempic)',
    priorities: ['Predictable Rx costs', 'Low out-of-pocket', 'Good pharmacy benefits'],
    recommendedPlan: 'zaxbys-oap1700-2026',
    typicalUsage: 'Monthly prescriptions, regular doctor visits, ongoing care'
  },
  'budget-conscious': {
    name: 'Budget-Conscious Families',
    description: 'Want to minimize fixed monthly costs',
    priorities: ['Lowest premiums', 'No surcharges', 'Value'],
    recommendedPlan: 'zaxbys-oap1700-2026',
    note: 'Split config has lower premium but not worth the complexity',
    typicalUsage: 'Moderate healthcare use, careful spending'
  },
  'predictable-rx': {
    name: 'Need Predictable Rx Costs',
    description: 'Taking expensive medications, want to know exact costs',
    priorities: ['Flat copays', 'No surprises', 'Low pharmacy costs'],
    recommendedPlan: 'zaxbys-oap1700-2026',
    typicalUsage: 'Monthly specialty medications'
  },
  'comprehensive-coverage': {
    name: 'Maximum Coverage Seekers',
    description: 'Want best protection regardless of premium cost',
    priorities: ['Low OOP max', 'Comprehensive coverage', 'Best benefits'],
    recommendedPlan: 'zaxbys-oap1700-2026',
    typicalUsage: 'All types of care, preventive and treatment'
  },
  'out-of-network-needs': {
    name: 'Out-of-Network Needs',
    description: 'Need flexibility to see out-of-network providers',
    priorities: ['OON coverage', 'Provider choice', 'PPO network'],
    recommendedPlan: 'usg-comprehensive-2025',
    note: 'Only choose USG if you NEED out-of-network coverage',
    typicalUsage: 'Specialists outside network, travel frequently'
  },
  'usg-employees-only': {
    name: 'USG Employee Coverage Only',
    description: 'Scott gets USG employee-only, Liz+kids get Zaxbys',
    priorities: ['Avoid surcharge', 'Best of both employers', 'Flexibility'],
    recommendedPlan: 'Mixed configuration',
    note: 'Not offered as a plan option - would need custom setup',
    typicalUsage: 'Split family coverage'
  }
};

// Action items from analysis
const actionItems = [
  {
    priority: 'HIGH',
    action: 'Verify Ozempic tier placement with ProAct (Zaxbys)',
    contact: 'Call 1-877-635-9545 or visit www.proactrx.com',
    impact: 'Could change annual cost by $500-1,000',
    deadline: 'Before enrollment'
  },
  {
    priority: 'HIGH',
    action: 'Verify current doctors are in-network for Zaxbys OAP 1700',
    contact: 'Visit www.ameriben.com or call 1-855-961-5406',
    impact: 'Out-of-network care significantly more expensive',
    deadline: 'Before enrollment'
  },
  {
    priority: 'HIGH',
    action: 'Confirm prior authorization requirements for Ozempic',
    contact: 'ProAct for Zaxbys plans',
    impact: 'PA denial could eliminate coverage',
    deadline: 'Before enrollment'
  },
  {
    priority: 'MEDIUM',
    action: 'Investigate Novo Nordisk copay assistance programs',
    contact: 'Visit www.novocare.com',
    impact: 'Could reduce Ozempic costs significantly',
    deadline: 'After enrollment confirmation'
  },
  {
    priority: 'MEDIUM',
    action: 'Enroll in Zaxbys OAP 1700 during open enrollment',
    contact: 'Zaxbys HR department',
    impact: 'Missing deadline means waiting until next year',
    deadline: 'Check with HR for exact dates'
  },
  {
    priority: 'LOW',
    action: 'Consider FSA enrollment for predictable expenses',
    contact: 'Zaxbys HR',
    impact: 'Tax savings on deductibles and copays (~$948 with $3,200 FSA)',
    deadline: 'During open enrollment'
  }
];

// Final recommendation summary
const recommendation = {
  topChoice: {
    planId: 'zaxbys-oap1700-2026',
    name: 'Entire Family on Zaxbys OAP 1700',
    monthlyPremium: 559.95,
    annualPremium: 6719,
    estimatedAnnualTotal: 10319,
    reasons: [
      'LOWEST total annual cost across all scenarios',
      'BEST pharmacy predictability for Ozempic',
      'NO spouse surcharge - saves $1,800/year vs USG',
      'Simplest administration - one family plan',
      'Single combined OOP maximum',
      'Embedded deductible protects each family member'
    ]
  },
  alternativeChoice: {
    planId: 'split-config-2026',
    name: 'Split Configuration (Budget Option)',
    monthlyPremium: 490.99,
    annualPremium: 5892,
    estimatedAnnualTotal: 9692,
    note: 'Only $69/month cheaper but adds significant administrative complexity - not recommended'
  },
  avoid: [
    {
      planId: 'usg-comprehensive-2025',
      reason: '$150/month surcharge makes this $3,037/year more expensive than Zaxbys'
    },
    {
      planId: 'zaxbys-oap3000-2026',
      reason: 'Higher deductible adds $1,300 to Ozempic costs, negating premium savings'
    }
  ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { healthPlans, personas, scenarios, actionItems, recommendation };
}
