// Health Benefits Plan Data Structure
// This file contains placeholder data that should be replaced with actual plan information
// Data structure is designed for easy integration with health-benefits-analyzer agent

const healthPlans = [
  {
    id: 'plan-bronze-hsa',
    name: 'Bronze HSA Plan',
    category: 'High Deductible Health Plan',
    carrier: 'BlueCross BlueShield',

    // Premium costs
    premiums: {
      monthly: {
        employee: 85,
        employeeSpouse: 195,
        employeeChildren: 165,
        family: 275
      },
      annual: {
        employee: 1020,
        employeeSpouse: 2340,
        employeeChildren: 1980,
        family: 3300
      }
    },

    // Cost sharing
    deductible: {
      individual: 3000,
      family: 6000
    },
    outOfPocketMax: {
      individual: 7000,
      family: 14000
    },
    coinsurance: 20, // Percentage after deductible

    // HSA details
    hsaEligible: true,
    employerHSAContribution: {
      employee: 750,
      family: 1500
    },

    // Coverage details
    coverage: {
      primaryCare: {
        cost: '20% after deductible',
        note: 'Preventive care covered at 100%'
      },
      specialist: {
        cost: '20% after deductible',
        note: 'Referral not required'
      },
      urgentCare: {
        cost: '20% after deductible',
        note: 'No copay for preventive'
      },
      emergency: {
        cost: '20% after deductible',
        note: 'Waived if admitted'
      },
      prescription: {
        generic: '20% after deductible',
        preferred: '20% after deductible',
        nonPreferred: '20% after deductible',
        specialty: '20% after deductible'
      },
      dental: {
        included: true,
        preventive: '100% covered',
        basic: '80% after $50 deductible',
        major: '50% after $50 deductible',
        orthodontia: 'Not covered'
      },
      vision: {
        included: true,
        exam: '$10 copay',
        materials: 'Up to $150 allowance'
      }
    },

    // Network information
    network: {
      name: 'BlueCard PPO',
      size: 'National - 1.5M providers',
      type: 'PPO'
    },

    // Best for personas
    bestFor: ['young-healthy', 'hsa-savers', 'low-utilization'],

    // Pros and cons
    pros: [
      'Lowest monthly premium',
      'HSA eligible with employer contribution',
      'Triple tax advantage with HSA',
      'Large nationwide network',
      'Good for those who rarely use healthcare'
    ],
    cons: [
      'High deductible before coverage kicks in',
      'Higher out-of-pocket costs for frequent users',
      'Must pay full cost until deductible met',
      'Not ideal for chronic conditions'
    ],

    // Estimated annual costs for different scenarios
    estimatedAnnualCosts: {
      healthyIndividual: {
        premiums: 1020,
        expectedMedical: 500,
        hsaContribution: -750,
        total: 770,
        note: 'Minimal usage, preventive care only'
      },
      averageIndividual: {
        premiums: 1020,
        expectedMedical: 2500,
        hsaContribution: -750,
        total: 2770,
        note: 'Few doctor visits, some prescriptions'
      },
      chronicCondition: {
        premiums: 1020,
        expectedMedical: 7000,
        hsaContribution: -750,
        total: 7270,
        note: 'Hits out-of-pocket maximum'
      },
      family: {
        premiums: 3300,
        expectedMedical: 4500,
        hsaContribution: -1500,
        total: 6300,
        note: 'Average family usage'
      }
    }
  },

  {
    id: 'plan-gold-ppo',
    name: 'Gold PPO Plan',
    category: 'Preferred Provider Organization',
    carrier: 'Aetna',

    premiums: {
      monthly: {
        employee: 165,
        employeeSpouse: 385,
        employeeChildren: 325,
        family: 525
      },
      annual: {
        employee: 1980,
        employeeSpouse: 4620,
        employeeChildren: 3900,
        family: 6300
      }
    },

    deductible: {
      individual: 1000,
      family: 2000
    },
    outOfPocketMax: {
      individual: 4000,
      family: 8000
    },
    coinsurance: 10,

    hsaEligible: false,
    employerHSAContribution: {
      employee: 0,
      family: 0
    },

    coverage: {
      primaryCare: {
        cost: '$25 copay',
        note: 'No deductible required'
      },
      specialist: {
        cost: '$50 copay',
        note: 'No deductible required'
      },
      urgentCare: {
        cost: '$75 copay',
        note: 'Waived if admitted'
      },
      emergency: {
        cost: '$250 copay',
        note: 'Waived if admitted'
      },
      prescription: {
        generic: '$10 copay',
        preferred: '$35 copay',
        nonPreferred: '$70 copay',
        specialty: '10% coinsurance'
      },
      dental: {
        included: true,
        preventive: '100% covered',
        basic: '80% after $50 deductible',
        major: '50% after $50 deductible',
        orthodontia: '50% covered, $1500 lifetime max'
      },
      vision: {
        included: true,
        exam: 'Covered in full',
        materials: 'Up to $200 allowance'
      }
    },

    network: {
      name: 'Aetna Choice POS II',
      size: 'National - 1.2M providers',
      type: 'PPO'
    },

    bestFor: ['families', 'frequent-users', 'chronic-conditions', 'predictable-costs'],

    pros: [
      'Low copays for office visits',
      'Prescriptions covered before deductible',
      'Lower out-of-pocket maximum',
      'Predictable costs per visit',
      'Good for families and frequent healthcare users'
    ],
    cons: [
      'Higher monthly premium',
      'Not HSA eligible',
      'Less savings potential for healthy individuals',
      'Higher annual cost for minimal usage'
    ],

    estimatedAnnualCosts: {
      healthyIndividual: {
        premiums: 1980,
        expectedMedical: 300,
        hsaContribution: 0,
        total: 2280,
        note: 'Minimal usage, preventive care only'
      },
      averageIndividual: {
        premiums: 1980,
        expectedMedical: 1200,
        hsaContribution: 0,
        total: 3180,
        note: 'Regular doctor visits, prescriptions'
      },
      chronicCondition: {
        premiums: 1980,
        expectedMedical: 4000,
        hsaContribution: 0,
        total: 5980,
        note: 'Hits out-of-pocket maximum'
      },
      family: {
        premiums: 6300,
        expectedMedical: 3500,
        hsaContribution: 0,
        total: 9800,
        note: 'Active family with regular care'
      }
    }
  },

  {
    id: 'plan-platinum-hmo',
    name: 'Platinum HMO Plan',
    category: 'Health Maintenance Organization',
    carrier: 'Kaiser Permanente',

    premiums: {
      monthly: {
        employee: 225,
        employeeSpouse: 515,
        employeeChildren: 435,
        family: 695
      },
      annual: {
        employee: 2700,
        employeeSpouse: 6180,
        employeeChildren: 5220,
        family: 8340
      }
    },

    deductible: {
      individual: 500,
      family: 1000
    },
    outOfPocketMax: {
      individual: 3000,
      family: 6000
    },
    coinsurance: 5,

    hsaEligible: false,
    employerHSAContribution: {
      employee: 0,
      family: 0
    },

    coverage: {
      primaryCare: {
        cost: '$15 copay',
        note: 'Must select PCP'
      },
      specialist: {
        cost: '$35 copay',
        note: 'Referral required'
      },
      urgentCare: {
        cost: '$35 copay',
        note: 'Kaiser facilities only'
      },
      emergency: {
        cost: '$150 copay',
        note: 'Waived if admitted'
      },
      prescription: {
        generic: '$5 copay',
        preferred: '$20 copay',
        nonPreferred: '$50 copay',
        specialty: '5% coinsurance'
      },
      dental: {
        included: true,
        preventive: '100% covered',
        basic: '90% covered',
        major: '60% covered',
        orthodontia: '50% covered, $2000 lifetime max'
      },
      vision: {
        included: true,
        exam: 'Covered in full',
        materials: 'Up to $250 allowance'
      }
    },

    network: {
      name: 'Kaiser Permanente',
      size: 'Regional - 23,000+ physicians',
      type: 'HMO'
    },

    bestFor: ['chronic-conditions', 'families', 'comprehensive-coverage', 'integrated-care'],

    pros: [
      'Lowest copays and out-of-pocket costs',
      'Integrated care system',
      'Comprehensive dental and vision',
      'Best for chronic conditions',
      'Coordinated care with digital records'
    ],
    cons: [
      'Highest monthly premium',
      'Limited to Kaiser network',
      'Must use Kaiser facilities',
      'Requires referrals for specialists',
      'Not available in all areas'
    ],

    estimatedAnnualCosts: {
      healthyIndividual: {
        premiums: 2700,
        expectedMedical: 200,
        hsaContribution: 0,
        total: 2900,
        note: 'Minimal usage, preventive care only'
      },
      averageIndividual: {
        premiums: 2700,
        expectedMedical: 800,
        hsaContribution: 0,
        total: 3500,
        note: 'Regular doctor visits, prescriptions'
      },
      chronicCondition: {
        premiums: 2700,
        expectedMedical: 3000,
        hsaContribution: 0,
        total: 5700,
        note: 'Hits out-of-pocket maximum'
      },
      family: {
        premiums: 8340,
        expectedMedical: 2800,
        hsaContribution: 0,
        total: 11140,
        note: 'Comprehensive family coverage'
      }
    }
  }
];

