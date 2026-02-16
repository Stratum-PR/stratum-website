# Email Service Troubleshooting Guide

## Issue: Checklist Results Email Not Sending

If users are not receiving emails after completing the systems assessment, follow these steps:

---

## 🔍 **Step 1: Check Browser Console**

1. Open the checklist page
2. Open browser DevTools (F12)
3. Go to Console tab
4. Submit the email form
5. Look for error messages

Common errors you might see:
- `Email service is not configured`
- `RESEND_API_KEY environment variable is missing`
- `Email domain not verified`
- `Failed to send email`

---

## 🔧 **Step 2: Verify Vercel Environment Variables**

The email service requires these environment variables in Vercel:

### Required Variables

1. **`RESEND_API_KEY`** (No VITE_ prefix)
   - Get from: [resend.com/api-keys](https://resend.com/api-keys)
   - Value: Your Resend API key (starts with `re_`)
   - Set for: Production, Preview, Development

2. **`FROM_EMAIL`** (Optional, but recommended)
   - Value: `contact@stratumpr.com` or your verified domain email
   - Set for: Production, Preview, Development

3. **`ADMIN_EMAIL`** (Optional, for notifications)
   - Value: `contact@stratumpr.com` or your admin email
   - Set for: Production, Preview, Development

### How to Add in Vercel

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Settings → Environment Variables
3. Add each variable:
   - **Key**: `RESEND_API_KEY` (NO VITE_ prefix!)
   - **Value**: Your Resend API key
   - **Environment**: Select Production, Preview, Development
4. Click **Save**
5. **IMPORTANT**: Redeploy your application after adding variables

---

## 📧 **Step 3: Verify Resend Domain**

If you're using a custom domain email (like `contact@stratumpr.com`):

1. Go to [resend.com/domains](https://resend.com/domains)
2. Check if your domain is verified
3. If not verified:
   - Add your domain
   - Add DNS records (SPF, DKIM, DMARC)
   - Wait for verification (can take up to 48 hours)

### Testing Without Domain Verification

For testing, you can use Resend's test domain:
- Change `FROM_EMAIL` to: `onboarding@resend.dev`
- This works immediately without domain verification
- **Note**: Some email providers may mark these as spam

---

## 🧪 **Step 4: Test the API Endpoint**

### Test Locally

1. Check if the API route exists: `api/send-email.ts`
2. Start your dev server: `npm run dev`
3. Test the endpoint:
   ```bash
   curl -X POST http://localhost:8080/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "to": "your-email@example.com",
       "subject": "Test Email",
       "html": "<h1>Test</h1>"
     }'
   ```

### Test on Production

1. Check Vercel function logs:
   - Go to Vercel Dashboard
   - Click on your project
   - Go to **Functions** tab
   - Look for `/api/send-email` logs
   - Check for errors

2. Check browser Network tab:
   - Open DevTools → Network tab
   - Submit the form
   - Look for `/api/send-email` request
   - Check the response status and body

---

## 🐛 **Common Issues & Solutions**

### Issue 1: "Email service is not configured"

**Cause**: `RESEND_API_KEY` is missing in Vercel

**Solution**:
1. Add `RESEND_API_KEY` to Vercel environment variables
2. Redeploy your application
3. Test again

---

### Issue 2: "Email domain not verified"

**Cause**: Using custom domain email without verification

**Solutions**:
1. **Option A**: Verify your domain in Resend
   - Add domain in Resend dashboard
   - Add DNS records
   - Wait for verification

2. **Option B**: Use test domain temporarily
   - Set `FROM_EMAIL` to `onboarding@resend.dev`
   - Works immediately for testing

---

### Issue 3: Email sent but not received

**Possible causes**:
1. **Spam folder**: Check spam/junk folder
2. **Email provider blocking**: Some providers block emails from unverified domains
3. **Wrong email address**: User entered wrong email
4. **Rate limiting**: Too many emails sent (Resend free tier: 100/day)

**Solutions**:
1. Check spam folder
2. Verify domain in Resend
3. Check Resend dashboard for delivery status
4. Try with a different email provider (Gmail, Outlook, etc.)

---

### Issue 4: CORS Error

**Cause**: API route not properly configured

**Solution**: 
- The API route should be at `api/send-email.ts`
- Vercel automatically serves it as `/api/send-email`
- Check that the file exists and is properly formatted

---

### Issue 5: Silent Failure (No Error Shown)

**Cause**: Error handling was swallowing errors

**Solution**: ✅ **FIXED** - Now shows error messages to users

---

## 📋 **Quick Diagnostic Checklist**

- [ ] `RESEND_API_KEY` is set in Vercel (NO VITE_ prefix)
- [ ] `FROM_EMAIL` is set (or using default)
- [ ] Domain is verified in Resend (if using custom domain)
- [ ] Environment variables are set for correct environment (Production/Preview)
- [ ] Application was redeployed after adding variables
- [ ] API route exists at `api/send-email.ts`
- [ ] Browser console shows no errors
- [ ] Vercel function logs show no errors
- [ ] Email is not in spam folder
- [ ] Testing with a valid email address

---

## 🔐 **Security Notes**

1. **Never expose API keys**: 
   - `RESEND_API_KEY` should NEVER have `VITE_` prefix
   - Never commit API keys to git
   - Always use environment variables

2. **Serverless function**:
   - The API key is only accessible server-side
   - Client never sees the API key
   - All email sending happens server-side

---

## 📞 **Still Not Working?**

If all else fails:

1. **Check Vercel logs**:
   - Dashboard → Your Project → Functions → `/api/send-email` → Logs
   - Look for error messages

2. **Check Resend dashboard**:
   - Go to [resend.com/emails](https://resend.com/emails)
   - Check if emails were attempted
   - See delivery status and errors

3. **Test API key**:
   ```bash
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "your-email@example.com",
       "subject": "Test",
       "html": "<h1>Test</h1>"
     }'
   ```

4. **Contact support**:
   - Resend support: support@resend.com
   - Check Resend documentation: https://resend.com/docs

---

## ✅ **What Was Fixed**

1. **Error handling**: Now shows error messages to users instead of silently failing
2. **Error messages**: More helpful, specific error messages
3. **User feedback**: Users can see if email failed and why
4. **Form validation**: Better error handling in the form

---

**Last Updated**: After fixing silent error handling

