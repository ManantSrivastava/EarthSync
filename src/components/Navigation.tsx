'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEarthSync } from '@/context/EarthSyncContext';
import { 
  Leaf, 
  Menu, 
  X, 
  Sun,
  Globe,
  ChevronDown,
  User
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { userProfile, isHydrated } = useEarthSync();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'En' | 'Hi'>('En');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

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
      {/* Sticky Horizontal Navbar matching design */}
      <header className="sticky top-0 z-50 bg-[#F8FAF7]/95 backdrop-blur-md text-[#17231E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Left: EarthSync Logo & Language selector */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              {/* Clean tilted green leaf icon from design */}
              <Leaf className="w-6 h-6 text-[#00A86B] fill-[#00A86B] transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold tracking-tight text-[#063D2E]">
                Earth<span className="text-[#00A86B]">Sync</span>
              </span>
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-[#4B5563] hover:text-[#063D2E] hover:bg-black/5 transition-colors cursor-pointer"
                title="Select Language"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="font-semibold text-xs">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#6B7280]" />
              </button>

              {langMenuOpen && (
                <div className="absolute left-0 mt-1 w-28 bg-white border border-[#E2E9E3] rounded-lg shadow-md py-1 z-50 text-xs">
                  <button
                    onClick={() => { setLanguage('En'); setLangMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F8FAF7] flex items-center justify-between ${language === 'En' ? 'font-bold text-[#063D2E]' : 'text-[#4B5563]'}`}
                  >
                    <span>English</span>
                    {language === 'En' && <span className="text-[#00B884]">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('Hi'); setLangMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F8FAF7] flex items-center justify-between ${language === 'Hi' ? 'font-bold text-[#063D2E]' : 'text-[#4B5563]'}`}
                  >
                    <span>हिंदी</span>
                    {language === 'Hi' && <span className="text-[#00B884]">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm transition-all ${
                    active
                      ? 'text-[#063D2E] bg-[#E7F6EC] font-semibold rounded-full shadow-2xs'
                      : 'text-[#4B5563] hover:text-[#063D2E] font-medium rounded-full hover:bg-black/[0.03]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Points Pill, Profile / Sign In, Get Started Button */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
            {/* GreenPoints Indicator */}
            <Link
              href="/waste"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-[#E2E8F0] text-xs font-semibold text-[#1F2937] hover:border-[#CBD5E1] shadow-2xs transition-all"
              title="GreenPoints Balance"
            >
              <Sun className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
              <span className="text-[12px]">{isHydrated ? userProfile.greenPointsBalance.toLocaleString() : '0'} pts</span>
            </Link>

            {/* Profile or Sign In Link */}
            {isHydrated && userProfile.email ? (
              <Link
                href="/profile"
                className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white/90 hover:bg-white text-[#374151] hover:text-[#17231E] text-xs font-medium transition-all flex items-center gap-1.5 shadow-2xs hover:border-[#CBD5E1]"
                title="Account Profile"
              >
                <User className="w-3.5 h-3.5 text-[#00A86B]" />
                <span className="text-[12px]">{userProfile.name ? userProfile.name.split(' ')[0] : 'Profile'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white/90 hover:bg-white text-[#374151] hover:text-[#17231E] text-xs font-medium transition-all flex items-center gap-1.5 shadow-2xs hover:border-[#CBD5E1]"
                title="Sign In"
              >
                <User className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-[12px]">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Right: Points & Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/waste"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E2E9E3] text-xs font-semibold text-[#063D2E]"
            >
              <Sun className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
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
                        ? 'text-[#063D2E] bg-[#E7F6EC] font-bold'
                        : 'text-[#17231E] hover:bg-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#E2E9E3] flex flex-col gap-2.5">
              {isHydrated && userProfile.email ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 rounded-md border border-[#E2E9E3] text-xs font-medium text-[#17231E] hover:bg-white flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#00A86B]" />
                  <span>My Profile</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 rounded-md border border-[#E2E9E3] text-xs font-medium text-[#17231E] hover:bg-white flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Sign In / Register</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
