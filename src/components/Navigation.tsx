'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEarthSync } from '@/context/EarthSyncContext';
import { 
  Leaf, 
  Menu, 
  X, 
  RotateCcw, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { userProfile, isHydrated, resetAllData, loadSampleData } = useEarthSync();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Smart Waste', href: '/waste' },
    { name: 'SolarSaathi', href: '/solar' },
    { name: 'About', href: '/#about' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sticky Horizontal Navbar */}
      <header className="sticky top-0 z-50 bg-[#F8FAF7]/95 backdrop-blur-md border-b border-[#E2E9E3] text-[#17231E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Left: EarthSync Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-md bg-[#063D2E] flex items-center justify-center text-white transition-colors group-hover:bg-[#042E24]">
              <Leaf className="w-5 h-5 text-[#00B884]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg text-[#063D2E] leading-tight">
                Earth<span className="text-[#00B884]">Sync</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-[#65736B] uppercase">
                CleanTech Platform
              </span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#063D2E] bg-[#00B884]/10 font-semibold'
                      : 'text-[#65736B] hover:text-[#063D2E] hover:bg-[#E2E9E3]/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Get Started Button & Subtle Utilities */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Subtle Demo State Trigger for Academic Grading */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-2.5 py-1.5 rounded-md border border-[#E2E9E3] text-[#65736B] hover:text-[#17231E] hover:bg-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Academic demo controls"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#65736B]" />
              <span className="hidden lg:inline text-[11px]">Demo Data</span>
            </button>

            {/* GreenPoints Indicator */}
            <Link
              href="/waste"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#E2E9E3] text-xs font-semibold text-[#063D2E] hover:border-[#00B884] transition-colors"
              title="GreenPoints Balance"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '...'} pts</span>
            </Link>

            {/* Rectangular "Get Started" Button */}
            <Link
              href="/waste"
              className="px-4 py-2 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right: Points & Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/waste"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E2E9E3] text-xs font-semibold text-[#063D2E]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{isHydrated ? userProfile.greenPointsBalance : '0'}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-[#E2E9E3] text-[#17231E] hover:bg-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2E9E3] bg-[#F8FAF7] p-4 shadow-sm animate-in slide-in-from-top-1">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'text-[#063D2E] bg-[#00B884]/15 font-bold'
                        : 'text-[#17231E] hover:bg-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#E2E9E3] flex flex-col gap-2.5">
              <Link
                href="/waste"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-medium text-xs tracking-wide"
              >
                Get Started
              </Link>

              <button
                onClick={() => {
                  setShowDemoModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 px-3 rounded-md border border-[#E2E9E3] text-xs font-medium text-[#65736B] hover:bg-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#65736B]" />
                <span>Presentation Demo Controls</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Demo Presentation Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg border border-[#E2E9E3] text-[#17231E]">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#00B884]/10 text-[#063D2E] border border-[#00B884]/30 text-[11px] font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B884]" />
                  <span>Academic Prototype</span>
                </div>
                <h3 className="text-base font-bold text-[#17231E]">Demo Presentation Controls</h3>
                <p className="text-xs text-[#65736B] mt-1">
                  Manage mock data state for evaluation and presentation.
                </p>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="p-1.5 rounded-md hover:bg-[#F8FAF7] text-[#65736B] hover:text-[#17231E] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="p-3.5 rounded-lg bg-[#F8FAF7] border border-[#E2E9E3] text-xs text-[#65736B] leading-relaxed">
                <span className="font-semibold text-[#17231E] block mb-1">Notice:</span>
                Sample records are labeled with a <span className="bg-[#E2E9E3] text-[#17231E] font-bold px-1.5 py-0.5 rounded text-[10px]">SAMPLE</span> tag. New requests and enquiries are stored in your browser&apos;s LocalStorage.
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    loadSampleData();
                    setShowDemoModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reload Baseline Sample Data</span>
                </button>

                <button
                  onClick={() => {
                    resetAllData();
                    setShowDemoModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#F8FAF7] hover:bg-rose-50 hover:text-rose-700 text-[#65736B] font-medium text-xs transition-colors border border-[#E2E9E3] cursor-pointer"
                >
                  <span>Clear All Stored Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