// Persona definitions for recommendations
const personas = {
  'young-healthy': {
    name: 'Young & Healthy',
    description: 'Age 25-35, single, minimal healthcare needs, preventive care only',
    priorities: ['Low premiums', 'HSA eligibility', 'Basic coverage'],
    typicalUsage: 'Annual physical, occasional urgent care visit'
  },
  'families': {
    name: 'Families',
    description: 'Parents with children, regular pediatric care, active lifestyle',
    priorities: ['Predictable costs', 'Low copays', 'Good prescription coverage'],
    typicalUsage: 'Multiple annual physicals, pediatric visits, prescriptions'
  },
  'chronic-conditions': {
    name: 'Chronic Conditions',
    description: 'Managing ongoing health conditions requiring regular care',
    priorities: ['Low out-of-pocket max', 'Good prescription coverage', 'Specialist access'],
    typicalUsage: 'Monthly specialist visits, ongoing prescriptions, regular tests'
  },
  'frequent-users': {
    name: 'Frequent Healthcare Users',
    description: 'Regular medical needs, multiple prescriptions',
    priorities: ['Low copays', 'Low out-of-pocket max', 'Good Rx coverage'],
    typicalUsage: 'Regular doctor visits, multiple prescriptions, preventive care'
  },
  'hsa-savers': {
    name: 'HSA Savers',
    description: 'Want to maximize tax-advantaged savings for future healthcare',
    priorities: ['HSA eligibility', 'Low premiums', 'Employer HSA contribution'],
    typicalUsage: 'Minimal current needs, planning for future healthcare costs'
  },
  'low-utilization': {
    name: 'Low Healthcare Users',
    description: 'Rarely use healthcare beyond preventive care',
    priorities: ['Lowest possible premiums', 'Catastrophic protection'],
    typicalUsage: 'Annual preventive care only'
  },
  'comprehensive-coverage': {
    name: 'Comprehensive Coverage Seekers',
    description: 'Want best possible coverage regardless of premium cost',
    priorities: ['Low copays', 'Comprehensive benefits', 'Dental/Vision included'],
    typicalUsage: 'All types of care, preventive and treatment'
  },
  'predictable-costs': {
    name: 'Predictable Cost Preference',
    description: 'Prefer knowing exact costs upfront via copays',
    priorities: ['Copay structure', 'No surprises', 'Budget-friendly'],
    typicalUsage: 'Moderate healthcare use with budgeting needs'
  },
  'integrated-care': {
    name: 'Integrated Care Preference',
    description: 'Value coordinated care and integrated health systems',
    priorities: ['Coordinated care', 'Digital health records', 'One-stop healthcare'],
    typicalUsage: 'Regular care with preference for system integration'
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { healthPlans, personas };
}
