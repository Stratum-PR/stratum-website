# 🔍 Debugging Blank Sanity Studio Page

## Quick Checks:

### 1. Check Browser Console
Open DevTools (F12) and check the Console tab for:
- JavaScript errors
- Missing module errors
- Configuration errors

### 2. Check Terminal Output
Look at the terminal where `npx sanity start` is running for:
- Configuration loading messages
- Error messages
- Warnings about missing projectId or schemas

### 3. Verify Environment Variables
```bash
# Check .env file
cat .env | grep SANITY_PROJECT_ID

# Should show:
# VITE_SANITY_PROJECT_ID=s7h6olb5
# NEXT_PUBLIC_SANITY_PROJECT_ID=s7h6olb5
```

### 4. Verify Schemas Are Loading
The config now logs:
- projectId status
- dataset status  
- schemas count

Check terminal for these logs when Studio starts.

## Common Causes:

1. **projectId is empty** - Check browser console for "Missing projectId" error
2. **Schemas not loading** - Check terminal for "No schemas defined" error
3. **JavaScript error** - Check browser console for runtime errors
4. **Structure plugin error** - Check if structureTool is causing issues

## Next Steps:

1. Restart Sanity Studio:
   ```bash
   npx sanity start
   ```

2. Check terminal output for the new debug logs

3. Open browser console and check for errors

4. Share the errors you see for further debugging

