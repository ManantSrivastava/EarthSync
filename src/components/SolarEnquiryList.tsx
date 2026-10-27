'use client';

import React from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { Sun, Calendar, MapPin, Phone, Mail, FileText, CheckCircle2, Clock } from 'lucide-react';

export const SolarEnquiryList: React.FC = () => {
  const { solarEnquiries } = useEarthSync();

  if (solarEnquiries.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#E2E9E3] p-10 text-center text-[#65736B]">
        <Sun className="w-8 h-8 text-[#FFB800] mx-auto mb-2 opacity-50" />
        <p className="text-sm font-semibold text-[#17231E]">No Solar Enquiries Submitted Yet</p>
        <p className="text-xs text-[#65736B] mt-1">
          Use the SolarSaathi calculator above to size your rooftop solar system and log an enquiry.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-[#17231E] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#063D2E]" />
          <span>Logged Solar Provider Enquiries ({solarEnquiries.length})</span>
        </h4>
        <span className="text-[11px] text-[#65736B]">Stored in browser local storage</span>
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
                    {enq.isSample && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F8FAF7] text-[#65736B] border border-[#E2E9E3] uppercase tracking-wider">
                        Demo
                      </span>
                    )}
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
