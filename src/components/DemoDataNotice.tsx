'use client';

import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface DemoDataNoticeProps {
  hasUserEntries?: boolean;
}

export const DemoDataNotice: React.FC<DemoDataNoticeProps> = ({
  hasUserEntries = true,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs text-slate-600 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-semibold text-slate-800">Academic Demo Environment: </span>
          <span>
            Records marked <span className="inline-block px-1.5 py-0.2 rounded font-bold text-[10px] bg-slate-200 text-slate-700 uppercase tracking-wider">SAMPLE DATA</span> are baseline illustrative examples. {hasUserEntries ? 'Your newly submitted items are saved in browser storage.' : ''}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-emerald-700 shrink-0 font-medium self-end sm:self-auto">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Local Persistence Active</span>
      </div>
    </div>
  );
};
