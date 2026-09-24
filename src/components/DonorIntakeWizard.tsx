import React, { useState } from 'react';
import { HOTLINK_IMAGES, SurplusListing } from '../data/mockData';
import {
  Utensils,
  Package,
  Wheat,
  Apple,
  Milk,
  Boxes,
  CheckCircle2,
  ShieldCheck,
  Thermometer,
  Clock,
  ArrowRight,
  ArrowLeft,
  Truck,
  Leaf,
  Info,
  Sparkles
} from 'lucide-react';

interface DonorIntakeWizardProps {
  onBatchCreated: (newBatch: SurplusListing) => void;
  setCurrentView: (view: string) => void;
}

export const DonorIntakeWizard: React.FC<DonorIntakeWizardProps> = ({
  onBatchCreated,
  setCurrentView,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [foodDescription, setFoodDescription] = useState('Freshly Prepared Vegetable Biryani & Raita');
  const [classification, setClassification] = useState<'hot-meals' | 'packaged' | 'bakery' | 'produce' | 'dairy' | 'banquet'>('hot-meals');
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [isVegan, setIsVegan] = useState(false);
  const [isHalal, setIsHalal] = useState(true);
  const [isGlutenFriendly, setIsGlutenFriendly] = useState(false);
  const [quantityKg, setQuantityKg] = useState<number>(35);

  // Step 2 Safety State
  const [holdingTemp, setHoldingTemp] = useState('68');
  const [cookedTime, setCookedTime] = useState('18:30');
  const [sealedCheck, setSealedCheck] = useState(true);
  const [cleanSurfacesCheck, setCleanSurfacesCheck] = useState(true);

  // Step 3 Logistics State
  const [donorLocation, setDonorLocation] = useState('Grand Hyatt Regency - Loading Dock B');
  const [pickupSlot, setPickupSlot] = useState('4:30 PM - 5:15 PM');
  const [courierNotes, setCourierNotes] = useState('Security gate requires driver photo ID. Food packaged in stackable thermal insulated boxes.');

  // Calculation: ~250g standard portion per meal
  const estimatedMeals = Math.round((quantityKg * 1000) / 250);
  const estimatedCo2e = Math.round(quantityKg * 3.0); // 3kg CO2e per kg prepared food

  const classifications = [
    { id: 'hot-meals', label: 'Cooked Hot Meals', icon: Utensils },
    { id: 'packaged', label: 'Packaged Dry', icon: Package },
    { id: 'bakery', label: 'Bakery & Bread', icon: Wheat },
    { id: 'produce', label: 'Fresh Produce', icon: Apple },
    { id: 'dairy', label: 'Chilled Dairy', icon: Milk },
    { id: 'banquet', label: 'Banquet Trays', icon: Boxes },
  ];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ANN-2026-${Math.floor(880000 + Math.random() * 10000)}`;
    const newBatch: SurplusListing = {
      id: newId,
      title: foodDescription,
      donorName: 'Grand Hyatt Kitchen (Registered)',
      donorType: 'Hotel & Catering',
      category: classification === 'packaged' ? 'dry-goods' : classification === 'dairy' ? 'dairy' : classification,
      description: `${foodDescription}. ${quantityKg} kg prepared food under safe holding temperature (${holdingTemp}°C).`,
      portions: estimatedMeals,
      weightKg: quantityKg,
      expiryMinutes: 120,
      expiryFormatted: 'Exp: 2h 00m',
      distanceKm: 1.5,
      holdingTemp: `${holdingTemp}°C Hot Hold`,
      tags: [
        isVegetarian ? 'Vegetarian' : 'Standard',
        isHalal ? 'Halal Certified' : '',
        'Thermal Insulated'
      ].filter(Boolean),
      dietary: {
        vegetarian: isVegetarian,
        vegan: isVegan,
        halal: isHalal,
        glutenFree: isGlutenFriendly,
      },
      pickupSlot: pickupSlot,
      address: donorLocation,
      status: 'available',
      lat: 37.7749,
      lng: -122.4194,
      co2eDiverted: estimatedCo2e
    };

    onBatchCreated(newBatch);
    alert(`Surplus Meal Batch ${newId} published! Instant notification sent to local shelter registries and volunteer riders.`);
    setCurrentView('ops-hub');
  };

  return (
    <div className="w-full bg-[#FDFBF7] text-[#121C2A] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006C48]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                Surplus Intake Dispatch Portal
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#012D1D] tracking-tight">
              List Surplus Meal Batch
            </h1>
            <p className="text-sm text-[#4B5563] mt-1 max-w-2xl">
              Connect high-quality restaurant, caterer, or banquet surplus directly to vetted shelters and community pantries within safe holding thresholds.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#52B788]/15 text-[#006C48] border border-[#52B788]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Good Samaritan Shield Active
            </span>
            <span className="text-xs font-mono font-bold text-gray-500 bg-white px-2.5 py-1.5 rounded-lg border border-[#EAE5DC]">
              Batch ID: ANN-2026-884920
            </span>
          </div>
        </div>

        {/* Stepper Wizard Bar */}
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: 1, label: 'Food Details', stepText: 'STEP 1' },
              { num: 2, label: 'Safety & Handling', stepText: 'STEP 2' },
              { num: 3, label: 'Pickup & Logistics', stepText: 'STEP 3' },
              { num: 4, label: 'Review & Submit', stepText: 'STEP 4' },
            ].map((step) => {
              const active = currentStep === step.num;
              const completed = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
                    active
                      ? 'bg-[#E6EEFF] text-[#012D1D] border border-[#C1C8C2]/40'
                      : completed
                      ? 'bg-[#52B788]/10 text-[#006C48]'
                      : 'hover:bg-[#F3EFE6] text-gray-500'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      active
                        ? 'bg-[#012D1D] text-white'
                        : completed
                        ? 'bg-[#006C48] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {completed ? '✓' : step.num}
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-500">
                      {step.stepText}
                    </span>
                    <span className="block text-xs font-bold truncate">{step.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form and Live Intake Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Phase Card */}
          <div className="lg:col-span-7 bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Step 1: Food Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                      Phase 1 / 4
                    </span>
                    <h2 className="text-xl font-bold text-[#012D1D]">Surplus Food Information</h2>
                  </div>
                  <Utensils className="w-5 h-5 text-[#006C48]" />
                </div>

                {/* Batch Description Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                    Batch or Food Description *
                  </label>
                  <input
                    type="text"
                    value={foodDescription}
                    onChange={(e) => setFoodDescription(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                    placeholder="e.g. Freshly Prepared Vegetable Biryani & Raita"
                  />
                  <span className="block text-[11px] text-[#6B7280] mt-1.5">
                    Specify culinary style and contents accurately for dietary sorting.
                  </span>
                </div>

                {/* Surplus Classification Tiles */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-2.5">
                    Surplus Classification *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {classifications.map((item) => {
                      const selected = classification === item.id;
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setClassification(item.id as any)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                            selected
                              ? 'bg-[#012D1D] border-[#012D1D] text-white shadow-sm'
                              : 'bg-[#F8F9FB] border-[#EAE5DC] text-gray-700 hover:bg-[#F3EFE6]'
                          }`}
                        >
                          <IconComp className={`w-5 h-5 mb-2 ${selected ? 'text-[#52B788]' : 'text-gray-500'}`} />
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dietary Verification Checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-2.5">
                    Dietary Verification
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE5DC] bg-[#F8F9FB] cursor-pointer hover:bg-white transition-colors">
                      <input
                        type="checkbox"
                        checked={isVegetarian}
                        onChange={(e) => setIsVegetarian(e.target.checked)}
                        className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                      />
                      <span className="text-xs font-semibold text-gray-800">Vegetarian</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE5DC] bg-[#F8F9FB] cursor-pointer hover:bg-white transition-colors">
                      <input
                        type="checkbox"
                        checked={isVegan}
                        onChange={(e) => setIsVegan(e.target.checked)}
                        className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                      />
                      <span className="text-xs font-semibold text-gray-800">Vegan</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE5DC] bg-[#F8F9FB] cursor-pointer hover:bg-white transition-colors">
                      <input
                        type="checkbox"
                        checked={isHalal}
                        onChange={(e) => setIsHalal(e.target.checked)}
                        className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                      />
                      <span className="text-xs font-semibold text-gray-800">Halal Certified</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE5DC] bg-[#F8F9FB] cursor-pointer hover:bg-white transition-colors">
                      <input
                        type="checkbox"
                        checked={isGlutenFriendly}
                        onChange={(e) => setIsGlutenFriendly(e.target.checked)}
                        className="w-4 h-4 text-[#006C48] accent-[#006C48] rounded"
                      />
                      <span className="text-xs font-semibold text-gray-800">Gluten-Friendly</span>
                    </label>
                  </div>
                </div>

                {/* Total Quantity & Estimated Meal Yield */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                      Total Quantity (kg) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={quantityKg}
                        onChange={(e) => setQuantityKg(Number(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-lg font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                      />
                      <span className="px-3 py-3 bg-[#F3EFE6] border border-[#EAE5DC] rounded-xl font-bold text-xs text-gray-600">
                        KG
                      </span>
                    </div>
                  </div>

                  {/* Calculated Yield Box */}
                  <div className="p-4 bg-[#012D1D] text-white rounded-2xl shadow-sm">
                    <span className="block text-[11px] uppercase tracking-wider text-[#52B788] font-bold">
                      Estimated Rescue Yield
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold text-[#52B788]">
                        {estimatedMeals}
                      </span>
                      <span className="text-sm font-semibold text-gray-200">
                        Standard Meals
                      </span>
                    </div>
                    <span className="block text-[10px] text-gray-300 mt-1">
                      Basis: ~250g calorically balanced portion
                    </span>
                  </div>
                </div>

                {/* Wizard Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Next: Food Safety Checklist</span>
                    <ArrowRight className="w-4 h-4 text-[#52B788]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Safety & Handling */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                      Phase 2 / 4
                    </span>
                    <h2 className="text-xl font-bold text-[#012D1D]">Food Safety & Holding Verification</h2>
                  </div>
                  <Thermometer className="w-5 h-5 text-[#006C48]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                      Audited Internal Temp (°C) *
                    </label>
                    <input
                      type="number"
                      value={holdingTemp}
                      onChange={(e) => setHoldingTemp(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-base font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                    />
                    <span className="block text-[11px] text-gray-500 mt-1">
                      Hot food threshold: &gt;60°C. Cold food threshold: &lt;5°C.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                      Batch Preparation Time *
                    </label>
                    <input
                      type="time"
                      value={cookedTime}
                      onChange={(e) => setCookedTime(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-base font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                    />
                    <span className="block text-[11px] text-gray-500 mt-1">
                      Verified cooking or packaging completion.
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#EAE5DC] bg-[#F8F9FB] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sealedCheck}
                      onChange={(e) => setSealedCheck(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#006C48] accent-[#006C48] rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-gray-900 block">Food-Grade Packaging & Tamper-Evident Seals</span>
                      <span className="text-gray-500">
                        Meals are packed in sanitized food-grade kraft boxes or stainless thermal cambros.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#EAE5DC] bg-[#F8F9FB] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cleanSurfacesCheck}
                      onChange={(e) => setCleanSurfacesCheck(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#006C48] accent-[#006C48] rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-gray-900 block">FSSAI / Hazard Analysis Compliance</span>
                      <span className="text-gray-500">
                        Staff handled food with gloves, hairnets, and verified no cross-contact with common allergens.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Next: Pickup Logistics</span>
                    <ArrowRight className="w-4 h-4 text-[#52B788]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Logistics */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                      Phase 3 / 4
                    </span>
                    <h2 className="text-xl font-bold text-[#012D1D]">Pickup & Route Logistics</h2>
                  </div>
                  <Truck className="w-5 h-5 text-[#006C48]" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                    Facility Dock / Entrance Address *
                  </label>
                  <input
                    type="text"
                    value={donorLocation}
                    onChange={(e) => setDonorLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                    Preferred Pickup Window *
                  </label>
                  <input
                    type="text"
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#012D1D] mb-1.5">
                    Courier Access Notes & Parking
                  </label>
                  <textarea
                    rows={3}
                    value={courierNotes}
                    onChange={(e) => setCourierNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#EAE5DC] rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 bg-[#012D1D] hover:bg-[#1B4332] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Next: Review & Submit</span>
                    <ArrowRight className="w-4 h-4 text-[#52B788]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                      Phase 4 / 4
                    </span>
                    <h2 className="text-xl font-bold text-[#012D1D]">Review & Dispatch Batch</h2>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#52B788]" />
                </div>

                <div className="bg-[#F8F9FB] border border-[#EAE5DC] rounded-2xl p-5 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                    <span className="text-gray-500">Meal Description:</span>
                    <span className="font-bold text-[#012D1D]">{foodDescription}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                    <span className="text-gray-500">Total Weight & Yield:</span>
                    <span className="font-bold text-[#006C48]">{quantityKg} kg ({estimatedMeals} Meals)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                    <span className="text-gray-500">Holding Temperature:</span>
                    <span className="font-bold text-[#012D1D]">{holdingTemp}°C</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                    <span className="text-gray-500">Pickup Location:</span>
                    <span className="font-bold text-[#012D1D]">{donorLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pickup Window:</span>
                    <span className="font-bold text-[#012D1D]">{pickupSlot}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    By publishing this batch, you certify adherence to safe culinary holding practices. This intake triggers automated geo-proximity alerts to verified local shelters.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#006C48] hover:bg-[#012D1D] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#92F7C3]" />
                    <span>Publish Surplus Batch Now</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Live Intake Preview Card (Matches Image 8 precisely) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#EAE5DC] rounded-3xl p-5 sm:p-6 shadow-md space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006C48] animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006C48]">
                    Live Intake Preview
                  </span>
                </div>
                <span className="text-xs font-mono text-gray-400">#ANN-884920</span>
              </div>

              {/* Photo Card with Overlay */}
              <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#1B4332]">
                <img
                  src={HOTLINK_IMAGES.localKitchenPacking}
                  alt="Kitchen Packing Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#012D1D]/90 text-white uppercase tracking-wider">
                    {classification.toUpperCase()}
                  </span>
                  <div className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 text-[#012D1D] backdrop-blur-sm">
                    Portions: <span className="font-extrabold">{estimatedMeals}</span>
                  </div>
                </div>

                <div className="absolute bottom-3 inset-x-3 text-white">
                  <h3 className="text-base font-bold leading-snug truncate">
                    {foodDescription}
                  </h3>
                </div>
              </div>

              {/* Batch Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-[#F8F9FB] rounded-xl border border-[#EAE5DC]">
                <div className="p-1">
                  <span className="block text-[10px] text-gray-500 uppercase">Batch Weight</span>
                  <span className="text-sm font-bold text-[#012D1D]">{quantityKg} kg</span>
                </div>
                <div className="p-1 border-x border-[#EAE5DC]">
                  <span className="block text-[10px] text-gray-500 uppercase">Holding Temp</span>
                  <span className="text-sm font-bold text-[#006C48]">Hot &gt;{holdingTemp}°C</span>
                </div>
                <div className="p-1">
                  <span className="block text-[10px] text-gray-500 uppercase">Pickup Slot</span>
                  <span className="text-sm font-bold text-[#012D1D]">{pickupSlot.split('-')[0]}</span>
                </div>
              </div>

              {/* Environmental & Social Impact Card (Image 8 Green Box) */}
              <div className="p-4 rounded-2xl bg-[#012D1D] text-white space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#52B788] uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Environmental & Social Impact</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-extrabold text-[#52B788]">{estimatedCo2e}</span>
                    <span className="block text-[11px] text-gray-300">kg CO₂e Diverted</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">{estimatedMeals}</span>
                    <span className="block text-[11px] text-gray-300">Individuals Nourished</span>
                  </div>
                </div>

                <p className="text-[10px] text-emerald-200/80 pt-1 border-t border-emerald-800/60 leading-relaxed">
                  Based on WRAP emission factor indices for prepared vegetarian hot meals.
                </p>
              </div>

              {/* Verified Specifications */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#012D1D] block uppercase tracking-wider text-[11px]">
                  Verified Specifications
                </span>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006C48]" /> Donor Entity
                  </span>
                  <span className="font-bold text-[#012D1D]">Grand Hyatt Kitchen</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006C48]" /> Safe Window
                  </span>
                  <span className="font-bold text-[#012D1D]">4 hrs valid</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006C48]" /> Packaging Type
                  </span>
                  <span className="font-bold text-[#012D1D]">Kraft Boxes (Eco-sealed)</span>
                </div>
              </div>

              {/* Courier Gear Request Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-[#F3EFE6]">
                <span>Need immediate cold storage boxes?</span>
                <button
                  type="button"
                  onClick={() => alert('Courier Gear dispatch request sent! Insulated cambros arriving in ~18 minutes.')}
                  className="font-bold text-[#006C48] hover:underline"
                >
                  Request Courier Gear ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
