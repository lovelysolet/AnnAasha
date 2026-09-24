import React, { useState } from 'react';
import { HOTLINK_IMAGES } from '../data/mockData';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#F8F9FB] border-t border-[#EAE5DC] text-[#121C2A] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#EAE5DC]">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={HOTLINK_IMAGES.logo}
                alt="AnnAasha Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold tracking-tight text-[#012D1D]">
                Ann<span className="text-[#E07A5F]">Aasha</span>
              </span>
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed max-w-sm">
              Bridging the gap between corporate, retail, and agricultural surplus food and local shelter networks through real-time logistics, verifiable audit trails, and community-first empowerment.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#006C48]/10 text-[#006C48]">
                <ShieldCheck className="w-3.5 h-3.5" />
                ISO 22000 Hygiene Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#012D1D]/10 text-[#012D1D]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified 501(c)(3) Partner
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-sm font-bold text-[#012D1D] uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <button
                  onClick={() => setCurrentView('find-food')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Find Available Food
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('donate-food')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  List Surplus Batches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('find-food')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Regional Cold Chain Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ops-hub')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Safety & Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Impact Telemetry
                </button>
              </li>
            </ul>
          </div>

          {/* Portals Links */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-sm font-bold text-[#012D1D] uppercase tracking-wider mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <button
                  onClick={() => setCurrentView('donate-food')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Donor Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ops-hub')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Volunteer Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('find-food')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  NGO & Shelter Registry
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ops-hub')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Municipal Health Inspection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('sign-in')}
                  className="hover:text-[#012D1D] hover:underline text-left transition-colors"
                >
                  Terminal Access Login
                </button>
              </li>
            </ul>
          </div>

          {/* Stay Informed Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-[#012D1D] uppercase tracking-wider mb-2">
              Stay Informed
            </h4>
            <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
              Receive monthly food recovery audit summaries, partner spotlights, and disaster response dispatch alerts.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Subscribed to telemetry updates!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email"
                  required
                  className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52B788] text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#012D1D] text-white font-bold text-xs rounded-xl hover:bg-[#1B4332] transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
            <span className="block text-[11px] text-[#6B7280] mt-2">
              Zero spam. Direct impact telemetry feeds only.
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Protocol Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>© 2026 AnnAasha Redistribution Network. Built with human dignity at the core.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-900 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-gray-900 cursor-pointer">Smart Contract Audits</span>
            <span className="hover:text-gray-900 cursor-pointer">Terms of Redistribution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
