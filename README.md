# EarthSync
> **Integrated Urban CleanTech Operating System**  
> *Combining Smart Waste Circularity with SolarSaathi Decentralized Energy*  
> **Course Project:** Essentials of Business Management (BM-2026)

---

## Executive Summary
**EarthSync** is a unified CleanTech platform engineered for modern urban environments, academic institutions, and commercial facilities. It links two traditionally isolated sustainability verticals into a single cohesive platform:

1. **Smart Waste Management:** On-demand segregated collection across 6 recyclable fractions with a **GreenPoints** circular incentive protocol.
2. **SolarSaathi:** An open, data-driven rooftop solar feasibility engine that calculates suggested capacity, turnkey capital costs, and financial payback periods, connecting users with qualified local installers.

EarthSync complements municipal solid waste collection for specialized recyclable streams (dry recyclables, e-waste, sorted paper/cardboard/plastics). It does not replace statutory municipal sanitation authorities or claim unverified public department integrations.

---

## Key Modules and Features

### 1. Operations Command Dashboard (`/`)
- **Executive KPI Cards:** Live tally of waste diverted (kg), active scheduled collections, estimated annual solar bill savings (INR), and current GreenPoints wallet balance.
- **Quick Action Bar:** Direct triggers to schedule collections, calculate solar potential, or review carbon analytics.
- **Dual Pillar Previews:** Dedicated operational summaries for waste management logistics and rooftop solar generation.
- **Dynamic Activity Feed:** Chronological platform timeline tracking scheduled collections, verified weigh-ins, and solar feasibility inquiries.
- **Sample Data Annotations:** Clear badges differentiating demonstration baseline metrics from live user-submitted records.

### 2. Smart Waste Management and Logistics (`/waste`)
- **6 Verified Waste Streams:** Plastic (PET/HDPE), Paper and Cardboard, Metal and Aluminum, Glass Bottles, E-Waste (High Impact), and Organic Compostables.
- **Interactive Scheduling Form:** Complete input validation for category, estimated weight (kg), pickup address (with campus presets), preferred date, and time slot.
- **Real-Time Points Preview:** Live calculation showing prospective GreenPoints before form submission.
- **Lifecycle Status Pipeline:** Track requests across `Requested` -> `Scheduled` -> `Collected` -> `Cancelled`.
- **Cancellation Controls:** Allows users to cancel pending requests before partner dispatch.
- **Presentation Simulation Mode:** Presenters can simulate driver dispatch (`Requested` -> `Scheduled`) and verified driver collection (`Scheduled` -> `Collected`), which awards GreenPoints instantly with single-credit protection.

### 3. SolarSaathi: Solar Feasibility and Provider Inquiries (`/solar`)
- **Precision Rooftop Estimator:**
  - Input monthly power bill (INR), tariff rate (INR/kWh), available rooftop area (sq ft), and state solar region.
  - Generates recommended capacity (kWp), estimated turnkey installation cost (INR), monthly bill reduction (INR), and break-even payback period (years).
  - Evaluates shadow-free space requirements (90 sq ft/kWp) with warning alerts for constrained roofs.
  - Models **25-year cumulative financial savings** accounting for standard annual panel degradation (0.7%) and grid tariff escalation (3.5%).
- **Assumptions and Transparency Panel:** Outlines regional peak sun hours (4.5 to 5.8 hrs/day), standard system derating ratio (78%), and baseline equipment benchmarks.
- **Government Policy Guidance (PM Surya Ghar: Muft Bijli Yojana):**
  - Concrete CFA benchmark tables: INR 33,000 for 1 kWp, INR 66,000 for 2 kWp, and maximum capped central financial assistance of INR 78,000 for 3 kWp or greater.
  - Step-by-step subsidy realization roadmap: DISCOM technical feasibility -> Empaneled vendor installation -> Net meter commission -> Direct bank DBT transfer.
- **Provider Consultation Inquiries:** LocalStorage-backed enquiry system allowing users to log technical specs, preferred system type (On-Grid, Off-Grid, Hybrid), and financing preferences (Direct Outright Purchase, Solar Loan/EMI, Rooftop Lease).
- **Submitted Inquiries Ledger:** Review all logged inquiries with current partner audit status (`Enquiry Received`, `Site Survey Scheduled`, `Feasibility Ready`).

