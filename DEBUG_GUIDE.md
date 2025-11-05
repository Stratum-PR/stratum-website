# Complete Debugging Guide for useState Error

## What I've Fixed So Far:

1. ✅ Removed unnecessary `useState` import from `main.tsx`
2. ✅ Added React deduplication to `vite.config.ts` 
3. ✅ Cleared all caches
4. ✅ Verified all imports are correct
5. ✅ Confirmed build succeeds

## Current Status:
- Dev server should be running on `http://localhost:8080`
- Test page available at: `http://localhost:8080/test-react.html`

---

## Step-by-Step Testing Protocol:

### Test 1: Isolated React Test
1. Navigate to: `http://localhost:8080/test-react.html`
2. **Expected**: You should see "React Test" with a working increment button
3. **If this works**: React itself is fine, issue is in our app
4. **If this fails**: There's a deeper system/browser issue

### Test 2: Home Page
1. Navigate to: `http://localhost:8080/`
2. Open DevTools (F12) → Console tab
3. **Take a screenshot** of the EXACT error message
4. Look for:
   - Which file is mentioned in the error stack trace?
   - Which line number?
   - Is it actually about `useState` or something else?

### Test 3: Check Network Tab
1. Open DevTools (F12) → Network tab
2. Refresh the page
3. Look for:
   - Is `main.tsx` loading? (Status 200?)
   - Is `react` loading from node_modules?
   - Any failed requests (red)?
4. Click on `main.tsx` in network tab
   - Go to "Response" tab
   - **Screenshot** the first 20 lines

### Test 4: Check Sources Tab
1. DevTools (F12) → Sources tab
2. Navigate to: `localhost:8080` → `src` → `main.tsx`
3. Look at line 1-10
4. **Screenshot** what you see

---

## Common Causes & Solutions:

### Cause 1: Browser Service Worker Cache
**Solution**:
```javascript
// In browser console, run:
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```
Then refresh.

### Cause 2: Browser Extension Interference
**Solution**: Test in Incognito/Private mode (disables extensions)

### Cause 3: Hosts File / DNS Issues
**Solution**: Try `http://127.0.0.1:8080` instead of `localhost:8080`

### Cause 4: Antivirus/Firewall Blocking
**Solution**: Temporarily disable and test

### Cause 5: Node Modules Corruption
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## If Error Persists, Collect This Info:

1. **Exact error message** (full stack trace)
2. **Which page** shows the error? (/, /about, /checklist, etc.)
3. **Browser console screenshot**
4. **Network tab screenshot**  
5. **Output of**: `npm --version` and `node --version`
6. **Operating System**: macOS version?

---

## Alternative: Use Production Build

If dev server continues to have issues:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

Then navigate to the URL shown (usually `http://localhost:4173`)

**If production build works but dev doesn't**: This confirms it's a Vite dev server issue, not your code.

---

## Nuclear Option: Fresh Clone

If nothing works:

```bash
# In a different directory
git clone <your-repo-url> stratum-test
cd stratum-test
npm install
npm run dev
```

If THIS works, something in your local environment is corrupted.

---

## Next Steps:

1. Run the tests above in order
2. Collect the requested information
3. Report back with:
   - Which test failed?
   - Screenshots of errors
   - Any unusual observations

This will help me identify the exact root cause.

