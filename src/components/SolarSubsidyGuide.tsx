'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const SolarSubsidyGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Government Policy Guidance: PM Surya Ghar Yojana</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Residential Rooftop Solar Subsidy Guidelines (2026)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Factual reference regarding Central Financial Assistance (CFA) under the Ministry of New and Renewable Energy (MNRE).
          </p>
        </div>
      </div>

      {/* Subsidy Benchmark Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-bold border-y border-slate-200">
              <th className="py-2.5 px-3">System Capacity (kWp)</th>
              <th className="py-2.5 px-3">Central Financial Assistance (CFA)</th>
              <th className="py-2.5 px-3">Applicable Consumer Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-2.5 px-3 font-semibold text-slate-900">1 kWp System</td>
              <td className="py-2.5 px-3 text-emerald-700 font-bold">₹33,000 fixed subsidy</td>
              <td className="py-2.5 px-3">Residential individual households</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-semibold text-slate-900">2 kWp System</td>
              <td className="py-2.5 px-3 text-emerald-700 font-bold">₹66,000 fixed subsidy</td>
              <td className="py-2.5 px-3">Residential individual households</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-semibold text-slate-900">3 kWp System & Above</td>
              <td className="py-2.5 px-3 text-emerald-700 font-bold">₹78,000 (Maximum Cap)</td>
              <td className="py-2.5 px-3">Residential individual households</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-semibold text-slate-900">Group Housing / RWAs</td>
              <td className="py-2.5 px-3 text-emerald-700 font-bold">₹18,000 per kW (up to 500 kW)</td>
              <td className="py-2.5 px-3">Common facilities (lighting, EV charging)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4 Steps to Claim Subsidy */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Standard 4-Step Verification and Disbursement Process
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-emerald-700 block mb-1">01. Portal Registration</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Register on the National Solar Portal with your state DISCOM electricity consumer account number.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-emerald-700 block mb-1">02. DISCOM Feasibility</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Distribution company conducts technical grid feasibility check and issues load sanction approval.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-emerald-700 block mb-1">03. Empanelled Vendor</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Execute installation exclusively through MNRE-empanelled vendors using ALMM-compliant solar modules.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-emerald-700 block mb-1">04. Direct Benefit Transfer</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Net-meter commissioning inspection completed; subsidy credited directly to consumer bank account.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed text-[11px]">
          <span className="font-bold">Official Disclaimer: </span>
          EarthSync is an independent academic informational platform and does not grant, process, or guarantee government subsidies. Subsidy disbursement is subject to state DISCOM net-metering sanctions and official guidelines published on <strong>pmsuryaghar.gov.in</strong>. Commercial and industrial establishments are currently not eligible for central residential CFA subsidies.
        </div>
      </div>
    </div>
  );
};
