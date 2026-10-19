import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  User,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Download,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Home,
  Shield,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useSalon } from '../../context/SalonContext';
import { siteConfig } from '../../config/siteConfig';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import {
  formatPKR,
  todayLocalISO,
  tomorrowLocalISO,
  addDaysLocalISO,
  formatLongDate,
} from '../../lib/format';
import { Appointment, SalonService } from '../../types';
import { useToast } from '../ui/Toast';

const TIME_SLOTS = [
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
] as const;

// Convert slot to minutes from midnight (closing time is 9:00 PM = 1260 mins)
const SLOT_START_MINUTES: Record<string, number> = {
  '11:00 AM': 660,
  '12:00 PM': 720,
  '01:00 PM': 780,
  '02:00 PM': 840,
  '03:00 PM': 900,
  '04:00 PM': 960,
  '05:00 PM': 1020,
  '06:00 PM': 1080,
  '07:00 PM': 1140,
  '08:00 PM': 1200,
};

const CLOSING_MINUTES = 1260; // 9:00 PM

function normalizePakistanPhone(raw: string): { isValid: boolean; normalized: string } {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('92') && digits.length === 12 && digits[2] === '3') {
    return { isValid: true, normalized: `+${digits}` };
  }
  if (digits.startsWith('03') && digits.length === 11) {
    return { isValid: true, normalized: `+92${digits.slice(1)}` };
  }
  if (digits.startsWith('3') && digits.length === 10) {
    return { isValid: true, normalized: `+92${digits}` };
  }
  return { isValid: false, normalized: raw };
}

