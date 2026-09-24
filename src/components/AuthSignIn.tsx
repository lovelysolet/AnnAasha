import React, { useState } from 'react';
import { HOTLINK_IMAGES } from '../data/mockData';
import {
  Lock,
  Building2,
  HeartHandshake,
  Bike,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  QrCode,
  AlertCircle,
  PhoneCall,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthSignInProps {
  onSignInSuccess: (role: string) => void;
  setCurrentView: (view: string) => void;
}

export const AuthSignIn: React.FC<AuthSignInProps> = ({
  onSignInSuccess,
  setCurrentView,
}) => {
  const [selectedRole, setSelectedRole] = useState<'donor' | 'shelter' | 'courier' | 'inspector'>('donor');
  const [email, setEmail] = useState('sarah.chen@grandhyatt.org');
  const [password, setPassword] = useState('••••••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const roles = [
    { id: 'donor', label: 'Donor / Kitchen', icon: Building2, portalName: 'Donor Portal' },
    { id: 'shelter', label: 'NGO / Shelter', icon: HeartHandshake, portalName: 'Shelter Portal' },
    { id: 'courier', label: 'Volunteer Courier', icon: Bike, portalName: 'Courier App' },
    { id: 'inspector', label: 'Health Inspector', icon: ShieldCheck, portalName: 'Inspector Console' },
  ];

  const quickDemoAccounts = [
    {
      name: 'Hyatt Catering Hub',
      role: 'donor' as const,
      email: 'sarah.chen@grandhyatt.org',
    },
    {
      name: 'Lotus Community Shelter',
      role: 'shelter' as const,
      email: 'sister.maya@lotusshelter.org',
    },
    {
      name: 'Metro Van Dispatcher',
      role: 'courier' as const,
      email: 'david.k@volunteerfleet.org',
    },
  ];

  const handleAutocomplete = (account: typeof quickDemoAccounts[0]) => {
    setSelectedRole(account.role);
    setEmail(account.email);
    setPassword('demoSecureToken2026!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentRoleObj = roles.find((r) => r.id === selectedRole);
    onSignInSuccess(currentRoleObj?.label || 'Staff');
    if (selectedRole === 'donor') {
      setCurrentView('donate-food');
    } else if (selectedRole === 'shelter') {
      setCurrentView('find-food');
    } else {
      setCurrentView('ops-hub');
    }
  };

  const currentRoleObj = roles.find((r) => r.id === selectedRole);

  return (
    <div className="w-full bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-white border border-[#EAE5DC] text-[#012D1D] hover:bg-[#F3EFE6] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Enter as Guest / Explore Public Home</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs font-semibold text-[#006C48] hover:underline"
            >
              Public Network Overview →
            </button>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span>Help Desk</span>
            </div>
          </div>
        </div>

        {/* Main Split Authentication Card (Matches Image 14 completely) */}
        <div className="bg-white border border-[#EAE5DC] rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left Forest Green Brand Column */}
          <div className="lg:col-span-5 bg-[#012D1D] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Leaf Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#52B788]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#52B788]/20 text-[#52B788] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Zero-Hunger Logistics Network
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Welcome back to community hope.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Every sign-in directly synchronizes fresh kitchen surplus with regional shelter refrigeration units within 42 minutes.
              </p>

              {/* Photo & Quote Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1B4332] border border-white/10 shadow-lg">
                <img
                  src={HOTLINK_IMAGES.localFoodDistribution}
                  alt="Food Rescue Mission"
                  className="w-full h-44 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#52B788] block">
                    Mission Audit Telemetry
                  </span>
                  <p className="text-[11px] text-gray-200 italic leading-snug">
                    “AnnAasha cut our meal acquisition costs to zero while preserving the nutritional dignity of 450 daily shelter residents.”
                  </p>
                  <span className="block text-[10px] text-emerald-300 font-semibold">
                    • Sister Maya, Lotus Harbor Shelter Network
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 relative z-10">
              <div>
                <span className="text-2xl font-extrabold text-white">148,290 <span className="text-xs font-normal">kg</span></span>
                <span className="block text-[11px] text-emerald-200">Surplus Rescued & Verified</span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" /> ISO 22000 Certified
                </span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-[#52B788]">324,500+</span>
                <span className="block text-[11px] text-emerald-200">Warm Nutritious Meals</span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Act 1996 Protected
                </span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#012D1D] tracking-tight">
                  Welcome Back
                </h3>
                <p className="text-xs text-[#4B5563] mt-1">
                  Sign in to access your role-specific redistribution dashboard and active telemetry.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-[#006C48]">
                <Lock className="w-5 h-5" />
              </div>
            </div>

            {/* Select Designated Portal */}
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#012D1D]">
                Select Your Designated Portal
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {roles.map((role) => {
                  const selected = selectedRole === role.id;
                  const IconComp = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                        selected
                          ? 'bg-[#E6EEFF] border-[#012D1D] text-[#012D1D] shadow-sm font-bold'
                          : 'bg-[#F8F9FB] border-[#EAE5DC] text-gray-600 hover:bg-[#F3EFE6]'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 mb-1.5 ${selected ? 'text-[#006C48]' : 'text-gray-400'}`} />
                      <span className="text-[11px] truncate w-full">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Demo Evaluator Autocomplete Bar */}
            <div className="p-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#006C48] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Demo Evaluator Autocomplete</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickDemoAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAutocomplete(acc)}
                    className="px-2.5 py-1 bg-white border border-[#EAE5DC] rounded-lg text-xs font-semibold text-[#012D1D] hover:bg-[#E6EEFF] transition-colors"
                  >
                    🏢 {acc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                  Authorized Work Email or Phone
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono">
                    @
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#012D1D]">
                    Credential Security Key / Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Reset link simulated: check your registered work email.')}
                    className="text-xs text-[#006C48] font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                  />
                  <span>Remember this verified terminal for 30 days</span>
                </label>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> TLS 1.3 Active
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
              >
                <span>Sign In to {currentRoleObj?.portalName || 'Portal'}</span>
                <ArrowRight className="w-4 h-4 text-[#52B788]" />
              </button>
            </form>

            {/* SSO Federation */}
            <div className="space-y-3 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-x-0 border-t border-[#EAE5DC]" />
                <span className="relative bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Or Verify Via SSO Federation
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  className="py-2.5 px-3 border border-[#EAE5DC] rounded-xl text-xs font-bold text-gray-700 hover:bg-[#F8F9FB] flex items-center justify-center gap-2"
                >
                  <span className="text-blue-600 font-bold">G</span> Google Workspace
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  className="py-2.5 px-3 border border-[#EAE5DC] rounded-xl text-xs font-bold text-gray-700 hover:bg-[#F8F9FB] flex items-center justify-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-gray-600" /> Municipal / SAML SSO
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 pt-2">
              Don't have an active operational ID?{' '}
              <button
                type="button"
                onClick={() => setCurrentView('donate-food')}
                className="font-bold text-[#006C48] hover:underline"
              >
                Register as a Donor, Shelter, or Volunteer
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Feature Cards (Image 14 Footer Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white border border-[#EAE5DC] p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#006C48] shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#012D1D]">Quick Driver App Check-In</h4>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                Couriers already assigned to a live vehicle can scan the warehouse bay terminal directly without password entry.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EAE5DC] p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#012D1D]">Rapid Cold-Chain Expiry</h4>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                Urgent rescue batches expiring in &lt; 2 hours trigger automatic priority notification push to all nearby standby vans.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EAE5DC] p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#012D1D]">Regional Dispatch Desk</h4>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                Experiencing lock-outs or food hygiene inspection flags? Our 24/7 central desk is reachable at +1 (800) 555-ANNA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
