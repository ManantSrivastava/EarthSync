'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEarthSync } from '@/context/EarthSyncContext';
import { 
  LayoutDashboard, 
  Recycle, 
  Sun, 
  TrendingUp, 
  Briefcase, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck,
  RotateCcw,
  Leaf
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { userProfile, pickups, isHydrated, resetAllData, loadSampleData } = useEarthSync();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const activePickupsCount = pickups.filter(
    (p) => p.status === 'Requested' || p.status === 'Scheduled'
  ).length;

  const navLinks = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Smart Waste',
      href: '/waste',
      icon: Recycle,
      badge: activePickupsCount > 0 ? `${activePickupsCount} active` : null,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      name: 'SolarSaathi',
      href: '/solar',
      icon: Sun,
      badge: 'Estimator',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      name: 'Impact & Analytics',
      href: '/impact',
      icon: TrendingUp,
      badge: null,
    },
    {
      name: 'Profile & Business',
      href: '/profile',
      icon: Briefcase,
      badge: null,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-900/40 text-white px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-lg">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-inner shadow-emerald-400/30">
            <Leaf className="w-5 h-5 text-emerald-100" />
          </div>
          <span className="text-white">Earth<span className="text-amber-400">Sync</span></span>
          <span className="text-[10px] bg-emerald-900/90 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700/50 uppercase tracking-widest font-semibold">
            CleanTech
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* GreenPoints Quick Chip */}
          <Link
            href="/profile"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-xs font-semibold text-amber-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHydrated ? userProfile.greenPointsBalance : '...'} pts</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-emerald-900/60 border border-emerald-800/80 text-emerald-200 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] z-40 bg-emerald-950/98 border-b border-emerald-800/80 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-emerald-200 hover:bg-emerald-900/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border bg-emerald-900/70 text-emerald-200 border-emerald-700">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-emerald-800/50 flex items-center justify-between">
            <button
              onClick={() => {
                setShowDemoModal(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-emerald-300 hover:text-amber-300 flex items-center gap-1.5 py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Demo Controls</span>
            </button>
            <span className="text-[11px] text-emerald-400/80">College BM Project 2026</span>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-30 bg-forest-950 text-white border-r border-emerald-900/40">
        {/* Brand */}
        <div className="p-5 border-b border-emerald-900/50 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-emerald-50" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-xl leading-none">
                <span>Earth</span>
                <span className="text-amber-400">Sync</span>
              </div>
              <span className="text-[10px] font-medium tracking-wide text-emerald-400/90 uppercase">
                CleanTech Unified Platform
              </span>
            </div>
          </Link>

          {/* Academic Badge */}
          <div className="mt-1 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-900/50 border border-emerald-800/60 text-[11px] text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Essentials of Business Mgmt</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold text-emerald-400/70 uppercase tracking-wider">
            Primary Navigation
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-emerald-800/90 text-white font-semibold shadow-md shadow-emerald-950/40 border border-emerald-700/60'
                    : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      active
                        ? 'bg-emerald-950 text-amber-300 border-amber-400/40'
                        : link.badgeColor
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* GreenPoints Wallet Summary */}
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-emerald-900/90 to-forest-900 border border-emerald-700/50 shadow-inner">
          <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              GreenPoints Wallet
            </span>
            <span className="text-[10px] bg-emerald-800/90 text-amber-300 px-1.5 py-0.2 rounded border border-amber-400/30">
              Tier 1
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-amber-300 tracking-tight">
              {isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '...'}
            </span>
            <span className="text-xs text-emerald-200">PTS</span>
          </div>
          <p className="text-[11px] text-emerald-300/80 mt-1 leading-snug">
            Earned upon verified waste collection. Redeem for campus perks or solar audits.
          </p>
          <Link
            href="/profile"
            className="mt-2.5 block text-center text-xs font-semibold py-1.5 px-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors"
          >
            Redeem Rewards →
          </Link>
        </div>

        {/* Footer & Demo Toggle */}
        <div className="p-3 border-t border-emerald-900/50 flex items-center justify-between text-xs text-emerald-400/80">
          <button
            onClick={() => setShowDemoModal(true)}
            className="hover:text-amber-300 flex items-center gap-1.5 transition-colors py-1 px-1.5 rounded hover:bg-emerald-900/40"
            title="Manage presentation demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Demo Data State</span>
          </button>
          <span className="text-[10px] text-emerald-500">v1.0 MVP</span>
        </div>
      </aside>

      {/* Demo Controls Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Demo Presentation Controller</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Control mock data for your Business Management project presentation.
                </p>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <span className="font-semibold block mb-0.5">Presentation Tip:</span>
                Sample entries are marked with a <span className="bg-emerald-200 font-bold px-1 rounded text-emerald-800">SAMPLE</span> badge. When you schedule a new pickup or submit a solar enquiry, it will be saved locally as live user data.
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    loadSampleData();
                    setShowDemoModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Load Sample Baseline Data
                </button>

                <button
                  onClick={() => {
                    resetAllData();
                    setShowDemoModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-medium text-sm transition-colors border border-slate-200"
                >
                  Clear All & Start Clean
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