### 4. Partner and Operations Console (`/admin`)
- **Demonstration Operations Console:** Simulates tools used by recycling logistics aggregators and solar EPC providers.
- **Driver Dispatch Workflow:** Advance pending pickups from `Requested` to `Scheduled`.
- **Weigh-Scale Verification:** Calibrated weight verification input where drivers confirm actual scale weight upon physical pickup and trigger single-credit GreenPoints issuance.
- **Solar EPC Lead Pipeline:** Advance prospect leads from `Enquiry Received` to `Site Survey Scheduled` and `Feasibility Ready`.
- **Security Disclosures:** Explicitly banners demo prototype status and outlines production RBAC and MFA requirements.

### 5. Sustainability Impact and Carbon Accounting (`/impact`)
- **Zero-Lag Pure SVG Analytics:**
  - **Monthly Diversion Bar Chart:** Visualizes landfill diversion volumes across multiple operating cycles.
  - **Waste Stream Donut Chart:** Proportional breakdown of recyclable fractions by weight.
- **Defensible Carbon Accounting Methodology:**
  - **Waste Avoidance Factor:** Landfill methane prevention benchmarked against EPA WARM and Indian Central Pollution Control Board (CPCB) factors (e.g. 9.2 kg CO2e/kg for e-waste, 1.8 kg CO2e/kg for plastics).
  - **Solar Grid Displacement:** Central Electricity Authority (CEA) Indian grid baseline factor of 0.82 kg CO2e per kWh of clean solar generated.
- **Ecological Equivalents:** Calculates mature trees planted equivalents and liters of freshwater conserved.
- **Data Scope Filter:** Instantly toggle between **Combined Baseline** and **My Live Activity Only**.

### 6. Profile, Rewards Store and Business Model Canvas (`/profile`)
- **GreenPoints Rewards Center:** Redeem collected waste points for verified student and citizen perks:
  - Campus Green Cafeteria Vouchers
  - Geo-tagged Native Tree Plantation Certificates
  - Solar Technical Drone Audit Discounts
  - Recycled Stainless Steel Flasks and City Transit Passes
- **Coupon Code Generator:** Generates active promotional voucher codes upon redemption.
- **Academic Business Model Canvas:**
  - Value propositions for citizens, recyclers, and solar contractors.
  - Proposed monetization streams: Recycler material aggregation margin (12% to 18%), Solar EPC lead-generation fee (3% to 5%), and Corporate ESG/BRSR reporting SaaS.
  - Unit economics: Projected 38.4% gross margin with 2.4-month CAC payback.
- **Presentation State Controls:** Single-click buttons to reload default showcase datasets or reset to an empty user state.

### 7. Governance and Legal Disclosures (`/privacy` and `/terms`)
- **Privacy Policy (`/privacy`):** Transparently describes HTML5 LocalStorage persistence, absence of third-party ad trackers, and academic prototype boundaries.
- **Terms of Service (`/terms`):** Clarifies municipal waste complementarity, SolarSaathi non-binding projection assumptions, and GreenPoints non-monetary status.

---

## Technology Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (Custom CleanTech forest green, emerald, slate, and solar amber tokens)
- **Design System:** Rectangular buttons with modest corner radii (`rounded-md` / `rounded-lg`), subtle borders, no purple gradients, no cursor animations, no em dashes
- **Icons:** Lucide React
- **Persistence:** Local browser storage (`localStorage`) with hydration safety hooks and SSR protection
- **Visualizations:** Pure SVG responsive charts (zero external charting runtime, 100% deterministic)

---

## Local Setup and Execution

### Prerequisites
- Node.js (v18 or higher; tested on Node.js v25)
- npm (v9 or higher)

### Installation Steps
1. Clone or open the repository directory:
   ```bash
   cd EarthSync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

### Quality Assurance: Build and Lint Commands
```bash
# Verify ESLint code quality (0 errors, 0 warnings)
npm run lint

