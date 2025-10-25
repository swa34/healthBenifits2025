# Deployment Checklist

Use this checklist to ensure your Health Benefits Advisor site is ready for deployment.

## Pre-Deployment

### 1. Update Health Plan Data
- [ ] Replace placeholder data in `data.js` with real health plan information
- [ ] Verify all premium amounts (monthly and annual)
- [ ] Confirm deductibles and out-of-pocket maximums
- [ ] Update coverage details (copays, coinsurance)
- [ ] Check HSA eligibility and employer contributions
- [ ] Review pros/cons for each plan
- [ ] Ensure persona tags are accurate

### 2. Customize Branding
- [ ] Update site title in `index.html` and `calculator.html`
- [ ] Modify hero text to match your organization
- [ ] Update footer content with your information
- [ ] Change color scheme in `styles.css` (if desired)
- [ ] Update `_config.yml` with your site information

### 3. Content Review
- [ ] Review FAQ section and update answers
- [ ] Check calculator tips for relevance
- [ ] Verify all links work correctly
- [ ] Update contact information in footer
- [ ] Review disclaimer text

### 4. Testing (Local)
- [ ] Open `index.html` in browser - verify all sections load
- [ ] Test dark/light mode toggle
- [ ] Click through all navigation links
- [ ] Test mobile menu (resize browser to mobile size)
- [ ] Open `calculator.html` in browser
- [ ] Input test values and click "Calculate Costs"
- [ ] Verify calculations are accurate
- [ ] Test saving/loading scenarios
- [ ] Try print functionality
- [ ] Test on mobile device (or browser dev tools)
- [ ] Check console for JavaScript errors (F12)

## Deployment to GitHub Pages

### 5. Create GitHub Repository
- [ ] Sign in to GitHub
- [ ] Create new repository
- [ ] Choose public or private
- [ ] Do NOT initialize with README (you have one)
- [ ] Note the repository URL

### 6. Upload Files
Choose ONE method:

#### Option A: Web Upload
- [ ] Click "uploading an existing file" on GitHub
- [ ] Drag and drop ALL files:
  - `index.html`
  - `calculator.html`
  - `styles.css`
  - `script.js`
  - `calculator.js`
  - `data.js`
  - `README.md`
  - `_config.yml`
  - `.gitignore`
- [ ] Commit with message: "Initial deployment"

#### Option B: Git Command Line
```bash
cd c:\Users\sa69508\VSCODE\benifits2025
git init
git add .
git commit -m "Initial deployment: Health Benefits Advisor"
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```
- [ ] Commands executed successfully

### 7. Enable GitHub Pages
- [ ] Go to repository Settings
- [ ] Click "Pages" in left sidebar
- [ ] Under "Source", select "Deploy from a branch"
- [ ] Branch: `main` (or `master`)
- [ ] Folder: `/ (root)`
- [ ] Click Save
- [ ] Note the deployment URL shown

### 8. Wait for Deployment
- [ ] Wait 1-3 minutes for first build
- [ ] Refresh settings page to see "Your site is live at..."
- [ ] Click the URL to visit your site

## Post-Deployment

### 9. Test Live Site
- [ ] Homepage loads correctly
- [ ] All images and styles load
- [ ] Navigation works
- [ ] Calculator page loads
- [ ] Calculator functions work
- [ ] Dark mode toggle works
- [ ] Test on mobile device
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Check browser console for errors

### 10. Share and Document
- [ ] Copy the live URL: `https://USERNAME.github.io/REPO-NAME/`
- [ ] Share with your team
- [ ] Update any documentation with the URL
- [ ] Test the URL from different devices
- [ ] Bookmark for easy access

## Future Updates

### Making Changes
When you need to update the site:

1. **Edit files locally**
   - [ ] Make your changes
   - [ ] Test locally by opening HTML files

2. **Upload to GitHub**
   - Option A: Upload changed files via GitHub web interface
   - Option B: Use git commands:
     ```bash
     git add .
     git commit -m "Description of changes"
     git push
     ```

3. **Wait for deployment**
   - [ ] Changes will appear in 1-2 minutes
   - [ ] Refresh your live site to see updates

### Common Updates
- [ ] Update health plan data for new enrollment periods
- [ ] Add new plans to `data.js`
- [ ] Update costs and coverage details
- [ ] Modify FAQ based on common questions
- [ ] Improve calculator features based on feedback

## Troubleshooting

If something doesn't work:

### Site not appearing
- [ ] Check Settings → Pages for build status
- [ ] Ensure files are in root directory
- [ ] Wait full 3-5 minutes for first deployment
- [ ] Clear browser cache and reload

### Broken functionality
- [ ] Check browser console (F12) for errors
- [ ] Verify all file names are correct (case-sensitive)
- [ ] Ensure `data.js` is valid JavaScript
- [ ] Test Chart.js CDN is accessible

### Data not showing
- [ ] Verify `healthPlans` array in `data.js`
- [ ] Check JavaScript console for errors
- [ ] Ensure proper JSON structure
- [ ] Test locally first

## Completion

Site deployed successfully when:
- [x] All files uploaded to GitHub
- [x] GitHub Pages enabled
- [x] Live URL accessible
- [x] Homepage loads correctly
- [x] Calculator functions properly
- [x] Mobile responsive
- [x] No console errors

**Live Site URL**: _________________________________

**Deployment Date**: _________________________________

**Deployed By**: _________________________________

---

Congratulations! Your Health Benefits Advisor is now live! 🎉
