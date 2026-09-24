import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { DonorIntakeWizard } from './components/DonorIntakeWizard';
import { FindFoodMap } from './components/FindFoodMap';
import { OpsControlHub } from './components/OpsControlHub';
import { AuthSignIn } from './components/AuthSignIn';
import { ClaimModal } from './components/ClaimModal';
import { QRModal } from './components/QRModal';
import { INITIAL_SURPLUS_LISTINGS, SurplusListing } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('sign-in');
  const [activeDemoStep, setActiveDemoStep] = useState<number>(4);
  const [listings, setListings] = useState<SurplusListing[]>(INITIAL_SURPLUS_LISTINGS);
  const [selectedClaimListing, setSelectedClaimListing] = useState<SurplusListing | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleOpenClaimModal = (listing: SurplusListing) => {
    setSelectedClaimListing(listing);
    setIsClaimModalOpen(true);
  };

  const handleConfirmClaim = (listingId: string, portions: number, shelterName: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          return {
            ...item,
            portions: Math.max(0, item.portions - portions),
            claimedBy: shelterName,
            status: 'in-transit',
          };
        }
        return item;
      })
    );
    // Advance pipeline stepper to Step 4 (In Transit) or Step 3 (Shelter Matching Claimed)
    setActiveDemoStep(4);
  };

  const handleBatchCreated = (newBatch: SurplusListing) => {
    setListings((prev) => [newBatch, ...prev]);
    setActiveDemoStep(2); // Move to Step 2: Admin Verify
  };

  const handleCompleteQRScan = () => {
    setActiveDemoStep(5); // Move to Step 5: Shelter Delivered
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-[#121C2A] selection:bg-[#52B788]/20 selection:text-[#012D1D]">
      {/* Top Universal Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeDemoStep={activeDemoStep}
        setActiveDemoStep={setActiveDemoStep}
        userRole={userRole}
        onSignOut={() => setUserRole(null)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <LandingPage
            listings={listings}
            setCurrentView={setCurrentView}
            onOpenClaimModal={handleOpenClaimModal}
          />
        )}

        {currentView === 'find-food' && (
          <FindFoodMap
            listings={listings}
            onOpenClaimModal={handleOpenClaimModal}
          />
        )}

        {currentView === 'donate-food' && (
          <DonorIntakeWizard
            onBatchCreated={handleBatchCreated}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'ops-hub' && (
          <OpsControlHub
            setCurrentView={setCurrentView}
            activeDemoStep={activeDemoStep}
            setActiveDemoStep={setActiveDemoStep}
            onOpenQRScanner={() => setIsQRModalOpen(true)}
          />
        )}

        {currentView === 'sign-in' && (
          <AuthSignIn
            onSignInSuccess={(role) => setUserRole(role)}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* Global Footer (shown on all public views; on ops-hub user can see complete dashboard) */}
      {currentView !== 'ops-hub' && <Footer setCurrentView={setCurrentView} />}

      {/* Modals */}
      <ClaimModal
        listing={selectedClaimListing}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        onConfirmClaim={handleConfirmClaim}
      />

      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onCompleteScan={handleCompleteQRScan}
      />
    </div>
  );
}
