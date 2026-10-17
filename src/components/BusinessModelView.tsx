'use client';

import React from 'react';
import { 
  DollarSign, 
  Target, 
  Layers, 
  Award, 
  CheckCircle2, 
  Scale
} from 'lucide-react';

export const BusinessModelView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Essentials of Business Management: Academic Strategic Plan</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              EarthSync Business Model and Commercial Architecture
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Dual-pillar CleanTech business model bridging waste circularity with rooftop distributed solar energy. Proposed model designed for student evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Municipal Complementarity Clarification Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>Strategic Role: Complementing Municipal Sanitation Services</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          EarthSync does not replace municipal door-to-door solid waste sanitation. Instead, it operates as a specialized dry recyclable recovery partner. By handling high-value sorted dry waste (cartons, PET plastic, metals, and hazardous e-waste), EarthSync diverts recyclables from city landfills directly to authorized reprocessing mills, reducing municipal processing load.
        </p>
      </div>

      {/* Business Model Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Value Proposition */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <div className="p-1.5 rounded-md bg-emerald-50">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <h4>Value Propositions</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Households & Campuses:</strong> Transparent scheduling for segregated recyclables and tangible GreenPoints incentives.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Solar Adopters:</strong> Unbiased computational sizing removing contractor information asymmetry before capital commitment.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Recyclers & Solar EPCs:</strong> Aggregated, pre-sorted dry material and qualified, intent-verified rooftop solar leads.
              </span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Proposed Revenue Streams */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <div className="p-1.5 rounded-md bg-emerald-50">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <h4>Proposed Revenue Streams</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Recycler Aggregation Spread:</strong> Projected 12% to 18% margin on bulk collected recyclable lots delivered to authorized mills.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>SolarSaathi EPC Referral Fee:</strong> 3% to 5% lead commission on executed turnkey installations (estimated ₹12,000 to ₹18,000 per 5 kWp system).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Enterprise ESG Reporting:</strong> Proposed subscription software for campus and facility compliance reporting under state pollution board norms.
              </span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Target Customer Segments */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <div className="p-1.5 rounded-md bg-emerald-50">
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <h4>Target Customer Segments</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-slate-800">• Academic Campuses:</span> Large volumes of exam booklets, cardboard cartons, lab e-waste, and unshaded rooftops.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-slate-800">• Resident Welfare Associations (RWAs):</span> Bulk household segregation drives and shared community solar feasibility.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-slate-800">• MSME Workshops & Warehouses:</span> Packaging scrap disposal and high daytime commercial power tariffs.
            </li>
          </ul>
        </div>
      </div>

      {/* Academic Financial Modeling Note */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-white">Academic Project Disclosure</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Revenue numbers and unit economics reflect projected models developed for the Essentials of Business Management curriculum. In accordance with project integrity standards, EarthSync does not present unvalidated metrics as realized commercial transactions.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center shrink-0">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Model Status</span>
          <span className="text-sm font-bold text-amber-400">Pre-Seed Business Plan</span>
        </div>
      </div>
    </div>
  );
};
