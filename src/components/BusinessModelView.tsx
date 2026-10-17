'use client';

import React from 'react';
import { 
  DollarSign, 
  Target, 
  Layers, 
  Award, 
  CheckCircle2 
} from 'lucide-react';

export const BusinessModelView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Essentials of Business Management • Strategic Plan</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              EarthSync Business Model & Commercial Architecture
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Dual-engine CleanTech business model bridging waste circularity with rooftop distributed energy.
            </p>
          </div>
        </div>
      </div>

      {/* Business Model Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Value Proposition */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <div className="p-1.5 rounded-lg bg-emerald-50">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <h4>Value Propositions</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>For Campuses & Citizens:</strong> Frictionless waste scheduling with tangible economic return via GreenPoints rewards.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>For Solar Adopters:</strong> Unbiased data estimation removing contractor information asymmetry before investing.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>For Recyclers & EPCs:</strong> Aggregated, pre-sorted raw material and high-intent, qualified solar installation leads.
              </span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Revenue Streams */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <div className="p-1.5 rounded-lg bg-emerald-50">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <h4>Monetization Streams</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Recycler Aggregation Spread:</strong> 12–18% margin on bulk collected recyclable lots delivered to authorized smelters & paper mills.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>SolarSaathi EPC Referral Fee:</strong> 3–5% commission on closed turnkey installations (Avg. ₹12,000–₹18,000 per 5 kWp project).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Enterprise ESG SaaS:</strong> Monthly subscription for institutional sustainability reports & CPCB regulatory audits.
              </span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Customer Segments */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <div className="p-1.5 rounded-lg bg-emerald-50">
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <h4>Customer Segments</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-slate-800">• Academic Institutions:</span> High paper and e-waste volume, large unshaded rooftops.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-slate-800">• Residential Societies (RWAs):</span> Bulk household segregation and shared rooftop solar potential.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-slate-800">• Commercial Warehouses:</span> High daytime power tariffs and massive metal/packaging scrap.
            </li>
          </ul>
        </div>
      </div>

      {/* Unit Economics Highlight Card */}
      <div className="bg-gradient-to-br from-forest-950 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-emerald-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-base text-white">Unit Economics & Scalability Blueprint</h4>
            <p className="text-xs text-emerald-300 mt-1 max-w-xl">
              By packaging micro-logistics for waste collection alongside high-ticket solar installation leads, EarthSync maintains low customer acquisition costs (CAC) through viral university rewards while monetizing high-margin renewable infrastructure.
            </p>
          </div>
          <div className="flex items-center gap-3 self-stretch sm:self-auto shrink-0">
            <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-700/80 text-center">
              <span className="text-[10px] text-emerald-300 block uppercase">Projected Gross Margin</span>
              <span className="text-xl font-black text-amber-300">38.4%</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-700/80 text-center">
              <span className="text-[10px] text-emerald-300 block uppercase">Payback on CAC</span>
              <span className="text-xl font-black text-white">2.4 Mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
