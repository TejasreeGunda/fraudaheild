

## Plan: Export All Source Code to a Document

Generate a single PDF document containing the complete FraudShield application source code, organized by file with syntax highlighting-friendly formatting.

### What will be generated

A PDF file (`/mnt/documents/FraudShield_SourceCode.pdf`) containing all 30+ source files:

**Document structure:**
1. **Cover page** -- Project name, description, file listing
2. **Configuration files** -- `package.json`, `index.html`, `vite.config.ts`, `tailwind.config.ts`, `index.css`
3. **Core app files** -- `main.tsx`, `App.tsx`
4. **Authentication** -- `AuthContext.tsx`, `ProtectedRoute.tsx`, `Login.tsx`, `Signup.tsx`, `supabase client`
5. **Pages** -- `Dashboard.tsx`, `TransactionAnalyzer.tsx`, `TransactionHistory.tsx`, `ModelInsights.tsx`, `RealTimeSimulation.tsx`, `Settings.tsx`
6. **Components** -- `AppNavbar.tsx`, `StatCard.tsx`, `NotificationCenter.tsx`, `NotificationContext.tsx`
7. **Charts** -- All 7 chart components
8. **Data** -- `mockData.ts`, `utils.ts`

Each file will have a clear header with the file path and the full code below it.

### Technical approach
- Use Python `reportlab` to generate a clean, well-formatted PDF
- Monospace font (Courier) for code readability
- Dark header bars for each file path
- Page numbers in footer

