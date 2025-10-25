# Health Benefits Advisor

A comprehensive, interactive GitHub Pages website for health benefits analysis and decision-making. Features data-driven plan recommendations and a powerful cost calculator to help users choose the best health insurance plan for their needs.

## Features

### Recommendations Page (`index.html`)
- **Top Plan Recommendations**: Data-driven analysis showing best value plans
- **Interactive Comparison Charts**: Visual cost analysis across different user scenarios
- **Detailed Comparison Tables**: Side-by-side feature and cost comparisons
- **User Persona Matching**: Find plans tailored to your healthcare profile
- **FAQ Section**: Common questions about health insurance answered
- **Dark/Light Mode**: Toggle between themes with preference persistence
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

### Interactive Calculator (`calculator.html`)
- **Personalized Cost Estimates**: Input your specific healthcare needs
- **Real-Time Calculations**: Instant updates as you adjust variables
- **Comprehensive Inputs**:
  - Coverage tier (employee, family, etc.)
  - Expected doctor visits (primary care, specialist, urgent care, ER)
  - Prescription medications by type
  - Planned procedures and surgeries
  - Chronic condition considerations
- **Rich Visualizations**:
  - Cost comparison charts
  - Monthly breakdowns
  - Break-even analysis
  - Savings comparisons
- **Scenario Management**: Save and compare multiple scenarios
- **Export Options**: Print or save results
- **Smart Recommendations**: Personalized plan suggestions based on your inputs

## Technology Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern responsive design with CSS custom properties
- **Vanilla JavaScript**: No framework dependencies, fast and lightweight
- **Chart.js**: Beautiful, responsive charts
- **GitHub Pages**: Free, reliable hosting

## File Structure

```
benifits2025/
├── index.html              # Main recommendations page
├── calculator.html         # Interactive calculator page
├── styles.css             # All styling (responsive, dark mode)
├── script.js              # Recommendations page interactivity
├── calculator.js          # Calculator calculation engine
├── data.js                # Health plan data structure (REPLACE WITH REAL DATA)
├── _config.yml            # GitHub Pages configuration
└── README.md              # This file
```

## Quick Start

### Local Development

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd benifits2025
   ```

2. **Open in a browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve

   # Then visit http://localhost:8000
   ```

3. **Make changes**
   - Edit files and refresh browser to see changes
   - All files are standalone - no build process required

### Updating Health Plan Data

**IMPORTANT**: The `data.js` file contains placeholder data. Replace it with real plan information:

1. Open `data.js`
2. Update the `healthPlans` array with actual plan details:
   - Premiums (monthly and annual for all coverage tiers)
   - Deductibles and out-of-pocket maximums
   - Coverage details (copays, coinsurance)
   - Network information
   - HSA eligibility and employer contributions
   - Pros/cons and best-for personas

3. The data structure is designed to match output from the health-benefits-analyzer agent

Example structure:
```javascript
{
  id: 'plan-unique-id',
  name: 'Plan Name',
  category: 'Plan Type',
  carrier: 'Insurance Company',
  premiums: {
    monthly: { employee: 85, employeeSpouse: 195, ... },
    annual: { employee: 1020, employeeSpouse: 2340, ... }
  },
  deductible: { individual: 3000, family: 6000 },
  // ... see data.js for complete structure
}
```

## Deployment to GitHub Pages

### Method 1: GitHub Web Interface (Easiest)

1. **Create a new GitHub repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click "New repository"
   - Name it (e.g., `health-benefits-advisor`)
   - Choose Public or Private
   - Don't initialize with README (you already have one)
   - Click "Create repository"

2. **Upload files**
   - Click "uploading an existing file"
   - Drag and drop all files from this folder
   - Commit the changes

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section (left sidebar)
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main` (or `master`)
   - Select folder: `/ (root)`
   - Click Save

4. **Access your site**
   - Your site will be live at: `https://<username>.github.io/<repository-name>/`
   - It may take 1-2 minutes for the first deployment
   - Visit the URL and share with others!

### Method 2: Git Command Line

