'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { GreenPointsStore } from '@/components/GreenPointsStore';
import { BusinessModelView } from '@/components/BusinessModelView';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { 
  User, 
  Briefcase, 
  Gift, 
  RotateCcw 
} from 'lucide-react';

export default function ProfilePage() {
  const { userProfile, pickups, solarEnquiries, loadSampleData, resetAllData } = useEarthSync();
  const [activeTab, setActiveTab] = useState<'rewards' | 'business' | 'profile'>('rewards');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
      {/* Demo Notice */}
      <DemoDataNotice
        hasUserEntries={
          pickups.some((p) => !p.isSample) || solarEnquiries.some((e) => !e.isSample)
        }
      />

      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900">{userProfile.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Tier 1 Eco Champion
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                <span>{userProfile.email}</span>
                <span>•</span>
                <span className="font-mono text-[11px]">{userProfile.collegeId}</span>
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                {userProfile.department} • {userProfile.campusLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-lg text-center flex-1 sm:flex-initial">
              <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider block">
                GreenPoints
              </span>
              <span className="text-xl font-bold text-amber-700">
                {userProfile.greenPointsBalance.toLocaleString()}
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-lg text-center flex-1 sm:flex-initial">
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
                Lifetime Pts
              </span>
              <span className="text-xl font-bold text-stone-800">
                {userProfile.lifetimePointsEarned.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'rewards'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>GreenPoints Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'business'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Business Model Canvas</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Demo Settings & Controls</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'rewards' && <GreenPointsStore />}

      {activeTab === 'business' && <BusinessModelView />}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Presentation & Demonstration Controls
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Reset the local state or reload the baseline demonstration records for academic grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-800" />
                  Load Baseline Demonstration Data
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Populates the dashboard with realistic sample pickups (e-waste, paper, plastic) and pre-calculated SolarSaathi enquiries to showcase all platform features.
                </p>
              </div>
              <button
                onClick={loadSampleData}
                className="mt-4 py-2 px-4 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors shadow-xs self-start cursor-pointer"
              >
                Reload Sample Baseline
              </button>
            </div>

            <div className="p-5 rounded-lg bg-rose-50/50 border border-rose-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-700" />
                  Reset to Pure Empty User State
                </h3>
                <p className="text-xs text-rose-800/80 mt-1.5 leading-relaxed">
                  Clears all mock pickups, solar enquiries, and point balances. Starts with a blank slate so you can enter your own real pickup and solar calculation.
                </p>
              </div>
              <button
                onClick={resetAllData}
                className="mt-4 py-2 px-4 rounded-md bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold transition-colors shadow-xs self-start cursor-pointer"
              >
                Clear All Local Data
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Course: Essentials of Business Management (CleanTech Innovation Project)</span>
            <span className="font-mono text-emerald-800 font-semibold">EarthSync v1.0 MVP</span>
          </div>
        </div>
      )}
    </div>
  );
}
