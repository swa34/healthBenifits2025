# Features Overview - Health Benefits Advisor

## Page 1: Recommendations & Analysis (index.html)

### Hero Section
```
┌────────────────────────────────────────────────────┐
│          Find Your Perfect Health Plan             │
│   Data-driven recommendations based on costs       │
│                                                     │
│  [View Recommendations]  [Try Calculator]          │
│                                                     │
│    3 Plans  |  $4,500 Savings  |  9 Profiles      │
└────────────────────────────────────────────────────┘
```

### How It Works (4 Steps)
Visual step-by-step guide with numbered circles showing the user journey.

### Top Recommended Plans
```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│   Bronze HSA Plan   │  │   Gold PPO Plan     │  │  Platinum HMO Plan  │
│   🏆 BEST VALUE     │  │                     │  │                     │
│                     │  │                     │  │                     │
│  $85/month          │  │  $165/month         │  │  $225/month         │
│  $3,000 deductible  │  │  $1,000 deductible  │  │  $500 deductible    │
│                     │  │                     │  │                     │
│  ✓ Lowest premium   │  │  ✓ Low copays       │  │  ✓ Best coverage    │
│  ✓ HSA eligible     │  │  ✓ Good for families│  │  ✓ Integrated care  │
│                     │  │                     │  │                     │
│  Best for:          │  │  Best for:          │  │  Best for:          │
│  [Young & Healthy]  │  │  [Families]         │  │  [Chronic Care]     │
│                     │  │                     │  │                     │
│  [Calculate Costs]  │  │  [Calculate Costs]  │  │  [Calculate Costs]  │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

### Cost Analysis by Scenario
Interactive chart with 4 scenario buttons:
- Healthy Individual
- Average User
- Chronic Condition
- Family

Bar chart showing total annual costs for each plan in selected scenario.

### Find Your Healthcare Profile
Grid of 9 persona cards (clickable):
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Young & Healthy  │  │    Families      │  │ Chronic Condition│
│                  │  │                  │  │                  │
│ Age 25-35,       │  │ Parents with     │  │ Managing ongoing │
│ minimal needs    │  │ children         │  │ health conditions│
│                  │  │                  │  │                  │
│ Priorities:      │  │ Priorities:      │  │ Priorities:      │
│ → Low premiums   │  │ → Low copays     │  │ → Low OOP max    │
│ → HSA eligible   │  │ → Predictable    │  │ → Good Rx        │
└──────────────────┘  └──────────────────┘  └──────────────────┘

[... 6 more personas ...]
```

### Detailed Plan Comparison
Switchable table views (Overview | Costs | Coverage Details)

Comprehensive side-by-side comparison with sticky first column:
```
┌─────────────────┬─────────────┬─────────────┬─────────────┐
│ Feature         │  Bronze HSA │  Gold PPO   │ Platinum    │
├─────────────────┼─────────────┼─────────────┼─────────────┤
│ Monthly Premium │    $85      │    $165     │    $225     │
│ Deductible      │  $3,000     │  $1,000     │    $500     │
│ Primary Care    │  20% after  │  $25 copay  │  $15 copay  │
│ Specialist      │  deductible │  $50 copay  │  $35 copay  │
│ Generic Rx      │  20% after  │  $10 copay  │   $5 copay  │
└─────────────────┴─────────────┴─────────────┴─────────────┘
```

### FAQ Section
Collapsible accordion with 6 common questions:
- How are recommendations calculated?
- What's the difference between PPO, HMO, HSA?
- Should I choose high or low deductible?
- What is an HSA?
- How to use the calculator?
- Can I change plans after enrollment?

---

## Page 2: Interactive Calculator (calculator.html)

### Input Panel (Left Side - Sticky)
```
┌─────────────────────────────────────┐
│    Personal Information              │
│                                      │
│  Coverage Tier: [Employee Only ▼]   │
│  Age: [35      ]                     │
│  Dependents: [0       ]              │
│                                      │
│    Expected Healthcare Usage         │
│                                      │
│  Primary Care Visits (Annual)        │
│  ●━━━━━━━━━━━━━━━━━━○  2            │
│                                      │
│  Specialist Visits                   │
│  ○━━━━━━━━━━━━━━━━━━○  0            │
│                                      │
│  Urgent Care Visits                  │
│  ○━━━━━━━━━━━━━━━━━━○  0            │
│                                      │
│  Emergency Room Visits               │
│  ○━━━━━━━━━━━━━━━━━━○  0            │
│                                      │
│    Prescription Medications          │
│                                      │
│  Generic (Monthly)                   │
│  ○━━━━━━━━━━━━━━━━━━○  0            │
│                                      │
│  Preferred Brand (Monthly)           │
│  ○━━━━━━━━━━━━━━━━━━○  0            │
│                                      │
│  [... more Rx sliders ...]          │
│                                      │
│    Additional Expenses               │
│                                      │
│  Planned Procedures: [$0      ]      │
│                                      │
│  ☐ I have chronic condition(s)      │
│                                      │
│    [Calculate Costs]                 │
└─────────────────────────────────────┘
```

### Results Panel (Right Side - Scrollable)

