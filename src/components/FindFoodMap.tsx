import React, { useState, useMemo } from 'react';
import { HOTLINK_IMAGES, SurplusListing } from '../data/mockData';
import {
  Search,
  MapPin,
  Clock,
  Thermometer,
  ShieldCheck,
  Flame,
  Filter,
  Navigation,
  CheckCircle2,
  Layers,
  Sparkles,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface FindFoodMapProps {
  listings: SurplusListing[];
  onOpenClaimModal: (listing: SurplusListing) => void;
}

export const FindFoodMap: React.FC<FindFoodMapProps> = ({
  listings,
  onOpenClaimModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'feed'>('split');
  const [radiusFilter, setRadiusFilter] = useState<number>(10);
  const [criticalOnly, setCriticalOnly] = useState<boolean>(false);
  const [selectedListing, setSelectedListing] = useState<SurplusListing | null>(listings[0] || null);

  // Filters
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category filter
      if (selectedCategory === 'cooked' && item.category !== 'hot-meals' && item.category !== 'banquet') return false;
      if (selectedCategory === 'bakery' && item.category !== 'bakery') return false;
      if (selectedCategory === 'produce' && item.category !== 'produce') return false;
      if (selectedCategory === 'dry' && item.category !== 'dry-goods') return false;
      if (selectedCategory === 'veg' && !item.dietary.vegetarian) return false;
      if (selectedCategory === 'halal' && !item.dietary.halal) return false;

      // Critical filter (< 60 minutes)
      if (criticalOnly && item.expiryMinutes > 60) return false;

      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDonor = item.donorName.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDonor && !matchesDesc) return false;
      }

      return true;
    });
  }, [listings, selectedCategory, criticalOnly, searchTerm]);

  return (
    <div className="w-full bg-[#FDFBF7] text-[#121C2A] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Telemetry Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#EAE5DC]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006C48] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                Real-Time Rescue Grid
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#012D1D] tracking-tight">
              Available Food Telemetry & Allocation
            </h1>
          </div>

          {/* Metric Telemetry Pills */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-[#EAE5DC] px-4 py-2 rounded-xl text-left shadow-sm">
              <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Metro Surplus
              </span>
              <span className="text-lg font-bold text-[#012D1D]">840 kg</span>
            </div>
            <div className="bg-white border border-[#EAE5DC] px-4 py-2 rounded-xl text-left shadow-sm">
              <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Avg Transit Window
              </span>
              <span className="text-lg font-bold text-[#006C48]">38 mins</span>
            </div>
            <div className="bg-white border border-[#EAE5DC] px-4 py-2 rounded-xl text-left shadow-sm">
              <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Shelters Matched
              </span>
              <span className="text-lg font-bold text-emerald-700">92%</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search available food by cuisine, donor, or area (e.g. Artisanal bread, Marriott, Downtown)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              />
            </div>

            {/* View Mode Toggle & Critical Switch */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#F3EFE6] p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'split' ? 'bg-white text-[#012D1D] shadow-sm font-bold' : 'text-gray-600'
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'map' ? 'bg-white text-[#012D1D] shadow-sm font-bold' : 'text-gray-600'
                  }`}
                >
                  Full Map
                </button>
                <button
                  onClick={() => setViewMode('feed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'feed' ? 'bg-white text-[#012D1D] shadow-sm font-bold' : 'text-gray-600'
                  }`}
                >
                  Feed Only
                </button>
              </div>

              <button
                onClick={() => setCriticalOnly(!criticalOnly)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  criticalOnly
                    ? 'bg-[#E07A5F] text-white shadow-sm'
                    : 'bg-[#E07A5F]/15 text-[#9E3F27] hover:bg-[#E07A5F]/25'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical &lt;1h (3)</span>
              </button>
            </div>
          </div>

          {/* Sub-Filters: Radius + Category Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F3EFE6] text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 font-medium">FILTER:</span>
              <select
                value={radiusFilter}
                onChange={(e) => setRadiusFilter(Number(e.target.value))}
                className="px-2.5 py-1 bg-[#F8F9FB] border border-[#EAE5DC] rounded-lg font-semibold text-gray-800"
              >
                <option value={5}>Within 5 km</option>
                <option value={10}>Within 10 km</option>
                <option value={25}>Within 25 km</option>
              </select>

              {[
                { id: 'all', label: 'All Surplus' },
                { id: 'cooked', label: 'Cooked Meals (8)' },
                { id: 'bakery', label: 'Bakery & Pastries (3)' },
                { id: 'produce', label: 'Farm Produce (2)' },
                { id: 'dry', label: 'Dry Goods (1)' },
                { id: 'veg', label: '• 100% Veg' },
                { id: 'halal', label: 'Halal Certified' },
              ].map((pill) => {
                const active = selectedCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setSelectedCategory(pill.id)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      active
                        ? 'bg-[#012D1D] text-white shadow-sm'
                        : 'bg-[#F8F9FB] text-gray-700 hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setCriticalOnly(false);
                setSearchTerm('');
              }}
              className="text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div
          className={`grid gap-6 ${
            viewMode === 'split'
              ? 'grid-cols-1 lg:grid-cols-12'
              : viewMode === 'map'
              ? 'grid-cols-1'
              : 'grid-cols-1'
          }`}
        >
          {/* MAP COLUMN */}
          {(viewMode === 'split' || viewMode === 'map') && (
            <div
              className={`${
                viewMode === 'split' ? 'lg:col-span-7' : 'w-full'
              } flex flex-col bg-white border border-[#EAE5DC] rounded-3xl p-5 shadow-sm space-y-4`}
            >
              {/* Map Top Indicator */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-gray-800">Live GPS Sync</span>
                  <span>• Radius: {radiusFilter} km</span>
                  <span className="hidden sm:inline">• Lat 37.7749 / Long -122.4194</span>
                </div>
                <span className="font-mono text-xs">Updated 14s ago</span>
              </div>

              {/* Styled Interactive Cartography View */}
              <div
                className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-inner border border-[#EAE5DC] bg-[#E5ECE4]"
                style={{
                  backgroundImage: `url(${HOTLINK_IMAGES.mapBackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay Grid lines */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                {/* Simulated Pins on Map */}
                {/* Pin 1: Grand Hyatt */}
                <div
                  onClick={() => setSelectedListing(listings[0])}
                  className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="px-2.5 py-1 rounded-full bg-[#012D1D] text-white text-xs font-bold flex items-center gap-1 shadow-lg group-hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#52B788]"></span>
                    <span>120 Meals</span>
                  </div>
                </div>

                {/* Pin 2: Grand Regency Caterers (Active Focus Pin from Image 10) */}
                <div
                  onClick={() => setSelectedListing(listings[1])}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="px-2.5 py-1 rounded-full bg-[#006C48] text-white text-xs font-bold flex items-center gap-1 shadow-lg border-2 border-white ring-4 ring-[#52B788]/30 group-hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#92F7C3] animate-pulse"></span>
                    <span>85 Meals</span>
                  </div>
                </div>

                {/* Pin 3: Whole Foods Produce */}
                <div
                  onClick={() => setSelectedListing(listings[4])}
                  className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="px-2 py-0.5 rounded-full bg-[#E07A5F] text-white text-xs font-bold flex items-center gap-1 shadow-md group-hover:scale-110 transition-transform">
                    <span>40 kg</span>
                  </div>
                </div>

                {/* Pin 4: Volunteer Rider Amit (in transit) */}
                <div className="absolute top-[60%] left-[38%] flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/95 text-[#012D1D] text-[10px] font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span>Rider Amit (e-Bike)</span>
                </div>

                {/* Floating Active Marker Focus Card (Matches Image 10 precisely) */}
                {selectedListing && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md border border-[#EAE5DC] rounded-2xl p-4 shadow-xl text-left space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>ACTIVE MARKER FOCUS</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#E07A5F]/15 text-[#9E3F27] font-bold text-[11px]">
                        {selectedListing.expiryFormatted}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#012D1D]">{selectedListing.donorName}</h4>
                      <p className="text-xs text-[#4B5563] mt-0.5 line-clamp-2">
                        {selectedListing.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {selectedListing.distanceKm} km away
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#006C48]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        ISO Inspected
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenClaimModal(selectedListing)}
                      className="w-full py-2.5 rounded-xl bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Request Food Now</span>
                      <Navigation className="w-3.5 h-3.5 text-[#52B788]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Sensor Logs Note */}
              <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-[#F3EFE6]">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-emerald-600" />
                  <span>Temperature logging enabled across refrigerated volunteer transit network.</span>
                </div>
                <button
                  onClick={() => alert('Opening Municipal Sensor Telemetry Log: All nodes report average transit temperature 4.1°C (Chilled) and 67.8°C (Hot Hold). Compliant with FSSAI regulations.')}
                  className="font-bold text-[#006C48] hover:underline"
                >
                  View Sensor Logs →
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE DONATIONS FEED COLUMN */}
          {(viewMode === 'split' || viewMode === 'feed') && (
            <div
              className={`${
                viewMode === 'split' ? 'lg:col-span-5' : 'w-full'
              } flex flex-col space-y-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006C48]"></span>
                  <h3 className="font-bold text-sm text-[#012D1D]">
                    {filteredListings.length} Active Donations
                  </h3>
                </div>
                <span className="text-xs text-gray-500 font-semibold">
                  Sort: <span className="text-[#012D1D]">Most Urgent</span>
                </span>
              </div>

              {/* Feed Card List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedListing(item)}
                    className={`bg-white border rounded-2xl p-4.5 space-y-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedListing?.id === item.id
                        ? 'border-[#006C48] ring-2 ring-[#52B788]/20'
                        : 'border-[#EAE5DC]'
                    }`}
                  >
                    {/* Top status & expiry */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 font-bold text-[#006C48]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Safe
                      </span>
                      <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-[#E07A5F]/15 text-[#9E3F27]">
                        ⏱ {item.expiryFormatted}
                      </span>
                    </div>

                    {/* Title & Donor */}
                    <div>
                      <h4 className="text-sm font-bold text-[#012D1D] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Donor: <span className="font-semibold text-gray-700">{item.donorName}</span> • {item.distanceKm} km away
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#F8F9FB] border border-[#EAE5DC] rounded text-[11px] text-gray-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom action row */}
                    <div className="pt-2 border-t border-[#F3EFE6] flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Safe until: <span className="font-bold text-gray-700">8:30 PM</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenClaimModal(item);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-xs transition-colors"
                      >
                        Request This Food
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