export const BookingModal: React.FC = () => {
  const {
    bookingModal,
    closeBooking,
    services,
    artists,
    createAppointment,
    isSlotTaken,
  } = useSalon();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [mode, setMode] = useState<'studio' | 'home'>('studio');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedArtistId, setSelectedArtistId] = useState<string>('');

  // Step 3 Client Info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [homeAddress, setHomeAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Errors & Confirmed Appointment
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form input refs for auto-focus on first invalid field
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Initialize and handle prefill whenever bookingModal opens
  useEffect(() => {
    if (bookingModal.isOpen) {
      setStep(1);
      setErrors({});
      setCreatedAppointment(null);
      setIsSubmitting(false);

      const prefillMode = bookingModal.prefill?.mode || 'studio';
      setMode(prefillMode);

      if (bookingModal.prefill?.serviceIds && bookingModal.prefill.serviceIds.length > 0) {
        setSelectedServiceIds(bookingModal.prefill.serviceIds);
      } else if (bookingModal.prefill?.serviceId) {
        setSelectedServiceIds([bookingModal.prefill.serviceId]);
      } else {
        // default to first service of mode
        const available = services.filter((s) =>
          prefillMode === 'home' ? s.category === 'home-salon' : s.category !== 'home-salon'
        );
        if (available.length > 0) {
          setSelectedServiceIds([available[0].id]);
        } else {
          setSelectedServiceIds([]);
        }
      }

      if (bookingModal.prefill?.artistId) {
        setSelectedArtistId(bookingModal.prefill.artistId);
      } else {
        setSelectedArtistId('');
      }

      // Default date to tomorrow in local time
      setSelectedDate(tomorrowLocalISO());
      setSelectedSlot('');
      setSelectedAddonIds([]);
    } else {
      // Reset everything when closing
      setStep(1);
      setSelectedServiceIds([]);
      setSelectedAddonIds([]);
      setSelectedDate('');
      setSelectedSlot('');
      setSelectedArtistId('');
      setCustomerName('');
      setCustomerPhone('');
      setCustomerEmail('');
      setHomeAddress('');
      setNotes('');
      setErrors({});
      setCreatedAppointment(null);
    }
  }, [bookingModal.isOpen, bookingModal.prefill, services]);

  // Filtered services for current mode
  const availableServices = useMemo(() => {
    return services.filter((s) =>
      mode === 'home' ? s.category === 'home-salon' : s.category !== 'home-salon'
    );
  }, [services, mode]);

  // Mode Switcher Handler
  const handleModeChange = (newMode: 'studio' | 'home'): void => {
    setMode(newMode);
    const available = services.filter((s) =>
      newMode === 'home' ? s.category === 'home-salon' : s.category !== 'home-salon'
    );
    const availableIds = new Set(available.map((s) => s.id));
    const retained = selectedServiceIds.filter((id) => availableIds.has(id));
    if (retained.length > 0) {
      setSelectedServiceIds(retained);
    } else if (available.length > 0) {
      setSelectedServiceIds([available[0].id]);
    } else {
      setSelectedServiceIds([]);
    }
  };

  // Selected Services objects
  const selectedServices = useMemo<SalonService[]>(() => {
    return services.filter((s) => selectedServiceIds.includes(s.id));
  }, [services, selectedServiceIds]);

  // Primary active service for fallbacks
  const activeService = useMemo<SalonService | undefined>(() => {
    return selectedServices[0] || availableServices[0];
  }, [selectedServices, availableServices]);

  // Toggle Service selection
  const toggleService = (serviceId: string): void => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Active Add-ons
  const activeAddons = useMemo(() => {
    return siteConfig.addOns.filter((addon) => selectedAddonIds.includes(addon.id));
  }, [selectedAddonIds]);

  // Totals Calculation across all selected services + addons
  const servicesTotalPrice = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + item.pricePKR, 0);
  }, [selectedServices]);

  const servicesTotalMinutes = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + item.durationMinutes, 0);
  }, [selectedServices]);

  const totalPKR = useMemo(() => {
    const addOnTotal = activeAddons.reduce((sum, item) => sum + item.pricePKR, 0);
    return servicesTotalPrice + addOnTotal;
  }, [servicesTotalPrice, activeAddons]);

  const totalMinutes = useMemo(() => {
    const addOnMins = activeAddons.reduce((sum, item) => sum + item.durationMinutes, 0);
    return servicesTotalMinutes + addOnMins;
  }, [servicesTotalMinutes, activeAddons]);

  // Toggle Addon Checkbox
  const toggleAddon = (addonId: string): void => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Step 2: Slot Availability Check
  const minDate = useMemo(() => tomorrowLocalISO(), []);
  const maxDate = useMemo(() => addDaysLocalISO(todayLocalISO(), 90), []);

  const getSlotStatus = (
    slot: string
  ): { disabled: boolean; reason?: 'taken' | 'exceeds-hours'; label?: string } => {
    if (!selectedDate) {
      return { disabled: true, label: 'Select date first' };
    }

    // 1. Taken slot check
    const isTaken = isSlotTaken(selectedDate, slot, selectedArtistId || undefined);
    if (isTaken) {
      return { disabled: true, reason: 'taken', label: 'Booked' };
    }

    // 2. Exceeds closing time check (unless bridal or home-salon)
    const isBridalOrHome =
      activeService?.category === 'bridal' || activeService?.category === 'home-salon';

    const slotStart = SLOT_START_MINUTES[slot] ?? 0;
    if (!isBridalOrHome && slotStart + totalMinutes > CLOSING_MINUTES) {
      return {
        disabled: true,
        reason: 'exceeds-hours',
        label: 'Exceeds 9 PM closing',
      };
    }

    return { disabled: false };
  };

  // Step 3 Validation & Submit with First Invalid Field Focus
  const handleStep3Submit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    const phoneValidation = normalizePakistanPhone(customerPhone);
    if (!phoneValidation.isValid) {
      newErrors.phone =
        'Please enter a valid Pakistan phone number (+923XXXXXXXXX, 03XXXXXXXXX, or 3XXXXXXXXX).';
    }

    if (customerEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (mode === 'home' && (!homeAddress.trim() || homeAddress.trim().length < 5)) {
      newErrors.address = 'Complete home residence address is required for At-Home concierge.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Focus first invalid element
      if (newErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (newErrors.phone && phoneInputRef.current) {
        phoneInputRef.current.focus();
      } else if (newErrors.address && addressInputRef.current) {
        addressInputRef.current.focus();
      } else if (newErrors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    // Double-click guard
    setIsSubmitting(true);

    try {
      const primaryServiceId = selectedServiceIds[0] || '';
      const newApt = createAppointment({
        customerName: customerName.trim(),
        customerPhone: phoneValidation.normalized,
        customerEmail: customerEmail.trim() || undefined,
        serviceId: primaryServiceId,
        serviceIds: selectedServiceIds,
        artistId: selectedArtistId || undefined,
        date: selectedDate,
        timeSlot: selectedSlot,
        mode,
        homeAddress: mode === 'home' ? homeAddress.trim() : undefined,
        notes: notes.trim() || undefined,
        totalPricePKR: totalPKR,
        addonIds: selectedAddonIds,
      });

      setCreatedAppointment(newApt);
      setStep(4);
      showToast('Appointment successfully created and reserved!', 'success');
    } catch {
      showToast('Could not finalize appointment. Please retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp Message Formatter for Step 4
  const handleWhatsAppConfirm = (): void => {
    if (!createdAppointment || selectedServices.length === 0) return;

    const artistName =
      artists.find((a) => a.id === createdAppointment.artistId)?.name || 'Atelier Team';

    const servicesList = selectedServices
      .map((s, idx) => `   ${idx + 1}. *${s.name}* (${formatPKR(s.pricePKR)})`)
      .join('\n');

    const text = [
      `*LUXEORA STUDIO — APPOINTMENT CONFIRMATION REQUEST*`,
      `Reference ID: *${createdAppointment.id}*`,
      `Client: ${createdAppointment.customerName}`,
      `Phone: ${createdAppointment.customerPhone}`,
      `Reserved Rituals (${selectedServices.length}):\n${servicesList}`,
      `Total Investment: *${formatPKR(createdAppointment.totalPricePKR)}*`,
      `Estimated Duration: ~${totalMinutes} Minutes`,
      `Date: ${formatLongDate(createdAppointment.date)}`,
      `Time Slot: ${createdAppointment.timeSlot}`,
      `Mode: ${createdAppointment.mode === 'studio' ? 'In-Studio Suite (F-6 Markaz)' : 'At-Home Concierge'}`,
      createdAppointment.homeAddress ? `Address: ${createdAppointment.homeAddress}` : null,
      `Assigned Artisan: ${artistName}`,
      createdAppointment.notes ? `Special Notes: ${createdAppointment.notes}` : null,
      `\nPlease confirm suite readiness and reception.`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Download Pass as Text Blob
  const handleDownloadPass = (): void => {
    if (!createdAppointment || selectedServices.length === 0) return;

    const artistName =
      artists.find((a) => a.id === createdAppointment.artistId)?.name || 'Assigned by Atelier';

    const servicesList = selectedServices
      .map((s, idx) => ` - ${idx + 1}. ${s.name} [${s.category.toUpperCase()}] (~${s.durationMinutes} mins) — ${formatPKR(s.pricePKR)}`)
      .join('\n');

    const passContent = `==================================================
           LUXEORA STUDIO — ISLAMABAD
      Private Sanctuary for Women | F-6 Markaz
==================================================

APPOINTMENT CONFIRMATION PASS
Reference ID:  ${createdAppointment.id}
Status:        PENDING CONCIERGE CONFIRMATION
Created:       ${new Date(createdAppointment.createdAt).toLocaleString('en-PK')}

GUEST DETAILS:
Name:          ${createdAppointment.customerName}
Phone:         ${createdAppointment.customerPhone}
${createdAppointment.customerEmail ? `Email:         ${createdAppointment.customerEmail}\n` : ''}
RESERVATION DETAILS:
Selected Rituals (${selectedServices.length}):
${servicesList}
Mode:          ${createdAppointment.mode === 'studio' ? 'In-Studio Private Suite (F-6 Markaz)' : 'At-Home Salon Concierge'}
${createdAppointment.homeAddress ? `Residence:     ${createdAppointment.homeAddress}\n` : ''}Date:          ${formatLongDate(createdAppointment.date)}
Time Slot:     ${createdAppointment.timeSlot}
Duration:      ~${totalMinutes} Minutes
Lead Artisan:  ${artistName}

RITUAL INCLUSIONS & ADD-ONS:
${activeAddons.length > 0 ? activeAddons.map((a) => ` - Add-on: ${a.name} (${formatPKR(a.pricePKR)})`).join('\n') : ' - Standard comprehensive suite package'}

TOTAL INVESTMENT: ${formatPKR(createdAppointment.totalPricePKR)}

--------------------------------------------------
SANCTUARY LOCATION & CONTACT:
Address: ${siteConfig.address.full}
Direct Line: ${siteConfig.phone.display}
WhatsApp Concierge: +92 ${siteConfig.whatsapp.number.slice(2)}
Atelier Hours: ${siteConfig.hours.label} (${siteConfig.hours.days})

DISCRETION & POLICIES:
- Exclusively for women and girls.
- Please arrive 10 minutes prior to your suite reservation.
- Complimentary Kashmiri kahwa & refreshments served upon arrival.
==================================================`;

    const blob = new Blob([passContent], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Luxeora-Booking-${createdAppointment.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    showToast('Booking pass downloaded successfully.', 'info');
  };

  return (
    <Modal
      isOpen={bookingModal.isOpen}
      onClose={closeBooking}
      maxWidth="2xl"
      showCloseButton={step !== 4}
      title={step === 4 ? 'Reservation Created' : 'Reserve Sanctuary Appointment'}
      subtitle={
        step === 4
          ? 'Your private suite pass is ready'
          : 'Women-only private atelier suites & at-home concierge'
      }
    >
      <div className="space-y-6">
        {/* 4-Step Progress Indicator */}
        <div className="border-b border-[#E8DCCF] pb-4">
          <div className="flex items-center justify-between text-xs font-medium">
            {[
              { num: 1, label: 'Ritual' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Guest Info' },
              { num: 4, label: 'Pass' },
            ].map(({ num, label }) => {
              const isCurrent = step === num;
              const isPassed = step > num;

              return (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-[#1E1B18] text-[#C5A059] border border-[#C5A059]'
                        : isPassed
                          ? 'bg-[#C5A059] text-[#121212]'
                          : 'bg-white text-[#1E1B18]/40 border border-[#E8DCCF]'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : num}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-wider hidden sm:inline ${
                      isCurrent ? 'font-semibold text-[#1E1B18]' : 'text-[#1E1B18]/60'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: SERVICE, MODE & ADDONS */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Mode Switcher Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#1E1B18]/70 font-semibold block">
                Appointment Experience Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleModeChange('studio')}
                  className={`p-3.5 rounded-sm border text-left transition-all min-h-[48px] cursor-pointer ${
                    mode === 'studio'
                      ? 'bg-white border-[#C5A059] ring-1 ring-[#C5A059] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E8DCCF] text-[#1E1B18]/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-[#1E1B18]">
                      In-Studio at F-6
                    </span>
                    <MapPin className="w-4 h-4 text-[#8A6A2F]" />
                  </div>
                  <span className="text-[11px] text-[#1E1B18]/60 block mt-0.5">
                    Private suite in Super Market F-6
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('home')}
                  className={`p-3.5 rounded-sm border text-left transition-all min-h-[48px] cursor-pointer ${
                    mode === 'home'
                      ? 'bg-white border-[#C5A059] ring-1 ring-[#C5A059] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E8DCCF] text-[#1E1B18]/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-[#1E1B18]">
                      At-Home Concierge
                    </span>
                    <Home className="w-4 h-4 text-[#8A6A2F]" />
                  </div>
                  <span className="text-[11px] text-[#1E1B18]/60 block mt-0.5">
                    Mobile team sent to your residence
                  </span>
                </button>
              </div>
            </div>

            {/* Service Selection Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#1E1B18]/70 font-semibold block">
                  Select Treatments ({selectedServiceIds.length} selected)
                </label>
                <span className="text-[11px] text-[#8A6A2F] font-medium">
                  {selectedServiceIds.length === 0 ? 'Select at least 1' : `${selectedServiceIds.length} selected`}
                </span>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {availableServices.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-white border-[#C5A059] ring-1 ring-[#C5A059] shadow-xs'
                          : 'bg-white border-[#E8DCCF] hover:border-[#C5A059]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Custom Gold Checkbox */}
                        <div
                          className={`w-4 h-4 mt-0.5 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#1E1B18] border-[#C5A059] text-[#C5A059]'
                              : 'border-[#C5A059]/60 bg-[#FAF8F5]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-serif text-base text-[#1E1B18] font-medium">
                              {service.name}
                            </span>
                            {service.popular && (
                              <span className="px-1.5 py-0.5 bg-[#C5A059]/20 text-[#8A6A2F] text-[9px] uppercase font-bold rounded-xs shrink-0">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#1E1B18]/65 line-clamp-1">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-serif text-sm font-semibold text-[#1E1B18]">
                          {formatPKR(service.pricePKR)}
                        </div>
                        <div className="text-[10px] text-[#8A6A2F] flex items-center justify-end gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{service.durationMinutes} mins</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Multi-Service Selected Chips */}
              {selectedServices.length > 1 && (
                <div className="p-3 bg-white border border-[#C5A059]/40 rounded-xs text-xs space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-semibold text-[#8A6A2F] tracking-wider">
                      Selected Rituals ({selectedServices.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedServiceIds([])}
                      className="text-[10px] text-[#1E1B18]/50 hover:text-rose-600 underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedServices.map((srv) => (
                      <span
                        key={srv.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-[#E8DCCF] rounded-xs text-[11px] text-[#1E1B18]"
                      >
                        <span className="font-medium">{srv.name}</span>
                        <span className="text-[#8A6A2F]">({formatPKR(srv.pricePKR)})</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleService(srv.id);
                          }}
                          className="text-[#1E1B18]/40 hover:text-rose-600 font-bold ml-0.5 cursor-pointer"
                          title="Remove service"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add-ons Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-[#E8DCCF]">
              <label className="text-xs uppercase tracking-wider text-[#1E1B18]/70 font-semibold block">
                Curated Ritual Enhancements (Optional)
              </label>
              <div className="space-y-2">
                {siteConfig.addOns.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-white border-[#C5A059] ring-1 ring-[#C5A059]/40'
                          : 'bg-[#FAF8F5] border-[#E8DCCF] hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-4 h-4 mt-0.5 rounded-xs accent-[#1E1B18] cursor-pointer"
                      />
                      <div className="flex-1 flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-medium text-[#1E1B18] block">
                            {addon.name}
                          </span>
                          <span className="text-[11px] text-[#1E1B18]/60 block">
                            {addon.description} (+{addon.durationMinutes} mins)
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#8A6A2F] shrink-0">
                          +{formatPKR(addon.pricePKR)}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Live Summary Bar */}
            <div className="p-4 bg-white border border-[#E8DCCF] rounded-sm flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#1E1B18]/60 block font-sans">
                  Total Estimated Duration: ~{totalMinutes} mins • {selectedServiceIds.length} {selectedServiceIds.length === 1 ? 'service' : 'services'}
                </span>
                <span className="font-serif text-xl text-[#1E1B18] font-semibold block">
                  Total: {formatPKR(totalPKR)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={selectedServiceIds.length === 0}
                className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#121212] disabled:opacity-50 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs border border-[#C5A059] flex items-center justify-center gap-2 cursor-pointer h-12 min-h-[48px] w-full sm:w-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE, TIME & ARTIST */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Preferred Artist Select */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#1E1B18]/70 font-semibold block">
                Preferred Master Artisan (Optional)
              </label>
              <select
                value={selectedArtistId}
                onChange={(e) => setSelectedArtistId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DCCF] rounded-sm text-xs text-[#1E1B18] focus:border-[#C5A059] focus:outline-none"
              >
                <option value="">Any Available Master Artisan (Recommended)</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name} — {artist.role} ({artist.experienceYears}y exp)
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#1E1B18]/70 font-semibold block">
                Appointment Date (Next 90 Days)
              </label>
              <input
                type="date"
                min={minDate}
                max={maxDate}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot(''); // reset slot when date changes
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DCCF] rounded-sm text-xs text-[#1E1B18] focus:border-[#C5A059] focus:outline-none"
              />
              {selectedDate && (
                <p className="text-[11px] text-[#8A6A2F] font-serif italic">
                  Selected: {formatLongDate(selectedDate)}
                </p>
              )}
            </div>

            {/* Time Slot Chips */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#1E1B18]/70 font-semibold block">
                  Select Time Slot (11:00 AM – 8:00 PM)
                </label>
                {selectedServices.some(
                  (s) => s.category === 'bridal' || s.category === 'home-salon'
                ) && (
                  <span className="text-[10px] text-[#8A6A2F] italic">
                    Our concierge will confirm exact timing on WhatsApp
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const status = getSlotStatus(slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={status.disabled}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-sm text-xs font-medium text-center transition-all cursor-pointer min-h-[44px] flex flex-col items-center justify-center border ${
                        isSelected
                          ? 'bg-[#1E1B18] text-[#FAF8F5] border-[#C5A059] shadow-xs'
                          : status.disabled
                            ? 'bg-[#FAF8F5]/80 text-[#1E1B18]/35 border-[#E8DCCF]/50 cursor-not-allowed line-through'
                            : 'bg-white text-[#1E1B18] border-[#E8DCCF] hover:border-[#C5A059]'
                      }`}
                    >
                      <span>{slot}</span>
                      {status.label && (
                        <span className="text-[9px] uppercase tracking-tighter text-rose-600 block leading-none mt-0.5">
                          {status.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Back / Next Navigation */}
            <div className="pt-4 border-t border-[#E8DCCF] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline px-4 text-xs flex items-center gap-1.5 h-12 min-h-[48px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedSlot}
                className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#121212] disabled:opacity-50 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs border border-[#C5A059] flex items-center gap-2 cursor-pointer h-12 min-h-[48px]"
              >
                <span>Client Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GUEST INFORMATION */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} noValidate className="space-y-4 animate-in fade-in duration-200">
            {/* Full Name */}
            <div className="space-y-1">
              <label
                htmlFor="guest-name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]"
              >
                Full Name <span className="text-[#8A6A2F]">*</span>
              </label>
              <input
                id="guest-name"
                ref={nameInputRef}
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder="e.g. Maryam Khan"
                className={`w-full px-4 py-2.5 bg-white border rounded-sm text-xs text-[#1E1B18] focus:outline-none transition-colors ${
                  errors.name ? 'border-rose-500' : 'border-[#E8DCCF] focus:border-[#C5A059]'
                }`}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label
                htmlFor="guest-phone"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]"
              >
                Phone Number (+92 Prefix) <span className="text-[#8A6A2F]">*</span>
              </label>
              <input
                id="guest-phone"
                ref={phoneInputRef}
                type="tel"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                placeholder="0300 1234567 or +923001234567"
                className={`w-full px-4 py-2.5 bg-white border rounded-sm text-xs text-[#1E1B18] focus:outline-none transition-colors ${
                  errors.phone ? 'border-rose-500' : 'border-[#E8DCCF] focus:border-[#C5A059]'
                }`}
                aria-invalid={Boolean(errors.phone)}
              />
              <span className="text-[10px] text-[#1E1B18]/50 block">
                Standard Pakistani formats accepted (will be normalized to +923XXXXXXXXX).
              </span>
              {errors.phone && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>
              )}
            </div>

            {/* Email (Optional) */}
            <div className="space-y-1">
              <label
                htmlFor="guest-email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]"
              >
                Email Address (Optional)
              </label>
              <input
                id="guest-email"
                ref={emailInputRef}
                type="email"
                value={customerEmail}
                onChange={(e) => {
                  setCustomerEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="e.g. maryam@example.com"
                className={`w-full px-4 py-2.5 bg-white border rounded-sm text-xs text-[#1E1B18] focus:outline-none transition-colors ${
                  errors.email ? 'border-rose-500' : 'border-[#E8DCCF] focus:border-[#C5A059]'
                }`}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Home Address (Required in home mode) */}
            {mode === 'home' && (
              <div className="space-y-1">
                <label
                  htmlFor="guest-address"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]"
                >
                  Home Residence Address <span className="text-[#8A6A2F]">*</span>
                </label>
                <input
                  id="guest-address"
                  ref={addressInputRef}
                  type="text"
                  value={homeAddress}
                  onChange={(e) => {
                    setHomeAddress(e.target.value);
                    if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                  }}
                  placeholder="House number, Street, Sector / Area in Islamabad or Rawalpindi"
                  className={`w-full px-4 py-2.5 bg-white border rounded-sm text-xs text-[#1E1B18] focus:outline-none transition-colors ${
                    errors.address ? 'border-rose-500' : 'border-[#E8DCCF] focus:border-[#C5A059]'
                  }`}
                  aria-invalid={Boolean(errors.address)}
                />
                {errors.address && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.address}</p>
                )}
              </div>
            )}

            {/* Notes / Allergies */}
            <div className="space-y-1">
              <label
                htmlFor="guest-notes"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]"
              >
                Special Notes, Skin Sensitivities or Duptatta Requests
              </label>
              <textarea
                id="guest-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Let us know about scalp sensitivities, dress colors, or trousseau draping notes..."
                className="w-full px-4 py-2.5 bg-white border border-[#E8DCCF] rounded-sm text-xs text-[#1E1B18] focus:border-[#C5A059] focus:outline-none transition-colors"
              />
            </div>

            {/* Navigation & Submit */}
            <div className="pt-4 border-t border-[#E8DCCF] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-outline px-4 text-xs flex items-center gap-1.5 h-12 min-h-[48px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#121212] disabled:opacity-50 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs border border-[#C5A059] flex items-center gap-2 cursor-pointer shadow-soft-1 h-12 min-h-[48px]"
              >
                {isSubmitting ? (
                  <span>Reserving Suite...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Generate Pass</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: LUXURY BOOKING PASS */}
        {step === 4 && createdAppointment && activeService && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Pass Card with Luxury Border */}
            <div className="border border-[#C5A059] bg-white p-6 sm:p-7 rounded-sm shadow-md space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCF]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8A6A2F] font-semibold block">
                    Luxeora Atelier Pass
                  </span>
                  <h4 className="font-serif text-2xl text-[#1E1B18]">
                    {createdAppointment.id}
                  </h4>
                </div>
                <div className="px-3 py-1 bg-amber-50 border border-amber-300 text-amber-800 text-[10px] uppercase font-bold tracking-wider rounded-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Pending Confirmation</span>
                </div>
              </div>

              {/* Grid Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1E1B18]/50 block">
                    Reserved Ritual{selectedServices.length > 1 ? `s (${selectedServices.length})` : ''}
                  </span>
                  <div className="space-y-1 mt-0.5">
                    {selectedServices.map((service) => (
                      <div key={service.id}>
                        <p className="font-serif text-base text-[#1E1B18] font-medium leading-snug">
                          {service.name}
                        </p>
                        <p className="text-[11px] text-[#8A6A2F]">
                          {formatPKR(service.pricePKR)} • {service.durationMinutes} mins
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#1E1B18]/70 mt-1 pt-1 border-t border-[#E8DCCF]">
                    {createdAppointment.mode === 'studio'
                      ? 'Private Suite (F-6 Markaz)'
                      : `At-Home Concierge (${createdAppointment.homeAddress})`}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1E1B18]/50 block">
                    Date &amp; Time Slot
                  </span>
                  <p className="font-serif text-base text-[#1E1B18] font-medium">
                    {formatLongDate(createdAppointment.date)}
                  </p>
                  <p className="text-[11px] text-[#1E1B18]/70">
                    {createdAppointment.timeSlot} (~{totalMinutes} mins)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1E1B18]/50 block">
                    Guest Name &amp; Contact
                  </span>
                  <p className="text-[#1E1B18] font-medium">
                    {createdAppointment.customerName}
                  </p>
                  <p className="text-[11px] text-[#1E1B18]/70">
                    {createdAppointment.customerPhone}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1E1B18]/50 block">
                    Total Investment
                  </span>
                  <p className="font-serif text-xl text-[#1E1B18] font-semibold">
                    {formatPKR(createdAppointment.totalPricePKR)}
                  </p>
                  <span className="text-[10px] text-[#1E1B18]/50 block">
                    Payable via Cash, Card or Bank Transfer
                  </span>
                </div>
              </div>

              {/* Add-ons List if any */}
              {activeAddons.length > 0 && (
                <div className="pt-3 border-t border-[#E8DCCF] text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#1E1B18]/50 font-semibold block mb-1">
                    Selected Ritual Enhancements
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeAddons.map((addon) => (
                      <span
                        key={addon.id}
                        className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E8DCCF] rounded-xs text-[11px] text-[#1E1B18]"
                      >
                        {addon.name} (+{formatPKR(addon.pricePKR)})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleWhatsAppConfirm}
                className="btn-whatsapp w-full flex items-center justify-center gap-2 h-12 min-h-[48px]"
              >
                <WhatsAppIcon size={18} className="text-white" />
                <span>Confirm on WhatsApp With Atelier</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPass}
                  className="btn-outline flex-1 flex items-center justify-center gap-2 h-12 min-h-[48px]"
                >
                  <Download className="w-4 h-4 text-[#8A6A2F]" />
                  <span>Download Pass (.txt)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSelectedAddonIds([]);
                  }}
                  className="btn-outline flex-1 flex items-center justify-center gap-1.5 h-12 min-h-[48px]"
                >
                  <span>Book Another</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
