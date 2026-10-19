import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from 'react';
import {
  SalonService,
  Studio,
  Artist,
  Appointment,
  Review,
  GalleryItem,
  AppointmentStatus,
} from '../types';
import {
  services as initialServices,
  studio as initialStudio,
  artists as initialArtists,
  initialAppointments,
  reviews as initialReviews,
  gallery as initialGallery,
} from '../data/initialData';
import {
  getStoredItem,
  setStoredItem,
  safeLocalStorage,
  STORAGE_KEYS,
} from '../lib/storage';

export interface BookingPrefill {
  serviceId?: string;
  serviceIds?: string[];
  artistId?: string;
  mode?: 'studio' | 'home';
}

export interface BookingModalState {
  isOpen: boolean;
  prefill?: BookingPrefill;
}

export interface LightboxState {
  isOpen: boolean;
  item?: GalleryItem;
}

export interface NewAppointmentPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  serviceIds?: string[];
  artistId?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  mode: 'studio' | 'home';
  homeAddress?: string;
  notes?: string;
  totalPricePKR: number;
  addonIds: string[];
}

export interface SalonContextType {
  // Domain State
  studio: Studio;
  services: SalonService[];
  artists: Artist[];
  appointments: Appointment[];
  reviews: Review[];
  gallery: GalleryItem[];

  // UI Modal State
  bookingModal: BookingModalState;
  lightbox: LightboxState;

  // UI Modal Actions
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
  openLightbox: (item: GalleryItem) => void;
  closeLightbox: () => void;

  // Appointment Actions
  createAppointment: (payload: NewAppointmentPayload) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  rescheduleAppointment: (id: string, newDate: string, newSlot: string) => boolean;
  deleteAppointment: (id: string) => void;
  isSlotTaken: (date: string, slot: string, artistId?: string, excludeAppointmentId?: string) => boolean;

  // Service Management Actions
  addService: (service: Omit<SalonService, 'id'>) => SalonService;
  updateService: (service: SalonService) => void;
  deleteService: (id: string) => void;

  // Studio & Artist Actions
  updateStudio: (studio: Studio) => void;
  updateArtist: (artist: Artist) => void;

  // System
  resetToDefaults: () => void;
}

const SalonContext = createContext<SalonContextType | null>(null);

