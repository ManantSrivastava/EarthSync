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
        return <Package className="w-4 h-4 text-emerald-600" />;
      case 'paper':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'metal':
        return <Shield className="w-4 h-4 text-slate-600" />;
      case 'glass':
        return <Wine className="w-4 h-4 text-teal-600" />;
      case 'ewaste':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'organic':
        return <Leaf className="w-4 h-4 text-green-600" />;
      default:
        return <Recycle className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Notice Banner */}
      <DemoDataNotice hasUserEntries={pickups.some((p) => !p.isSample)} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
            <Recycle className="w-3.5 h-3.5" />
            <span>Smart Waste Management and Logistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            On-Demand Segregated Waste Collection
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Book scheduled pickups for clean, sorted recyclables. Divert dry recyclables directly to authorized reprocessing mills and earn verifiable GreenPoints upon certified weighing.
          </p>
        </div>

        {/* Quick Points Pill */}
        <div className="bg-gradient-to-br from-forest-950 to-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 text-center shrink-0">
          <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-semibold">
            GreenPoints Balance
          </span>
          <div className="text-2xl font-black text-amber-300 mt-0.5">
            {userProfile.greenPointsBalance.toLocaleString()} <span className="text-xs font-normal text-white">PTS</span>
          </div>
          <Link
            href="/profile"
            className="text-[11px] text-emerald-300 hover:text-amber-300 font-medium inline-flex items-center gap-1 mt-1"
          >
            <span>Redeem Store</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Accepted Waste Categories Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Accepted Waste Streams & Reward Rates
          </h3>
          <span className="text-[11px] text-slate-400">Awarded strictly on collection</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {WASTE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-white shadow-xs">
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="font-bold text-xs text-slate-800 truncate">{cat.name.split(' ')[0]}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-emerald-700">
                  +{cat.pointsPerKg} pts/kg
                </span>
                <span className="text-[10px] text-slate-400">~{cat.co2SavedPerKg}kg CO₂</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs: Schedule vs History */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'schedule'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Schedule Collection</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Pickup History & Lifecycle</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
              activeTab === 'history' ? 'bg-emerald-950 text-white' : 'bg-slate-200 text-slate-700'
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
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Book Doorstep Pickup</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill in the details below. Our certified logistics vehicle will arrive during your selected window.
              </p>
            </div>

            <WastePickupForm onSuccess={() => setActiveTab('history')} />
          </div>

          {/* Right Info Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Circular Incentive Card */}
            <div className="bg-gradient-to-br from-forest-950 to-emerald-950 text-white rounded-3xl p-5 shadow-lg border border-emerald-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>GreenPoints Reward Rule</span>
              </div>
              <h4 className="text-base font-bold text-white">Verified Weighing Protocol</h4>
              <p className="text-xs text-emerald-200/90 mt-2 leading-relaxed">
                To guarantee circular economy integrity, GreenPoints are <strong>credited only when a collection is marked as Collected</strong> by the partner driver with calibrated digital scales.
              </p>

              <div className="mt-4 pt-3 border-t border-emerald-800/80 space-y-2 text-xs text-emerald-200">
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
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Segregation Best Practices</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Rinse drink bottles and food containers before bagging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Keep paper and cardboard completely dry to maintain fiber quality.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
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
