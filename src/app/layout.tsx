import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { EarthSyncProvider } from '@/context/EarthSyncContext';
import { Navigation } from '@/components/Navigation';
import { ToastContainer } from '@/components/ToastContainer';
import { Leaf, ShieldCheck } from 'lucide-react';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EarthSync — Waste Less. Power More.',
  description:
    'EarthSync brings smarter recyclable waste management and rooftop solar estimation together in one simple platform.',
  keywords: [
    'CleanTech',
    'Smart Waste Management',
    'Rooftop Solar Estimator',
    'SolarSaathi',
    'Recyclable Waste',
    'GreenPoints',
    'Academic Demonstration',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAF7] text-[#17231E] font-sans selection:bg-[#00B884]/20 selection:text-[#063D2E]">
        <EarthSyncProvider>
          {/* Top Sticky Horizontal Navbar */}
          <Navigation />

          {/* Main scrollable page content */}
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>

          {/* Minimal Clean Footer */}
          <footer className="border-t border-[#E2E9E3] bg-[#FFFFFF] text-[#65736B] text-xs mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E2E9E3]">
                {/* Brand */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#063D2E] flex items-center justify-center text-white">
                    <Leaf className="w-4 h-4 text-[#00B884]" />
                  </div>
                  <div>
                    <span className="font-bold text-base text-[#17231E] tracking-tight">
                      Earth<span className="text-[#00B884]">Sync</span>
                    </span>
                    <p className="text-[11px] text-[#65736B]">
                      Smart Waste Management & Rooftop Solar Estimator
                    </p>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap items-center gap-6 text-xs font-medium">
                  <Link href="/" className="hover:text-[#063D2E] transition-colors">
                    Home
                  </Link>
                  <Link href="/waste" className="hover:text-[#063D2E] transition-colors">
                    Smart Waste
                  </Link>
                  <Link href="/solar" className="hover:text-[#063D2E] transition-colors">
                    SolarSaathi
                  </Link>
                  <Link href="/#about" className="hover:text-[#063D2E] transition-colors">
                    About
                  </Link>
                  <Link href="/privacy" className="hover:text-[#063D2E] transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-[#063D2E] transition-colors">
                    Terms & Conditions
                  </Link>
                </nav>
              </div>

              {/* Bottom Copyright & Disclaimer */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#65736B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B884]" />
                  <span>
                    Academic Demonstration Prototype • Essentials of Business Management
                  </span>
                </div>
                <p>
                  © 2026 EarthSync. Not affiliated with or replacing municipal daily sanitation services.
                </p>
              </div>
            </div>
          </footer>

          <ToastContainer />
        </EarthSyncProvider>
      </body>
    </html>
  );
}
