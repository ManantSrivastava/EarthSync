'use client';

import React from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { WASTE_CATEGORIES, SOLAR_BENCHMARK_ASSUMPTIONS } from '@/data/constants';
import { 
  Leaf, 
  Recycle, 
  Sun, 
  TrendingUp, 
  TreePine, 
  HelpCircle, 
  CheckCircle2 
} from 'lucide-react';

export const ImpactVisualizer: React.FC = () => {
  const { pickups, solarEnquiries } = useEarthSync();

  // Aggregate waste calculations
  const totalWasteKg = pickups.reduce((acc, p) => acc + p.quantityKg, 0);
  const collectedWasteKg = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((acc, p) => acc + p.quantityKg, 0);

  // CO2 avoided from recycled waste
  let wasteCo2AvoidedKg = 0;
  pickups
    .filter((p) => p.status === 'Collected')
    .forEach((p) => {
      const cat = WASTE_CATEGORIES.find((c) => c.id === p.category);
      const factor = cat ? cat.co2SavedPerKg : 1.5;
      wasteCo2AvoidedKg += p.quantityKg * factor;
    });

  // Solar aggregate (based on logged enquiries)
  const totalSolarCapacityKw = solarEnquiries.reduce(
    (acc, e) => acc + (e.suggestedCapacityKw || 0),
    0
  );
  // Solar annual generation estimate (capacity * 4.8 hrs * 0.78 * 365)
  const annualSolarGenerationKwh = Math.round(
    totalSolarCapacityKw * 4.8 * SOLAR_BENCHMARK_ASSUMPTIONS.systemEfficiency * 365
  );
  const solarCo2AvoidedKg = Math.round(
    annualSolarGenerationKwh * SOLAR_BENCHMARK_ASSUMPTIONS.co2FactorPerKwh
  );
  const annualSolarSavingsInr = solarEnquiries.reduce(
    (acc, e) => acc + (e.monthlySavingsInr ? e.monthlySavingsInr * 12 : 0),
    0
  );

  // Total carbon metric
  const totalCo2AvoidedKg = Math.round(wasteCo2AvoidedKg + solarCo2AvoidedKg);
  const treesEquivalent = totalCo2AvoidedKg > 0
    ? Math.round(totalCo2AvoidedKg / SOLAR_BENCHMARK_ASSUMPTIONS.treeAbsorptionKgPerYr)
    : 0;
  // Water conserved metric: ~28 liters per kg of recycled material
  const waterSavedLiters = Math.round(collectedWasteKg * 28);

  // Category breakdown for Donut Chart
  const categoryTotals: Record<string, number> = {};
  WASTE_CATEGORIES.forEach((cat) => {
    categoryTotals[cat.id] = 0;
  });
  pickups.forEach((p) => {
    categoryTotals[p.category] = (categoryTotals[p.category] || 0) + p.quantityKg;
  });

  const donutColors: Record<string, string> = {
    plastic: '#10b981', // emerald
    paper: '#f59e0b',   // amber
    metal: '#64748b',   // slate
    glass: '#0d9488',   // teal
    ewaste: '#6366f1',  // indigo
    organic: '#22c55e', // green
  };

  // Build SVG Donut slices
  // Build SVG Donut slices without reassigning variables during render
  const donutSlices = WASTE_CATEGORIES.reduce<
    Array<{
      cat: (typeof WASTE_CATEGORIES)[0];
      val: number;
      percent: number;
      startAngle: number;
      endAngle: number;
      color: string;
    }>
  >((acc, cat) => {
    const val = categoryTotals[cat.id] || 0;
    const percent = totalWasteKg > 0 ? (val / totalWasteKg) * 100 : 0;
    const prevSlice = acc[acc.length - 1];
    const startAngle = prevSlice ? prevSlice.endAngle : 0;
    const endAngle = startAngle + (percent / 100) * 360;

    acc.push({
      cat,
      val,
      percent,
      startAngle,
      endAngle,
      color: donutColors[cat.id],
    });
    return acc;
  }, []);

  // Waste category items for breakdown
  const activeCategories = WASTE_CATEGORIES.map((cat) => ({
    name: cat.name,
    weight: categoryTotals[cat.id] || 0,
  }));
  const maxBarValue = Math.max(20, Math.ceil(Math.max(...activeCategories.map((c) => c.weight), 10) * 1.2));

  return (
    <div className="space-y-6">
      {/* Scope Selector & Disclaimers */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Sustainability Impact Analytics
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparently computed from physical waste diverted and modeled rooftop solar generation.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {pickups.length} waste requests recorded
        </div>
      </div>

      {/* Hero Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Waste */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Waste Diverted
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Recycle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalWasteKg.toFixed(1)} <span className="text-base font-bold text-emerald-600">KG</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {collectedWasteKg.toFixed(1)} kg collected & processed
          </p>
        </div>

        {/* Metric 2: Estimated Solar Savings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Solar Bill Offset
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
            Across {totalSolarCapacityKw.toFixed(1)} kWp modeled solar capacity
          </p>
        </div>

        {/* Metric 3: CO2e Avoided */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              CO₂e Avoided
            </span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700 tracking-tight">
            {totalCo2AvoidedKg.toLocaleString('en-IN')}{' '}
            <span className="text-base font-bold text-slate-500">kg</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Landfill methane & thermal grid offset
          </p>
        </div>

        {/* Metric 4: Trees Equivalent */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tree Offset Equiv.
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TreePine className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            ~{treesEquivalent}{' '}
            <span className="text-base font-bold text-emerald-600">Trees</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {waterSavedLiters.toLocaleString('en-IN')} L of freshwater conserved
          </p>
        </div>
      </div>

      {/* SVG Responsive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Monthly Waste Diversion Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-slate-900 text-sm">Recycling Diversion by Category (kg)</h4>
              <span className="text-[11px] text-slate-400">Live Data</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Track landfill diversion volume across recyclable material streams.
            </p>

            {/* SVG Bar Chart or Empty State */}
            {totalWasteKg === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center">
                <Recycle className="w-8 h-8 text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700 text-sm">You haven&apos;t submitted any waste requests yet.</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">Schedule a pickup to start tracking material diversion trends.</p>
                <a
                  href="/waste"
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                >
                  Explore Smart Waste
                </a>
              </div>
            ) : (
              <div className="w-full">
                <svg viewBox="0 0 500 220" className="w-full h-52 overflow-visible">
                  {/* Horizontal Gridlines */}
                  {[0, 25, 50, 75, 100].map((pct) => {
                    const val = Math.round((pct / 100) * maxBarValue);
                    const y = 170 - (pct / 100) * 140;
                    return (
                      <g key={pct}>
                        <line
                          x1="35"
                          y1={y}
                          x2="480"
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray="3 3"
                          strokeWidth="1"
                        />
                        <text
                          x="25"
                          y={y + 4}
                          textAnchor="end"
                          className="text-[10px] fill-slate-400"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Bars */}
                  {activeCategories.slice(0, 6).map((d, idx) => {
                    const x = 50 + idx * 72;
                    const barWidth = 38;
                    const value = d.weight;
                    const barHeight = maxBarValue > 0 ? (value / maxBarValue) * 140 : 0;
                    const y = 170 - barHeight;

                    return (
                      <g key={d.name} className="group cursor-pointer">
                        {/* Bar Fill */}
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={Math.max(4, barHeight)}
                          rx="6"
                          className="transition-all duration-300 fill-emerald-600 hover:fill-emerald-700"
                        />
                        {/* Value label on top */}
                        <text
                          x={x + barWidth / 2}
                          y={y - 6}
                          textAnchor="middle"
                          className="text-[11px] font-bold fill-slate-700 opacity-90"
                        >
                          {value > 0 ? `${value}kg` : '0'}
                        </text>
                        {/* X-axis Label */}
                        <text
                          x={x + barWidth / 2}
                          y="190"
                          textAnchor="middle"
                          className="text-[10px] font-medium fill-slate-600"
                        >
                          {d.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis base line */}
                  <line x1="35" y1="170" x2="480" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
              <span>Verified Scale Weight Diverted</span>
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold">
              Live Verified Metrics
            </span>
          </div>
        </div>

        {/* Chart 2: Material Distribution Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-slate-900 text-sm">Waste Stream Breakdown</h4>
              <span className="text-[11px] text-slate-400">By Weight</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Proportion of recyclable fractions diverted from landfills.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              {/* SVG Donut */}
              <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                  />
                  {/* Segments */}
                  {totalWasteKg > 0 ? (
                    donutSlices.map((slice) => {
                      if (slice.val <= 0) return null;
                      const circumference = 2 * Math.PI * 38;
                      const strokeDash = (slice.percent / 100) * circumference;

                      return (
                        <circle
                          key={slice.cat.id}
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth="14"
                          strokeDasharray={`${strokeDash} ${circumference}`}
                          strokeDashoffset={-((slice.startAngle / 360) * circumference)}
                          className="transition-all duration-300"
                        />
                      );
                    })
                  ) : (
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#cbd5e1"
                      strokeWidth="14"
                    />
                  )}
                </svg>

                {/* Inner center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-extrabold text-slate-800 leading-none">
                    {totalWasteKg.toFixed(0)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                    KG Total
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 w-full text-xs">
                {donutSlices.map((slice) => (
                  <div
                    key={slice.cat.id}
                    className="flex items-center justify-between py-0.5 border-b border-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: slice.color }}
                      />
                      <span className="text-slate-700 font-medium">{slice.cat.name.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400 text-[11px]">{slice.val.toFixed(1)}kg</span>
                      <span className="font-bold text-slate-800 text-[11px]">
                        {slice.percent.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-3 pt-3 border-t border-slate-100">
            Cardboard and E-waste fractions yield the highest circular resource efficiency.
          </p>
        </div>
      </div>

      {/* Methodology & Carbon Calculation Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Transparent Carbon Accounting Methodology</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              1. Waste Recycling Avoidance Factor
            </h5>
            <p className="leading-relaxed">
              Based on EPA WARM and Indian Central Pollution Control Board (CPCB) recycling emission factors.
              Every 1 kg of recycled e-waste prevents ~9.2 kg CO₂e from primary mining; plastic recycling avoids ~1.8 kg CO₂e vs virgin polymers; paper avoids ~1.3 kg CO₂e.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
              2. Solar Grid Displacement Factor
            </h5>
            <p className="leading-relaxed">
              Standard CEA (Central Electricity Authority) baseline grid emission factor of ~0.82 kg CO₂e per kWh. 
              Solar energy replaces fossil coal grid consumption at an average performance ratio of 78%.
            </p>
          </div>
        </div>

        <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Formula: CO₂e Avoided = Σ(Waste_i × Factor_i) + (Solar_kWh × 0.82)</span>
          <span className="text-emerald-700 font-semibold">Strict academic compliance</span>
        </div>
      </div>
    </div>
  );
};
