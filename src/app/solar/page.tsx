'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { SolarCalculator } from '@/components/SolarCalculator';
import { SolarEnquiryForm } from '@/components/SolarEnquiryForm';
import { SolarEnquiryList } from '@/components/SolarEnquiryList';
import { SolarSubsidyGuide } from '@/components/SolarSubsidyGuide';
import { 
  Sun, 
  Calculator, 
  ShieldCheck, 
  Compass, 
  Info,
  FileText
} from 'lucide-react';

export default function SolarSaathiPage() {
  const { solarEnquiries } = useEarthSync();
  const [activeTab, setActiveTab] = useState<'calculator' | 'subsidies' | 'enquiries'>('calculator');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState({
    capacityKw: 3.5,
    estimatedCost: 189000,
    monthlySavings: 4200,
    locationState: 'Maharashtra',
    monthlyBill: 4500,
    roofAreaSqFt: 450,
  });

  const handleOpenEnquiry = (details: {
    capacityKw: number;
    estimatedCost: number;
    monthlySavings: number;
    locationState: string;
    monthlyBill: number;
    roofAreaSqFt: number;
  }) => {
    setModalInitialData(details);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 animate-in fade-in duration-200">
      
      {/* Academic Disclaimer Banner */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#E2E9E3] text-xs text-[#65736B]">
        <Info className="w-4 h-4 text-[#063D2E] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#17231E]">CleanTech Academic Feasibility Engine: </strong>
          SolarSaathi provides mathematical rooftop solar estimations using standard insolation averages. 
          <span className="text-[#17231E]"> Figures are estimates and not binding quotes or formal government subsidy guarantees.</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-lg border border-[#E2E9E3]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#FFB800]/15 text-[#17231E] border border-[#FFB800]/40">
            <Sun className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Service 02</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17231E] tracking-tight">
            SolarSaathi
          </h1>
          <p className="text-sm text-[#65736B] max-w-2xl leading-relaxed">
            Understand your rooftop&apos;s solar potential.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="px-4 py-2 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Request Consultation</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E9E3] pb-2">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-[#063D2E] text-white'
              : 'text-[#65736B] hover:bg-white hover:text-[#17231E]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Solar Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('subsidies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'subsidies'
              ? 'bg-[#063D2E] text-white'
              : 'text-[#65736B] hover:bg-white hover:text-[#17231E]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Subsidy Benchmarks</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'enquiries'
              ? 'bg-[#063D2E] text-white'
              : 'text-[#65736B] hover:bg-white hover:text-[#17231E]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Saved Enquiries ({solarEnquiries.length})</span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'calculator' && (
        <SolarCalculator 
          onOpenEnquiry={handleOpenEnquiry}
          onEstimateChange={(details) => setModalInitialData(details)}
        />
      )}
      {activeTab === 'subsidies' && <SolarSubsidyGuide />}
      {activeTab === 'enquiries' && <SolarEnquiryList onCalculateSolar={() => setActiveTab('calculator')} />}

      {/* Modal for Enquiry Form */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="my-8 max-w-2xl w-full">
            <SolarEnquiryForm
              initialCapacityKw={modalInitialData.capacityKw}
              initialEstimatedCost={modalInitialData.estimatedCost}
              initialMonthlySavings={modalInitialData.monthlySavings}
              initialLocationState={modalInitialData.locationState}
              initialMonthlyBill={modalInitialData.monthlyBill}
              initialRoofAreaSqFt={modalInitialData.roofAreaSqFt}
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
