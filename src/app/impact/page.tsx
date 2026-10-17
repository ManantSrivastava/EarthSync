'use client';

import React from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { ImpactVisualizer } from '@/components/ImpactVisualizer';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { Leaf } from 'lucide-react';

export default function SustainabilityImpactPage() {
  const { pickups, solarEnquiries } = useEarthSync();

  const hasUserEntries =
    pickups.some((p) => !p.isSample) || solarEnquiries.some((e) => !e.isSample);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Demo Notice */}
      <DemoDataNotice hasUserEntries={hasUserEntries} />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>ESG & Sustainability Accounting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Environmental Metrics & Carbon Displacement
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Transparent, defensible carbon metrics computed according to standard lifecycle analysis (LCA) factors. Dive into materials diverted, renewable energy produced, and equivalent ecological impacts.
        </p>
      </div>

      {/* Impact Visualizer & Charts */}
      <ImpactVisualizer />
    </div>
  );
}
