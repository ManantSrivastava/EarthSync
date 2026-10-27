'use client';

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const SolarSubsidyGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-[#E2E9E3] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E9E3]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#00B884]/10 text-[#063D2E] border border-[#00B884]/30 mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00B884]" />
            <span>Policy Reference: PM Surya Ghar Yojana</span>
          </div>
          <h3 className="text-base font-bold text-[#17231E]">
            Residential Rooftop Solar Subsidy Benchmarks
          </h3>
          <p className="text-xs text-[#65736B] mt-0.5">
            Informational overview of Central Financial Assistance (CFA) guidelines under the Ministry of New and Renewable Energy (MNRE).
          </p>
        </div>
      </div>

      {/* Subsidy Benchmark Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAF7] text-[#17231E] font-bold border-y border-[#E2E9E3]">
              <th className="py-2.5 px-3">System Capacity (kWp)</th>
              <th className="py-2.5 px-3">Central Financial Assistance (CFA)</th>
              <th className="py-2.5 px-3">Applicable Consumer Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E9E3] text-[#65736B]">
            <tr>
              <td className="py-2.5 px-3 font-semibold text-[#17231E]">1 kWp System</td>
              <td className="py-2.5 px-3 text-[#063D2E] font-bold">₹33,000 fixed benchmark</td>
              <td className="py-2.5 px-3">Residential individual households</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-semibold text-[#17231E]">2 kWp System</td>
              <td className="py-2.5 px-3 text-[#063D2E] font-bold">₹66,000 fixed benchmark</td>
              <td className="py-2.5 px-3">Residential individual households</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-semibold text-[#17231E]">3 kWp System &amp; Above</td>
              <td className="py-2.5 px-3 text-[#063D2E] font-bold">₹78,000 (Maximum Cap)</td>
              <td className="py-2.5 px-3">Residential individual households</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-semibold text-[#17231E]">Group Housing / RWAs</td>
              <td className="py-2.5 px-3 text-[#063D2E] font-bold">₹18,000 per kW (up to 500 kW)</td>
              <td className="py-2.5 px-3">Common facilities (lighting, water pumps)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4 Steps to Claim Subsidy */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
          Standard National Disbursement Flow
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
            <span className="font-bold text-[#063D2E] block mb-1">01. National Portal</span>
            <p className="text-[#65736B] text-[11px] leading-relaxed">
              Register on the national portal with state DISCOM electricity account number.
            </p>
          </div>
          <div className="p-3.5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
            <span className="font-bold text-[#063D2E] block mb-1">02. DISCOM Sanction</span>
            <p className="text-[#65736B] text-[11px] leading-relaxed">
              Local distribution company inspects transformer capacity and approves load sanction.
            </p>
          </div>
          <div className="p-3.5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
            <span className="font-bold text-[#063D2E] block mb-1">03. Empanelled Vendor</span>
            <p className="text-[#65736B] text-[11px] leading-relaxed">
              Installation executed through registered vendors adhering to DCR/ALMM panel specifications.
            </p>
          </div>
          <div className="p-3.5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3]">
            <span className="font-bold text-[#063D2E] block mb-1">04. Direct Benefit Transfer</span>
            <p className="text-[#65736B] text-[11px] leading-relaxed">
              Net-meter commissioning completed and CFA subsidy transferred directly to consumer account.
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Notice */}
      <div className="p-4 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] text-xs text-[#65736B] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#063D2E] shrink-0 mt-0.5" />
        <div className="leading-relaxed text-[11px]">
          <strong className="text-[#17231E]">Academic Platform Notice: </strong>
          EarthSync is an educational demonstration prototype. It does not grant, process, or guarantee government subsidies. Subsidy disbursement is subject to state DISCOM net-metering sanctions and official guidelines published on official government portals.
        </div>
      </div>
    </div>
  );
};
