'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  PickupRequest, 
  PickupStatus, 
  SolarEnquiry, 
  ActivityItem, 
  UserProfile, 
  WasteCategoryId,
  TimeSlot 
} from '@/types';
import { 
  WASTE_CATEGORIES,
  REWARD_ITEMS 
} from '@/data/constants';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface EarthSyncContextType {
  pickups: PickupRequest[];
  solarEnquiries: SolarEnquiry[];
  activities: ActivityItem[];
  userProfile: UserProfile;
  redeemedRewards: string[];
  toasts: Toast[];
  isHydrated: boolean;
  addPickup: (data: {
    category: WasteCategoryId;
    quantityKg: number;
    pickupAddress: string;
    preferredDate: string;
    timeSlot: TimeSlot;
    notes?: string;
  }) => { success: boolean; error?: string };
  cancelPickup: (id: string) => void;
  updatePickupStatus: (id: string, newStatus: PickupStatus, verifiedWeightKg?: number) => void;
  updateSolarEnquiryStatus: (id: string, newStatus: SolarEnquiry['status']) => void;
  submitSolarEnquiry: (data: Omit<SolarEnquiry, 'id' | 'submittedAt' | 'status'>) => { success: boolean; error?: string };
  redeemReward: (rewardId: string) => { success: boolean; error?: string };
  dismissToast: (id: string) => void;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  login: (email: string, name?: string, campusLocation?: string) => void;
  logout: () => void;
  clearUserData: () => void;
  resetAllData: () => void;
  loadSampleData: () => void;
  deletePickup: (id: string) => void;
  deleteSolarEnquiry: (id: string) => void;
  adjustUserPoints: (pointsDelta: number, reason: string) => void;
}

const EarthSyncContext = createContext<EarthSyncContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PICKUPS: 'earthsync_pickups_v2',
  ENQUIRIES: 'earthsync_solar_enquiries_v2',
  ACTIVITIES: 'earthsync_activities_v2',
  PROFILE: 'earthsync_profile_v2',
  REDEEMED: 'earthsync_redeemed_v2',
  INITIALIZED: 'earthsync_initialized_v2',
};

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  collegeId: '',
  department: '',
  campusLocation: '',
  greenPointsBalance: 0,
  lifetimePointsEarned: 0,
};

