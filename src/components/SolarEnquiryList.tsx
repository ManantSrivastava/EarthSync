'use client';

import React from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { Sun, Calendar, MapPin, Phone, Mail, FileText, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  onCalculateSolar?: () => void;
}

export const SolarEnquiryList: React.FC<Props> = ({ onCalculateSolar }) => {
  const { solarEnquiries } = useEarthSync();

  if (solarEnquiries.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#E2E9E3] p-12 text-center text-[#65736B] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] text-[#FFB800] flex items-center justify-center mb-3">
          <Sun className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-[#17231E] text-base">
          You haven&apos;t saved any solar estimates yet.
        </h4>
        <p className="text-xs text-[#65736B] max-w-sm mt-1">
          Use the SolarSaathi calculator to estimate system size, power generation, and payback period.
        </p>
        {onCalculateSolar ? (
          <button
            onClick={onCalculateSolar}
            className="mt-4 px-4 py-2 rounded-md bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#042E24] transition-colors cursor-pointer"
          >
            Calculate Solar Potential
          </button>
        ) : (
          <a
            href="/solar"
            className="mt-4 px-4 py-2 rounded-md bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#042E24] transition-colors inline-block"
          >
            Calculate Solar Potential
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-[#17231E] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#063D2E]" />
          <span>Logged Solar Enquiries ({solarEnquiries.length})</span>
        </h4>
        <span className="text-[11px] text-[#65736B]">Personal consultations log</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solarEnquiries.map((enq) => {
          let statusBadge = (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Clock className="w-3 h-3 text-amber-700" />
              {enq.status}
            </span>
          );

          if (enq.status === 'Feasibility Ready') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#063D2E] bg-[#00B884]/10 px-2 py-0.5 rounded-md border border-[#00B884]/30">
                <CheckCircle2 className="w-3 h-3 text-[#00B884]" />
                {enq.status}
              </span>
            );
          } else if (enq.status === 'Site Survey Scheduled') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-900 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                <Calendar className="w-3 h-3 text-sky-700" />
                {enq.status}
              </span>
            );
          }

          return (
            <div
              key={enq.id}
              className="bg-white rounded-lg border border-[#E2E9E3] p-5 hover:border-[#65736B]/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {statusBadge}
                  </div>
                  <span className="text-xs text-[#65736B] font-mono">#{enq.id.slice(-6)}</span>
                </div>

                <h5 className="font-bold text-base text-[#17231E]">{enq.fullName}</h5>
                <p className="text-xs text-[#063D2E] font-medium mt-0.5">
                  {enq.systemType} • {enq.suggestedCapacityKw || 3} kWp
                </p>

                <div className="mt-3 pt-3 border-t border-[#E2E9E3] space-y-1.5 text-xs text-[#65736B]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#65736B] shrink-0" />
                    <span className="truncate">{enq.city || 'Campus Facility'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#65736B] shrink-0" />
                    <span>{enq.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#65736B] shrink-0" />
                    <span>{enq.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E9E3] flex items-center justify-between text-xs">
                <span className="text-[#65736B]">{enq.financingPreference}</span>
                <span className="text-[#65736B] font-mono">{enq.submittedAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
