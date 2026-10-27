'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Recycle, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Package, 
  Zap, 
  Clock, 
  Scale, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full space-y-16 sm:space-y-24 py-10">
      
      {/* =========================================================================
          HERO SECTION (Clean, Spacious, Not Oversized)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00B884]/10 border border-[#00B884]/25 text-xs font-semibold text-[#063D2E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B884]" />
            <span>CleanTech Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17231E] tracking-tight leading-[1.1]">
            Waste Less. <br className="hidden sm:inline" />
            <span className="text-[#063D2E]">Power More.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed max-w-2xl mx-auto">
            EarthSync brings smarter recyclable waste management and rooftop solar estimation together in one simple platform.
          </p>

          {/* Rectangular CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/waste"
              className="px-6 py-3 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-semibold text-sm tracking-wide transition-colors flex items-center gap-2"
            >
              <span>Explore Smart Waste</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/solar"
              className="px-6 py-3 rounded-md bg-white hover:bg-[#F8FAF7] text-[#17231E] font-semibold text-sm tracking-wide border border-[#E2E9E3] hover:border-[#65736B]/40 transition-colors flex items-center gap-2"
            >
              <span>Explore SolarSaathi</span>
              <ArrowRight className="w-4 h-4 text-[#FFB800]" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MAIN SERVICE SELECTION (Balanced 2-Column Desktop, Stacked Mobile)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
            Select an EarthSync Service
          </h2>
          <p className="text-sm text-[#65736B]">
            Choose between scheduled recyclable waste collection or precision rooftop solar potential modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Service Card 1: Smart Waste Management */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-8 flex flex-col justify-between hover:border-[#063D2E]/40 transition-colors">
            <div className="space-y-6">
              
              {/* Header & Visual */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E9E3]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-md bg-[#00B884]/10 border border-[#00B884]/20 flex items-center justify-center text-[#063D2E]">
                    <Recycle className="w-5 h-5 text-[#00B884]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#65736B]">
                      Service 01
                    </span>
                    <h3 className="text-xl font-bold text-[#17231E]">
                      Smart Waste Management
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#063D2E] bg-[#00B884]/10 px-2.5 py-1 rounded border border-[#00B884]/20">
                  On-Demand
                </span>
              </div>

              {/* Clean Recycling Schematic Visual */}
              <div className="w-full bg-[#F8FAF7] rounded-md border border-[#E2E9E3] p-6 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 320 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-[280px] h-auto text-[#063D2E]"
                >
                  {/* Subtle Background Lines */}
                  <line x1="10" y1="60" x2="310" y2="60" stroke="#E2E9E3" strokeWidth="1.5" strokeDasharray="4 4" />
                  
                  {/* Step 1: Segregation */}
                  <rect x="20" y="30" width="60" height="60" rx="6" fill="#FFFFFF" stroke="#063D2E" strokeWidth="1.5" />
                  <path d="M42 50 L50 42 L58 50" stroke="#00B884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M50 44 V70" stroke="#00B884" strokeWidth="2" strokeLinecap="round" />
                  <text x="50" y="82" fontSize="8" fill="#17231E" textAnchor="middle" fontWeight="bold">SORT</text>
                  
                  {/* Flow Arrow 1 */}
                  <path d="M92 60 H118" stroke="#063D2E" strokeWidth="1.5" strokeLinecap="round" />
                  <polygon points="120,60 114,56 114,64" fill="#063D2E" />

                  {/* Step 2: Calibrated Scale */}
                  <rect x="130" y="30" width="60" height="60" rx="6" fill="#FFFFFF" stroke="#063D2E" strokeWidth="1.5" />
                  <circle cx="160" cy="55" r="14" stroke="#063D2E" strokeWidth="1.5" fill="#F8FAF7" />
                  <line x1="160" y1="55" x2="167" y2="50" stroke="#00B884" strokeWidth="2" strokeLinecap="round" />
                  <text x="160" y="82" fontSize="8" fill="#17231E" textAnchor="middle" fontWeight="bold">WEIGH</text>

                  {/* Flow Arrow 2 */}
                  <path d="M202 60 H228" stroke="#063D2E" strokeWidth="1.5" strokeLinecap="round" />
                  <polygon points="230,60 224,56 224,64" fill="#063D2E" />

                  {/* Step 3: Circular Credit */}
                  <rect x="240" y="30" width="60" height="60" rx="6" fill="#FFFFFF" stroke="#063D2E" strokeWidth="1.5" />
                  <polygon points="270,44 274,52 282,53 276,59 278,67 270,63 262,67 264,59 258,53 266,52" fill="#FFB800" stroke="#E2E9E3" strokeWidth="0.5" />
                  <text x="270" y="82" fontSize="8" fill="#063D2E" textAnchor="middle" fontWeight="bold">REWARD</text>
                </svg>
                <span className="text-[11px] text-[#65736B] mt-2">
                  Doorstep Collection → Verified Weighing → Circular Recovery
                </span>
              </div>

              {/* Exact Required Description */}
              <p className="text-sm text-[#17231E] leading-relaxed">
                Explore recyclable waste pickup requests, track demo collection status, and understand how recyclable materials can be recovered.
              </p>

              {/* Short Feature Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#65736B] pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Paper, Cardboard, Plastic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Metal &amp; E-waste streams</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Lifecycle status tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Earn verified GreenPoints</span>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-8">
              <Link
                href="/waste"
                className="w-full py-3 px-4 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Smart Waste</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service Card 2: SolarSaathi */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-8 flex flex-col justify-between hover:border-[#063D2E]/40 transition-colors">
            <div className="space-y-6">
              
              {/* Header & Visual */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E9E3]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-md bg-[#FFB800]/15 border border-[#FFB800]/30 flex items-center justify-center text-[#17231E]">
                    <Sun className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#65736B]">
                      Service 02
                    </span>
                    <h3 className="text-xl font-bold text-[#17231E]">
                      SolarSaathi
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#17231E] bg-[#FFB800]/15 px-2.5 py-1 rounded border border-[#FFB800]/30">
                  Estimator
                </span>
              </div>

              {/* Clean Rooftop Solar Schematic Visual */}
              <div className="w-full bg-[#F8FAF7] rounded-md border border-[#E2E9E3] p-6 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 320 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-[280px] h-auto"
                >
                  {/* Subtle Grid */}
                  <line x1="20" y1="105" x2="300" y2="105" stroke="#E2E9E3" strokeWidth="1" />
                  
                  {/* Rooftop Base */}
                  <polygon points="60,65 160,35 260,65 160,95" fill="#FFFFFF" stroke="#063D2E" strokeWidth="1.5" />
                  
                  {/* PV Cells on Left Slope */}
                  <polygon points="80,63 150,42 160,50 90,71" fill="#063D2E" stroke="#042E24" strokeWidth="0.8" />
                  <polygon points="98,73 168,52 178,60 108,81" fill="#00B884" stroke="#042E24" strokeWidth="0.8" />

                  {/* Sun Icon Vector */}
                  <circle cx="270" cy="28" r="10" fill="#FFB800" stroke="#FFB800" strokeWidth="1" />
                  <line x1="270" y1="12" x2="270" y2="8" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="270" y1="44" x2="270" y2="48" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="254" y1="28" x2="250" y2="28" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="286" y1="28" x2="290" y2="28" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Connection line down to inverter */}
                  <path d="M160 95 V108" stroke="#063D2E" strokeWidth="1.5" strokeDasharray="2 2" />
                  <rect x="150" y="103" width="20" height="10" rx="2" fill="#063D2E" />
                </svg>
                <span className="text-[11px] text-[#65736B] mt-2">
                  Rooftop Sizing → Solar Yield Modeling → Financial Payback
                </span>
              </div>

              {/* Exact Required Description */}
              <p className="text-sm text-[#17231E] leading-relaxed">
                Estimate your rooftop solar capacity, potential electricity savings, and approximate payback period.
              </p>

              {/* Short Feature Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#65736B] pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Optimal capacity in kW</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Monthly generation (kWh)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Bill savings calculation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884] shrink-0" />
                  <span>Estimated payback years</span>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-8">
              <Link
                href="/solar"
                className="w-full py-3 px-4 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore SolarSaathi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS SECTION (Simple, Transparent 4-Step Process)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-lg border border-[#E2E9E3] p-8 sm:p-12 space-y-10">
          
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#F8FAF7] text-[#063D2E] border border-[#E2E9E3]">
              <Layers className="w-3.5 h-3.5 text-[#00B884]" />
              <span>Step-by-Step Flow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
              How EarthSync Works
            </h2>
            <p className="text-sm text-[#65736B] leading-relaxed">
              A straightforward two-pillar CleanTech platform connecting recyclable recovery with rooftop clean energy planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-3">
              <span className="text-2xl font-bold text-[#063D2E] font-mono block">
                01
              </span>
              <h3 className="font-bold text-sm text-[#17231E]">
                Select Service
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                Choose between Smart Waste collection for dry recyclables or the SolarSaathi rooftop estimator.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-3">
              <span className="text-2xl font-bold text-[#063D2E] font-mono block">
                02
              </span>
              <h3 className="font-bold text-sm text-[#17231E]">
                Provide Parameters
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                Specify waste categories and quantity, or enter your monthly electricity bill and available roof space.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-3">
              <span className="text-2xl font-bold text-[#063D2E] font-mono block">
                03
              </span>
              <h3 className="font-bold text-sm text-[#17231E]">
                Track &amp; Calculate
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                Review request status with cancellation control, or inspect instant interactive solar capacity models.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-3">
              <span className="text-2xl font-bold text-[#063D2E] font-mono block">
                04
              </span>
              <h3 className="font-bold text-sm text-[#17231E]">
                Realize Clean Value
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                Earn GreenPoints once collections are completed, or project your long-term energy savings over 25 years.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          ABOUT EARTHSYNC SECTION (id="about")
          ========================================================================= */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24 pb-6">
        <div className="bg-white rounded-lg border border-[#E2E9E3] p-8 sm:p-12 space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#F8FAF7] text-[#063D2E] border border-[#E2E9E3]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00B884]" />
              <span>Academic Context</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
              About EarthSync
            </h2>
            <p className="text-sm text-[#65736B] leading-relaxed">
              Developed as a CleanTech innovation project for the Essentials of Business Management curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-2">
              <h3 className="font-bold text-sm text-[#17231E]">
                Two Distinct Services
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                Instead of bundling unrelated dashboards, EarthSync maintains dedicated interfaces for Smart Waste logistics and SolarSaathi feasibility modeling.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-2">
              <h3 className="font-bold text-sm text-[#17231E]">
                Honest Simulation Scope
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                All mock requests and enquiries are stored locally in your browser. This project is a classroom proof-of-concept and does not displace municipal sanitation services.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] space-y-2">
              <h3 className="font-bold text-sm text-[#17231E]">
                Transparent Metrics
              </h3>
              <p className="text-xs text-[#65736B] leading-relaxed">
                Calculations use standard engineering assumptions: 4.8 peak sun hours, 78% system performance ratio, and Central Pollution Control Board recycling conversion rates.
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-[#E2E9E3] flex flex-wrap items-center justify-between gap-4 text-xs text-[#65736B]">
            <div className="flex items-center gap-4">
              <Link href="/waste" className="font-medium text-[#063D2E] hover:underline flex items-center gap-1">
                <span>Go to Smart Waste</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span>•</span>
              <Link href="/solar" className="font-medium text-[#063D2E] hover:underline flex items-center gap-1">
                <span>Go to SolarSaathi</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <span className="text-[11px]">
              Academic Version 1.0 • Essentials of Business Management
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
