# 📝 Complete Translation Guide for Stratum PR Website

## 🎯 Overview

This website uses a **single-file-per-language** translation system. All website text is managed in two files:
- **`src/translations/en.ts`** - All English translations
- **`src/translations/es.ts`** - All Spanish translations

**You can edit the entire website's text by editing just these two files!**

---

## ✅ Browser Language Detection

The website now **automatically detects** the user's browser/device language on first visit:
- If browser language is Spanish (`es`, `es-PR`, `es-MX`, etc.) → Shows Spanish
- Otherwise → Shows English
- User's language preference is saved and remembered for future visits
- Users can still manually switch languages using the language toggle

---

## 📁 File Structure

```
src/translations/
├── en.ts          ← Edit ALL English text here
├── es.ts          ← Edit ALL Spanish text here
└── index.ts       ← (Don't edit - imports both files)
```

---

## ✏️ How to Edit Translations

### **Step 1: Open the Translation File**

- For English: Open `src/translations/en.ts`
- For Spanish: Open `src/translations/es.ts`

### **Step 2: Find the Text You Want to Change**

Each text element has a unique key. For example:
- `'nav.home': 'Home'` controls the "Home" link in navigation
- `'home.hero.title'` controls the hero title on the home page

### **Step 3: Edit the Value**

Change the text after the colon (`:`) and keep it in quotes:

```typescript
// Before
'nav.home': 'Home',

// After
'nav.home': 'Home Page',
```

### **Step 4: Save and Test**

Save the file and refresh your website. The changes will appear immediately!

---

## 🔑 Translation Key Structure

Translation keys are organized by page/section:

### **Navigation (`nav.*`)**
- `nav.home` - Home link
- `nav.about` - About link
- `nav.services` - Services link
- `nav.resources` - Resources link
- `nav.faq` - FAQ link
- `nav.contact` - Contact link
- `nav.schedule` - "Book Free Consultation" button

### **Home Page (`home.*`)**
- `home.hero.title` - Main hero title
- `home.hero.description` - Hero description
- `home.problem.title` - Problem section title
- `home.problem.box1.title` - Problem box 1 title
- etc.

### **About Page (`about.*`)**
- `about.hero.title`
- `about.hero.description`
- `about.team.title`
- etc.

### **Services Page (`services.*`)**
- All service-related text

### **Checklist Page (`checklist.*`)**
- `checklist.hero.title`
- `checklist.hero.description`
- `checklist.results.critical.title`
- etc.

### **Resources Page (`resources.*`)**
- `resources.hero.title`
- `resources.projects.description`
- etc.

---

## 📋 Quick Reference: Common Keys

```typescript
// Navigation
'nav.home': 'Home',
'nav.about': 'About',
'nav.services': 'Services',
'nav.contact': 'Contact',
'nav.faq': 'FAQ',
'nav.schedule': 'Book Free Consultation',

// Home Page
'home.hero.title': 'Your main headline',
'home.hero.description': 'Your hero description',

// Buttons
'checklist.button.next': 'Next',
'checklist.button.previous': 'Previous',
```

---

## 🔍 Finding Missing Translations

If you see a text that's not translating:

1. **Check the browser console** (F12) - Missing keys will show the key name instead of text
2. **Search for the key** in the translation files
3. **Add the missing key** to both `en.ts` and `es.ts`

Example of missing translation:
- Website shows: `'checklist.new.key'` (the key name)
- Fix: Add `'checklist.new.key': 'Your Text'` to both files

---

## ⚠️ Important Rules

1. **Always edit BOTH files** (`en.ts` AND `es.ts`) with matching keys
2. **Keep the same key names** in both files
3. **Don't change key names** - only change the values (the text after `:`)
4. **Use single quotes** for keys and values: `'key': 'value'`
5. **Add commas** after each entry (except the last one)
6. **Don't delete keys** - replace with empty string if needed: `'key': ''`

---

## 📝 Example: Adding a New Translation

### Step 1: Add to English (`en.ts`)
```typescript
// Add at the end, before the closing };
'new.page.title': 'New Page Title',
```

### Step 2: Add to Spanish (`es.ts`)
```typescript
// Add at the end, before the closing };
'new.page.title': 'Título de Nueva Página',
```

### Step 3: Use in Component
```typescript
const { t } = useLanguage();
<h1>{t('new.page.title')}</h1>
```

---

## 🗂️ File Organization

The translation files are organized by sections with comments:

```typescript
// ==========================================================================
// NAVIGATION - Edit menu items here
// ==========================================================================
'nav.home': 'Home',
...

// Home page
'home.hero.title': '...',
...

// About page
'about.hero.title': '...',
...
```

**Tip:** Use the comments to quickly find the section you want to edit!

---

## 🚀 Quick Start Checklist

- [ ] Open `src/translations/en.ts` for English
- [ ] Open `src/translations/es.ts` for Spanish
- [ ] Find the key you want to change (use Ctrl+F / Cmd+F)
- [ ] Edit the value (text after the colon)
- [ ] Make sure both files have the same key
- [ ] Save both files
- [ ] Refresh your website

---

## 💡 Tips

1. **Use search** (Ctrl+F / Cmd+F) to quickly find keys
2. **Keep keys organized** - follow the existing structure
3. **Test both languages** after making changes
4. **Backup before major changes** - copy the files first
5. **Use comments** to understand what each section controls

---

## 🆘 Troubleshooting

### Problem: Changes don't appear
**Solution:** 
- Save the file
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Clear browser cache

### Problem: Text shows as a key name (e.g., `'nav.home'`)
**Solution:** 
- The key is missing from the translation file
- Add it to both `en.ts` and `es.ts`

### Problem: Website shows wrong language
**Solution:**
- Check browser language settings
- Clear localStorage: Open browser console, type: `localStorage.clear()`
- Refresh page

---

## 📞 Need Help?

If you need to add new translatable content:
1. Add the key to both translation files
2. Update the component to use `t('your.new.key')`
3. Test in both languages

---

**Last Updated:** After implementing browser language detection and consolidating all translations

