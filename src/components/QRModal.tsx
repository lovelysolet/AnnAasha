import React, { useState, useEffect } from 'react';
import { X, QrCode, CheckCircle2, ShieldAlert, Sparkles, Thermometer, MapPin } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteScan: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, onCompleteScan }) => {
  if (!isOpen) return null;

  const [scanning, setScanning] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
      setSuccess(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    onCompleteScan();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFBF7] border border-[#EAE5DC] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-center">
        {/* Header */}
        <div className="bg-[#012D1D] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#52B788]" />
            <span className="font-bold text-sm">Gatekeeper Optical Verification</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {scanning ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="relative w-48 h-48 border-2 border-dashed border-[#006C48] rounded-2xl flex items-center justify-center bg-white shadow-inner overflow-hidden">
                {/* Simulated laser scan line */}
                <div className="absolute inset-x-0 h-1 bg-[#52B788] shadow-[0_0_12px_#52B788] animate-bounce top-10"></div>
                <QrCode className="w-32 h-32 text-gray-800 opacity-80" />
                <div className="absolute bottom-2 px-2 py-0.5 bg-black/75 text-white text-[10px] rounded font-mono">
                  Focusing Sensor...
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#012D1D]">Scanning Shelter Intake QR</h4>
                <p className="text-xs text-[#4B5563] mt-1">
                  Point sensor at Hope Harbor Community Shelter Gate Terminal #HH-GATE-04
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-[#52B788]/20 text-[#006C48] flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#012D1D]">Handshake Complete!</h4>
                <p className="text-xs text-[#4B5563]">
                  Digital handover token authenticated. Temperature log (64.2°C) stored to municipal audit ledger.
                </p>
              </div>

              <div className="w-full bg-white border border-[#EAE5DC] rounded-xl p-3.5 text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-bold text-[#012D1D]">Hope Harbor Shelter</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Delivered Meals:</span>
                  <span className="font-bold text-emerald-700">80 Warm Portions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Holding Temperature:</span>
                  <span className="font-bold text-emerald-700">64.2°C (Compliant)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Transit Duration:</span>
                  <span className="font-bold text-[#012D1D]">14 mins (On-Time)</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-2.5 rounded-xl bg-[#012D1D] text-white font-bold text-sm hover:bg-[#1B4332] transition-all"
              >
                Archive and Advance Lifecycle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