# Build optimized production bundle across all 10 routes
npm run build

# Start production server
npm run start
```

---

## Demonstration Guide for Evaluators
Follow these steps to demonstrate the end-to-end functionality of EarthSync:

1. **Dashboard Overview (`/`):**
   - Review the executive welcome banner, summary KPI cards, and recent activity feed.
   - Note the `[SAMPLE DATA]` badges that distinguish sample demonstration baseline items from live user data.

2. **Scheduling a Waste Pickup (`/waste`):**
   - Click **Schedule Collection**.
   - Select **Electronic Waste (E-Waste)**.
   - Set quantity to `8 kg` and watch the estimated GreenPoints preview update to `+144 pts`.
   - Enter your campus location and submit.
   - Switch to the **Pickup History** tab to view your newly created request in `Requested` status.

3. **Simulating the Collection Lifecycle:**
   - On your pickup card, click **Simulate: Dispatch Driver** to advance to `Scheduled`.
   - Click **Simulate: Mark Collected (+Points)**.
   - Observe the celebratory notification toast and verify that your **GreenPoints Wallet** balance increases in real-time in the sidebar.

4. **Modeling Rooftop Solar with SolarSaathi (`/solar`):**
   - Adjust the **Monthly Electricity Bill** slider to `INR 6,500/month`.
   - Change your state location to `Maharashtra` or `Gujarat` to see peak sun hours adjust.
   - Review the calculated system capacity (kWp), turnkey approximate cost, annual savings, and payback period.
   - Click **View Mathematical Assumptions & Model** to review the transparent technical formulas.
   - Click the **Government Subsidy Guide** tab to view concrete PM Surya Ghar financial assistance benchmarks (up to INR 78,000 CFA).
   - Click **Request Provider Enquiry**, fill in contact details, and submit.
   - Switch to **Submitted Enquiries** to verify that your inquiry is logged.

5. **Operational Partner Management (`/admin`):**
   - Open **Partner Console** from the sidebar or footer.
   - View all queued pickups.
   - Test driver weigh-scale input: enter actual measured weight and confirm collection.
   - Switch to the **Solar EPC Pipeline** tab and advance prospect status from `Enquiry Received` to `Site Survey Scheduled`.

6. **Reviewing Carbon Accounting (`/impact`):**
   - Inspect the monthly diversion bar chart and material distribution donut chart.
   - Toggle the scope filter to **My Live Activity Only** to view only the records you created during the test.
   - Read the transparent CPCB/CEA emission factor accounting notes.

7. **Redeeming Points and Business Model Review (`/profile`):**
   - Go to **Profile and Business**.
   - Under **GreenPoints Rewards**, click **Redeem Voucher** on an affordable perk (e.g. Campus Cafeteria Voucher).
   - Verify that points are deducted and an active coupon code is displayed.
   - Click the **Business Model Canvas** tab to review the commercialization roadmap prepared for Essentials of Business Management.

---

## Prototype Scope, Assumptions and Limitations
- **Local Persistence:** Data is stored client-side in the browser's `localStorage`. Clearing browser cookies or cache will reset the application to default baseline data.
- **Municipal Waste Complementarity:** EarthSync coordinates specialized recyclable collections and does not duplicate municipal solid waste operations.
- **Computational Estimations:** Figures provided by the SolarSaathi engine are engineering approximations for feasibility planning based on regional irradiance averages (4.5 to 5.8 peak sun hours/day, 78% PR). Actual system output depends on specific site shading, panel tier selection, and local DISCOM net-metering policies.
- **Subsidy Disclaimers:** Central financial assistance calculations follow PM Surya Ghar guidelines and are subject to MNRE inspection and national portal DBT verification.
- **GreenPoints Policy:** GreenPoints are simulated circular incentives and carry no monetary cash exchange value.
- **No Hardcoded Credentials:** The project does not store or commit private API keys, secrets, or real personal information.

---

## Academic Course Information
- **Course:** Essentials of Business Management
- **Project Name:** EarthSync CleanTech Platform
- **Academic Term:** Semester 3
- **Version:** 1.0 MVP