export const EarthSyncProvider = ({ children }: { children: ReactNode }) => {
  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [solarEnquiries, setSolarEnquiries] = useState<SolarEnquiry[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Helper for toasts
  const showToast = useCallback((type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Safe localStorage Hydration
  useEffect(() => {
    try {
      const storedInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      
      if (!storedInit) {
        // First run: Initialize clean without fake demo records
        localStorage.setItem(STORAGE_KEYS.PICKUPS, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
        localStorage.setItem(STORAGE_KEYS.REDEEMED, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');

        setPickups([]);
        setSolarEnquiries([]);
        setActivities([]);
        setUserProfile(DEFAULT_PROFILE);
        setRedeemedRewards([]);
      } else {
        const storedPickups = localStorage.getItem(STORAGE_KEYS.PICKUPS);
        const storedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
        const storedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
        const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
        const storedRedeemed = localStorage.getItem(STORAGE_KEYS.REDEEMED);

        if (storedPickups) setPickups(JSON.parse(storedPickups));
        if (storedEnquiries) setSolarEnquiries(JSON.parse(storedEnquiries));
        if (storedActivities) setActivities(JSON.parse(storedActivities));
        if (storedProfile) setUserProfile(JSON.parse(storedProfile));
        if (storedRedeemed) setRedeemedRewards(JSON.parse(storedRedeemed));
      }
    } catch (err) {
      console.warn('LocalStorage access warning in EarthSyncContext:', err);
      setPickups([]);
      setSolarEnquiries([]);
      setActivities([]);
      setUserProfile(DEFAULT_PROFILE);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync state helpers
  const savePickups = (newPickups: PickupRequest[]) => {
    setPickups(newPickups);
    try {
      localStorage.setItem(STORAGE_KEYS.PICKUPS, JSON.stringify(newPickups));
    } catch (e) {
      console.error(e);
    }
  };

  const saveSolarEnquiries = (newEnquiries: SolarEnquiry[]) => {
    setSolarEnquiries(newEnquiries);
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(newEnquiries));
    } catch (e) {
      console.error(e);
    }
  };

  const saveActivities = (newActivities: ActivityItem[]) => {
    setActivities(newActivities);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(newActivities));
    } catch (e) {
      console.error(e);
    }
  };

  const saveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const saveRedeemed = (newRedeemed: string[]) => {
    setRedeemedRewards(newRedeemed);
    try {
      localStorage.setItem(STORAGE_KEYS.REDEEMED, JSON.stringify(newRedeemed));
    } catch (e) {
      console.error(e);
    }
  };

  // Add Pickup
  const addPickup = (data: {
    category: WasteCategoryId;
    quantityKg: number;
    pickupAddress: string;
    preferredDate: string;
    timeSlot: TimeSlot;
    notes?: string;
  }) => {
    if (!data.quantityKg || data.quantityKg <= 0) return { success: false, error: 'Please enter a valid weight in kg (> 0).' };
    if (!data.pickupAddress || data.pickupAddress.trim().length < 5) return { success: false, error: 'Please enter a complete pickup address (at least 5 characters).' };
    if (!data.preferredDate) return { success: false, error: 'Please select a pickup date.' };
    if (!data.timeSlot) return { success: false, error: 'Please select a time slot.' };

    const categoryDef = WASTE_CATEGORIES.find((c) => c.id === data.category);
    const categoryLabel = categoryDef ? categoryDef.name : data.category;

    const newPickup: PickupRequest = {
      id: `pk-${Date.now()}`,
      category: data.category,
      categoryLabel,
      quantityKg: Number(Number(data.quantityKg).toFixed(1)),
      pickupAddress: data.pickupAddress.trim(),
      preferredDate: data.preferredDate,
      timeSlot: data.timeSlot,
      notes: data.notes?.trim(),
      status: 'Requested',
      pointsEarned: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedPickups = [newPickup, ...pickups];
    savePickups(updatedPickups);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Pickup Requested: ${data.quantityKg} kg ${categoryLabel}`,
      description: `Scheduled for ${data.preferredDate} (${data.timeSlot}). Awaiting courier confirmation.`,
      timestamp: 'Just now',
      type: 'waste_pickup',
    };
    saveActivities([newActivity, ...activities]);

    showToast(
      'success',
      'Pickup Scheduled Successfully!',
      `Your request for ${data.quantityKg} kg of ${categoryLabel} has been submitted.`
    );

    return { success: true };
  };

  // Cancel Pickup
  const cancelPickup = (id: string) => {
    const target = pickups.find((p) => p.id === id);
    if (!target) return;

    if (target.status === 'Collected') {
      showToast('error', 'Cannot Cancel', 'This request has already been collected and points were credited.');
      return;
    }

    const updated = pickups.map((p) => (p.id === id ? { ...p, status: 'Cancelled' as PickupStatus } : p));
    savePickups(updated);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Pickup Cancelled: ${target.categoryLabel}`,
      description: `Cancelled request for ${target.quantityKg} kg scheduled for ${target.preferredDate}.`,
      timestamp: 'Just now',
      type: 'system',
    };
    saveActivities([newActivity, ...activities]);

    showToast('info', 'Pickup Cancelled', `Your pickup request for ${target.categoryLabel} was cancelled.`);
  };

  // Update Status & Award Points upon 'Collected'
  const updatePickupStatus = (id: string, newStatus: PickupStatus, verifiedWeightKg?: number) => {
    const target = pickups.find((p) => p.id === id);
    if (!target) return;

    let pointsAwarded = target.pointsEarned;
    const finalWeight = (verifiedWeightKg !== undefined && verifiedWeightKg > 0) ? verifiedWeightKg : target.quantityKg;

    // Award points ONLY when transitioning to 'Collected' for the first time
    if (newStatus === 'Collected' && target.status !== 'Collected') {
      const categoryDef = WASTE_CATEGORIES.find((c) => c.id === target.category);
      const pointsRate = categoryDef ? categoryDef.pointsPerKg : 5;
      pointsAwarded = Math.round(finalWeight * pointsRate);

      const updatedProfile: UserProfile = {
        ...userProfile,
        greenPointsBalance: userProfile.greenPointsBalance + pointsAwarded,
        lifetimePointsEarned: userProfile.lifetimePointsEarned + pointsAwarded,
      };
      saveProfile(updatedProfile);

      const activity: ActivityItem = {
        id: `act-${Date.now()}`,
        title: `+${pointsAwarded} GreenPoints Awarded!`,
        description: `Verified collection of ${finalWeight} kg ${target.categoryLabel}. Thank you for recycling!`,
        timestamp: 'Just now',
        type: 'waste_collected',
      };
      saveActivities([activity, ...activities]);

      showToast(
        'success',
        `Collection Verified! (+${pointsAwarded} GreenPoints)`,
        `Awesome! ${finalWeight} kg of ${target.categoryLabel} was collected and processed.`
      );
    } else {
      showToast(
        'info',
        `Status Updated: ${newStatus}`,
        `Pickup for ${target.categoryLabel} is now marked as ${newStatus}.`
      );
    }

    const updated = pickups.map((p) => 
      p.id === id ? { ...p, status: newStatus, quantityKg: finalWeight, pointsEarned: pointsAwarded } : p
    );
    savePickups(updated);
  };

  // Delete / Archive Pickup (Admin)
  const deletePickup = (id: string) => {
    const updated = pickups.filter((p) => p.id !== id);
    savePickups(updated);
    showToast('info', 'Record Removed', `Pickup request ${id} removed from system.`);
  };

  // Update Solar Enquiry Status
  const updateSolarEnquiryStatus = (id: string, newStatus: SolarEnquiry['status']) => {
    const target = solarEnquiries.find((e) => e.id === id);
    if (!target) return;

    const updated = solarEnquiries.map((e) =>
      e.id === id ? { ...e, status: newStatus } : e
    );
    saveSolarEnquiries(updated);

    const activity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Solar Lead Updated: ${newStatus}`,
      description: `Lead for ${target.fullName} (${target.city}) moved to ${newStatus}.`,
      timestamp: 'Just now',
      type: 'solar_enquiry',
    };
    saveActivities([activity, ...activities]);

    showToast('info', 'Enquiry Status Updated', `Enquiry for ${target.fullName} is now ${newStatus}.`);
  };

  // Delete / Archive Solar Enquiry (Admin)
  const deleteSolarEnquiry = (id: string) => {
    const updated = solarEnquiries.filter((e) => e.id !== id);
    saveSolarEnquiries(updated);
    showToast('info', 'Lead Archived', `Solar enquiry ${id} removed.`);
  };

  // Adjust User GreenPoints (Admin)
  const adjustUserPoints = (pointsDelta: number, reason: string) => {
    const newBalance = Math.max(0, userProfile.greenPointsBalance + pointsDelta);
    const newLifetime = pointsDelta > 0 
      ? userProfile.lifetimePointsEarned + pointsDelta 
      : userProfile.lifetimePointsEarned;
    const updated = {
      ...userProfile,
      greenPointsBalance: newBalance,
      lifetimePointsEarned: newLifetime,
    };
    saveProfile(updated);

    const activity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: pointsDelta >= 0 ? `Admin Credit: +${pointsDelta} pts` : `Admin Adjustment: ${pointsDelta} pts`,
      description: reason || 'Administrative balance adjustment',
      timestamp: 'Just now',
      type: 'system',
    };
    saveActivities([activity, ...activities]);
    showToast(
      'success',
      'Points Adjusted',
      `Account updated by ${pointsDelta >= 0 ? '+' : ''}${pointsDelta} pts. New balance: ${newBalance} pts.`
    );
  };

  // Submit Solar Enquiry
  const submitSolarEnquiry = (data: Omit<SolarEnquiry, 'id' | 'submittedAt' | 'status'>) => {
    if (!data.fullName || data.fullName.trim().length < 3) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!data.phone || data.phone.trim().length < 8) {
      return { success: false, error: 'Please provide a valid phone number.' };
    }
    if (!data.city || data.city.trim().length < 2) {
      return { success: false, error: 'Please enter your city / locality.' };
    }

    const newEnquiry: SolarEnquiry = {
      ...data,
      id: `sol-${Date.now()}`,
      status: 'Enquiry Received',
      submittedAt: new Date().toISOString(),
    };

    const updated = [newEnquiry, ...solarEnquiries];
    saveSolarEnquiries(updated);

    const activity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Solar Enquiry Logged (${data.suggestedCapacityKw || 'Custom'} kWp)`,
      description: `Provider matching initiated for ${data.city}. System Type: ${data.systemType}.`,
      timestamp: 'Just now',
      type: 'solar_enquiry',
    };
    saveActivities([activity, ...activities]);

    showToast(
      'success',
      'Solar Enquiry Submitted!',
      `SolarSaathi has recorded your enquiry for ${data.suggestedCapacityKw || 'custom'} kWp in ${data.city}.`
    );

    return { success: true };
  };

  // Redeem Reward
  const redeemReward = (rewardId: string) => {
    const reward = REWARD_ITEMS.find((r) => r.id === rewardId);
    if (!reward) return { success: false, error: 'Reward not found.' };

    if (userProfile.greenPointsBalance < reward.pointsCost) {
      showToast(
        'warning',
        'Insufficient GreenPoints',
        `You need ${reward.pointsCost} points to claim this reward (Current: ${userProfile.greenPointsBalance}).`
      );
      return { success: false, error: 'Insufficient GreenPoints balance.' };
    }

    const updatedProfile: UserProfile = {
      ...userProfile,
      greenPointsBalance: userProfile.greenPointsBalance - reward.pointsCost,
    };
    saveProfile(updatedProfile);

    const newRedeemed = [...redeemedRewards, rewardId];
    saveRedeemed(newRedeemed);

    const activity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Claimed: ${reward.title}`,
      description: `Redeemed ${reward.pointsCost} GreenPoints. Voucher coupon generated in profile.`,
      timestamp: 'Just now',
      type: 'reward_redeemed',
    };
    saveActivities([activity, ...activities]);

    showToast(
      'success',
      'Reward Redeemed!',
      `You successfully claimed "${reward.title}". Coupon code sent to ${userProfile.email}.`
    );

    return { success: true };
  };

  // Update user profile explicitly entered by user
  const updateProfile = (profileData: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...profileData };
    saveProfile(updated);
    showToast('success', 'Profile Updated', 'Your profile details have been saved.');
  };

  // User login (stored locally for frontend demonstration)
  const login = (email: string, name?: string, campusLocation?: string) => {
    const updated: UserProfile = {
      ...userProfile,
      email: email.trim(),
      name: name && name.trim() ? name.trim() : (userProfile.name || email.split('@')[0]),
      campusLocation: campusLocation && campusLocation.trim() ? campusLocation.trim() : (userProfile.campusLocation || 'Main Campus'),
    };
    saveProfile(updated);
    showToast('success', 'Signed In', `Welcome, ${updated.name || 'User'}!`);
  };

  // User logout
  const logout = () => {
    saveProfile(DEFAULT_PROFILE);
    showToast('info', 'Signed Out', 'You have been signed out.');
  };

  // Reset to clean user state
  const clearUserData = () => {
    savePickups([]);
    saveSolarEnquiries([]);
    saveActivities([]);
    saveProfile(DEFAULT_PROFILE);
    saveRedeemed([]);
    showToast('info', 'Data Cleared', 'All stored user activity has been cleared.');
  };

  const resetAllData = clearUserData;
  const loadSampleData = () => {
    // No-op for demo baseline removal
  };

  return (
    <EarthSyncContext.Provider
      value={{
        pickups,
        solarEnquiries,
        activities,
        userProfile,
        redeemedRewards,
        toasts,
        isHydrated,
        addPickup,
        cancelPickup,
        updatePickupStatus,
        updateSolarEnquiryStatus,
        submitSolarEnquiry,
        redeemReward,
        dismissToast,
        showToast,
        updateProfile,
        login,
        logout,
        clearUserData,
        resetAllData,
        loadSampleData,
        deletePickup,
        deleteSolarEnquiry,
        adjustUserPoints,
      }}
    >
      {children}
    </EarthSyncContext.Provider>
  );
};

export const useEarthSync = () => {
  const context = useContext(EarthSyncContext);
  if (!context) {
    throw new Error('useEarthSync must be used within an EarthSyncProvider');
  }
  return context;
};
