'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Recycle, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  Sparkles,
  Gift,
  Tag
} from 'lucide-react';
import { WindTurbineRotor } from '@/components/WindTurbineRotor';
import { REWARD_ITEMS } from '@/data/constants';

export default function HomePage() {
  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-16">
      
      {/* =========================================================================
          HERO SECTION - Reference-faithful with 3D animated windmills
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#F7F9F6]">
        {/* Main hero frame with continuous wide mountain panorama */}
        <div className="relative w-full max-w-[1536px] mx-auto min-h-[560px] sm:min-h-[620px] md:min-h-0 md:aspect-[1536/490]">

          {/* 1. Pristine Clean Landscape Backdrop with Continuous Mountains */}
          <picture className="absolute inset-0 w-full h-full select-none pointer-events-none">
            <source srcSet="/hero-landscape-clean.webp" type="image/webp" />
            <img
              src="/hero-landscape-clean.png"
              alt="EarthSync renewable energy landscape"
              className="w-full h-full object-cover object-bottom md:object-fill select-none pointer-events-none"
              draggable={false}
            />
          </picture>

          {/* 2. Realistic 3D Animated Windmill Rotors */}
          {/* LEFT large foreground turbine — hub center at x=501 (32.62%), y=258 (52.65%) */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{
              left: '32.62%',
              top: '52.65%',
              width: '11.20%',
              height: '35.10%',
            }}
            title="3D Rotating Wind Turbine"
          >
            <WindTurbineRotor
              id="L"
              duration="10s"
              delay="0s"
              yaw={-18}
              pitch={4}
            />
          </div>

          {/* RIGHT large foreground turbine — hub center at x=1053 (68.55%), y=269 (54.90%) */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{
              left: '68.55%',
              top: '54.90%',
              width: '9.44%',
              height: '29.60%',
            }}
            title="3D Rotating Wind Turbine"
          >
            <WindTurbineRotor
              id="R"
              duration="12s"
              delay="-4.5s"
              yaw={20}
              pitch={4}
            />
          </div>

          {/* DISTANT centre-left turbine — hub (718, 331) -> 46.75% x 67.55% */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden sm:block"
            style={{
              left: '46.75%',
              top: '67.55%',
              width: '4.53%',
              height: '14.20%',
            }}
          >
            <WindTurbineRotor
              id="DC"
              duration="14s"
              delay="-6s"
              opacity={0.8}
            />
          </div>

          {/* DISTANT far-right turbine — hub (1088, 381) -> 70.83% x 77.76% */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden sm:block"
            style={{
              left: '70.83%',
              top: '77.76%',
              width: '3.87%',
              height: '12.10%',
            }}
          >
            <WindTurbineRotor
              id="DR"
              duration="15.5s"
              delay="-9s"
              opacity={0.75}
            />
          </div>

          {/* DISTANT far-left turbine — hub (421, 374) -> 27.41% x 76.33% */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden sm:block"
            style={{
              left: '27.41%',
              top: '76.33%',
              width: '3.20%',
              height: '10.00%',
            }}
          >
            <WindTurbineRotor
              id="DL"
              duration="13s"
              delay="-2s"
              opacity={0.75}
            />
          </div>

          {/* DISTANT mid-right turbine — hub (885, 368) -> 57.62% x 75.10% */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden sm:block"
            style={{
              left: '57.62%',
              top: '75.10%',
              width: '3.47%',
              height: '10.90%',
            }}
          >
            <WindTurbineRotor
              id="DMR"
              duration="16s"
              delay="-11s"
              opacity={0.7}
            />
          </div>

          {/* 3. Central Typography Stack & CTA Buttons */}
          <div className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-6 lg:pt-8 text-center flex flex-col items-center">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] xl:text-[66px] font-extrabold tracking-tight leading-[1.08] mb-2 sm:mb-3">
              <span className="text-[#0E2E20]">Waste Less.</span>
              <br />
              <span className="text-[#00A86B]">Power More.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#52685C] leading-relaxed max-w-[440px] md:max-w-[480px] mx-auto mb-5 md:mb-6">
              Smarter recyclable waste management and rooftop solar estimation,
              brought together in one simple platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
              <Link
                href="/waste"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-lg bg-[#0B3D2E] hover:bg-[#082D21] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Recycle className="w-4 h-4 shrink-0 text-white" />
                <span>Explore Smart Waste</span>
                <ArrowRight className="w-4 h-4 shrink-0 text-white" />
              </Link>

              <Link
                href="/solar"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-lg bg-white hover:bg-[#F5F9F6] text-[#17231E] font-semibold text-xs sm:text-sm tracking-wide border border-[#DDE6E0] hover:border-[#B9CCBF] transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <Sun className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] shrink-0" />
                <span>Explore SolarSaathi</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B] shrink-0" />
              </Link>
            </div>

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
                    <Recycle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-[#00B884] uppercase">Service 01</span>
                    <h3 className="text-xl font-bold text-[#17231E]">Smart Waste Management</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E7F6EC] text-[#063D2E] border border-[#00B884]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B884]" />
                  Active in Jaipur
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4E5D54] leading-relaxed">
                Schedule reliable pickups for paper, plastics, and metals. Track vehicle ETAs in real time and convert everyday segregation into redeemable GreenPoints.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5">
                {[
                  'Scheduled doorstep pickup with real-time route tracking',
                  'Earn GreenPoints per verified kilogram of recyclables',
                  'Guaranteed transparent tier pricing across all categories',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2D3E35]">
                    <CheckCircle2 className="w-4 h-4 text-[#00B884] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-[#E2E9E3] flex items-center justify-between">
              <Link 
                href="/waste" 
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#063D2E] hover:bg-[#094D3B] text-white font-medium text-sm transition-colors shadow-2xs"
              >
                <span>Book a Waste Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service Card 2: SolarSaathi Rooftop Estimation */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-8 flex flex-col justify-between hover:border-[#063D2E]/40 transition-colors">
            <div className="space-y-6">
              
              {/* Header & Visual */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E9E3]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-md bg-[#00B884]/10 border border-[#00B884]/20 flex items-center justify-center text-[#063D2E]">
                    <Sun className="w-5 h-5 text-[#063D2E]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-[#00B884] uppercase">Service 02</span>
                    <h3 className="text-xl font-bold text-[#17231E]">SolarSaathi</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E7F6EC] text-[#063D2E] border border-[#00B884]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B884]" />
                  MNRE Subsidy Ready
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4E5D54] leading-relaxed">
                Estimate rooftop solar capacity, monthly power generation, payback timeline, and eligible central subsidies with instant state tariff benchmarks.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5">
                {[
                  'Precision solar potential modeled on local irradiance data',
                  'Tiered central subsidy calculator up to ₹78,000 allowance',
                  'Downloadable pre-feasibility PDF proposal for vendors',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2D3E35]">
                    <CheckCircle2 className="w-4 h-4 text-[#00B884] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-[#E2E9E3] flex items-center justify-between">
              <Link 
                href="/solar" 
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#063D2E] hover:bg-[#094D3B] text-white font-medium text-sm transition-colors shadow-2xs"
              >
                <span>Calculate Solar Potential</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          PLATFORM CAPABILITIES & STANDARDS
          ========================================================================= */}
      <section className="bg-white border-y border-[#E2E9E3] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#063D2E]">6 Streams</div>
            <div className="text-xs sm:text-sm text-[#4E5D54] mt-1 font-medium">Segregated Recyclables</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#063D2E]">100%</div>
            <div className="text-xs sm:text-sm text-[#4E5D54] mt-1 font-medium">Verified Scale Weights</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#063D2E]">25 Years</div>
            <div className="text-xs sm:text-sm text-[#4E5D54] mt-1 font-medium">Solar Lifecycle Modeling</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-[#063D2E]">Direct Credit</div>
            <div className="text-xs sm:text-sm text-[#4E5D54] mt-1 font-medium">GreenPoints on Collection</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (Step-by-step clarity)
          ========================================================================= */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
            How EarthSync Works
          </h2>
          <p className="text-sm text-[#65736B]">
            A unified interface for community circularity and decentralized rooftop clean energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-6 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#063D2E] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-base font-semibold text-[#17231E]">Segregate & Schedule</h3>
            <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed">
              Book doorstep pickup for sorted household recyclables with guaranteed transparent category pricing and assigned driver tracking.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-6 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#063D2E] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-base font-semibold text-[#17231E]">Earn GreenPoints</h3>
            <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed">
              Every verified kilogram deposited converts instantly into GreenPoints, redeemable towards waste pickup fees or solar installation partners.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-6 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#063D2E] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-base font-semibold text-[#17231E]">Power Your Rooftop</h3>
            <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed">
              Enter your sanctioned load or average power bill into SolarSaathi to simulate optimal system capacity, subsidy yields, and net payback.
            </p>
          </div>

        </div>

        {/* =========================================================================
            GREENPOINTS BENEFITS & REWARDS CATALOG
            ========================================================================= */}
        <div className="pt-6 sm:pt-10 space-y-8 border-t border-[#E2E9E3]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#063D2E] border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Community Benefits & Incentives</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
              Earn GreenPoints. Unlock Tangible Rewards.
            </h3>
            <p className="text-sm text-[#65736B]">
              Every verified kilogram of sorted recyclable waste earns GreenPoints redeemable for campus dining, native tree plantations, mobility credits, and rooftop solar discounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REWARD_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2E9E3] p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Badges: Category & Points Cost */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.pointsCost} pts</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="font-bold text-[#17231E] text-sm sm:text-base leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#4E5D54] mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Partner Reference */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#65736B] pt-1">
                    <Tag className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>
                      Partner: <strong className="text-[#17231E] font-semibold">{item.partner}</strong>
                    </span>
                  </div>
                </div>

                {/* Bottom Requirement / CTA Link */}
                <div className="mt-4 pt-3 border-t border-[#E2E9E3]/70">
                  <Link
                    href="/waste"
                    className="w-full py-2 px-3 rounded-lg bg-[#F8FAF7] hover:bg-emerald-50 text-[#65736B] hover:text-[#063D2E] text-xs font-semibold border border-[#E2E9E3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#65736B]" />
                    <span>Needs {item.pointsCost} More Pts</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLATFORM ARCHITECTURE & ACADEMIC HIGHLIGHTS
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#F8FAF7] rounded-xl border border-[#E2E9E3] p-8 sm:p-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00B884]/15 text-[#063D2E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00B884]" />
              Dual Impact Framework
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
              Bridging Household Waste & Decentralized Solar
            </h2>

            <p className="text-sm text-[#4E5D54] leading-relaxed">
              Traditional sustainability platforms isolate waste management from clean energy adoption. EarthSync bridges localized recycling incentives with residential rooftop solar adoption within a singular civic ecosystem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-[#E2E9E3]">
                <Layers className="w-5 h-5 text-[#00B884] shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-[#17231E]">Synchronized Ecosystem</div>
                  <div className="text-[#65736B]">Unified GreenPoints across all actions</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-[#E2E9E3]">
                <Sun className="w-5 h-5 text-[#00B884] shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-[#17231E]">MNRE Regulatory Align</div>
                  <div className="text-[#65736B]">Standardized rooftop benchmark calculations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
