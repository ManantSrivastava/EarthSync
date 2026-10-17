'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { SolarCalculator } from '@/components/SolarCalculator';
import { SolarEnquiryForm } from '@/components/SolarEnquiryForm';
import { SolarEnquiryList } from '@/components/SolarEnquiryList';
import { SolarSubsidyGuide } from '@/components/SolarSubsidyGuide';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { 
  Sun, 
  Calculator, 
  FileText, 
  Compass,
  ShieldCheck
} from 'lucide-react';

export default function SolarSaathiPage() {
  const { solarEnquiries } = useEarthSync();
  const [activeTab, setActiveTab] = useState<'calculator' | 'subsidies' | 'enquiries'>('calculator');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState({
    capacityKw: 3.5,
    estimatedCost: 189000,
    monthlySavings: 4200,
  });

  const handleOpenEnquiry = (capacityKw: number, estimatedCost: number, monthlySavings: number) => {
    setModalInitialData({ capacityKw, estimatedCost, monthlySavings });
    setEnquiryModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Demo Notice */}
      <DemoDataNotice hasUserEntries={solarEnquiries.some((e) => !e.isSample)} />

      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>SolarSaathi Clean Energy Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Rooftop Solar Feasibility & Provider Enquiries
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Calculate preliminary sizing, capital cost benchmarks, payback trajectory, and carbon displacement. Review verified government subsidy benchmarks under the PM Surya Ghar scheme.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => {
                setModalInitialData({ capacityKw: 3.5, estimatedCost: 189000, monthlySavings: 4200 });
                setEnquiryModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs tracking-wide shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Log Installer Enquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Solar Estimator</span>
        </button>

        <button
          onClick={() => setActiveTab('subsidies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'subsidies'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Government Subsidy Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'enquiries'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Submitted Enquiries ({solarEnquiries.length})</span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'calculator' && <SolarCalculator onOpenEnquiry={handleOpenEnquiry} />}
      {activeTab === 'subsidies' && <SolarSubsidyGuide />}
      {activeTab === 'enquiries' && <SolarEnquiryList />}

      {/* Modal for Enquiry Form */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="my-8 max-w-2xl w-full">
            <SolarEnquiryForm
              initialCapacityKw={modalInitialData.capacityKw}
              initialEstimatedCost={modalInitialData.estimatedCost}
              initialMonthlySavings={modalInitialData.monthlySavings}
              onClose={() => setEnquiryModalOpen(false)}
              onSuccess={() => {
                setEnquiryModalOpen(false);
                setActiveTab('enquiries');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
