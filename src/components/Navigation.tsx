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
  ShieldCheck,
  LayoutDashboard
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
    { name: 'Impact', href: '/impact' },
    { name: 'About', href: '/#about' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sticky Horizontal Top Navbar */}
      <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/90 text-stone-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Wordmark on Left */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-md bg-emerald-800 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-900 transition-colors">
              <Leaf className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-lg text-emerald-950 leading-tight">
                <span>Earth</span>
                <span className="text-emerald-700">Sync</span>
              </div>
              <span className="text-[10px] font-medium tracking-wide text-stone-500 uppercase">
                CleanTech Platform
              </span>
            </div>
          </Link>

          {/* Desktop Horizontal Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'text-emerald-900 bg-emerald-50/90 font-semibold'
                      : 'text-stone-600 hover:text-emerald-900 hover:bg-stone-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* GreenPoints Chip */}
            <Link
              href="/profile"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
              title="View GreenPoints Wallet"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '...'} pts</span>
            </Link>

            {/* Demo Controls Button */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-2.5 py-1.5 rounded-md border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Presentation demo state controls"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden lg:inline">Demo Data</span>
            </button>

            {/* Clear Rectangular "Get Started" Button */}
            <Link
              href="/waste"
              className="px-4 py-2 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Bar: Hamburger Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/profile"
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHydrated ? userProfile.greenPointsBalance : '0'}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-stone-50 p-4 shadow-lg animate-in slide-in-from-top-1">
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
                        ? 'text-emerald-900 bg-emerald-100/80 font-bold'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-stone-600 hover:bg-stone-100"
              >
                Partner Console
              </Link>
            </nav>

            <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <Link
                href="/waste"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide shadow-xs"
              >
                Get Started
              </Link>

              <button
                onClick={() => {
                  setShowDemoModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 px-3 rounded-md border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>Presentation Demo Controls</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Demo Presentation Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-stone-200 text-stone-800">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Business Management MVP</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">Demo Presentation Controller</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Control mock data for your Business Management project presentation.
                </p>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="p-1.5 rounded-md hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <span className="font-semibold text-stone-900 block mb-1">Evaluation Note:</span>
                Sample records are labeled with a <span className="bg-stone-200 text-stone-800 font-bold px-1.5 py-0.5 rounded text-[10px]">SAMPLE</span> tag. Any new collection requests or solar enquiries you create are saved locally in your browser.
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    loadSampleData();
                    setShowDemoModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reload Baseline Sample Data</span>
                </button>

                <button
                  onClick={() => {
                    resetAllData();
                    setShowDemoModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 font-medium text-xs transition-colors border border-stone-200 cursor-pointer"
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
