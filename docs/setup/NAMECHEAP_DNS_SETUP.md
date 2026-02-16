# Namecheap DNS Setup Guide for Email Deliverability

This guide will help you configure DNS records in Namecheap to ensure optimal email deliverability with Resend.

## Prerequisites

1. Your domain is registered with Namecheap (stratumpr.com)
2. You have a Resend account with your domain verified
3. Access to your Namecheap account

---

## Step 1: Access DNS Settings in Namecheap

1. **Log in to Namecheap**
   - Go to https://www.namecheap.com
   - Click "Sign In" and enter your credentials

2. **Navigate to Domain List**
   - Click on "Domain List" from the left sidebar
   - Find and click on `stratumpr.com`

3. **Access Advanced DNS**
   - Click on the "Advanced DNS" tab
   - You'll see a list of current DNS records

---

## Step 2: Get Your Resend DNS Records

1. **Log in to Resend Dashboard**
   - Go to https://resend.com
   - Navigate to "Domains" in the sidebar
   - Click on your domain (`stratumpr.com`)

2. **View Required DNS Records**
   - Resend will show you the exact DNS records you need to add
   - You'll typically see:
     - **SPF Record** (TXT record)
     - **DKIM Records** (CNAME records - usually 2-3)
     - **DMARC Record** (TXT record - optional but recommended)

---

## Step 3: Add DNS Records in Namecheap

### A. SPF Record (TXT)

**Purpose**: Tells email servers which servers are authorized to send email for your domain.

1. In Namecheap Advanced DNS, click "Add New Record"
2. Select **TXT Record**
3. Configure:
   - **Host**: `@` (or leave blank for root domain)
   - **Value**: `v=spf1 include:_spf.resend.com ~all`
   - **TTL**: `Automatic` (or 3600)
4. Click the checkmark to save

**Note**: If you already have an SPF record, you need to modify it instead of creating a new one. Combine them like:
```
v=spf1 include:_spf.resend.com include:other-provider.com ~all
```

### B. DKIM Records (CNAME)

**Purpose**: Cryptographic signatures that prove emails are authentic and haven't been tampered with.

Resend typically provides 2-3 CNAME records. For each one:

1. Click "Add New Record"
2. Select **CNAME Record**
3. Configure:
   - **Host**: The subdomain provided by Resend (e.g., `resend._domainkey` or similar)
   - **Value**: The target provided by Resend (e.g., `resend.domainkey.xxxxx.dkim.resend.com`)
   - **TTL**: `Automatic` (or 3600)
4. Click the checkmark to save

**Example DKIM Records** (your actual values will be different):
```
Host: resend._domainkey
Value: resend.domainkey.xxxxx.dkim.resend.com
```

### C. DMARC Record (TXT) - Recommended

**Purpose**: Policy that tells receiving servers what to do with emails that fail SPF/DKIM checks.

1. Click "Add New Record"
2. Select **TXT Record**
3. Configure:
   - **Host**: `_dmarc`
   - **Value**: `v=DMARC1; p=quarantine; rua=mailto:contact@stratumpr.com`
   - **TTL**: `Automatic` (or 3600)
4. Click the checkmark to save

**DMARC Policy Options**:
- `p=none` - Monitor only, don't reject anything
- `p=quarantine` - Send failed emails to spam (recommended for start)
- `p=reject` - Reject failed emails completely (use after monitoring)

---

## Step 4: Verify Records in Resend

1. **Go back to Resend Dashboard**
   - Navigate to "Domains" → Your domain
   - Click "Verify" or "Check Status"

2. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours to propagate
   - Usually takes 15-30 minutes
   - Resend will show the status of each record

3. **Check Each Record**
   - ✅ Green checkmark = Verified
   - ❌ Red X = Not found or incorrect
   - ⏳ Clock = Pending verification

---

## Step 5: Verify DNS Records Manually (Optional)

You can verify your DNS records are set correctly using online tools:

### Using `dig` (Command Line)
```bash
# Check SPF
dig TXT stratumpr.com

# Check DMARC
dig TXT _dmarc.stratumpr.com

# Check DKIM (replace with your actual DKIM host)
dig CNAME resend._domainkey.stratumpr.com
```

