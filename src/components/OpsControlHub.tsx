import React, { useState } from 'react';
import {
  HOTLINK_IMAGES,
  VerificationItem,
  ShelterDemand,
  ActiveDelivery,
  INITIAL_VERIFICATION_QUEUE,
  INITIAL_SHELTER_DEMANDS,
  INITIAL_ACTIVE_DELIVERIES,
  INITIAL_SURPLUS_LISTINGS,
  SurplusListing
} from '../data/mockData';
import {
  LayoutDashboard,
  Boxes,
  Truck,
  Building2,
  Map,
  ShieldCheck,
  CheckCircle2,
  Clock,
  QrCode,
  Bell,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  PlusCircle,
  Send,
  Thermometer,
  Navigation,
  Sparkles,
  Inbox,
  Filter,
  Check,
  Phone,
  Flame,
  Snowflake,
  ExternalLink,
  Users,
  Search,
  Radio,
  MapPin
} from 'lucide-react';

interface OpsControlHubProps {
  setCurrentView: (view: string) => void;
  activeDemoStep: number;
  setActiveDemoStep: (step: number) => void;
  onOpenQRScanner: () => void;
}

export const OpsControlHub: React.FC<OpsControlHubProps> = ({
  setCurrentView,
  activeDemoStep,
  setActiveDemoStep,
  onOpenQRScanner,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'donor' | 'admin' | 'shelter' | 'dispatch'>('all');
  const [queueItems, setQueueItems] = useState<VerificationItem[]>(INITIAL_VERIFICATION_QUEUE);
  const [shelterDemands, setShelterDemands] = useState<ShelterDemand[]>(INITIAL_SHELTER_DEMANDS);
  const [activeDeliveries, setActiveDeliveries] = useState<ActiveDelivery[]>(INITIAL_ACTIVE_DELIVERIES);
  const [emergencyAlertActive, setEmergencyAlertActive] = useState(false);
  const [zeroStateActive, setZeroStateActive] = useState(false);

  // Donor batches filter & state
  const [donorFilter, setDonorFilter] = useState<'all' | 'banquet' | 'bakery' | 'produce' | 'hot-meals'>('all');
  const [donorSearch, setDonorSearch] = useState('');
  const [donorBatches, setDonorBatches] = useState<SurplusListing[]>(INITIAL_SURPLUS_LISTINGS);

  // Dispatch filter & route states
  const [dispatchRoutes, setDispatchRoutes] = useState([
    {
      id: 'ROUTE-ANN-492',
      courier: 'Maya R.',
      vehicle: 'Electric Cargo Scooter #V-902',
      pickup: 'Grand Hyatt Kitchen (Dock B)',
      dropoff: 'Hope Harbor Community Shelter Gate',
      items: '120 Hot Meals (Biryani & Pilaf)',
      weight: '35 kg',
      temp: '64.2°C (Safe Hot Hold)',
      eta: '8 mins',
      speed: '28 km/h',
      status: 'in-transit',
      checkpoints: 3,
      totalCheckpoints: 4,
    },
    {
      id: 'ROUTE-ANN-493',
      courier: 'Alex Chen',
      vehicle: 'Refrigerated Metro Van #04',
      pickup: 'Whole Foods Logistics Dock 4',
      dropoff: 'St. Joseph Shelter Pantry',
      items: '40 kg Fresh Organic Apples & Greens',
      weight: '40 kg',
      temp: '3.8°C (Cold Stored)',
      eta: '14 mins',
      speed: '34 km/h',
      status: 'in-transit',
      checkpoints: 2,
      totalCheckpoints: 4,
    },
    {
      id: 'ROUTE-ANN-494',
      courier: 'Liam Vance',
      vehicle: 'Rapid Urban E-Bike #B-12',
      pickup: 'Artisan Sourdough Bakery',
      dropoff: 'Downtown Women’s Haven',
      items: '40 Fresh Sourdough Loaves & Rolls',
      weight: '18 kg',
      temp: 'Ambient Dry (21°C)',
      eta: '4 mins',
      speed: '19 km/h',
      status: 'arriving',
      checkpoints: 3,
      totalCheckpoints: 4,
    },
    {
      id: 'ROUTE-ANN-495',
      courier: 'Priya Sharma',
      vehicle: 'Zero-Emission Cargo Trike #T-07',
      pickup: 'Google Campus Cafeteria Hub',
      dropoff: 'Tenderloin Family Harvest',
      items: '150 Steamed Veg Bowls & Stew',
      weight: '45 kg',
      temp: '69.0°C (Safe Hot Hold)',
      eta: '22 mins',
      speed: '22 km/h',
      status: 'dispatched',
      checkpoints: 1,
      totalCheckpoints: 4,
    },
  ]);

  // Field checklist state for courier
  const [checkSanitized, setCheckSanitized] = useState(true);
  const [checkLoadingDock, setCheckLoadingDock] = useState(true);
  const [checkSeals, setCheckSeals] = useState(true);
  const [checkGateQR, setCheckGateQR] = useState(false);

  const stepDetails = {
    1: {
      title: '1. Donor Listing Submitted',
      desc: 'Grand Hyatt Regency submitted 120 hot meals from conference lunch.',
      actionText: 'View Listing Manifest',
    },
    2: {
      title: '2. Admin Safety Checklist Verified',
      desc: 'Digital temperature sensor log (68°C) verified by Compliance Officer Sarah M. compliant with FSSAI.',
      actionText: 'View QA Sheet',
    },
    3: {
      title: '3. Shelter Matching Claim Approved',
      desc: 'Hope Harbor Shelter reserved 80 portions with immediate dinner distribution plan.',
      actionText: 'Notify Shelter Kitchen',
    },
    4: {
      title: '4. Active Telemetry: Volunteer Courier Maya R.',
      desc: 'Honda e-Scooter #V-902 • Carrying: Insulated hot-pack Box #14 & #15 • Internal sensor: 64.2°C',
      actionText: 'Advance To Step 5',
    },
    5: {
      title: '5. Shelter Gate Handshake Verified',
      desc: 'Digital proof-of-delivery signed via QR scan at Hope Harbor Gate. 80 meals received.',
      actionText: 'Cycle Complete & Archived',
    },
  };

  const currentDetail = stepDetails[activeDemoStep as keyof typeof stepDetails] || stepDetails[4];

  const handleActionVerify = (id: string, action: 'approve' | 'decline' | 'details') => {
    if (action === 'approve') {
      setQueueItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
      );
      alert(`Donation ${id} APPROVED and auto-routed to nearest active shelter demand!`);
    } else if (action === 'decline') {
      setQueueItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'declined' } : item))
      );
      alert(`Donation ${id} flagged for compliance re-inspection.`);
    } else {
      alert(`Viewing thermal log sheet & food safety metadata for ${id}: 68°C hold maintained, verified packaging.`);
    }
  };

  const handleBroadcastEmergency = () => {
    setEmergencyAlertActive(true);
    setTimeout(() => {
      alert('Broadcast Hunger Alert sent to 12 nearby catering partners. 2 hotels acknowledged availability!');
      setEmergencyAlertActive(false);
    }, 1500);
  };

  const handleAssignFastCourier = (batchId: string) => {
    alert(`Fast-track courier dispatched to pick up batch ${batchId}. ETA to kitchen loading dock: 7 minutes.`);
    setDonorBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: 'in-transit' } : b))
    );
  };

  const handleClaimDemand = (demandId: string, shelterName: string) => {
    alert(`Matched surplus batch to ${shelterName} (Requisition #${demandId}). Driver routed.`);
    setShelterDemands((prev) => prev.filter((d) => d.id !== demandId));
  };

  const advanceNext = () => {
    if (activeDemoStep < 5) {
      setActiveDemoStep(activeDemoStep + 1);
    } else {
      alert('Full Redistribution Cycle Successfully Completed and Archived!');
      setActiveDemoStep(1);
    }
  };

  // Filter donor batches
  const filteredBatches = donorBatches.filter((b) => {
    const matchesCategory = donorFilter === 'all' || b.category === donorFilter;
    const matchesSearch =
      b.title.toLowerCase().includes(donorSearch.toLowerCase()) ||
      b.donorName.toLowerCase().includes(donorSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(donorSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] text-[#121C2A]">
      {/* SIDEBAR NAVIGATION (Matches Image 12 & HTML snippet) */}
      <aside className="w-64 lg:w-72 bg-white border-r border-[#EAE5DC] flex flex-col justify-between p-4 shrink-0 hidden md:flex">
        <div className="space-y-6">
          {/* Logo Brand Lockup */}
          <div className="flex items-center gap-2.5 px-2">
            <img
              src={HOTLINK_IMAGES.logo}
              alt="AnnAasha Official Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#012D1D] leading-none">AnnAasha</span>
              <span className="text-[10px] uppercase font-bold text-[#006C48] tracking-wider mt-1">
                Ops Control Hub
              </span>
            </div>
          </div>

          {/* Active Pipeline Card */}
          <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Active Pipeline</span>
              <span className="text-[#006C48] font-bold">98.4% On-Time</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-[#006C48] w-4/5 rounded-full"></div>
            </div>
          </div>

          {/* Nav Items (Directly mapped to dedicated interactive views) */}
          <nav className="space-y-1 text-sm font-semibold">
            {/* Button 1: Portal Matrix */}
            <button
              onClick={() => setActiveTab('all')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-[#012D1D] text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:bg-[#F3EFE6] hover:text-[#012D1D]'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Portal Matrix</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-[#EAE5DC] text-gray-700'
                }`}
              >
                LIVE
              </span>
            </button>

            {/* Button 2: Donor Batches */}
            <button
              onClick={() => setActiveTab('donor')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'donor'
                  ? 'bg-[#012D1D] text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:bg-[#F3EFE6] hover:text-[#012D1D]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes className="w-4 h-4" />
                <span>Donor Batches</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'donor' ? 'bg-[#52B788] text-[#012D1D]' : 'bg-emerald-100 text-[#006C48]'
                }`}
              >
                {donorBatches.length} Batches
              </span>
            </button>

            {/* Button 3: Route Dispatch */}
            <button
              onClick={() => setActiveTab('dispatch')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'dispatch'
                  ? 'bg-[#012D1D] text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:bg-[#F3EFE6] hover:text-[#012D1D]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>Route Dispatch</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'dispatch' ? 'bg-[#52B788] text-[#012D1D]' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {dispatchRoutes.length} Active
              </span>
            </button>

            {/* Button 4: Shelter Needs */}
            <button
              onClick={() => setActiveTab('shelter')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'shelter'
                  ? 'bg-[#012D1D] text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:bg-[#F3EFE6] hover:text-[#012D1D]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Shelter Needs</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'shelter' ? 'bg-[#E07A5F] text-white' : 'bg-orange-100 text-[#9E3F27]'
                }`}
              >
                {shelterDemands.length} Urgent
              </span>
            </button>

            {/* Button 5: Live Fleet Map */}
            <button
              onClick={() => setCurrentView('find-food')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-[#F3EFE6] hover:text-[#012D1D] transition-all"
            >
              <div className="flex items-center gap-3">
                <Map className="w-4 h-4" />
                <span>Live Fleet Map</span>
              </div>
              <span className="text-[10px] text-gray-400">GPS</span>
            </button>

            {/* Button 6: Safety & QA */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#012D1D] text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:bg-[#F3EFE6] hover:text-[#012D1D]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Safety & QA</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'admin' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
                }`}
              >
                {queueItems.filter((q) => q.status === 'pending').length} QA
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
          <div className="p-3 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#006C48] animate-pulse"></span>
              <span className="font-semibold text-[#012D1D]">Cold Chain Node #408</span>
            </div>
            <span className="font-bold text-[#006C48]">+3.8°C</span>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-600 hover:text-[#012D1D] hover:bg-[#F3EFE6] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Home</span>
          </button>
        </div>
      </aside>

      {/* MAIN OPERATIONS VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-[#EAE5DC] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8F9FB] border border-[#EAE5DC] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#006C48]"></span>
              <span className="font-medium text-gray-700">
                Active Module: {activeTab === 'all' && 'Portal Matrix (System Overview)'}
                {activeTab === 'donor' && 'Donor Batches & Kitchen Surplus'}
                {activeTab === 'dispatch' && 'Volunteer Route Dispatch & Telemetry'}
                {activeTab === 'shelter' && 'Shelter Demands & Requisitions'}
                {activeTab === 'admin' && 'Safety & QA Compliance Queue'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => alert('Telemetry Feed: All active nodes reporting temperatures within safe thresholds (3.8°C chilled, 68°C hot-hold).')}
              className="relative p-2 rounded-xl text-gray-600 hover:bg-[#F3EFE6] transition-colors"
              title="System Alerts"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600"></span>
            </button>

            <button
              onClick={() => setCurrentView('donate-food')}
              className="px-3.5 py-1.5 rounded-xl bg-[#006C48] text-white text-xs font-bold hover:bg-[#012D1D] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Log Surplus Batch</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-[#EAE5DC]">
              <img
                src={HOTLINK_IMAGES.profileCoordinator}
                alt="Operations Lead"
                className="w-8 h-8 rounded-full border border-[#006C48] object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                }}
              />
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-[#012D1D] block leading-tight">Sarah M.</span>
                <span className="text-[10px] text-gray-500">Ops Coordinator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Ops Hub Content Container */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header & Role Switcher Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006C48]"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006C48]">
                  AnnAasha Operations Control
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#012D1D] tracking-tight">
                {activeTab === 'all' && 'Role & Operations Control Center'}
                {activeTab === 'donor' && 'Donor Batches & Kitchen Surplus Intake'}
                {activeTab === 'dispatch' && 'Volunteer Route Dispatch & GPS Fleet'}
                {activeTab === 'shelter' && 'NGO & Shelter Needs Requisition Board'}
                {activeTab === 'admin' && 'Food Safety Compliance & QA Signoff Queue'}
              </h1>
              <p className="text-xs text-[#4B5563] mt-0.5">
                {activeTab === 'all' && 'End-to-end pipeline linking surplus hot meals, temperature safety audits, shelter demands, and volunteer transport.'}
                {activeTab === 'donor' && 'Manage fresh prepared meals, banquet surplus, bakery batches, and commercial kitchen intake.'}
                {activeTab === 'dispatch' && 'Live GPS telemetry, courier assignments, route timings, and recipient gate QR handshakes.'}
                {activeTab === 'shelter' && 'Real-time resident demand, critical meal shortages, pantry inventory, and emergency broadcast dispatch.'}
                {activeTab === 'admin' && 'Compliance with Food Safety standards, hazard inspection, and temperature audit logs.'}
              </p>
            </div>

            {/* Role Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F3EFE6] rounded-xl overflow-x-auto">
              {[
                { id: 'all', label: 'All Portals Matrix' },
                { id: 'donor', label: 'Donor Batches' },
                { id: 'dispatch', label: 'Route Dispatch' },
                { id: 'shelter', label: 'Shelter Needs' },
                { id: 'admin', label: 'Safety & QA' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#012D1D] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: ALL PORTALS MATRIX (Combined High-Level Stepper & Quad Dashboard) */}
          {/* ========================================================================= */}
          {activeTab === 'all' && (
            <>
              {/* Hero Visual Banner */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#012D1D] text-white p-6 sm:p-8 shadow-md">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-xl space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#52B788]/20 text-[#52B788] text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Hackathon Rapid Match Engine 2.4 Active
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                      Saving fresh banquet meals in minutes, not hours.
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                      Zero commercial food wastage through automated food-safety verification, AI route grouping, and direct-to-pantry handoffs.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={advanceNext}
                        className="px-4 py-2 rounded-xl bg-[#52B788] text-[#012D1D] hover:bg-[#92F7C3] text-xs font-bold transition-all shadow-sm"
                      >
                        Advance Demo Step
                      </button>
                      <button
                        onClick={() => setZeroStateActive(!zeroStateActive)}
                        className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold transition-all"
                      >
                        {zeroStateActive ? 'Restore Stream' : 'Simulate Zero-State'}
                      </button>
                    </div>
                  </div>

                  {/* Mini Telemetry Pill Widget */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col gap-3 min-w-[260px] border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-200 uppercase font-bold tracking-wider text-[10px]">
                        Today's Diverted Food
                      </span>
                      <span className="text-[#92F7C3] font-bold">+34.8% vs avg</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">7,810</span>
                      <span className="text-xs text-emerald-200 font-medium">meals rescued</span>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#52B788] h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-[10px] text-gray-300">
                      Target for 24h cycle: 10,000 meals (78% achieved)
                    </span>
                  </div>
                </div>
              </div>

              {/* Zero-State Container if triggered */}
              {zeroStateActive ? (
                <div className="bg-white p-12 rounded-2xl border border-[#EAE5DC] text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#006C48] mx-auto flex items-center justify-center">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#012D1D]">No Active Rescue Batches in Queue</h3>
                  <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                    All surplus donations have been safely matched and completed. New incoming supplier telemetry will appear instantly.
                  </p>
                  <button
                    onClick={() => setZeroStateActive(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#012D1D] text-white font-bold text-xs hover:bg-[#1B4332]"
                  >
                    Restore Operational Stream
                  </button>
                </div>
              ) : (
                <>
                  {/* SECTION 1: INTERACTIVE END-TO-END STEPPER */}
                  <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                          Live Flow Stepper
                        </span>
                        <h3 className="text-lg font-bold text-[#012D1D]">
                          Primary Redistribution Lifecycle
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#52B788]/20 text-[#006C48]">
                        Step {activeDemoStep} Active
                      </span>
                    </div>

                    {/* 5 Nodes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {[
                        { num: 1, title: '1. Donor Listing', desc: 'Grand Hyatt lists 120 Meals (18:45)', status: 'COMPLETED' },
                        { num: 2, title: '2. Admin Safety QA', desc: 'Compliance Officer Sarah verified checklist', status: 'APPROVED' },
                        { num: 3, title: '3. Shelter Matching', desc: 'Hope Harbor Shelter claims 80 hot portions', status: 'CLAIMED' },
                        { num: 4, title: '4. Dispatch Courier', desc: 'Maya accepts pickup (2.1 km away in transit)', status: 'IN TRANSIT' },
                        { num: 5, title: '5. Final QR Scan', desc: 'Handshake verification at Hope Harbor Gate', status: 'PENDING ARRIVAL' },
                      ].map((node) => {
                        const isSelected = activeDemoStep === node.num;
                        const isPast = activeDemoStep > node.num;
                        return (
                          <div
                            key={node.num}
                            onClick={() => setActiveDemoStep(node.num)}
                            className={`cursor-pointer p-4 rounded-xl border transition-all ${
                              isSelected
                                ? 'bg-[#52B788]/15 border-[#006C48] shadow-sm'
                                : isPast
                                ? 'bg-[#F8F9FB] border-[#EAE5DC]'
                                : 'bg-[#F8F9FB] border-[#EAE5DC] opacity-75'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isSelected
                                    ? 'bg-[#006C48] text-white'
                                    : isPast
                                    ? 'bg-[#012D1D] text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {node.num}
                              </span>
                              {isPast && <CheckCircle2 className="w-4 h-4 text-[#006C48]" />}
                            </div>
                            <h4 className="text-xs font-bold text-[#012D1D]">{node.title}</h4>
                            <p className="text-[11px] text-[#4B5563] mt-1 leading-snug">{node.desc}</p>
                            <span className="block mt-2 text-[10px] font-bold text-[#006C48] uppercase tracking-wider">
                              {node.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dynamic Step Detail Card */}
                    <div className="p-4 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#52B788]/20 text-[#006C48] flex items-center justify-center shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#012D1D]">{currentDetail.title}</h4>
                          <p className="text-xs text-[#4B5563] mt-0.5">{currentDetail.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={advanceNext}
                        className="px-4 py-2 rounded-xl bg-[#012D1D] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors whitespace-nowrap self-end sm:self-auto"
                      >
                        {currentDetail.actionText}
                      </button>
                    </div>
                  </div>

                  {/* 4 Quadrants Quick Switch Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                      onClick={() => setActiveTab('donor')}
                      className="cursor-pointer bg-white p-5 rounded-2xl border border-[#EAE5DC] hover:border-[#006C48] transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006C48] flex items-center justify-center group-hover:bg-[#006C48] group-hover:text-white transition-colors">
                          <Boxes className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#006C48] flex items-center gap-1">
                          Open Hub →
                        </span>
                      </div>
                      <span className="text-2xl font-extrabold text-[#012D1D] block">8 Batches</span>
                      <span className="text-xs font-bold text-gray-800 block mt-0.5">Donor Surplus Intake</span>
                      <p className="text-[11px] text-gray-500 mt-1">186 kg hot meals & bakery batches waiting</p>
                    </div>

                    <div
                      onClick={() => setActiveTab('dispatch')}
                      className="cursor-pointer bg-white p-5 rounded-2xl border border-[#EAE5DC] hover:border-[#006C48] transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                          <Truck className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                          Track Routes →
                        </span>
                      </div>
                      <span className="text-2xl font-extrabold text-[#012D1D] block">12 Couriers</span>
                      <span className="text-xs font-bold text-gray-800 block mt-0.5">Route Dispatch & Fleet</span>
                      <p className="text-[11px] text-gray-500 mt-1">4 routes en route • 14 min average ETA</p>
                    </div>

                    <div
                      onClick={() => setActiveTab('shelter')}
                      className="cursor-pointer bg-white p-5 rounded-2xl border border-[#EAE5DC] hover:border-[#E07A5F] transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E3F27] flex items-center justify-center group-hover:bg-[#E07A5F] group-hover:text-white transition-colors">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#9E3F27] flex items-center gap-1">
                          View Needs →
                        </span>
                      </div>
                      <span className="text-2xl font-extrabold text-[#012D1D] block">410 Portions</span>
                      <span className="text-xs font-bold text-gray-800 block mt-0.5">Shelter Demands</span>
                      <p className="text-[11px] text-gray-500 mt-1">5 registered pantries requesting immediate dinner</p>
                    </div>

                    <div
                      onClick={() => setActiveTab('admin')}
                      className="cursor-pointer bg-white p-5 rounded-2xl border border-[#EAE5DC] hover:border-purple-600 transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                          Inspect →
                        </span>
                      </div>
                      <span className="text-2xl font-extrabold text-[#012D1D] block">100% Passed</span>
                      <span className="text-xs font-bold text-gray-800 block mt-0.5">Safety & QA Signoffs</span>
                      <p className="text-[11px] text-gray-500 mt-1">3 batches awaiting digital checklist audit</p>
                    </div>
                  </div>

                  {/* WEEKLY PERFORMANCE DASHBOARD (BAR CHART + DONUT CHART) */}
                  <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                          Weekly Performance Dashboard
                        </span>
                        <h3 className="text-lg font-bold text-[#012D1D]">
                          Redistribution Volume & Categorical Diversity
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Last updated: Just now</span>
                        <button
                          onClick={() => alert('Metrics re-synchronized with central telemetry server.')}
                          className="p-1 rounded-lg hover:bg-gray-100"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* SVG Bar Chart: Daily meals rescued */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#012D1D]">Daily Meals Rescued (This Week)</span>
                          <span className="font-bold text-[#006C48]">Total: 7,810 Meals</span>
                        </div>

                        <div className="w-full h-44 flex items-end justify-between gap-3 pt-6 px-4 bg-[#F8F9FB] rounded-xl border border-[#EAE5DC]">
                          {[
                            { day: 'Mon', count: '850', height: '35%' },
                            { day: 'Tue', count: '1,120', height: '46%' },
                            { day: 'Wed', count: '1,450', height: '59%' },
                            { day: 'Thu', count: '1,890', height: '77%' },
                            { day: 'Fri', count: '2,450', height: '100%', active: true },
                          ].map((bar, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                              <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                {bar.count}
                              </span>
                              <div
                                className={`w-full rounded-t-lg transition-all ${
                                  bar.active ? 'bg-[#006C48]' : 'bg-[#52B788]/40 hover:bg-[#52B788]'
                                }`}
                                style={{ height: bar.height }}
                              />
                              <span className={`text-xs font-bold ${bar.active ? 'text-[#006C48]' : 'text-gray-500'}`}>
                                {bar.day}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
                          <span>Target baseline: 1,000 / day</span>
                          <span className="text-[#006C48] font-bold">▲ 29.8% week-over-week</span>
                        </div>
                      </div>

                      {/* SVG Donut Chart: Categories share */}
                      <div className="lg:col-span-5 space-y-3">
                        <span className="font-bold text-xs text-[#012D1D] block">
                          Rescue Categories Share
                        </span>
                        <div className="flex items-center justify-center gap-6 p-4 bg-[#F8F9FB] rounded-xl border border-[#EAE5DC]">
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-gray-200"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="text-[#012D1D]"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeDasharray="45, 100"
                                strokeWidth="4"
                              />
                              <path
                                className="text-[#006C48]"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeDasharray="25, 100"
                                strokeDashoffset="-45"
                                strokeWidth="4"
                              />
                              <path
                                className="text-[#E07A5F]"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeDasharray="20, 100"
                                strokeDashoffset="-70"
                                strokeWidth="4"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-base font-extrabold text-[#012D1D]">100%</span>
                              <span className="text-[10px] text-gray-500">Verified</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#012D1D]" />
                              <span>45% Banquet Meals</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#006C48]" />
                              <span>25% Fresh Produce</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
                              <span>20% Bakery</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#52B788]" />
                              <span>10% Packaged</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: DONOR BATCHES (Dedicated Surplus Intake & Batch Management View)    */}
          {/* ========================================================================= */}
          {activeTab === 'donor' && (
            <div className="space-y-6">
              {/* Donor Batches KPI Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Active Donor Batches</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">{donorBatches.length}</span>
                    <span className="text-xs font-semibold text-[#006C48]">4 Dispatched</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Across 4 major hotel catering kitchens</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Surplus Rescued</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#006C48]">186 kg</span>
                    <span className="text-xs font-semibold text-[#52B788]">545 meals</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">372 kg CO2e emissions avoided</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Holding Temp Audits</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">100%</span>
                    <span className="text-xs font-bold text-[#006C48]">Compliant</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Avg 68.4°C hot hold / 3.8°C cold hold</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Intake Fast Action</span>
                  <button
                    onClick={() => setCurrentView('donate-food')}
                    className="w-full mt-2 py-2.5 px-3 bg-[#006C48] hover:bg-[#012D1D] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ List New Surplus Batch</span>
                  </button>
                </div>
              </div>

              {/* Commercial Warmer & Cooler Telemetry Grid */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-[#006C48]" />
                    <h3 className="text-sm font-bold text-[#012D1D]">Kitchen Holding Telemetry & Active Sensor Logs</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-[#006C48] bg-emerald-50 px-2.5 py-1 rounded-full">
                    4 Live IoT Sensors
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#012D1D] block">Grand Hyatt Banquet Warmer #2</span>
                      <span className="text-[10px] text-gray-500">Lentil & Pilaf Trays</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      68.2°C Hot
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#012D1D] block">Marriott Ballroom Cambro #4</span>
                      <span className="text-[10px] text-gray-500">Dal Makhani & Paneer</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      72.0°C Hot
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#012D1D] block">Whole Foods Chiller Dock 4</span>
                      <span className="text-[10px] text-gray-500">Apples & Salad Greens</span>
                    </div>
                    <span className="font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      3.8°C Cold
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#012D1D] block">Artisan Bakery Staging Rack</span>
                      <span className="text-[10px] text-gray-500">Sourdough & Loaves</span>
                    </div>
                    <span className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      21.0°C Dry
                    </span>
                  </div>
                </div>
              </div>

              {/* Donor Batches Management Table */}
              <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#012D1D]">Surplus Food Batches Registry</h3>
                    <p className="text-xs text-gray-500">
                      Real-time inventory from partner catering hubs, banquets, corporate cafeterias, and bakeries.
                    </p>
                  </div>

                  {/* Search and Category Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search batch or donor..."
                        value={donorSearch}
                        onChange={(e) => setDonorSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#006C48] w-48"
                      />
                    </div>

                    <div className="flex items-center gap-1 bg-[#F3EFE6] p-1 rounded-xl text-xs">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'banquet', label: 'Banquet' },
                        { id: 'hot-meals', label: 'Hot Meals' },
                        { id: 'bakery', label: 'Bakery' },
                        { id: 'produce', label: 'Produce' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setDonorFilter(tab.id as any)}
                          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                            donorFilter === tab.id ? 'bg-[#012D1D] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#121C2A]">
                    <thead>
                      <tr className="bg-[#F8F9FB] text-gray-500 uppercase tracking-wider font-bold">
                        <th className="p-3 rounded-l-lg">Batch ID</th>
                        <th className="p-3">Surplus Description</th>
                        <th className="p-3">Donor Venue</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Holding Temp</th>
                        <th className="p-3">Safe Window</th>
                        <th className="p-3">Dispatch Status</th>
                        <th className="p-3 rounded-r-lg text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFE6]">
                      {filteredBatches.map((batch) => (
                        <tr key={batch.id} className="hover:bg-[#F8F9FB]/60 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#012D1D]">{batch.id}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#012D1D] block">{batch.title}</span>
                            <span className="text-[11px] text-gray-500 line-clamp-1">{batch.description}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-gray-800 block">{batch.donorName}</span>
                            <span className="text-[10px] text-gray-500">{batch.donorType}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#006C48] font-bold block w-fit">
                              {batch.portions} portions
                            </span>
                            <span className="text-[10px] text-gray-500">{batch.weightKg} kg</span>
                          </td>
                          <td className="p-3 font-medium">
                            <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                              <Thermometer className="w-3 h-3 text-[#006C48]" />
                              {batch.holdingTemp}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-[#E07A5F]">{batch.expiryFormatted}</span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                batch.status === 'available'
                                  ? 'bg-emerald-100 text-[#006C48]'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {batch.status === 'available' ? 'Awaiting Dispatch' : 'Courier Assigned'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {batch.status === 'available' ? (
                                <button
                                  onClick={() => handleAssignFastCourier(batch.id)}
                                  className="px-2.5 py-1 rounded-lg bg-[#006C48] text-white font-semibold hover:bg-[#012D1D] transition-colors"
                                >
                                  Assign Courier
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setActiveTab('dispatch');
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
                                >
                                  Track Courier
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  alert(`Printing Food Safety Manifest & Barcode Label for Batch ${batch.id}.\nTemperature: ${batch.holdingTemp}\nPrep: Verified.`);
                                }}
                                className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                title="Print Barcode Tag"
                              >
                                Tag QR
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ROUTE DISPATCH & VOLUNTEER FLEET (Dedicated Dispatch Operations)  */}
          {/* ========================================================================= */}
          {activeTab === 'dispatch' && (
            <div className="space-y-6">
              {/* Dispatch KPI Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Active Couriers on Route</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">{dispatchRoutes.length}</span>
                    <span className="text-xs font-semibold text-[#006C48]">All GPS Tracked</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Zero delay reported across corridors</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Average Transit Time</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#006C48]">14.2 min</span>
                    <span className="text-xs font-semibold text-emerald-600">-3.4 min vs target</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Thermal insulation hold maintained</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">On-Time Delivery Rate</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">98.4%</span>
                    <span className="text-xs font-bold text-[#006C48]">Target: 95%</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">142 successful drops this week</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Gatekeeper Verification</span>
                  <button
                    onClick={onOpenQRScanner}
                    className="w-full mt-2 py-2.5 px-3 bg-[#012D1D] hover:bg-[#1B4332] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan Recipient Gate QR</span>
                  </button>
                </div>
              </div>

              {/* Interactive Fleet GPS Map Banner & Telemetry Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#012D1D]">
                        Real-time GPS Fleet Telemetry & Transit Corridors
                      </h3>
                      <span className="text-xs text-[#4B5563]">
                        Active Metro Transit Cluster • West Corridor & Downtown Node
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#52B788]/20 text-[#006C48] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#006C48] animate-ping" />
                      <span>Live GPS Track</span>
                    </span>
                  </div>

                  {/* Map with floating HUD badges */}
                  <div
                    className="relative w-full h-80 rounded-xl overflow-hidden shadow-inner border border-[#EAE5DC] bg-cover bg-center"
                    style={{ backgroundImage: `url(${HOTLINK_IMAGES.mapBackground})` }}
                  >
                    {/* Route 1 Pin & Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-md space-y-1 text-xs max-w-xs border border-emerald-100">
                      <div className="flex items-center justify-between font-bold text-[#012D1D]">
                        <div className="flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-[#006C48]" />
                          <span>Route ANN-TR-492</span>
                        </div>
                        <span className="text-[#006C48] font-bold">ETA: 8m</span>
                      </div>
                      <p className="text-[11px] text-gray-600">Grand Hyatt → Hope Harbor Community Shelter</p>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#006C48] pt-1 border-t border-gray-100">
                        <span>Courier: Maya R. (Scooter)</span>
                        <span>Holding Temp: 64.2°C</span>
                      </div>
                    </div>

                    {/* Route 2 Pin & Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md text-xs border border-blue-100">
                      <div className="flex items-center gap-2 font-bold text-[#012D1D]">
                        <Truck className="w-3.5 h-3.5 text-blue-700" />
                        <span>Van #04 (Alex Chen) • Whole Foods Hub</span>
                      </div>
                      <span className="text-[10px] text-gray-600">Chilled Box: 3.8°C • Speed: 34 km/h</span>
                    </div>

                    {/* Cooling Sensor Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md flex items-center gap-2 text-xs font-bold text-[#012D1D]">
                      <span className="w-2 h-2 rounded-full bg-[#006C48] animate-pulse"></span>
                      <span>Thermal Bag Seals: Verified Intact</span>
                    </div>
                  </div>
                </div>

                {/* Field Checklist Verification Card */}
                <div className="lg:col-span-4 bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#006C48]" />
                        <h3 className="text-lg font-bold text-[#012D1D]">Field Checklist</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#006C48] text-white">
                        Active Route
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">
                      Mandatory safety procedures for courier handover and thermal integrity assurance.
                    </p>

                    {/* Checklist */}
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F8F9FB] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkSanitized}
                          onChange={(e) => setCheckSanitized(e.target.checked)}
                          className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                        />
                        <span className={checkSanitized ? 'line-through text-gray-400' : 'text-gray-700'}>
                          Thermal insulated transit bag sanitized & armed
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F8F9FB] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkLoadingDock}
                          onChange={(e) => setCheckLoadingDock(e.target.checked)}
                          className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                        />
                        <span className={checkLoadingDock ? 'line-through text-gray-400' : 'text-gray-700'}>
                          Reached Grand Hyatt loading dock (19:02)
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F8F9FB] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkSeals}
                          onChange={(e) => setCheckSeals(e.target.checked)}
                          className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                        />
                        <span className={checkSeals ? 'line-through text-gray-400' : 'text-gray-700'}>
                          Inspected tamper-evident security seals & temperature (64°C)
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#006C48] bg-emerald-50/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkGateQR}
                          onChange={(e) => {
                            setCheckGateQR(e.target.checked);
                            if (e.target.checked) {
                              onOpenQRScanner();
                            }
                          }}
                          className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                        />
                        <span className="font-bold text-[#012D1D]">
                          Scan Recipient Shelter Gate QR Code
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#012D1D]">3.4 km total</span>
                    <span className="font-semibold text-[#006C48]">~14 mins travel</span>
                    <button
                      onClick={onOpenQRScanner}
                      className="px-3.5 py-1.5 rounded-xl bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Scan QR</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Routes Table */}
              <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#012D1D]">Active Dispatch Queues & Vehicle Telemetry</h3>
                    <p className="text-xs text-gray-500">Live courier position, assigned cargo weight, and estimated gate arrival.</p>
                  </div>
                  <span className="text-xs font-bold text-[#006C48] bg-emerald-50 px-3 py-1 rounded-full">
                    {dispatchRoutes.length} Active Fleet Routes
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#121C2A]">
                    <thead>
                      <tr className="bg-[#F8F9FB] text-gray-500 uppercase tracking-wider font-bold">
                        <th className="p-3 rounded-l-lg">Route Code</th>
                        <th className="p-3">Courier / Driver</th>
                        <th className="p-3">Pickup Venue</th>
                        <th className="p-3">Destination Shelter</th>
                        <th className="p-3">Cargo Details</th>
                        <th className="p-3">Live Telemetry</th>
                        <th className="p-3">ETA</th>
                        <th className="p-3 rounded-r-lg text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFE6]">
                      {dispatchRoutes.map((route) => (
                        <tr key={route.id} className="hover:bg-[#F8F9FB]/60 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#012D1D]">{route.id}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#012D1D] block">{route.courier}</span>
                            <span className="text-[10px] text-gray-500">{route.vehicle}</span>
                          </td>
                          <td className="p-3 text-gray-700 font-medium">{route.pickup}</td>
                          <td className="p-3 font-semibold text-[#006C48]">{route.dropoff}</td>
                          <td className="p-3">
                            <span className="font-bold text-gray-800 block">{route.items}</span>
                            <span className="text-[10px] text-gray-500">{route.weight}</span>
                          </td>
                          <td className="p-3">
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                              {route.temp}
                            </span>
                            <span className="block text-[10px] text-gray-500 mt-0.5">{route.speed}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-[#006C48]">{route.eta}</span>
                            <span className="block text-[10px] text-gray-400">On Schedule</span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={onOpenQRScanner}
                                className="px-2.5 py-1 rounded-lg bg-[#006C48] text-white font-semibold hover:bg-[#012D1D] transition-colors"
                              >
                                Handshake QR
                              </button>
                              <button
                                onClick={() => alert(`Calling ${route.courier} dispatch channel... Connected via hands-free radio.`)}
                                className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                title="Radio Courier"
                              >
                                Radio
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: SHELTER NEEDS (Dedicated NGO Demands & Requisitions View)          */}
          {/* ========================================================================= */}
          {activeTab === 'shelter' && (
            <div className="space-y-6">
              {/* Shelter KPI Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Registered Pantries & Shelters</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">14</span>
                    <span className="text-xs font-semibold text-[#006C48]">5 Active Today</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">100% vetted 501(c)(3) / NGO partners</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Daily Demand</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#9E3F27]">410</span>
                    <span className="text-xs font-semibold text-orange-600">Portions Needed</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Evening meal service window</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Fulfilled & In-Transit</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#006C48]">280</span>
                    <span className="text-xs font-semibold text-emerald-600">68% Covered</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">130 portion deficit gap remaining</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Urgent Requisition</span>
                  <button
                    onClick={handleBroadcastEmergency}
                    disabled={emergencyAlertActive}
                    className="w-full mt-2 py-2.5 px-3 bg-[#E07A5F] hover:bg-[#D0694E] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{emergencyAlertActive ? 'Broadcasting...' : 'Broadcast Hunger Alert'}</span>
                  </button>
                </div>
              </div>

              {/* Emergency Hunger Alert Banner */}
              <div className="p-4 rounded-2xl bg-[#E07A5F]/15 border border-[#E07A5F]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#9E3F27]">1-Click Emergency Requisition Broadcast</h4>
                    <p className="text-xs text-[#9E3F27]">
                      Instantly alert all commercial kitchens within a 5 km radius to prioritize immediate surplus collection for shelters facing shortfalls.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleBroadcastEmergency}
                  disabled={emergencyAlertActive}
                  className="px-4 py-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-sm transition-colors"
                >
                  {emergencyAlertActive ? 'Sending Signal...' : 'Trigger Rapid Match'}
                </button>
              </div>

              {/* Shelter Demands Table & In-Flight Deliveries */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-8 bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#012D1D]">Verified Shelter Requisitions</h3>
                      <p className="text-xs text-gray-500">Live request orders posted by shelter intake coordinators.</p>
                    </div>
                    <span className="text-xs font-bold text-[#006C48] bg-emerald-50 px-2.5 py-1 rounded-full">
                      {shelterDemands.length} Active Orders
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#121C2A]">
                      <thead>
                        <tr className="bg-[#F8F9FB] text-gray-500 uppercase tracking-wider font-bold">
                          <th className="p-3 rounded-l-lg">Req ID</th>
                          <th className="p-3">Shelter Facility</th>
                          <th className="p-3">Portions Needed</th>
                          <th className="p-3">Urgency Status</th>
                          <th className="p-3">Dietary Constraints</th>
                          <th className="p-3">Distance</th>
                          <th className="p-3 rounded-r-lg text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F3EFE6]">
                        {shelterDemands.map((demand) => (
                          <tr key={demand.id} className="hover:bg-[#F8F9FB]/60 transition-colors">
                            <td className="p-3 font-mono font-bold text-[#012D1D]">{demand.id}</td>
                            <td className="p-3 font-bold text-[#012D1D]">{demand.shelterName}</td>
                            <td className="p-3">
                              <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-[#9E3F27] font-bold">
                                {demand.requestedPortions} meals
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  demand.urgency === 'critical'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {demand.urgency === 'critical' ? 'Critical < 1h' : 'Moderate'}
                              </span>
                            </td>
                            <td className="p-3 text-gray-600 font-medium">{demand.dietaryPreference}</td>
                            <td className="p-3 font-semibold text-[#006C48]">{demand.distanceKm} km</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleClaimDemand(demand.id, demand.shelterName)}
                                className="px-3 py-1.5 rounded-xl bg-[#006C48] hover:bg-[#012D1D] text-white font-bold text-xs transition-colors"
                              >
                                Match Batch
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* In-Flight Deliveries to Shelters */}
                <div className="xl:col-span-4 bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#006C48]" />
                        <h3 className="text-lg font-bold text-[#012D1D]">In-Flight Deliveries</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#52B788]/20 text-[#006C48]">
                        En Route
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeDeliveries.map((del) => (
                        <div
                          key={del.id}
                          className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#EAE5DC] space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between font-bold text-[#012D1D]">
                            <span>{del.shelterName}</span>
                            <span className="text-[#006C48]">ETA {del.etaMinutes} mins</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-500 text-[11px]">
                            <span>Batch #{del.batchId} • {del.courierName}</span>
                            <span className="font-semibold text-gray-700">{del.portions} portions</span>
                          </div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="bg-[#006C48] h-full rounded-full w-3/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('find-food')}
                    className="w-full py-2.5 rounded-xl bg-[#012D1D] hover:bg-[#1B4332] text-white text-xs font-bold transition-colors text-center"
                  >
                    View All 14 Partner Shelters on Map
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: ADMIN SAFETY & QA (Dedicated Food Safety & Health Inspector View)  */}
          {/* ========================================================================= */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              {/* Admin KPI Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">FSSAI / FDA Compliance</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">100%</span>
                    <span className="text-xs font-bold text-[#006C48]">Section 14 Valid</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Digital signoff on every dispatched meal</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Average QA Score</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#006C48]">96.4</span>
                    <span className="text-xs font-semibold text-gray-600">/ 100</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Thermal, packaging & hygiene rating</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Batches Inspected Today</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-[#012D1D]">24</span>
                    <span className="text-xs font-semibold text-[#006C48]">0 Violations</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">All cold-chain sensors active</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Inspection Status</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006C48] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#012D1D]">Live Auditing Active</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">Inspector: Sarah M. (ID: #INSP-882)</span>
                </div>
              </div>

              {/* Admin Verification Queue Table */}
              <div className="bg-white border border-[#EAE5DC] p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#006C48]" />
                      <h3 className="text-lg font-bold text-[#012D1D]">
                        Admin Verification & Compliance Queue
                      </h3>
                    </div>
                    <span className="text-xs text-[#4B5563]">
                      Food Safety Act Section 14 Compliant Signoffs for Commercial Kitchen Donations
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E07A5F]/15 text-[#9E3F27]">
                    Pending Review: {queueItems.filter((i) => i.status === 'pending').length} batches awaiting signoff
                  </span>
                </div>

                {/* Verification Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#121C2A]">
                    <thead>
                      <tr className="bg-[#F8F9FB] text-gray-500 uppercase tracking-wider font-bold">
                        <th className="p-3 rounded-l-lg">Donation ID</th>
                        <th className="p-3">Donor Entity</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Qty / Weight</th>
                        <th className="p-3">Holding Temp</th>
                        <th className="p-3">Safe Window</th>
                        <th className="p-3">QA Score</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 rounded-r-lg text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFE6]">
                      {queueItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F8F9FB]/60 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#012D1D]">{item.id}</td>
                          <td className="p-3 font-semibold text-[#012D1D]">{item.donorName}</td>
                          <td className="p-3 text-gray-600">{item.description}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold block w-fit">
                              {item.quantity}
                            </span>
                            <span className="text-[10px] text-gray-500">{item.weightKg} kg</span>
                          </td>
                          <td className="p-3 font-medium text-emerald-800">
                            {item.holdingTemp}
                          </td>
                          <td className="p-3 font-semibold text-[#E07A5F]">{item.expiryWindow}</td>
                          <td className="p-3 font-bold text-[#006C48]">
                            ✓ {item.qaScore}/100
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                item.status === 'approved'
                                  ? 'bg-emerald-100 text-[#006C48]'
                                  : item.status === 'declined'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => handleActionVerify(item.id, 'approve')}
                                    className="px-2.5 py-1 rounded-lg bg-[#006C48] text-white font-semibold hover:bg-[#012D1D] transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleActionVerify(item.id, 'details')}
                                    className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                  >
                                    Inspect
                                  </button>
                                  <button
                                    onClick={() => handleActionVerify(item.id, 'decline')}
                                    className="px-2 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                  >
                                    Decline
                                  </button>
                                </>
                              ) : (
                                <span className="text-[11px] font-bold text-gray-500">Audit Logged</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