export function SalonProvider({ children }: { children: ReactNode }): React.ReactElement {
  // Domain states initialized with safe localStorage or seed fallbacks
  const [studio, setStudio] = useState<Studio>(() =>
    getStoredItem<Studio>(STORAGE_KEYS.STUDIO, initialStudio)
  );

  const [services, setServices] = useState<SalonService[]>(() =>
    getStoredItem<SalonService[]>(STORAGE_KEYS.SERVICES, initialServices)
  );

  const [artists, setArtists] = useState<Artist[]>(() =>
    getStoredItem<Artist[]>(STORAGE_KEYS.ARTISTS, initialArtists)
  );

  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    getStoredItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, initialAppointments)
  );

  const [reviews] = useState<Review[]>(initialReviews);
  const [gallery] = useState<GalleryItem[]>(initialGallery);

  // UI States
  const [bookingModal, setBookingModal] = useState<BookingModalState>({
    isOpen: false,
  });
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
  });

  // Persistence flags to skip initial render
  const isFirstRender = useRef(true);

  // Synchronize state across browser tabs via storage events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (!e.key) return;
      if (e.key === STORAGE_KEYS.STUDIO && e.newValue) {
        try {
          setStudio(JSON.parse(e.newValue));
        } catch {
          // ignore corrupted event
        }
      }
      if (e.key === STORAGE_KEYS.SERVICES && e.newValue) {
        try {
          setServices(JSON.parse(e.newValue));
        } catch {
          // ignore corrupted event
        }
      }
      if (e.key === STORAGE_KEYS.ARTISTS && e.newValue) {
        try {
          setArtists(JSON.parse(e.newValue));
        } catch {
          // ignore corrupted event
        }
      }
      if (e.key === STORAGE_KEYS.APPOINTMENTS && e.newValue) {
        try {
          setAppointments(JSON.parse(e.newValue));
        } catch {
          // ignore corrupted event
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist state changes to safeLocalStorage (skipping first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setStoredItem(STORAGE_KEYS.STUDIO, studio);
    setStoredItem(STORAGE_KEYS.SERVICES, services);
    setStoredItem(STORAGE_KEYS.ARTISTS, artists);
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  }, [studio, services, artists, appointments]);

  // UI Modal Handlers
  const openBooking = useCallback((prefill?: BookingPrefill): void => {
    setBookingModal({ isOpen: true, prefill });
  }, []);

  const closeBooking = useCallback((): void => {
    setBookingModal({ isOpen: false });
  }, []);

  const openLightbox = useCallback((item: GalleryItem): void => {
    setLightbox({ isOpen: true, item });
  }, []);

  const closeLightbox = useCallback((): void => {
    setLightbox({ isOpen: false });
  }, []);

  // Slot availability verification
  const isSlotTaken = useCallback(
    (
      date: string,
      slot: string,
      artistId?: string,
      excludeAppointmentId?: string
    ): boolean => {
      const activeAppointments = appointments.filter(
        (apt) => apt.status !== 'cancelled' && apt.id !== excludeAppointmentId
      );

      // If checking a specific artist
      if (artistId) {
        return activeAppointments.some(
          (apt) => apt.date === date && apt.timeSlot === slot && apt.artistId === artistId
        );
      }

      // Studio-wide capacity check (max 4 concurrent private suites)
      const concurrentBookings = activeAppointments.filter(
        (apt) => apt.date === date && apt.timeSlot === slot
      );
      return concurrentBookings.length >= 4;
    },
    [appointments]
  );

  // Appointment Management Actions
  const createAppointment = useCallback(
    (payload: NewAppointmentPayload): Appointment => {
      const year = new Date().getFullYear();
      let uniqueId = '';
      let attempts = 0;

      do {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        uniqueId = `LX-${year}-${randomDigits}`;
        attempts++;
      } while (appointments.some((apt) => apt.id === uniqueId) && attempts < 1000);

      const newAppointment: Appointment = {
        ...payload,
        id: uniqueId,
        createdAt: new Date().toISOString(),
        status: 'pending',
        serviceIds: payload.serviceIds && payload.serviceIds.length > 0 ? payload.serviceIds : [payload.serviceId],
      };

      setAppointments((prev) => [newAppointment, ...prev]);
      return newAppointment;
    },
    [appointments]
  );

  const updateAppointmentStatus = useCallback(
    (id: string, status: AppointmentStatus): void => {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
      );
    },
    []
  );

  const rescheduleAppointment = useCallback(
    (id: string, newDate: string, newSlot: string): boolean => {
      const target = appointments.find((apt) => apt.id === id);
      if (!target) return false;

      // Reject if slot is already occupied
      if (isSlotTaken(newDate, newSlot, target.artistId, id)) {
        return false;
      }

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, date: newDate, timeSlot: newSlot } : apt
        )
      );
      return true;
    },
    [appointments, isSlotTaken]
  );

  const deleteAppointment = useCallback((id: string): void => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }, []);

  // Service Management Actions
  const addService = useCallback(
    (serviceData: Omit<SalonService, 'id'>): SalonService => {
      const newService: SalonService = {
        ...serviceData,
        id: `srv-${Date.now()}`,
      };
      setServices((prev) => [newService, ...prev]);
      return newService;
    },
    []
  );

  const updateService = useCallback((updatedService: SalonService): void => {
    setServices((prev) =>
      prev.map((srv) => (srv.id === updatedService.id ? updatedService : srv))
    );
  }, []);

  const deleteService = useCallback((id: string): void => {
    setServices((prev) => prev.filter((srv) => srv.id !== id));
  }, []);

  // Studio & Artist Actions
  const updateStudio = useCallback((updatedStudio: Studio): void => {
    setStudio(updatedStudio);
  }, []);

  const updateArtist = useCallback((updatedArtist: Artist): void => {
    setArtists((prev) =>
      prev.map((art) => (art.id === updatedArtist.id ? updatedArtist : art))
    );
  }, []);

  // Reset to Defaults
  const resetToDefaults = useCallback((): void => {
    safeLocalStorage.removeItem(STORAGE_KEYS.STUDIO);
    safeLocalStorage.removeItem(STORAGE_KEYS.SERVICES);
    safeLocalStorage.removeItem(STORAGE_KEYS.ARTISTS);
    safeLocalStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);

    setStudio(initialStudio);
    setServices(initialServices);
    setArtists(initialArtists);
    setAppointments(initialAppointments);
  }, []);

  const value = useMemo<SalonContextType>(
    () => ({
      studio,
      services,
      artists,
      appointments,
      reviews,
      gallery,
      bookingModal,
      lightbox,
      openBooking,
      closeBooking,
      openLightbox,
      closeLightbox,
      createAppointment,
      updateAppointmentStatus,
      rescheduleAppointment,
      deleteAppointment,
      isSlotTaken,
      addService,
      updateService,
      deleteService,
      updateStudio,
      updateArtist,
      resetToDefaults,
    }),
    [
      studio,
      services,
      artists,
      appointments,
      reviews,
      gallery,
      bookingModal,
      lightbox,
      openBooking,
      closeBooking,
      openLightbox,
      closeLightbox,
      createAppointment,
      updateAppointmentStatus,
      rescheduleAppointment,
      deleteAppointment,
      isSlotTaken,
      addService,
      updateService,
      deleteService,
      updateStudio,
      updateArtist,
      resetToDefaults,
    ]
  );

  return <SalonContext.Provider value={value}>{children}</SalonContext.Provider>;
}

export function useSalon(): SalonContextType {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a <SalonProvider>');
  }
  return context;
}
