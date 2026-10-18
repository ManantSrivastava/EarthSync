'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { WastePickupForm } from '@/components/WastePickupForm';
import { PickupList } from '@/components/PickupList';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { WASTE_CATEGORIES } from '@/data/constants';
import { 
  Recycle, 
  CalendarPlus, 
  History, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Package,
  FileText,
  Shield,
  Wine,
  Cpu,
  Leaf
} from 'lucide-react';
import Link from 'next/link';

export default function WasteManagementPage() {
  const { pickups, userProfile } = useEarthSync();
  const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule');

  const collectedCount = pickups.filter((p) => p.status === 'Collected').length;
  const pendingCount = pickups.filter(
    (p) => p.status === 'Requested' || p.status === 'Scheduled'
  ).length;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'plastic':
        return <Package className="w-4 h-4 text-emerald-800" />;
      case 'paper':
        return <FileText className="w-4 h-4 text-emerald-800" />;
      case 'metal':
        return <Shield className="w-4 h-4 text-emerald-800" />;
      case 'glass':
        return <Wine className="w-4 h-4 text-emerald-800" />;
      case 'ewaste':
        return <Cpu className="w-4 h-4 text-emerald-800" />;
      case 'organic':
        return <Leaf className="w-4 h-4 text-emerald-800" />;
      default:
        return <Recycle className="w-4 h-4 text-emerald-800" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
      {/* Notice Banner */}
      <DemoDataNotice hasUserEntries={pickups.some((p) => !p.isSample)} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 mb-2">
            <Recycle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Smart Waste Management & Logistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            On-Demand Segregated Waste Collection
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Book scheduled pickups for clean, sorted dry recyclables. Divert materials directly to authorized reprocessing mills and earn verifiable GreenPoints upon certified digital scale weighing.
          </p>
        </div>

        {/* Quick Points Summary Card */}
        <div className="bg-stone-900 text-white p-5 rounded-lg border border-stone-800 text-center shrink-0 min-w-[170px]">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
            GreenPoints Balance
          </span>
          <div className="text-2xl font-bold text-amber-400 mt-0.5">
            {userProfile.greenPointsBalance.toLocaleString()}{' '}
            <span className="text-xs font-normal text-stone-400">pts</span>
          </div>
          <Link
            href="/profile"
            className="text-[11px] text-emerald-300 hover:text-white font-medium inline-flex items-center gap-1 mt-2"
          >
            <span>Redeem Store</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Accepted Waste Categories Overview */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Accepted Waste Streams & Reward Rates</span>
          </h2>
          <span className="text-[11px] text-stone-500 font-medium">Credited exclusively upon verified weighing</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {WASTE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-white border border-stone-200 shadow-xs">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="font-bold text-xs text-stone-900 truncate">{cat.name.split(' ')[0]}</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800">
                  +{cat.pointsPerKg} pts/kg
                </span>
                <span className="text-[10px] text-stone-500 font-mono">~{cat.co2SavedPerKg}kg CO₂</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs: Schedule vs History */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'schedule'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Schedule Collection</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Pickup History & Lifecycle</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              activeTab === 'history' ? 'bg-emerald-950 text-white' : 'bg-stone-200 text-stone-700'
            }`}
          >
            {pickups.length}
          </span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'schedule' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-stone-100">
              <h2 className="text-base font-bold text-stone-900">Book Doorstep Pickup</h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Fill in the details below. Our certified logistics vehicle will arrive during your selected window.
              </p>
            </div>

            <WastePickupForm onSuccess={() => setActiveTab('history')} />
          </div>

          {/* Right Info Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Circular Incentive Card */}
            <div className="bg-emerald-950 text-white rounded-xl p-6 shadow-xs border border-emerald-900">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>GreenPoints Reward Rule</span>
              </div>
              <h3 className="text-base font-bold text-white">Verified Weighing Protocol</h3>
              <p className="text-xs text-emerald-200/90 mt-2 leading-relaxed">
                To guarantee circular economy integrity, GreenPoints are <strong>credited only when a collection is marked as Collected</strong> by the partner driver with calibrated digital scales.
              </p>

              <div className="mt-5 pt-4 border-t border-emerald-900 space-y-2.5 text-xs text-emerald-200">
                <div className="flex items-center justify-between">
                  <span>Pending Requests:</span>
                  <strong className="text-white font-mono">{pendingCount}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Collected & Awarded:</span>
                  <strong className="text-amber-300 font-mono">{collectedCount}</strong>
                </div>
              </div>
            </div>

            {/* Preparation Guidelines */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-3">
              <h3 className="font-bold text-stone-900 text-sm">Segregation Best Practices</h3>
              <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">•</span>
                  <span>Rinse drink bottles and food containers before bagging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">•</span>
                  <span>Keep paper and cardboard completely dry to maintain fiber quality.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">•</span>
                  <span>Tape lithium battery terminals before e-waste collection.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <PickupList onOpenSchedule={() => setActiveTab('schedule')} />
        </div>
      )}
    </div>
  );
}