#### Summary Cards
```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ 🏆 Best Plan        │  │  Potential Savings  │  │  Average Cost       │
│  Bronze HSA Plan    │  │     $1,500          │  │    $2,500           │
│  $770 / year        │  │  vs. highest cost   │  │  across all plans   │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

#### Detailed Breakdown
Toggle between Card View and Table View

**Card View:**
```
┌────────────────────────────────────────────────────┐
│  Bronze HSA Plan                    Total: $770    │
├────────────────────────────────────────────────────┤
│  Annual Premiums              $1,020              │
│  Primary Care Visits            $100              │
│  Specialist Visits               $0               │
│  Urgent Care Visits              $0               │
│  Emergency Room Visits           $0               │
│  Prescriptions                   $0               │
│  Employer HSA Contribution     -$750              │
│  ─────────────────────────────────────            │
│  Total Medical Costs            $100              │
│                                                    │
│  Deductible: $3,000    OOP Max: $7,000           │
│  Monthly: $64                                     │
└────────────────────────────────────────────────────┘
```

#### Cost Comparison Chart
Bar chart showing total annual cost for each plan with best value highlighted in green.

#### Monthly Breakdown
12 cards (one per month) showing monthly cost distribution.

#### Break-Even Analysis
Smart analysis showing when higher-premium plans become cost-effective:
```
┌────────────────────────────────────────────────────┐
│  Bronze HSA becomes more cost-effective after      │
│  8 months of high medical usage                    │
│                                                     │
│  Gold PPO has $80 higher monthly premium, but      │
│  may save money with frequent healthcare use.      │
└────────────────────────────────────────────────────┘
```

#### Savings Comparison
Cards showing potential savings comparing best plan to others:
```
┌──────────────────────┐  ┌──────────────────────┐
│  Bronze vs Gold PPO  │  │  Bronze vs Platinum  │
│      $1,500          │  │      $2,800          │
│  Annual savings      │  │  Annual savings      │
│  ($125/month)        │  │  ($233/month)        │
└──────────────────────┘  └──────────────────────┘
```

#### Personalized Recommendation
Smart recommendation with reasoning:
```
┌────────────────────────────────────────────────────┐
│  Bronze HSA Plan                                   │
│                                                     │
│  For your low healthcare usage, Bronze HSA Plan    │
│  minimizes costs while maintaining coverage.       │
│                                                     │
│  Why this plan:                                    │
│  • Low premiums save money when you rarely need    │
│    care                                            │
│  • Employer HSA contribution of $750 provides      │
│    additional value                                │
│  • Protection from catastrophic costs              │
│                                                     │
│  Your estimated costs:                             │
│  Monthly: $64       Annual: $770                   │
└────────────────────────────────────────────────────┘
```

### Saved Scenarios Section
List of previously saved calculations with Load/Delete options:
```
┌────────────────────────────────────────────────────┐
│  Scenario from 10/25/2025, 11:30 AM                │
│  Best plan: Bronze HSA Plan ($770/year)            │
│                              [Load]  [Delete]      │
└────────────────────────────────────────────────────┘
```

### Calculator Tips
4 cards with helpful guidance:
- Be Realistic
- Compare Scenarios
- Consider HSA Benefits
- Account for Changes

---

## Interactive Features

### Dark/Light Mode Toggle
Click sun/moon icon in header to switch themes.
- Preference saved in browser
- Smooth transitions
- Charts update colors automatically

### Mobile Menu
Hamburger menu on mobile with smooth slide-in navigation.

### Scroll Progress Bar
Thin bar at top of page showing scroll position.

### Back to Top Button
Floating button appears after scrolling down, smooth scroll to top.

### Responsive Tables
Tables scroll horizontally on mobile with sticky first column.

### Interactive Charts (Chart.js)
- Hover for detailed tooltips
- Responsive sizing
- Animated transitions
- Theme-aware colors

### Form Sliders
- Real-time value display
- Smooth drag interaction
- Touch-friendly on mobile
- Instant feedback

### Persona Selection
- Click persona card to highlight
- Shows matching plans
- Auto-scrolls to recommendations
- Visual feedback

### Scenario Management
- Save current calculation
- Load previous scenarios
- Compare multiple what-if analyses
- Clear all with confirmation

---

## Accessibility Features

- Semantic HTML5 (nav, main, section, article, aside)
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Space)
- Skip to content link
- Focus indicators
- High contrast ratios
- Screen reader friendly
- Alt text for visuals
- Proper heading hierarchy

---

## Performance Optimizations

- Vanilla JavaScript (no framework overhead)
- CSS custom properties (fast theme switching)
- Single external dependency (Chart.js CDN)
- Optimized images (none in this build)
- Mobile-first CSS
- Print-optimized stylesheets

---

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS, Android)

Requires JavaScript enabled for full functionality.

---

## File Summary

**Total Files**: 10
**Total Code**: ~4,500 lines
**Total Size**: ~160 KB (uncompressed)
**External Dependencies**: Chart.js (CDN only)
**Build Process**: None required
**Deployment**: GitHub Pages ready

---

This is a complete, production-ready website that works immediately after deployment!
