import React, { useState } from 'react';
import { HOTLINK_IMAGES } from '../data/mockData';
import {
  Menu,
  X,
  ArrowRight,
  HeartHandshake,
  User,
  LogIn,
  LogOut,
  Home,
  MapPin,
  PlusCircle,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  activeDemoStep: number;
  setActiveDemoStep: (step: number) => void;
  userRole: string | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userRole,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tabs adjusted to the bottom sub-navigation row
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'find-food', label: 'Find Food', icon: MapPin },
    { id: 'donate-food', label: 'Donate Food', icon: PlusCircle },
    { id: 'ops-hub', label: 'Ops Control Hub', icon: LayoutDashboard, badge: 'LIVE' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE5DC] transition-all shadow-xs">
      {/* ========================================================================= */}
      {/* TOP BAR: ONLY BRAND NAME/LOGO ON LEFT, AND LOGIN SECTION ON RIGHT         */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={HOTLINK_IMAGES.logo}
                alt="AnnAasha - Surplus to Shelter"
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="logo-fallback hidden flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#012D1D] flex items-center justify-center text-[#52B788]">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-[#012D1D]">
                    Ann<span className="text-[#E07A5F]">Aasha</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006C48]">
                    Surplus to Shelter
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col pl-2 border-l border-[#EAE5DC]">
              <span className="text-xs font-bold text-[#012D1D] leading-tight">
                Food Redistribution Network
              </span>
              <span className="text-[10px] text-gray-500">
                Direct Kitchen to Shelter Pipeline
              </span>
            </div>
          </div>

          {/* Login Section (Top-Right Exclusive) */}
          <div className="flex items-center gap-3">
            {userRole ? (
              <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 py-1.5 rounded-xl border border-[#EAE5DC] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#012D1D] text-[#52B788] flex items-center justify-center font-bold text-xs uppercase">
                  {userRole.slice(0, 2)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#012D1D] leading-tight">
                    {userRole === 'admin' && 'Sarah M. (Compliance)'}
                    {userRole === 'donor' && 'Grand Hyatt Kitchen'}
                    {userRole === 'shelter' && 'Hope Harbor Director'}
                    {userRole === 'volunteer' && 'Maya R. (Courier)'}
                    {!['admin', 'donor', 'shelter', 'volunteer'].includes(userRole) && userRole}
                  </div>
                  <div className="text-[10px] text-[#006C48] font-bold uppercase tracking-wider">
                    Role: {userRole}
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  className="ml-1 p-1.5 text-xs text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 font-semibold"
                  title="Sign Out / Change Role"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('sign-in')}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm active:scale-95 ${
                  currentView === 'sign-in'
                    ? 'bg-[#012D1D] text-white ring-2 ring-[#006C48]/30 shadow'
                    : 'bg-[#E07A5F] hover:bg-[#C9684F] text-white shadow-[#E07A5F]/20'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Sign In</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-lg md:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECONDARY ROW (NICHE ADJUSTED): ALL NAVIGATION TABS & QUICK CTAS          */}
      {/* ========================================================================= */}
      <div className="bg-[#F8F6F0]/90 border-t border-[#EAE5DC]/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-2.5 overflow-x-auto no-scrollbar gap-2">
            {/* Primary Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
              {navItems.map((item) => {
                const active = currentView === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
                      active
                        ? 'bg-[#012D1D] text-white shadow-sm font-bold'
                        : 'text-[#4B5563] hover:text-[#012D1D] hover:bg-white/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#52B788]' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                          active ? 'bg-[#52B788] text-[#012D1D]' : 'bg-emerald-100 text-[#006C48]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Expandable) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-[#EAE5DC] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1 mb-1">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const active = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  active
                    ? 'bg-[#012D1D] text-white font-bold shadow-sm'
                    : 'text-gray-700 hover:bg-[#F3EFE6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#52B788]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#52B788]/20 text-[#006C48]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#EAE5DC] flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentView('donate-food');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#006C48] text-white font-bold text-center text-sm shadow-sm"
            >
              + Donate Surplus Food
            </button>
            <button
              onClick={() => {
                setCurrentView('sign-in');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#E07A5F] text-white font-bold text-center text-sm shadow-sm"
            >
              Login / Sign In Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