1. **Initialize repository** (if not already done)
   ```bash
   cd benifits2025
   git init
   git add .
   git commit -m "Initial commit: Health Benefits Advisor"
   ```

2. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/<username>/<repository-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Follow step 3 from Method 1 above
   - Or use GitHub CLI:
   ```bash
   gh repo create <repository-name> --public --source=. --push
   ```

4. **Update your site**
   ```bash
   # After making changes
   git add .
   git commit -m "Update health plan data"
   git push
   # Changes will appear in 1-2 minutes
   ```

### Method 3: Custom Domain (Optional)

1. **Configure DNS** (at your domain registrar)
   - Add a CNAME record pointing to `<username>.github.io`
   - Or add A records pointing to GitHub's IPs

2. **Update repository settings**
   - Go to Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

3. **Wait for DNS propagation** (up to 24 hours)

## Customization Guide

### Colors and Branding

Edit CSS custom properties in `styles.css`:

```css
:root {
  --primary-color: #2563eb;      /* Main brand color */
  --success-color: #10b981;      /* Success/best value */
  --warning-color: #f59e0b;      /* Warnings */
  --danger-color: #ef4444;       /* Errors/cons */
  /* ... and more */
}
```

### Typography

Change fonts in `styles.css`:

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
  --font-size-base: 1rem;        /* Base font size */
  /* ... adjust other sizes as needed */
}
```

### Adding/Removing Features

#### Add a new plan:
1. Edit `data.js`
2. Add new plan object to `healthPlans` array
3. Follow existing structure
4. Save and refresh

#### Modify calculator inputs:
1. Edit `calculator.html` to add/remove form fields
2. Update `calculator.js` to handle new inputs
3. Modify `calculatePlanCost()` function to include new calculations

#### Change recommendation logic:
1. Edit `script.js`
2. Modify `initRecommendationCards()` sorting logic
3. Update criteria in `displayPersonalizedRecommendation()` in `calculator.js`

### Content Updates

- **Hero text**: Edit `index.html` and `calculator.html` hero sections
- **FAQ**: Update FAQ section in `index.html`
- **Tips**: Modify calculator tips in `calculator.html`
- **Footer**: Update footer content in both HTML files

## Browser Support

Tested and supported on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Requires JavaScript enabled for full functionality.

## Accessibility

This site follows WCAG 2.1 AA guidelines:
- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Screen reader friendly
- Skip links for navigation
- Focus indicators
- Responsive text sizing

## Performance

Optimizations included:
- Minimal external dependencies (only Chart.js CDN)
- CSS custom properties for theming
- Lazy loading considerations
- Optimized JavaScript (no heavy frameworks)
- Mobile-first responsive design
- Print-friendly stylesheets

## Troubleshooting

### Site not appearing after deployment
- Wait 2-3 minutes for GitHub Pages to build
- Check Settings → Pages for deployment status
- Ensure files are in root directory, not a subdirectory
- Verify branch and folder settings are correct

### Charts not displaying
- Check browser console for errors
- Ensure Chart.js CDN is accessible
- Verify JavaScript is enabled

### Data not showing
- Check `data.js` is properly formatted
- Look for JavaScript errors in console
- Ensure `healthPlans` array is exported correctly

### Dark mode not persisting
- Check if localStorage is enabled in browser
- Clear browser cache and cookies
- Try in incognito/private mode to test

### Mobile menu not working
- Verify JavaScript is enabled
- Check for console errors
- Ensure viewport meta tag is present

## Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple devices
5. Submit a pull request

## License

This project is provided as-is for educational and personal use.

## Support

For issues or questions:
- Check this README thoroughly
- Review browser console for errors
- Check GitHub Issues for similar problems
- Consult GitHub Pages documentation

## Credits

Built with modern web standards and best practices:
- Chart.js for data visualization
- CSS Grid and Flexbox for layouts
- Vanilla JavaScript for interactivity
- GitHub Pages for hosting

---

**Ready to deploy?** Follow the deployment instructions above and share your health benefits advisor with your team!

**Need real data?** Replace the placeholder data in `data.js` with actual health plan information from your benefits analyzer.

**Want to customize?** Check the customization guide above to match your branding and needs.
