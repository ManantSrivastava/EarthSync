'use client';

import React from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { Sun, Calendar, MapPin, Phone, Mail, FileText, CheckCircle2, Clock } from 'lucide-react';

export const SolarEnquiryList: React.FC = () => {
  const { solarEnquiries } = useEarthSync();

  if (solarEnquiries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
        <Sun className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-50" />
        <p className="text-sm font-semibold text-slate-700">No Solar Enquiries Submitted Yet</p>
        <p className="text-xs text-slate-400 mt-1">
          Use the SolarSaathi calculator above to size your rooftop solar system and log an enquiry.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          Logged Solar Provider Enquiries ({solarEnquiries.length})
        </h4>
        <span className="text-[11px] text-slate-400">Stored in browser local storage</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solarEnquiries.map((enq) => {
          let statusBadge = (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
              <Clock className="w-3 h-3 text-amber-600" />
              {enq.status}
            </span>
          );

          if (enq.status === 'Feasibility Ready') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {enq.status}
              </span>
            );
          } else if (enq.status === 'Site Survey Scheduled') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-300">
                <Calendar className="w-3 h-3 text-sky-600" />
                {enq.status}
              </span>
            );
          }

          return (
            <div
              key={enq.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {statusBadge}
                    {enq.isSample && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                        Sample
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {enq.suggestedCapacityKw ? `${enq.suggestedCapacityKw} kWp` : 'Custom'}
                  </span>
                </div>

                <h5 className="font-bold text-slate-900 text-base">{enq.fullName}</h5>

                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{enq.city} {enq.address ? `• ${enq.address}` : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{enq.phone}</span>
                  </div>
                  {enq.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{enq.email}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">System Type</span>
                    <span className="font-medium text-slate-800">{enq.systemType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Model</span>
                    <span className="font-medium text-slate-800 truncate block">{enq.financingPreference}</span>
                  </div>
                </div>

                {enq.notes && (
                  <p className="mt-2 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                    &ldquo;{enq.notes}&rdquo;
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 text-[10px] text-slate-400 flex justify-between items-center border-t border-slate-100">
                <span>Submitted: {enq.submittedAt ? enq.submittedAt.split('T')[0] : 'Recent'}</span>
                <span className="font-mono">#{enq.id.slice(-6)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
