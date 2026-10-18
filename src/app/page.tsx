'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEarthSync } from '@/context/EarthSyncContext';
import { WASTE_CATEGORIES, SOLAR_BENCHMARK_ASSUMPTIONS } from '@/data/constants';
import { 
  Recycle, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  Package, 
  FileText, 
  Shield, 
  Wine, 
  Cpu, 
  Leaf, 
  Calendar, 
  Scale, 
  Sparkles, 
  Zap, 
  BarChart3, 
  ChevronRight,
  ShieldCheck,
  Compass,
  Layers,
  Info
} from 'lucide-react';

export default function HomePage() {
  const { pickups, solarEnquiries, userProfile, isHydrated } = useEarthSync();

  // Quick Solar Estimator State for Landing Page interactive section
  const [quickBill, setQuickBill] = useState<number>(4500);

  // Quick Solar Computation
  const avgTariff = 7.5; // INR / kWh
  const monthlyUnits = quickBill / avgTariff;
  const suggestedKw = Math.max(1, Math.min(15, Number((monthlyUnits / (4.8 * 30 * 0.78)).toFixed(1))));
  const estCost = Math.round(suggestedKw * SOLAR_BENCHMARK_ASSUMPTIONS.costPerKwInr);
  
  // PM Surya Ghar Central Subsidy
  let quickSubsidy = 0;
  if (suggestedKw <= 1) quickSubsidy = 30000;
  else if (suggestedKw <= 2) quickSubsidy = 60000;
  else quickSubsidy = 78000;

  const netCapex = Math.max(0, estCost - quickSubsidy);
  const quickMonthlySavings = Math.round(monthlyUnits * avgTariff * 0.88);
  const quickAnnualCo2AvoidedKg = Math.round(suggestedKw * 4.8 * 365 * 0.78 * SOLAR_BENCHMARK_ASSUMPTIONS.co2FactorPerKwh);

  // Waste Stats
  const collectedKg = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((sum, p) => sum + p.quantityKg, 0);

  const activePickupsCount = pickups.filter(
    (p) => p.status === 'Requested' || p.status === 'Scheduled'
  ).length;

  // Icon helper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'plastic': return <Package className="w-5 h-5 text-emerald-800" />;
      case 'paper': return <FileText className="w-5 h-5 text-emerald-800" />;
      case 'metal': return <Shield className="w-5 h-5 text-emerald-800" />;
      case 'glass': return <Wine className="w-5 h-5 text-emerald-800" />;
      case 'ewaste': return <Cpu className="w-5 h-5 text-emerald-800" />;
      case 'organic': return <Leaf className="w-5 h-5 text-emerald-800" />;
      default: return <Recycle className="w-5 h-5 text-emerald-800" />;
    }
  };

  return (
    <div className="w-full space-y-24 md:space-y-32">
      
      {/* =========================================================================
          HERO SECTION (Spacious, Editorial-Style, Large Headline)
          ========================================================================= */}
      <section className="pt-10 md:pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Unified CleanTech Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.08]">
              Waste Less. <br />
              <span className="text-emerald-800">Power More.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-xl">
              EarthSync brings smarter recyclable waste management and rooftop solar estimation together in one simple platform.
            </p>

            {/* CTAs (Rectangular with modest rounding, no pill shape) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/waste"
                className="px-5 py-3 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm tracking-wide transition-colors shadow-xs flex items-center gap-2"
              >
                <span>Explore Smart Waste</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/solar"
                className="px-5 py-3 rounded-md bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm tracking-wide border border-stone-300 transition-colors shadow-xs flex items-center gap-2"
              >
                <span>Calculate Solar Savings</span>
              </Link>
            </div>

            {/* Editorial highlights bar */}
            <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <span className="font-bold text-stone-900 block text-sm">6 Streams</span>
                <span>Sorted recyclables</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 block text-sm">MNRE Baseline</span>
                <span>PM Surya Ghar sizing</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 block text-sm">GreenPoints</span>
                <span>Verified incentives</span>
              </div>
            </div>
          </div>

          {/* Right Visual Graphic (5 cols) - Restrained Environmental & Technical Vector Graphic */}
          <div className="lg:col-span-5">
            <div className="relative bg-stone-100 border border-stone-200/90 rounded-xl p-6 sm:p-8 shadow-xs overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-emerald-700" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                      System Synchrony
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">Live Model</span>
                </div>

                {/* Restrained Architectural / CleanTech Diagram (SVG) */}
                <div className="py-2">
                  <svg
                    viewBox="0 0 380 230"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto text-stone-800"
                  >
                    {/* Background gridlines subtle */}
                    <path d="M0 190 H380" stroke="#e7e5e4" strokeWidth="1" />
                    <path d="M0 130 H380" stroke="#e7e5e4" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M0 70 H380" stroke="#e7e5e4" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M100 0 V230" stroke="#e7e5e4" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M280 0 V230" stroke="#e7e5e4" strokeWidth="0.8" strokeDasharray="3 3" />

                    {/* Rooftop Solar Installation Schematic */}
                    <polygon points="120,70 190,30 260,70 190,110" fill="#f5f5f4" stroke="#042f24" strokeWidth="1.5" />
                    {/* Solar PV Grid Cells */}
                    <polygon points="135,68 185,39 205,51 155,80" fill="#064e3b" fillOpacity="0.85" stroke="#022c22" strokeWidth="1" />
                    <polygon points="175,79 225,50 245,62 195,91" fill="#047857" fillOpacity="0.9" stroke="#022c22" strokeWidth="1" />
                    
                    {/* Clean Energy Vector Line to Solar Inverter */}
                    <path d="M190 110 V145" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2" />
                    
                    {/* Building Base / Campus Facility */}
                    <rect x="120" y="70" width="140" height="120" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" />
                    <rect x="145" y="100" width="25" height="35" fill="#f5f5f4" stroke="#78716c" strokeWidth="1" />
                    <rect x="210" y="100" width="25" height="35" fill="#f5f5f4" stroke="#78716c" strokeWidth="1" />
                    <rect x="175" y="145" width="30" height="45" fill="#e7e5e4" stroke="#1c1917" strokeWidth="1" />

                    {/* Circular Waste Inflow Vector */}
                    <path d="M40 160 H120" stroke="#047857" strokeWidth="2" markerEnd="url(#arrow)" />
                    <rect x="35" y="135" width="50" height="50" rx="4" fill="#f0fdf4" stroke="#047857" strokeWidth="1.2" />
                    <path d="M50 160 L60 150 L70 160" stroke="#047857" strokeWidth="1.5" fill="none" />
                    <path d="M60 150 V172" stroke="#047857" strokeWidth="1.5" />

                    {/* Clean Output Grid Line */}
                    <path d="M260 160 H340" stroke="#d97706" strokeWidth="2" />
                    <rect x="295" y="135" width="50" height="50" rx="4" fill="#fffbeb" stroke="#d97706" strokeWidth="1.2" />
                    <circle cx="320" cy="160" r="10" stroke="#d97706" strokeWidth="1.5" fill="none" />
                    <path d="M320 146 V150" stroke="#d97706" strokeWidth="1.5" />
                    <path d="M320 170 V174" stroke="#d97706" strokeWidth="1.5" />
                    <path d="M306 160 H310" stroke="#d97706" strokeWidth="1.5" />
                    <path d="M330 160 H334" stroke="#d97706" strokeWidth="1.5" />

                    {/* Labels */}
                    <text x="60" y="202" fontSize="9" fill="#047857" textAnchor="middle" fontWeight="bold">RECYCLABLES</text>
                    <text x="190" y="206" fontSize="10" fill="#1c1917" textAnchor="middle" fontWeight="bold">EARTHSYNC HUB</text>
                    <text x="320" y="202" fontSize="9" fill="#b45309" textAnchor="middle" fontWeight="bold">SOLAR GRID</text>
                  </svg>
                </div>

                {/* Subtext description below schematic */}
                <div className="pt-3 border-t border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Doorstep Dry Sorting</span>
                  <span className="text-stone-400">↔</span>
                  <span className="font-medium text-amber-800">Clean Rooftop Yield</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 1: SMART WASTE MANAGEMENT
          ========================================================================= */}
      <section id="smart-waste" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <div className="space-y-10">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
              <Recycle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Section 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Smart Waste Management
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Divert recyclable materials from landfills. EarthSync provides on-demand doorstep collection for segregated dry waste streams, channeling high-value materials directly to certified regional recyclers.
            </p>
          </div>

          {/* 6 Accepted Streams Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WASTE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs hover:border-emerald-700/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-md bg-stone-100 border border-stone-200">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      +{cat.pointsPerKg} pts / kg
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-medium text-stone-700">~{cat.co2SavedPerKg} kg CO₂ / kg</span>
                  <span className="truncate max-w-[140px] text-stone-400">{cat.examples.split(',')[0]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Feature & Booking Teaser */}
          <div className="bg-stone-100 border border-stone-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-800" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    Certified Scale Verification
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Ready to book a recyclable waste pickup?
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Select your material category, specify estimated volume, and pick a convenient campus or residential time slot. GreenPoints are credited directly to your account upon physical weighing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/waste"
                  className="px-5 py-2.5 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Pickup Request</span>
                </Link>

                <div className="px-3.5 py-2 rounded-md bg-white border border-stone-300 text-xs text-stone-700 font-medium">
                  <span className="font-bold text-stone-900">{activePickupsCount}</span> active pickups logged
                </div>
              </div>
            </div>

            {/* Honest Scope Clarification */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-start gap-2 text-xs text-stone-500">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>
                <strong>Municipal Distinction:</strong> EarthSync handles segregated, non-hazardous dry recyclables. It operates alongside, and does not replace, daily municipal wet and solid sanitation services.
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: SOLARSAATHI
          ========================================================================= */}
      <section id="solarsaathi" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <div className="space-y-10">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Section 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              SolarSaathi Rooftop Feasibility
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Assess your rooftop solar potential with precision engineering benchmarks. Estimate system capacity, capital expenditure, financial payback, and available government subsidies under PM Surya Ghar.
            </p>
          </div>

          {/* Interactive Quick Solar Estimator Tool directly on the landing page */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Input Controller (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label htmlFor="quick-bill-slider" className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                    Monthly Electricity Bill
                  </label>
                  <p className="text-xs text-stone-500 mb-4">
                    Slide or select your typical monthly utility expenditure.
                  </p>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                      ₹{quickBill.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-medium text-stone-500">/ month</span>
                  </div>

                  <input
                    id="quick-bill-slider"
                    type="range"
                    min="1500"
                    max="25000"
                    step="500"
                    value={quickBill}
                    onChange={(e) => setQuickBill(Number(e.target.value))}
                    className="w-full accent-emerald-800 cursor-pointer"
                    aria-label="Monthly Electricity Bill"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>₹1,500</span>
                    <span>₹12,000</span>
                    <span>₹25,000</span>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2">
                  {[2500, 4500, 8000, 15000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setQuickBill(amt)}
                      className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                        quickBill === amt
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800">Grid Tariff Baseline:</span>
                    <span className="font-mono text-stone-900">₹7.50 / kWh</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800">Required Roof Area:</span>
                    <span className="font-mono text-stone-900">~{Math.round(suggestedKw * 90)} sq ft</span>
                  </div>
                </div>
              </div>

              {/* Right Output Dashboard (7 cols) */}
              <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-md bg-white border border-stone-200">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                      Recommended Capacity
                    </span>
                    <div className="text-2xl font-bold text-stone-900 mt-1">
                      {suggestedKw} <span className="text-sm font-normal text-stone-600">kWp</span>
                    </div>
                    <span className="text-[10px] text-stone-400">On-grid net-metered</span>
                  </div>

                  <div className="p-4 rounded-md bg-white border border-stone-200">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                      Monthly Savings
                    </span>
                    <div className="text-2xl font-bold text-emerald-800 mt-1">
                      ₹{quickMonthlySavings.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-700">~{Math.round(quickMonthlySavings * 12 / 1000)}k/year</span>
                  </div>

                  <div className="p-4 rounded-md bg-white border border-stone-200 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                      PM Surya Ghar Subsidy
                    </span>
                    <div className="text-2xl font-bold text-amber-800 mt-1">
                      ₹{quickSubsidy.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-stone-500">Direct DBT incentive</span>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                      Estimated Net Outlay (Post Subsidy)
                    </span>
                    <div className="text-xl font-bold text-stone-900 mt-0.5">
                      ₹{netCapex.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-stone-400 line-through">
                        ₹{estCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">
                      Displaces ~{quickAnnualCo2AvoidedKg.toLocaleString('en-IN')} kg CO₂e per year
                    </span>
                  </div>

                  <Link
                    href="/solar"
                    className="px-4 py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    <span>Full 25-Year Projection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: HOW EARTHSYNC WORKS
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Section 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              How EarthSync Works
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              A transparent four-step cycle that connects doorstep recyclable waste recovery with residential clean solar energy generation.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-extrabold text-stone-300 font-mono block mb-3">
                  01
                </span>
                <div className="p-2.5 rounded-md bg-stone-100 border border-stone-200 w-fit mb-4">
                  <Recycle className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2">
                  Segregate & Schedule
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sort dry waste across 6 accepted streams. Book an on-demand doorstep collection slot from your phone or desktop.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
                Zero friction collection booking
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-extrabold text-stone-300 font-mono block mb-3">
                  02
                </span>
                <div className="p-2.5 rounded-md bg-stone-100 border border-stone-200 w-fit mb-4">
                  <Scale className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2">
                  Calibrated Weighing
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Partner logistics vehicles verify exact weight on digital scales at pickup, ensuring accurate diversion logs.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
                Physical verification guaranteed
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-extrabold text-stone-300 font-mono block mb-3">
                  03
                </span>
                <div className="p-2.5 rounded-md bg-stone-100 border border-stone-200 w-fit mb-4">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2">
                  Earn GreenPoints
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Verified collections credit GreenPoints directly to your wallet, redeemable for eco vouchers or tree sapling sponsorships.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
                Tangible circular incentives
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-extrabold text-stone-300 font-mono block mb-3">
                  04
                </span>
                <div className="p-2.5 rounded-md bg-stone-100 border border-stone-200 w-fit mb-4">
                  <Sun className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2">
                  SolarSaathi Transition
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Model rooftop solar payback, claim central subsidies under PM Surya Ghar, and submit enquiries to certified EPC installers.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
                Long-term renewable transition
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: ENVIRONMENTAL IMPACT
          ========================================================================= */}
      <section id="impact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <div className="space-y-10">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Section 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Environmental Impact
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Transparent, defensible carbon metrics computed according to standard lifecycle analysis (LCA) factors. No exaggerated claims or synthetic badges.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Total Waste Diverted
              </span>
              <div className="text-3xl font-bold text-stone-900 mt-2">
                {collectedKg.toFixed(1)} <span className="text-sm font-semibold text-stone-500">kg</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Verified collections across dry categories
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Greenhouse Gas Avoided
              </span>
              <div className="text-3xl font-bold text-emerald-800 mt-2">
                {(collectedKg * 1.8).toFixed(1)} <span className="text-sm font-semibold text-emerald-700">kg CO₂e</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Diverted from anaerobic landfill decay
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Modeled Solar Potential
              </span>
              <div className="text-3xl font-bold text-amber-800 mt-2">
                {solarEnquiries.reduce((sum, e) => sum + (e.suggestedCapacityKw || 3), 0).toFixed(1)}{' '}
                <span className="text-sm font-semibold text-amber-700">kWp</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Active feasibility assessments logged
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                GreenPoints in Wallet
              </span>
              <div className="text-3xl font-bold text-stone-900 mt-2">
                {isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '...'}{' '}
                <span className="text-sm font-semibold text-stone-500">pts</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Issued exclusively on physical collection
              </p>
            </div>

          </div>

          {/* Methodology Callout */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h3 className="font-bold text-stone-900 text-sm">
                Standard LCA Accounting Methodology
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                EarthSync calculates avoided carbon using Central Pollution Control Board (CPCB) recycling emission factors and a grid displacement index of 0.82 kg CO₂e per kWh of rooftop solar generation.
              </p>
            </div>

            <Link
              href="/impact"
              className="px-4 py-2.5 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>Explore Analytics Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: ABOUT EARTHSYNC
          ========================================================================= */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24 pb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-8 sm:p-12 shadow-xs space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Section 05 | Academic Project Context</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              About EarthSync
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Developed as a CleanTech innovation project for the Essentials of Business Management curriculum. EarthSync addresses urban sustainability by uniting dry recyclable waste logistics with residential rooftop solar adoption in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                Circular Logistics Architecture
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Connects waste generators with vetted private scrap aggregators and authorized CPCB recycling mills, closing material loops locally.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                Honest Demonstration State
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                All mock records are clearly identified with demo tags. Real submissions are persisted locally in your browser LocalStorage for presentation review.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                Clean Energy Acceleration
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Demystifies solar rooftop financials and central PM Surya Ghar subsidies, connecting qualified building leads with certified EPC installers.
              </p>
            </div>

          </div>

          {/* Links cluster */}
          <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 font-semibold text-emerald-800">
              <Link href="/profile" className="hover:text-emerald-950 flex items-center gap-1">
                <span>Business Model Canvas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin" className="hover:text-emerald-950 flex items-center gap-1">
                <span>Partner Operations Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/dashboard" className="hover:text-emerald-950 flex items-center gap-1">
                <span>Operational Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <span className="text-stone-400">
              Version 1.0.0 • Academic MVP
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
