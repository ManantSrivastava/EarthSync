'use client';

import React from 'react';
import Link from 'next/link';
import { useEarthSync } from '@/context/EarthSyncContext';
import { 
  Recycle, 
  Sun, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Activity,
  Award,
  Layers,
  ChevronRight
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

  // Solar aggregate estimation
  const totalSolarCapacityKw = solarEnquiries.reduce(
    (sum, e) => sum + (e.suggestedCapacityKw || 0),
    0
  );
  const annualSolarSavingsInr = solarEnquiries.reduce(
    (sum, e) => sum + (e.monthlySavingsInr ? e.monthlySavingsInr * 12 : 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
      {/* Dashboard Top Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Operational Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Platform Activity & Resource Dashboard
            </h1>
            <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
              Track live recyclable collection logistics, verify scale weights, review SolarSaathi clean energy proposals, and manage GreenPoints rewards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/waste"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs"
            >
              <Recycle className="w-4 h-4" />
              <span>Schedule Pickup</span>
            </Link>

            <Link
              href="/solar"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs"
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Solar Estimator</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Waste Recycled */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-600/40 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Recyclables Diverted
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <Recycle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {collectedKg.toFixed(1)} <span className="text-sm font-semibold text-stone-500">kg</span>
            </div>
            <p className="text-xs text-stone-500 mt-1.5">
              Verified through partner collection scales
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-emerald-800 font-semibold text-[11px]">
              +{(collectedKg * 1.8).toFixed(1)} kg CO₂e offset
            </span>
            <Link href="/waste" className="text-stone-500 hover:text-emerald-700 font-medium inline-flex items-center gap-0.5">
              <span>View</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Upcoming Pickups */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-400 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Active Pickups
              </span>
              <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {activePickups.length} <span className="text-sm font-semibold text-stone-500">active</span>
            </div>
            <p className="text-xs text-stone-500 mt-1.5">
              {activePickups.filter((p) => p.status === 'Scheduled').length} scheduled,{' '}
              {activePickups.filter((p) => p.status === 'Requested').length} pending dispatch
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-600 font-medium text-[11px] truncate max-w-[150px]">
              Next: {activePickups[0]?.preferredDate || 'None pending'}
            </span>
            <Link href="/waste" className="text-stone-500 hover:text-emerald-700 font-medium inline-flex items-center gap-0.5">
              <span>Manage</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Solar Savings */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-amber-500/40 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Modeled Solar Savings
              </span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                <Sun className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
              ₹{(annualSolarSavingsInr / 1000).toFixed(1)}k <span className="text-sm font-semibold text-stone-500">/yr</span>
            </div>
            <p className="text-xs text-stone-500 mt-1.5">
              Modeled across {totalSolarCapacityKw.toFixed(1)} kWp rooftop potential
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-amber-800 font-semibold text-[11px]">
              Average 4.2 yr payback
            </span>
            <Link href="/solar" className="text-stone-500 hover:text-amber-700 font-medium inline-flex items-center gap-0.5">
              <span>Calculate</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: GreenPoints Balance */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-600/40 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                GreenPoints Balance
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '...'}{' '}
              <span className="text-sm font-semibold text-stone-500">pts</span>
            </div>
            <p className="text-xs text-stone-500 mt-1.5">
              Redeemable for eco vouchers & tree plantations
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-emerald-800 font-semibold text-[11px]">
              Tier 1 Eco Champion
            </span>
            <Link href="/profile" className="text-stone-500 hover:text-emerald-700 font-medium inline-flex items-center gap-0.5">
              <span>Redeem</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Pillars Section: Separate Waste & Solar Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pillar 1: Smart Waste Operations */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                  <Recycle className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h2 className="font-bold text-stone-900 text-base">Smart Waste Management</h2>
                  <p className="text-xs text-stone-500">Logistics coordination & categorized segregation</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                6 Categories
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
              EarthSync coordinates on-demand pickups for sorted plastic, paper, metal, glass, e-waste, and organics. Every kilogram collected is weighed, verified, and rewarded directly with GreenPoints.
            </p>

            {/* Quick Status breakdown */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-stone-100 text-center">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">Requested</span>
                <span className="text-lg font-bold text-stone-900">
                  {pickups.filter((p) => p.status === 'Requested').length}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">Scheduled</span>
                <span className="text-lg font-bold text-stone-900">
                  {pickups.filter((p) => p.status === 'Scheduled').length}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100">
                <span className="text-[10px] text-emerald-800 font-semibold block uppercase tracking-wider">Collected</span>
                <span className="text-lg font-bold text-emerald-800">
                  {pickups.filter((p) => p.status === 'Collected').length}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">Private aggregator partner network</span>
            <Link
              href="/waste"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Schedule or View History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pillar 2: SolarSaathi Solutions */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
                  <Sun className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-bold text-stone-900 text-base">SolarSaathi Clean Energy</h2>
                  <p className="text-xs text-stone-500">Rooftop sizing, financials & provider leads</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                MNRE Benchmarked
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
              Calculate optimal rooftop solar capacity (kWp) from your monthly electricity bill, verify shadow-free area constraints, and review 25-year cumulative savings models with transparent assumptions.
            </p>

            {/* Benchmark Highlights */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-stone-100 text-center">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">System PR</span>
                <span className="text-lg font-bold text-stone-900">78%</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">Avg. Sun</span>
                <span className="text-lg font-bold text-stone-900">4.8 Hrs</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">Enquiries</span>
                <span className="text-lg font-bold text-stone-900">{solarEnquiries.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">PM Surya Ghar benchmark model</span>
            <Link
              href="/solar"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Launch SolarSaathi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
          <div>
            <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>Platform Activity Log</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Live updates on waste pickups, solar calculations, and GreenPoints transactions.
            </p>
          </div>
          <span className="text-xs text-stone-400 font-medium">{activities.length} total events</span>
        </div>

        {activities.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            No platform activity recorded yet. Start by scheduling a recyclable waste pickup or modeling your rooftop solar.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {activities.slice(0, 5).map((act) => {
              let icon = <Activity className="w-4 h-4 text-stone-500" />;
              if (act.type === 'waste_pickup') {
                icon = <Recycle className="w-4 h-4 text-emerald-700" />;
              } else if (act.type === 'waste_collected') {
                icon = <Sparkles className="w-4 h-4 text-amber-500" />;
              } else if (act.type === 'solar_enquiry') {
                icon = <Sun className="w-4 h-4 text-amber-600" />;
              } else if (act.type === 'reward_redeemed') {
                icon = <Award className="w-4 h-4 text-emerald-700" />;
              }

              return (
                <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-stone-50 border border-stone-100 shrink-0 mt-0.5">{icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900">{act.title}</span>
                      </div>
                      <p className="text-stone-500 mt-0.5">{act.description}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 shrink-0 font-medium">{act.timestamp}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
