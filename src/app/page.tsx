'use client';

import React from 'react';
import Link from 'next/link';
import { useEarthSync } from '@/context/EarthSyncContext';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { 
  Recycle, 
  Sun, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Activity,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const { pickups, solarEnquiries, activities, userProfile, isHydrated } = useEarthSync();

  // Computations
  const collectedKg = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((sum, p) => sum + p.quantityKg, 0);

  const activePickups = pickups.filter(
    (p) => p.status === 'Requested' || p.status === 'Scheduled'
  );

  // Solar aggregate estimation (sum of all logged inquiries or default baseline)
  const totalSolarCapacityKw = solarEnquiries.reduce(
    (sum, e) => sum + (e.suggestedCapacityKw || 3),
    0
  );
  const annualSolarSavingsInr = solarEnquiries.reduce(
    (sum, e) => sum + (e.monthlySavingsInr ? e.monthlySavingsInr * 12 : 36000),
    0
  );

  const hasUserCreatedEntries =
    pickups.some((p) => !p.isSample) || solarEnquiries.some((e) => !e.isSample);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Demo notice banner */}
      <DemoDataNotice hasUserEntries={hasUserCreatedEntries} />

      {/* Hero / Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-800/60">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-xs font-semibold text-emerald-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Integrated CleanTech Operating System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Syncing Urban Waste & <span className="text-amber-400">Clean Solar</span> Energy
          </h1>

          <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
            EarthSync bridges localized circular waste management with precision decentralized solar power. Schedule sorted pickups to earn reward points or model your rooftop renewable potential in seconds.
          </p>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/waste"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Recycle className="w-4 h-4" />
              <span>Schedule Waste Pickup</span>
            </Link>

            <Link
              href="/solar"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
            >
              <Sun className="w-4 h-4" />
              <span>SolarSaathi Estimator</span>
            </Link>

            <Link
              href="/impact"
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-1.5 backdrop-blur-sm border border-white/10"
            >
              <span>View Carbon Impact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Decorative background visual elements */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none hidden md:block">
          <Sun className="w-96 h-96 text-amber-300" />
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Waste Recycled */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Waste Recycled
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Recycle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {collectedKg.toFixed(1)} <span className="text-base font-bold text-emerald-600">KG</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Diverted across e-waste, paper & plastics
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold text-[11px]">
              +{(collectedKg * 1.8).toFixed(1)} kg CO₂e saved
            </span>
            <Link href="/waste" className="text-slate-400 hover:text-emerald-700 font-medium">
              View pickups →
            </Link>
          </div>
        </div>

        {/* Card 2: Upcoming Pickups */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Upcoming Pickups
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {activePickups.length}{' '}
              <span className="text-base font-bold text-sky-600">Active</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activePickups.filter((p) => p.status === 'Scheduled').length} scheduled,{' '}
              {activePickups.filter((p) => p.status === 'Requested').length} pending dispatch
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-sky-700 font-semibold text-[11px]">
              Next: {activePickups[0]?.preferredDate || 'None pending'}
            </span>
            <Link href="/waste" className="text-slate-400 hover:text-sky-700 font-medium">
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 3: Solar Savings */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Est. Solar Savings
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Sun className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              ₹{(annualSolarSavingsInr / 1000).toFixed(1)}k{' '}
              <span className="text-base font-bold text-amber-600">/yr</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {totalSolarCapacityKw.toFixed(1)} kWp modeled solar potential
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-amber-700 font-semibold text-[11px]">
              Avg. 4.2 yr ROI payback
            </span>
            <Link href="/solar" className="text-slate-400 hover:text-amber-700 font-medium">
              Calculate →
            </Link>
          </div>
        </div>

        {/* Card 4: GreenPoints Balance */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                GreenPoints Balance
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600 tracking-tight">
              {isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '...'}{' '}
              <span className="text-base font-bold text-slate-400">PTS</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Earned on collections, redeemable for perks
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold text-[11px]">
              Tier 1 Eco-Champion
            </span>
            <Link href="/profile" className="text-slate-400 hover:text-emerald-700 font-medium">
              Redeem →
            </Link>
          </div>
        </div>
      </div>

      {/* Two Pillars Section: Separate Waste & Solar Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pillar 1: Smart Waste Operations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Recycle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Smart Waste Management</h3>
                  <p className="text-xs text-slate-500">Circular logistics & categorized segregation</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                6 Categories
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              EarthSync coordinates on-demand pickups for sorted plastic, paper, metal, glass, e-waste, and organics. Every kilogram collected is weighed, verified, and rewarded directly with GreenPoints.
            </p>

            {/* Quick Status Pill breakdown */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Requested</span>
                <span className="text-lg font-bold text-slate-800">
                  {pickups.filter((p) => p.status === 'Requested').length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50">
                <span className="text-[10px] text-sky-700 font-semibold block uppercase">Scheduled</span>
                <span className="text-lg font-bold text-sky-800">
                  {pickups.filter((p) => p.status === 'Scheduled').length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <span className="text-[10px] text-emerald-700 font-semibold block uppercase">Collected</span>
                <span className="text-lg font-bold text-emerald-800">
                  {pickups.filter((p) => p.status === 'Collected').length}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Logistics partner network active</span>
            <Link
              href="/waste"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Schedule or View History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pillar 2: SolarSaathi Solutions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Sun className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">SolarSaathi Energy Engine</h3>
                  <p className="text-xs text-slate-500">Rooftop sizing, financials & provider leads</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                MNRE Benchmarked
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Calculate optimal rooftop solar capacity (kWp) from your monthly electricity bill, verify shadow-free area constraints, and review 25-year cumulative savings models with transparent assumptions.
            </p>

            {/* Benchmark Highlights */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">System PR</span>
                <span className="text-lg font-bold text-slate-800">78%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50">
                <span className="text-[10px] text-amber-700 font-semibold block uppercase">Avg. Sun</span>
                <span className="text-lg font-bold text-amber-800">4.8 Hrs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <span className="text-[10px] text-emerald-700 font-semibold block uppercase">Enquiries</span>
                <span className="text-lg font-bold text-emerald-800">{solarEnquiries.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Feasibility modeling engine</span>
            <Link
              href="/solar"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Launch SolarSaathi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              Platform Activity Feed
            </h3>
            <p className="text-xs text-slate-500">
              Live updates on waste pickups, solar calculations, and GreenPoints transactions.
            </p>
          </div>
          <span className="text-xs text-slate-400">{activities.length} total events</span>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.slice(0, 5).map((act) => {
            let icon = <Activity className="w-4 h-4 text-emerald-600" />;
            if (act.type === 'waste_pickup') {
              icon = <Recycle className="w-4 h-4 text-sky-600" />;
            } else if (act.type === 'waste_collected') {
              icon = <Sparkles className="w-4 h-4 text-amber-500" />;
            } else if (act.type === 'solar_enquiry') {
              icon = <Sun className="w-4 h-4 text-amber-600" />;
            } else if (act.type === 'reward_redeemed') {
              icon = <Award className="w-4 h-4 text-emerald-600" />;
            }

            return (
              <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{act.title}</span>
                      {act.isSample && (
                        <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-500 uppercase">
                          Sample
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 mt-0.5">{act.description}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{act.timestamp}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
