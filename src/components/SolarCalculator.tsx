'use client';

import React, { useState, useId } from 'react';
import { calculateSolarFeasibility } from '@/utils/solarCalculations';
import { SOLAR_REGIONS } from '@/data/constants';
import { SolarCalculationInput } from '@/types';
import { 
  Sun, 
  Zap, 
  IndianRupee, 
  Maximize2, 
  TrendingUp, 
  TreePine, 
  ShieldAlert, 
  ChevronRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface Props {
  onOpenEnquiry?: (capacityKw: number, estimatedCost: number, monthlySavings: number) => void;
}

export const SolarCalculator: React.FC<Props> = ({ onOpenEnquiry }) => {
  const billInputId = useId();
  const tariffInputId = useId();
  const areaInputId = useId();
  const stateSelectId = useId();

  const [input, setInput] = useState<SolarCalculationInput>({
    monthlyBill: 4500,
    electricityTariff: 8.0,
    availableRoofAreaSqFt: 450,
    locationState: 'Maharashtra',
  });

  const [showAssumptions, setShowAssumptions] = useState(false);

  // Compute live estimate
  const estimate = calculateSolarFeasibility(input);

  const handleStateChange = (stateName: string) => {
    const region = SOLAR_REGIONS.find((r) => r.state === stateName);
    setInput((prev) => ({
      ...prev,
      locationState: stateName,
      electricityTariff: region ? region.averageTariff : prev.electricityTariff,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Estimates & Modeling Notice: </span>
          The figures generated below are computational estimations for preliminary feasibility planning based on regional solar irradiance. 
          <span className="font-semibold"> We do not claim live government subsidy eligibility or guaranteed installer availability.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls (Left: 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                Solar Feasibility Inputs
              </h3>
              <p className="text-xs text-slate-500">Tune parameters for your home, campus, or facility.</p>
            </div>
          </div>

          {/* Monthly Bill */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={billInputId} className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Average Monthly Electricity Bill (₹)
              </label>
              <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                ₹{input.monthlyBill.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              id={billInputId}
              type="range"
              min="800"
              max="40000"
              step="200"
              value={input.monthlyBill}
              onChange={(e) => setInput({ ...input, monthlyBill: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹800/mo (Small apt)</span>
              <span>₹15,000/mo (Campus lab)</span>
              <span>₹40,000/mo (Hostel/Office)</span>
            </div>
          </div>

          {/* Electricity Tariff */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={tariffInputId} className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Electricity Tariff (₹ per kWh / unit)
              </label>
              <span className="text-sm font-bold text-slate-800">
                ₹{input.electricityTariff.toFixed(1)} / unit
              </span>
            </div>
            <input
              id={tariffInputId}
              type="number"
              step="0.1"
              min="3"
              max="20"
              value={input.electricityTariff}
              onChange={(e) => setInput({ ...input, electricityTariff: parseFloat(e.target.value) || 7 })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold text-slate-800"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Derived average consumption: <span className="font-bold text-slate-700">{estimate.monthlyConsumptionKwh} units/month</span>
            </p>
          </div>

          {/* Rooftop Area */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={areaInputId} className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Shadow-Free Rooftop Area (sq ft)
              </label>
              <span className="text-sm font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-100">
                {input.availableRoofAreaSqFt} sq ft
              </span>
            </div>
            <input
              id={areaInputId}
              type="range"
              min="100"
              max="5000"
              step="50"
              value={input.availableRoofAreaSqFt}
              onChange={(e) => setInput({ ...input, availableRoofAreaSqFt: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>100 sq ft</span>
              <span>1,500 sq ft</span>
              <span>5,000 sq ft</span>
            </div>
          </div>

          {/* Location State */}
          <div>
            <label htmlFor={stateSelectId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Property Location / State
            </label>
            <select
              id={stateSelectId}
              value={input.locationState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-medium text-slate-800 bg-white"
            >
              {SOLAR_REGIONS.map((r) => (
                <option key={r.state} value={r.state}>
                  {r.state} (Avg. {r.peakSunHours} Peak Sun Hours / day)
                </option>
              ))}
            </select>
          </div>

          {/* Assumptions Toggle Button */}
          <button
            type="button"
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              View Mathematical Assumptions & Model
            </span>
            <span className="text-[10px] text-slate-400">{showAssumptions ? 'Hide' : 'Expand'}</span>
          </button>

          {showAssumptions && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-2 animate-in fade-in">
              <p>
                • <span className="font-semibold text-slate-800">Peak Sun Hours:</span> {estimate.assumptions.peakSunHours} hrs/day based on IMD solar radiation atlas.
              </p>
              <p>
                • <span className="font-semibold text-slate-800">System Performance Ratio:</span> 78% (accounts for inverter clipping, cabling resistance, thermal derating & dust accumulation).
              </p>
              <p>
                • <span className="font-semibold text-slate-800">Rooftop Area Footprint:</span> 90 sq.ft required per 1 kWp panel capacity.
              </p>
              <p>
                • <span className="font-semibold text-slate-800">Benchmarked Capex:</span> ₹54,000 / kWp turnkey installation.
              </p>
              <p>
                • <span className="font-semibold text-slate-800">Tariff Escalation:</span> 3.5% compound annual tariff growth with 0.7% panel degradation over 25 years.
              </p>
            </div>
          )}
        </div>

        {/* Results Panel (Right: 7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Solar Sizing Card */}
          <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-800/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sun className="w-56 h-56 text-amber-300" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  Optimal Solar Capacity
                </span>
                <span className="text-xs text-emerald-300">
                  Region: {input.locationState}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {estimate.suggestedCapacityKw}
                </span>
                <span className="text-xl font-bold text-amber-400">kWp</span>
                <span className="text-xs text-emerald-300 ml-2">
                  (~{estimate.monthlyConsumptionKwh} units/month offset)
                </span>
              </div>

              {/* Rooftop Space Check */}
              <div className="mt-4 pt-4 border-t border-emerald-800/60 flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-200">
                  Rooftop area required: <strong className="text-white">{estimate.rooftopAreaRequiredSqFt} sq ft</strong>.
                  Available: <strong className="text-white">{input.availableRoofAreaSqFt} sq ft</strong>.
                </span>
                {estimate.areaSufficient ? (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700 ml-auto shrink-0">
                    ✓ Space Sufficient
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600 ml-auto shrink-0">
                    ⚠ Space Constrained
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Capex */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                <span>Approx. Cost</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 tracking-tight">
                ₹{estimate.approximateCostInr.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400">Turnkey benchmark</span>
            </div>

            {/* Monthly Savings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Monthly Savings</span>
              </div>
              <div className="text-lg font-extrabold text-emerald-700 tracking-tight">
                ₹{estimate.monthlySavingsInr.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-600">~₹{estimate.annualSavingsInr.toLocaleString('en-IN')}/yr</span>
            </div>

            {/* Payback Period */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Payback Period</span>
              </div>
              <div className="text-lg font-extrabold text-amber-700 tracking-tight">
                {estimate.paybackPeriodYears} Yrs
              </div>
              <span className="text-[10px] text-slate-400">ROI break-even</span>
            </div>

            {/* Lifetime 25-yr */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>25-Yr Net Gain</span>
              </div>
              <div className="text-lg font-extrabold text-indigo-700 tracking-tight">
                ₹{(estimate.lifetimeSavings25YrInr / 100000).toFixed(1)}L
              </div>
              <span className="text-[10px] text-slate-400">Cumulative net</span>
            </div>
          </div>

          {/* Environmental Equivalents */}
          <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Clean Energy Environmental Impact</h4>
                <p className="text-xs text-slate-600">
                  Offsets <strong className="text-emerald-800">~{estimate.annualCo2OffsetKg.toLocaleString('en-IN')} kg of CO₂e</strong>/year.
                </p>
              </div>
            </div>

            <div className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300/40 shrink-0">
              Equivalent to planting ~{estimate.equivalentTreesPlanted} trees/yr
            </div>
          </div>

          {/* Call to Action for Consultation / Enquiry */}
          {onOpenEnquiry && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Ready to explore rooftop solar?</h4>
                <p className="text-xs text-slate-500">
                  Submit a provider enquiry to log your technical specifications with local installers.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry(
                    estimate.suggestedCapacityKw,
                    estimate.approximateCostInr,
                    estimate.monthlySavingsInr
                  )
                }
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Provider Enquiry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