### Using Online Tools
- **MXToolbox**: https://mxtoolbox.com/spf.aspx
- **DMARC Analyzer**: https://www.dmarcanalyzer.com/
- **Google Admin Toolbox**: https://toolbox.googleapps.com/apps/checkmx/

---

## Step 6: Common Issues and Solutions

### Issue: "Record not found"
**Solution**: 
- Wait 15-30 minutes for DNS propagation
- Double-check the host value (case-sensitive)
- Ensure no typos in the value field

### Issue: "Multiple SPF records found"
**Solution**:
- You can only have ONE SPF record per domain
- Combine all includes into a single record:
  ```
  v=spf1 include:_spf.resend.com include:other-provider.com ~all
  ```

### Issue: "DKIM verification failed"
**Solution**:
- Verify the CNAME host matches exactly (including underscores)
- Check that the value points to the correct Resend DKIM server
- Ensure TTL is set (not 0)

### Issue: "DMARC not working"
**Solution**:
- Ensure the host is `_dmarc` (with underscore)
- Check that the email in `rua=` is valid
- Start with `p=none` to monitor first

---

## Step 7: Best Practices for Email Deliverability

### ✅ Do's:
- **Use a verified domain**: Always send from a verified domain (not a free email)
- **Warm up your domain**: Start with low email volumes and gradually increase
- **Maintain clean lists**: Remove bounced/invalid emails regularly
- **Use proper authentication**: SPF, DKIM, and DMARC all configured
- **Monitor reputation**: Check sender reputation regularly
- **Provide unsubscribe**: Always include working unsubscribe links

### ❌ Don'ts:
- **Don't send to purchased lists**: Only send to people who opted in
- **Don't use spam trigger words**: Avoid words like "FREE", "CLICK NOW", etc. in subject lines
- **Don't send too frequently**: Respect subscriber preferences
- **Don't ignore bounces**: Remove hard bounces immediately
- **Don't use URL shorteners**: Use full URLs for better trust

---

## Step 8: Testing Email Deliverability

### Test Your Setup:
1. **Send a test email** to yourself
2. **Check email headers**:
   - Gmail: Click the three dots → "Show original"
   - Outlook: Right-click email → "View source"
   - Look for: `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`

### Use Testing Tools:
- **Mail Tester**: https://www.mail-tester.com/
  - Send an email to the address they provide
  - Get a deliverability score (aim for 10/10)
- **GlockApps**: https://glockapps.com/
  - Tests across multiple email providers
  - Shows spam score and placement

---

## Current Recommended DNS Records for Stratum PR

Based on Resend's requirements, your DNS should have:

### SPF (TXT Record)
```
Host: @
Value: v=spf1 include:_spf.resend.com ~all
```

### DKIM (CNAME Records - Get exact values from Resend)
```
Host: resend._domainkey (or similar - check Resend dashboard)
Value: [Provided by Resend]
```

### DMARC (TXT Record)
```
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:contact@stratumpr.com
```

---

## Quick Reference: Namecheap DNS Record Types

| Type | Use For | Example Host | Example Value |
|------|---------|--------------|---------------|
| TXT | SPF, DMARC | `@` or `_dmarc` | `v=spf1 include:_spf.resend.com ~all` |
| CNAME | DKIM | `resend._domainkey` | `resend.domainkey.xxxxx.dkim.resend.com` |
| A | Website | `@` or `www` | `192.0.2.1` |
| MX | Email routing | `@` | `mail.example.com` |

---

## Need Help?

- **Namecheap Support**: https://www.namecheap.com/support/
- **Resend Documentation**: https://resend.com/docs
- **Resend Support**: support@resend.com

---

## Verification Checklist

Before sending emails, ensure:

- [ ] SPF record is added and verified in Resend
- [ ] All DKIM records are added and verified in Resend
- [ ] DMARC record is added (optional but recommended)
- [ ] Domain is verified in Resend dashboard
- [ ] Test email sent and headers checked
- [ ] Mail-tester.com score is 8/10 or higher

---

**Last Updated**: Based on current Resend and Namecheap configurations
**Domain**: stratumpr.com

