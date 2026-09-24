import React, { useState } from 'react';
import { SurplusListing } from '../data/mockData';
import { X, CheckCircle2, ShieldCheck, Thermometer, MapPin, Clock, Truck } from 'lucide-react';

interface ClaimModalProps {
  listing: SurplusListing | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmClaim: (listingId: string, portions: number, shelterName: string) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  listing,
  isOpen,
  onClose,
  onConfirmClaim,
}) => {
  if (!isOpen || !listing) return null;

  const [portionsToClaim, setPortionsToClaim] = useState(
    Math.min(listing.portions, 80)
  );
  const [shelterName, setShelterName] = useState('Hope Harbor Community Shelter');
  const [notes, setNotes] = useState('Urgent dinner service requirement (6:30 PM banquet distribution)');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      onConfirmClaim(listing.id, portionsToClaim, shelterName);
      setConfirmed(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFBF7] border border-[#EAE5DC] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transition-all">
        {/* Modal Header */}
        <div className="bg-[#012D1D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse"></span>
            <span className="font-bold text-sm tracking-wide">Shelter Requisition Handshake</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#012D1D]">Allocation Verified!</h3>
            <p className="text-sm text-[#4B5563]">
              {portionsToClaim} portions from <span className="font-semibold">{listing.donorName}</span> have been allocated to <span className="font-semibold">{shelterName}</span>. Dispatch notification sent to nearby volunteer couriers.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-mono">
              Audit Code: #ANN-CLAIM-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Batch Info Card */}
            <div className="bg-white border border-[#EAE5DC] p-4 rounded-xl space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#006C48] font-bold">
                    BATCH: {listing.id}
                  </span>
                  <h4 className="text-base font-bold text-[#121C2A]">{listing.title}</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E07A5F]/15 text-[#9E3F27]">
                  {listing.expiryFormatted}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#4B5563] pt-2 border-t border-[#F3EFE6]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{listing.donorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{listing.holdingTemp}</span>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#012D1D] uppercase tracking-wider mb-1">
                  Recipient Shelter / Pantry
                </label>
                <select
                  value={shelterName}
                  onChange={(e) => setShelterName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DC] rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#52B788] focus:outline-none"
                >
                  <option value="Hope Harbor Community Shelter">Hope Harbor Community Shelter (2.1 km away)</option>
                  <option value="St. Joseph Shelter & Community Harvest">St. Joseph Shelter & Community Harvest (3.4 km away)</option>
                  <option value="Downtown Grace Mission">Downtown Grace Mission (1.8 km away)</option>
                  <option value="Lotus Community Youth Pantry">Lotus Community Youth Pantry (4.2 km away)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-[#012D1D] uppercase tracking-wider">
                    Portions Needed
                  </label>
                  <span className="text-xs text-emerald-700 font-semibold">
                    Available: {listing.portions} meals
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max={listing.portions}
                    step="5"
                    value={portionsToClaim}
                    onChange={(e) => setPortionsToClaim(Number(e.target.value))}
                    className="flex-1 accent-[#012D1D]"
                  />
                  <span className="font-mono text-base font-bold text-[#012D1D] w-14 text-right">
                    {portionsToClaim}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#012D1D] uppercase tracking-wider mb-1">
                  Intake Delivery Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#EAE5DC] rounded-xl text-xs text-gray-800 focus:ring-2 focus:ring-[#52B788] focus:outline-none"
                  placeholder="Gate instructions, dietary distribution details..."
                />
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="flex items-center gap-2 p-3 bg-[#52B788]/10 rounded-xl text-xs text-[#012D1D]">
              <ShieldCheck className="w-4 h-4 text-[#006C48] shrink-0" />
              <span>Bill Emerson Good Samaritan Act & FSSAI verified handover protection applies.</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-bold bg-[#012D1D] text-white rounded-xl hover:bg-[#1B4332] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Truck className="w-4 h-4 text-[#52B788]" />
                Confirm Requisition ({portionsToClaim} Meals)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
