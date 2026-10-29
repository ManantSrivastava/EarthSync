'use client';

import React from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { REWARD_ITEMS } from '@/data/constants';
import { Sparkles, Gift, Check, Tag } from 'lucide-react';

export const GreenPointsStore: React.FC = () => {
  const { userProfile, redeemedRewards, redeemReward } = useEarthSync();

  return (
    <div className="space-y-5">
      {/* Wallet Balance Hero */}
      <div className="p-6 rounded-xl bg-stone-900 text-white shadow-xs border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>GreenPoints Rewards Center</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Redeem Points for Sustainable Perks
          </h3>
          <p className="text-xs text-emerald-300/80 mt-1 max-w-md">
            {userProfile.greenPointsBalance === 0
              ? 'Your GreenPoints balance will appear here once you complete eligible activities.'
              : 'Points are earned exclusively upon verified waste collections.'}
          </p>
        </div>

        <div className="bg-emerald-900/60 border border-emerald-700/60 px-5 py-3 rounded-2xl text-center self-stretch sm:self-auto shrink-0">
          <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
            Available Balance
          </span>
          <div className="text-3xl font-black text-amber-300">
            {userProfile.greenPointsBalance.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-200">GreenPoints</span>
        </div>
      </div>

      {userProfile.greenPointsBalance === 0 && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold">
              Earn GreenPoints by completing eligible activities.
            </span>
          </div>
          <a
            href="/waste"
            className="px-3.5 py-1.5 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs transition-colors shrink-0"
          >
            Explore Smart Waste
          </a>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REWARD_ITEMS.map((item) => {
          const isRedeemed = redeemedRewards.includes(item.id);
          const canAfford = userProfile.greenPointsBalance >= item.pointsCost;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm flex flex-col justify-between transition-all ${
                isRedeemed
                  ? 'border-emerald-300 bg-emerald-50/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.pointsCost} pts</span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-base mt-2">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Tag className="w-3 h-3 text-emerald-600" />
                  <span>Partner: <strong className="text-slate-700">{item.partner}</strong></span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                {isRedeemed ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-100/70 text-emerald-900 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-700" />
                      Claimed! Code: ES-{item.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-emerald-700">Active</span>
                  </div>
                ) : (
                  <button
                    onClick={() => redeemReward(item.id)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      canAfford
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{canAfford ? 'Redeem Voucher' : `Needs ${item.pointsCost - userProfile.greenPointsBalance} More Pts`}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
