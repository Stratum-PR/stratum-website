# Unused Files Report
## Systematic Analysis of Stratum Website Codebase

Generated: $(date)

---

## Summary

This report identifies files and components that are not actively being used in the current live website. Files are categorized by type for easy review.

---

## 🚫 Unused Components

### Background Components (Not Imported)
1. **`src/components/TechyHeroBackground.tsx`**
   - Status: Not imported anywhere
   - Note: Replaced by TechAnimatedBackground.tsx
   - Recommendation: Can be safely deleted

2. **`src/components/TopographicBackground.tsx`**
   - Status: Not imported anywhere
   - Note: Replaced by TechAnimatedBackground.tsx
   - Recommendation: Can be safely deleted

### Utility Components (Not Imported)
3. **`src/components/SEOImage.tsx`**
   - Status: Not imported anywhere
   - Note: Functionality may be handled by OptimizedImage.tsx
   - Recommendation: Verify if functionality is needed, then delete if redundant

---

## 🎨 Unused UI Components

The following UI components from `src/components/ui/` are not imported or used in any pages or main components:

1. **`carousel.tsx`** - Carousel component
2. **`chart.tsx`** - Chart component
3. **`calendar.tsx`** - Calendar component
4. **`command.tsx`** - Command palette component
5. **`drawer.tsx`** - Drawer component
6. **`menubar.tsx`** - Menubar component
7. **`pagination.tsx`** - Pagination component
8. **`resizable.tsx`** - Resizable panels component
9. **`slider.tsx`** - Slider component
10. **`toggle.tsx`** - Toggle component (only used internally by toggle-group)
11. **`toggle-group.tsx`** - Toggle group component
12. **`input-otp.tsx`** - OTP input component
13. **`aspect-ratio.tsx`** - Aspect ratio component
14. **`avatar.tsx`** - Avatar component
15. **`breadcrumb.tsx`** - Breadcrumb component
16. **`context-menu.tsx`** - Context menu component
17. **`sidebar.tsx`** - Sidebar component (not used in pages/components, only internal references)
18. **`alert.tsx`** - Alert component (Note: AlertDialog is used, but not Alert)

**Note:** These are shadcn/ui components that may be kept for future use. Consider if they should be removed to reduce bundle size.

---

## 📄 Unused/Redundant Pages

1. **`src/pages/Index.tsx`**
   - Status: Minimal redirect component
   - Usage: Redirects "/index" to "/"
   - Recommendation: Keep if route exists, otherwise can be removed

2. **`src/pages/Solutions.tsx`**
   - Status: Just re-exports Projects component
   - Usage: Route exists in App.tsx (`/solutions`)
   - Recommendation: Keep if route is needed, otherwise consolidate

3. **`src/pages/Checklist.tsx`**
   - Status: Full implementation exists
   - Usage: Route is commented out in App.tsx (line 27-28, 121-127)
   - Note: Has translations and full functionality
   - Recommendation: Either enable the route or remove the page if not needed

---

## 🛠️ Unused Utilities

1. **`src/utils/blogHelpers.ts`**
   - Status: Not imported anywhere
   - Recommendation: Verify if needed for future features, then delete if not

---

## 📝 Unused Styles

1. **`src/App.css`**
   - Status: Not imported in App.tsx or any other file
   - Content: Contains default Vite template styles (logo animations, card styles)
   - Recommendation: Can be safely deleted if not needed

---

## ✅ Files That ARE Used (For Reference)

### Active Components
- TechAnimatedBackground.tsx ✅ (used in Home.tsx)
- RotatingText.tsx ✅ (used in Home.tsx)
- OptimizedImage.tsx ✅ (used in Home.tsx)
- HeroSection.tsx ✅ (used in About.tsx)
- PortableText.tsx ✅ (used in BlogDetail.tsx)
- MarkdownRenderer.tsx ✅ (used in ResourceModal.tsx)
- PDFViewer.tsx ✅ (used in ResourceModal.tsx)
- TablePreview.tsx ✅ (used in ResourceModal.tsx)

### Active UI Components
- button.tsx ✅
- card.tsx ✅
- dialog.tsx ✅
- input.tsx ✅
- label.tsx ✅
- textarea.tsx ✅
- checkbox.tsx ✅
- radio-group.tsx ✅ (used in Checklist.tsx)
- progress.tsx ✅ (used in Checklist.tsx)
- accordion.tsx ✅ (used in FAQ.tsx)
- popover.tsx ✅ (used in Home.tsx)
- tooltip.tsx ✅ (used in Home.tsx)
- navigation-menu.tsx ✅ (used in Header.tsx)
- hover-card.tsx ✅ (used in LanguageToggle.tsx)
- separator.tsx ✅ (used in sidebar.tsx internally)
- sheet.tsx ✅ (used in sidebar.tsx internally)
- skeleton.tsx ✅ (used in sidebar.tsx internally)
- toast.tsx ✅ (used via use-toast hook)
- toaster.tsx ✅ (used in App.tsx)
- sonner.tsx ✅ (used in App.tsx)
- table.tsx ✅ (used in TablePreview.tsx)
- badge.tsx ✅ (used in ServiceCard.tsx, TeamMemberCard.tsx)
- form.tsx ✅ (used internally by other components)
- scroll-area.tsx ✅ (may be used internally)
- select.tsx ✅ (may be used internally)
- tabs.tsx ✅ (may be used internally)
- dropdown-menu.tsx ✅ (may be used internally)
- alert-dialog.tsx ✅ (may be used internally)

---

## 📊 Statistics

- **Unused Components:** 3
- **Unused UI Components:** 18
- **Unused/Redundant Pages:** 3 (1 disabled)
- **Unused Utilities:** 1
- **Unused Styles:** 1

**Total potentially removable files:** ~26

---

## 🎯 Recommendations

### High Priority (Safe to Remove)
1. Delete `TechyHeroBackground.tsx` - replaced by TechAnimatedBackground
2. Delete `TopographicBackground.tsx` - replaced by TechAnimatedBackground
3. Delete `App.css` - not imported, contains template code
4. Delete `blogHelpers.ts` - not imported anywhere

### Medium Priority (Review Before Removing)
1. Review unused UI components - consider if they're needed for future features
2. Review `Checklist.tsx` - either enable the route or remove if not needed
3. Review `SEOImage.tsx` - verify if functionality is needed

### Low Priority (Keep for Now)
1. Keep `Index.tsx` if route exists
2. Keep `Solutions.tsx` if route is needed
3. Consider keeping UI components if they're part of a component library that may be used in the future

---

## ⚠️ Notes

- This analysis checks for direct imports. Some files may be used dynamically or conditionally.
- UI components from shadcn/ui are often kept even if unused for future development.
- Always test thoroughly after removing files to ensure no runtime errors.
- Consider checking bundle size impact before removing UI components.

---

## 🔍 How to Verify

Before deleting any file:
1. Search for the filename across the entire codebase
2. Check for dynamic imports
3. Check for string references in configuration files
4. Test the application after removal
5. Check if the file is referenced in any documentation

---

*End of Report*

