

## Plan: Export Complete FraudShield Source Code to PDF

Generate a single PDF (`/mnt/documents/FraudShield_SourceCode.pdf`) containing all application source files.

### Document Structure

1. **Cover page** — Project name, file count, date
2. **Configuration** — `index.html`, `vite.config.ts`, `tailwind.config.ts`, `package.json`
3. **Core** — `main.tsx`, `App.tsx`, `App.css`, `index.css`
4. **Auth & Context** — `AuthContext.tsx`, `NotificationContext.tsx`, `ProtectedRoute.tsx`
5. **Pages (18 files)** — All pages from Login to AIChatbot
6. **Components** — `AppNavbar.tsx`, `NavLink.tsx`, `NotificationCenter.tsx`, `StatCard.tsx`
7. **Charts (7 files)** — All chart components
8. **Data & Utils** — `mockData.ts`, `utils.ts`
9. **Supabase** — `client.ts`, `types.ts`

### Technical Approach

- Python script using `reportlab` to generate a clean, paginated PDF
- Monospace font (Courier) for code readability
- Dark header bars with file paths
- Page numbers in footer
- ~35 source files total

