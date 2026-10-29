'use client';

import React from 'react';
import { ImpactVisualizer } from '@/components/ImpactVisualizer';
import { Leaf } from 'lucide-react';

export default function SustainabilityImpactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 mb-2">
          <Leaf className="w-3.5 h-3.5 text-emerald-700" />
          <span>ESG & Sustainability Accounting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Environmental Metrics & Carbon Displacement
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Transparent, defensible carbon metrics computed according to standard lifecycle analysis (LCA) factors. Review materials diverted, renewable energy produced, and equivalent ecological displacement.
        </p>
      </div>

      {/* Impact Visualizer & Charts */}
      <ImpactVisualizer />
    </div>
  );
}
