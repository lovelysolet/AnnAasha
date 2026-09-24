import React from 'react';
import { HOTLINK_IMAGES, SurplusListing } from '../data/mockData';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Users,
  MapPin,
  Flame,
  Truck,
  Leaf,
  Layers,
  Thermometer,
  CalendarCheck,
  TrendingUp,
  Award
} from 'lucide-react';

interface LandingPageProps {
  listings: SurplusListing[];
  setCurrentView: (view: string) => void;
  onOpenClaimModal: (listing: SurplusListing) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  listings,
  setCurrentView,
  onOpenClaimModal,
}) => {
  const featuredBatch = listings[0] || {
    id: 'ANN-2026-884920',
    title: 'Warm Artisan Lunch Boxes & Fresh Grain Bowls',
    donorName: 'Grand Hyatt Banquet • Hall B',
    portions: 120,
    holdingTemp: '68°C Hot Hold',
    expiryFormatted: 'Exp in 1h 45m',
  };

  const radarListings = listings.slice(1, 4);

  return (
    <div className="flex flex-col w-full bg-[#FDFBF7] text-[#121C2A] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#EAE5DC]">
        {/* Subtle background warm ambient radial */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#52B788]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#E07A5F]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Trust Tag Pills */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#52B788]/15 text-[#006C48] border border-[#52B788]/30">
                  <Leaf className="w-3.5 h-3.5 text-[#006C48]" />
                  Surplus to Shelter Initiative
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Zero-Waste Certified
                </span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#012D1D] leading-[1.1] text-balance">
                Turning Surplus Food Into{' '}
                <span className="text-[#E07A5F]">Hope</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl font-normal">
                AnnAasha connects hotels, banquet caterers, and corporate cafeterias with local vetted shelters. Using predictive dispatch and temperature-audited routes, fresh food arrives before expiry with total safety.
              </p>

              {/* Primary Calls to Action */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('donate-food')}
                  className="px-6 py-3.5 text-sm sm:text-base font-bold rounded-xl bg-[#012D1D] text-white hover:bg-[#1B4332] shadow-md shadow-[#012D1D]/10 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Donate Surplus Food</span>
                  <ArrowRight className="w-4 h-4 text-[#52B788]" />
                </button>
                <button
                  onClick={() => setCurrentView('find-food')}
                  className="px-6 py-3.5 text-sm sm:text-base font-bold rounded-xl bg-[#E6EEFF]/60 text-[#012D1D] hover:bg-[#DEE9FC] border border-[#C1C8C2]/40 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-[#006C48]" />
                  <span>Find Available Food</span>
                </button>
              </div>

              {/* Compliance Sub-row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-xs text-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006C48]" />
                  <span>FSSAI Hygiene Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006C48]" />
                  <span>Good Samaritan Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#006C48]" />
                  <span>Smart Chain Handover Verification</span>
                </div>
              </div>

              {/* Live Metric Pills */}
              <div className="grid grid-cols-3 gap-3 pt-4 max-w-xl">
                <div className="bg-white border border-[#EAE5DC] p-3 rounded-xl shadow-sm flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-[#012D1D]">2,450+</span>
                    <span className="text-[11px] text-gray-500">Meals Rescued Today</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE5DC] p-3 rounded-xl shadow-sm flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-[#012D1D]">120+</span>
                    <span className="text-[11px] text-gray-500">Active Metro Donors</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE5DC] p-3 rounded-xl shadow-sm flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-[#012D1D]">45+</span>
                    <span className="text-[11px] text-gray-500">Shelters Connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Card: Ready for Dispatch Preview */}
            <div className="lg:col-span-5">
              <div className="relative bg-white border border-[#EAE5DC] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                {/* Photo & Header Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-[#1B4332]">
                  <img
                    src={HOTLINK_IMAGES.localKitchenPacking}
                    alt="Kitchen Packing Volunteers"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#52B788] text-[#012D1D] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#012D1D] animate-ping" />
                      Ready for Dispatch
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E07A5F] text-white shadow-sm">
                      {featuredBatch.expiryFormatted || 'Exp in 1h 45m'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-4 text-white">
                    <span className="text-xs text-emerald-300 font-medium">
                      ⏱ Listed 42 min ago
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      {featuredBatch.donorName}
                    </h3>
                    <p className="text-xs text-gray-200 line-clamp-1">
                      {featuredBatch.title}
                    </p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 space-y-4 bg-white">
                  {/* Rating and audited temperature */}
                  <div className="flex items-center justify-between text-xs text-gray-600 pb-3 border-b border-[#F3EFE6]">
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <span>★ 4.9</span>
                      <span className="text-gray-500 font-normal">(142 rescues completed)</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#006C48] font-bold">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span>Audited: {featuredBatch.holdingTemp}</span>
                    </div>
                  </div>

                  {/* Allocation progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-700">Shelter Allocation Progress</span>
                      <span className="font-bold text-[#006C48]">78% Claimed (94/120)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E6EEFF] overflow-hidden">
                      <div className="h-full rounded-full bg-[#006C48]" style={{ width: '78%' }} />
                    </div>
                    <span className="block text-[11px] text-gray-500">
                      Remaining 26 portions earmarked for Hope Haven Shelter
                    </span>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 bg-[#52B788]/15 text-[#006C48] text-xs font-semibold rounded-lg">
                      100% Pure Veg & Halal
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg">
                      Eco-Packaging
                    </span>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-lg">
                      Thermal Insulated
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onOpenClaimModal(featuredBatch as SurplusListing)}
                    className="w-full py-3 rounded-xl bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Truck className="w-4 h-4 text-[#52B788]" />
                    <span>Coordinate Volunteer Pickup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VERIFIED IMPACT TELEMETRY */}
      <section className="py-14 bg-white border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#006C48]">
                Verified Impact Telemetry
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012D1D] tracking-tight">
                Real Numbers, Zero Embellishment
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Telemetry aggregated every 60 seconds from municipal weight scales</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="bg-[#FDFBF7] border border-[#EAE5DC] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#006C48]/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Food Rescued
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  +18%
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#012D1D] tracking-tight">
                  148,290+<span className="text-base font-medium text-gray-500 ml-1">kg</span>
                </span>
                <div className="w-full h-1.5 bg-emerald-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-[#006C48] rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Saved from municipal landfills</span>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#FDFBF7] border border-[#EAE5DC] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#006C48]/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Meals Distributed
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#52B788]/20 text-[#006C48]">
                  Fresh
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#012D1D] tracking-tight">
                  324,500+
                </span>
                <span className="block text-xs font-medium text-gray-500">portions served</span>
                <div className="flex items-end gap-1 h-3 mt-2">
                  <div className="w-1/5 bg-[#006C48]/40 h-2 rounded-t" />
                  <div className="w-1/5 bg-[#006C48]/60 h-2.5 rounded-t" />
                  <div className="w-1/5 bg-[#006C48]/80 h-3 rounded-t" />
                  <div className="w-1/5 bg-[#006C48] h-3.5 rounded-t" />
                  <div className="w-1/5 bg-[#012D1D] h-4 rounded-t" />
                </div>
              </div>
              <span className="text-xs text-gray-500">Dignity-first food distribution</span>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#FDFBF7] border border-[#EAE5DC] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#006C48]/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Verified Shelters
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                  Vetted
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#012D1D] tracking-tight">
                  45+<span className="text-base font-medium text-gray-500 ml-1">NGOs</span>
                </span>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>Coverage Density</span>
                  <span className="font-bold text-gray-700">92%</span>
                </div>
                <div className="w-full h-1.5 bg-blue-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Across 6 municipal zones</span>
            </div>

            {/* Metric 4 */}
            <div className="bg-[#FDFBF7] border border-[#EAE5DC] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#006C48]/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Active Couriers
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                  Fleet
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#012D1D] tracking-tight">
                  1,280+
                </span>
                <span className="block text-xs font-medium text-gray-500">volunteers</span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>142 on road now</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">Average response time: 24 mins</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOGISTICS ARCHITECTURE (How Surplus Moves to Shelter in Under 45 Mins) */}
      <section className="py-16 bg-[#FDFBF7] border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-[#006C48]">
              Logistics Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#012D1D] tracking-tight mt-1">
              How Surplus Moves to Shelter in Under 45 Mins
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2">
              Simple, safe, and audited at each milestone to protect donors and empower communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-[#006C48] font-mono text-base font-bold mb-4">
                  01
                </span>
                <h3 className="text-lg font-bold text-[#012D1D] mb-2">List Surplus</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Hotels, wedding banquets, or bakeries upload food type, quantity, cooking timestamp, and warm/cold storage conditions in under 2 minutes.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3EFE6] flex items-center gap-1.5 text-xs font-semibold text-[#006C48]">
                <Clock className="w-3.5 h-3.5" />
                <span>Takes &lt; 120 seconds</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-[#006C48] font-mono text-base font-bold mb-4">
                  02
                </span>
                <h3 className="text-lg font-bold text-[#012D1D] mb-2">Verify Viability</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Automated food safety checklists cross-reference temperature thresholds, safe transit windows, and municipal food rescue guidelines.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3EFE6] flex items-center gap-1.5 text-xs font-semibold text-[#006C48]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ISO 22000 Protocol</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-[#006C48] font-mono text-base font-bold mb-4">
                  03
                </span>
                <h3 className="text-lg font-bold text-[#012D1D] mb-2">Match & Claim</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Nearby shelter kitchens receive proximity-based alerts and claim the exact portion count needed, avoiding waste at shelter dropoff.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3EFE6] flex items-center gap-1.5 text-xs font-semibold text-[#006C48]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Hyper-local &lt; 5km radius</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-[#006C48] font-mono text-base font-bold mb-4">
                  04
                </span>
                <h3 className="text-lg font-bold text-[#012D1D] mb-2">Swift Delivery</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Vetted volunteer riders or thermal-insulated vans collect and deliver the food direct to the community kitchen with digital proof-of-handover.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3EFE6] flex items-center gap-1.5 text-xs font-semibold text-[#006C48]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Digital Proof of Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE RADAR FEED (Available Surplus Ready Right Now) */}
      <section className="py-16 bg-white border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#006C48]">
                Live Radar Feed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012D1D] tracking-tight">
                Available Surplus Ready Right Now
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('find-food')}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#006C48] hover:text-[#012D1D] hover:underline"
            >
              <span>View All 38 Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {radarListings.map((item) => (
              <div
                key={item.id}
                className="bg-[#FDFBF7] border border-[#EAE5DC] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.expiryFormatted}
                    </span>
                    <span className="text-gray-500 font-medium">
                      📍 {item.distanceKm} km away
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#012D1D] mb-1.5">
                    {item.donorName}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white border border-[#EAE5DC] rounded text-[11px] font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE5DC] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#012D1D]">{item.portions}</span>
                    <span className="text-xs text-gray-500 ml-1">Portions</span>
                  </div>
                  <button
                    onClick={() => onOpenClaimModal(item)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-[#012D1D] text-white hover:bg-[#1B4332] transition-colors"
                  >
                    Claim for Shelter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PARTNER SPOTLIGHT */}
      <section className="py-16 bg-[#FDFBF7] border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* Photo Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 sm:h-80 bg-[#1B4332]">
              <img
                src={HOTLINK_IMAGES.localFoodDistribution}
                alt="St. Joseph Shelter Volunteers Handing Meals"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white mb-1">
                  <ShieldCheck className="w-3 h-3" /> Field Verified Rescue
                </span>
                <h4 className="text-base font-bold">St. Joseph Shelter & Community Harvest</h4>
                <p className="text-xs text-gray-300">Downtown Metro District</p>
              </div>
            </div>

            {/* Testimonial Quote Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                  Partner Spotlight
                </span>
                <blockquote className="text-lg sm:text-xl font-medium text-[#012D1D] leading-relaxed italic">
                  “200 gourmet meals arrived steaming hot exactly 34 minutes after the Tech Summit concluded. Instead of landfill bins, 80 families had a nourishing, dignity-centered evening meal.”
                </blockquote>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#012D1D] text-white flex items-center justify-center font-bold text-sm">
                  MJ
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#012D1D]">Mary Jenkins</h5>
                  <p className="text-xs text-[#4B5563]">
                    Director of Logistics, St. Joseph Shelter
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F3EFE6]">
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-wider">
                    Before vs After AnnAasha
                  </span>
                  <span className="text-sm font-bold text-[#012D1D]">
                    Zero Food Shortages on Weekends
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-wider">
                    Carbon Prevented
                  </span>
                  <span className="text-sm font-bold text-[#006C48]">
                    420 kg CO₂e
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAST-TRACK INTAKE CALL TO ACTION */}
      <section className="py-14 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#012D1D] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
            {/* Ambient Leaf Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#52B788]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#52B788]/20 text-[#52B788] text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  Fast-Track Intake
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Have Surplus Food Today?{' '}
                  <span className="text-[#52B788]">Turn It Into Meals</span> in Under 5 Minutes.
                </h2>
                <p className="text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                  Every tray of untouched banquet food or fresh bakery surplus represents an opportunity to restore nutrition and dignity. Zero listing fees, zero liability under the Good Samaritan act.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  onClick={() => setCurrentView('donate-food')}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#52B788] text-[#012D1D] hover:bg-[#92F7C3] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Register as Donor
                </button>
                <button
                  onClick={() => setCurrentView('ops-hub')}
                  className="w-full py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Join Volunteer Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
