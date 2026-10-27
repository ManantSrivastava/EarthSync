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
  Info,
  Calendar,
  HelpCircle,
  Clock,
  ChevronDown,
  ChevronUp
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
      {/* Disclaimer Notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#E2E9E3] text-xs text-[#65736B]">
        <Info className="w-4 h-4 text-[#063D2E] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#17231E]">Transparent Estimation Notice: </strong>
          The metrics displayed below are theoretical models for academic and preliminary feasibility exploration based on regional solar irradiance. 
          <span className="text-[#17231E]"> Figures are estimates and do not represent binding installation quotes, installer contracts, or guaranteed government subsidies.</span>
        </div>
      </div>

      {/* Main Two-Column Layout on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Input Form (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#E2E9E3] p-6 space-y-6">
          <div className="pb-4 border-b border-[#E2E9E3]">
            <h3 className="font-bold text-[#17231E] text-base flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#FFB800]" />
              <span>Solar Calculator Inputs</span>
            </h3>
            <p className="text-xs text-[#65736B] mt-0.5">
              Adjust your electricity parameters to calculate rooftop solar feasibility.
            </p>
          </div>

          {/* 1. Monthly Electricity Bill */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={billInputId} className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
                Monthly Electricity Bill (INR)
              </label>
              <span className="text-sm font-bold text-[#063D2E] bg-[#00B884]/10 px-2 py-0.5 rounded border border-[#00B884]/20">
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
              className="w-full accent-[#063D2E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#65736B] mt-1">
              <span>₹800/mo</span>
              <span>₹20,000/mo</span>
              <span>₹40,000/mo</span>
            </div>

            {/* Quick amount chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[2500, 4500, 8000, 15000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInput({ ...input, monthlyBill: amt })}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    input.monthlyBill === amt
                      ? 'bg-[#063D2E] text-white border-[#063D2E]'
                      : 'bg-[#F8FAF7] hover:bg-white text-[#17231E] border-[#E2E9E3]'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Electricity Tariff per kWh */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={tariffInputId} className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
                Electricity Tariff (INR per kWh)
              </label>
              <span className="text-sm font-bold text-[#17231E]">
                ₹{input.electricityTariff.toFixed(1)} / kWh
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
              className="w-full px-3.5 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-medium text-[#17231E] bg-white"
            />
            <p className="text-[11px] text-[#65736B] mt-1">
              Derived monthly consumption: <strong className="text-[#17231E]">{estimate.monthlyConsumptionKwh} kWh / month</strong>
            </p>
          </div>

          {/* 3. Available Rooftop Area (sq ft) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={areaInputId} className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
                Available Rooftop Area (sq ft)
              </label>
              <span className="text-sm font-bold text-[#063D2E] bg-[#F8FAF7] px-2 py-0.5 rounded border border-[#E2E9E3]">
                {input.availableRoofAreaSqFt.toLocaleString('en-IN')} sq ft
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
              className="w-full accent-[#063D2E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#65736B] mt-1">
              <span>100 sq ft</span>
              <span>2,500 sq ft</span>
              <span>5,000 sq ft</span>
            </div>
          </div>

          {/* 4. Location or City */}
          <div>
            <label htmlFor={stateSelectId} className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              Location / State
            </label>
            <select
              id={stateSelectId}
              value={input.locationState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-medium text-[#17231E] bg-white cursor-pointer"
            >
              {SOLAR_REGIONS.map((r) => (
                <option key={r.state} value={r.state}>
                  {r.state} (Avg. {r.peakSunHours} Peak Sun Hours / day)
                </option>
              ))}
            </select>
          </div>

          {/* Calculation Assumptions Toggle */}
          <div className="pt-2 border-t border-[#E2E9E3]">
            <button
              type="button"
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#F8FAF7] hover:bg-[#E2E9E3]/50 text-xs text-[#17231E] border border-[#E2E9E3] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <HelpCircle className="w-3.5 h-3.5 text-[#65736B]" />
                <span>Calculation Assumptions</span>
              </span>
              {showAssumptions ? (
                <ChevronUp className="w-4 h-4 text-[#65736B]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#65736B]" />
              )}
            </button>

            {showAssumptions && (
              <div className="mt-2 p-3 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] text-[11px] text-[#65736B] space-y-1.5">
                <p>
                  • <strong>Peak Sun Hours:</strong> {estimate.assumptions.peakSunHours} hrs/day based on regional solar irradiance index.
                </p>
                <p>
                  • <strong>System Performance Ratio:</strong> 78% (considers inverter efficiency, wiring losses, and temperature derating).
                </p>
                <p>
                  • <strong>Area Footprint:</strong> ~90 sq ft per 1 kW capacity.
                </p>
                <p>
                  • <strong>Turnkey Benchmark Cost:</strong> ~₹54,000 per kW benchmark.
                </p>
                <p>
                  • <strong>Long-term Model:</strong> 3.5% annual utility tariff inflation with 0.7% annual solar panel degradation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Results Panel (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Primary Recommended Solar Capacity Panel */}
          <div className="bg-[#063D2E] text-white rounded-lg p-6 border border-[#042E24]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-white/10 text-white border border-white/20">
                <Sun className="w-3.5 h-3.5 text-[#FFB800]" />
                Estimated Feasibility Results
              </span>
              <span className="text-xs text-white/80">
                Region: {input.locationState}
              </span>
            </div>

            {/* Capacity Highlight */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {estimate.suggestedCapacityKw}
              </span>
              <span className="text-xl font-bold text-[#FFB800]">kW</span>
              <span className="text-xs text-white/80">
                Suitable Solar Capacity
              </span>
            </div>

            {/* Rooftop Space Check */}
            <div className="mt-5 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-white/90">
                <Maximize2 className="w-4 h-4 text-[#00B884] shrink-0" />
                <span>
                  Roof area required: <strong className="text-white">{estimate.rooftopAreaRequiredSqFt} sq ft</strong> (Available: {input.availableRoofAreaSqFt} sq ft)
                </span>
              </div>
              {estimate.areaSufficient ? (
                <span className="text-[11px] font-semibold text-[#00B884] bg-white/10 px-2 py-0.5 rounded border border-[#00B884]/40 shrink-0">
                  ✓ Roof Space Sufficient
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-[#FFB800] bg-white/10 px-2 py-0.5 rounded border border-[#FFB800]/40 shrink-0">
                  ⚠ Space Constrained (Capacity Adjusted)
                </span>
              )}
            </div>
          </div>

          {/* Core Results Grid: 4 Prominent Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Monthly Generation in kWh */}
            <div className="bg-white rounded-lg border border-[#E2E9E3] p-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#65736B] mb-1">
                <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Estimated Monthly Generation</span>
              </div>
              <div className="text-2xl font-bold text-[#17231E] tracking-tight mt-1">
                {estimate.monthlyGenerationKwh.toLocaleString('en-IN')}{' '}
                <span className="text-sm font-normal text-[#65736B]">kWh</span>
              </div>
              <span className="text-[11px] text-[#65736B] mt-1 block">
                Displaces ~{Math.round((estimate.monthlyGenerationKwh / (estimate.monthlyConsumptionKwh || 1)) * 100)}% of monthly usage
              </span>
            </div>

            {/* 2. Monthly Savings in INR */}
            <div className="bg-white rounded-lg border border-[#E2E9E3] p-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#65736B] mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#00B884]" />
                <span>Estimated Monthly Savings</span>
              </div>
              <div className="text-2xl font-bold text-[#063D2E] tracking-tight mt-1">
                ₹{estimate.monthlySavingsInr.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-[#65736B] mt-1 block">
                Direct reduction in utility bill
              </span>
            </div>

            {/* 3. Annual Savings in INR */}
            <div className="bg-white rounded-lg border border-[#E2E9E3] p-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#65736B] mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#00B884]" />
                <span>Estimated Annual Savings</span>
              </div>
              <div className="text-2xl font-bold text-[#063D2E] tracking-tight mt-1">
                ₹{estimate.annualSavingsInr.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-[#65736B] mt-1 block">
                Year 1 annualized savings
              </span>
            </div>

            {/* 4. Approximate Payback Period in Years */}
            <div className="bg-white rounded-lg border border-[#E2E9E3] p-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#65736B] mb-1">
                <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Approximate Payback Period</span>
              </div>
              <div className="text-2xl font-bold text-[#17231E] tracking-tight mt-1">
                {estimate.paybackPeriodYears}{' '}
                <span className="text-sm font-normal text-[#65736B]">Years</span>
              </div>
              <span className="text-[11px] text-[#65736B] mt-1 block">
                Estimated break-even against benchmark capex
              </span>
            </div>

          </div>

          {/* Benchmark Capital Outlay & Environmental Summary */}
          <div className="bg-white rounded-lg border border-[#E2E9E3] p-5 space-y-3">
            <h4 className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
              Installation Benchmark & Lifetime Outlook
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
                <span className="text-[#65736B] block">Benchmark Outlay:</span>
                <span className="font-bold text-[#17231E] text-sm">
                  ₹{estimate.approximateCostInr.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#65736B] block">Turnkey estimate</span>
              </div>

              <div className="p-3 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
                <span className="text-[#65736B] block">25-Yr Modeled Gain:</span>
                <span className="font-bold text-[#063D2E] text-sm">
                  ₹{(estimate.lifetimeSavings25YrInr / 100000).toFixed(1)} Lakhs
                </span>
                <span className="text-[10px] text-[#65736B] block">Cumulative net gain</span>
              </div>

              <div className="p-3 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
                <span className="text-[#65736B] block">Annual CO₂ Offset:</span>
                <span className="font-bold text-[#17231E] text-sm">
                  ~{estimate.annualCo2OffsetKg.toLocaleString('en-IN')} kg
                </span>
                <span className="text-[10px] text-[#65736B] block">Grid emissions displaced</span>
              </div>
            </div>
          </div>

          {/* Action Button to Log Demo Enquiry if supported */}
          {onOpenEnquiry && (
            <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#E2E9E3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h5 className="font-bold text-xs text-[#17231E]">Want to save this solar configuration?</h5>
                <p className="text-[11px] text-[#65736B]">
                  Record your modeled specifications into your local demo enquiry log.
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
                className="px-4 py-2 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
              >
                Log Demo Enquiry
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
