import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { COMPANY, createWhatsAppUrl } from '../../data/company';
import {
  TourPackageDB,
  VehicleDB,
  BookingDB,
  EnquiryDB,
  GalleryDB,
  WebsiteSettingsDB
} from '../../types/admin';
import { ToastContainer, ToastMessage } from '../../components/admin/Toast';
import {
  LayoutDashboard,
  CalendarCheck,
  Compass,
  Car,
  MessageSquareText,
  Images,
  Settings,
  LogOut,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Save,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  MapPin,
  Eye
} from 'lucide-react';
import { InstagramIcon, YouTubeIcon, FacebookIcon } from '../../components/Icons';

type TabType = 'overview' | 'bookings' | 'tours' | 'vehicles' | 'enquiries' | 'gallery' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Data states (Real database models, 0 if empty)
  const [bookings, setBookings] = useState<BookingDB[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackageDB[]>([]);
  const [vehicles, setVehicles] = useState<VehicleDB[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryDB[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryDB[]>([]);
  const [settings, setSettings] = useState<WebsiteSettingsDB>({
    company_name: COMPANY.name,
    proprietor: COMPANY.proprietor,
    phone: COMPANY.phone,
    secondary_phone: COMPANY.secondaryPhone,
    whatsapp: COMPANY.whatsappNumber,
    email: COMPANY.email,
    address: COMPANY.address,
    instagram: COMPANY.instagram,
    youtube: COMPANY.youtube,
    facebook: COMPANY.facebook,
  });

  // Filter & Search states
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('All');

  // Modals & Form Dialogs
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingDB | null>(null);
  const [viewingBooking, setViewingBooking] = useState<BookingDB | null>(null);

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackageDB | null>(null);

  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehicleDB | null>(null);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState<EnquiryDB | null>(null);

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    image_url: '',
    category: 'Fleet' as GalleryDB['category'],
    description: '',
  });

  // Fetch all live data from Supabase
  const fetchData = useCallback(async () => {
    setLoadingData(true);
    if (!isSupabaseConfigured()) {
      setLoadingData(false);
      return;
    }

    try {
      // 1. Fetch Bookings
      const { data: bData } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (bData) setBookings(bData);

      // 2. Fetch Tour Packages
      const { data: pData } = await supabase
        .from('tour_packages')
        .select('*')
        .order('created_at', { ascending: false });
      if (pData) setTourPackages(pData);

      // 3. Fetch Vehicles
      const { data: vData } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      if (vData) setVehicles(vData);

      // 4. Fetch Enquiries
      const { data: eData } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (eData) setEnquiries(eData);

      // 5. Fetch Gallery
      const { data: gData } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (gData) setGalleryItems(gData);

      // 6. Fetch Website Settings
      const { data: sData } = await supabase
        .from('website_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();
      if (sData) {
        setSettings({
          company_name: sData.company_name || COMPANY.name,
          proprietor: sData.proprietor || COMPANY.proprietor,
          phone: sData.phone || COMPANY.phone,
          secondary_phone: sData.secondary_phone || COMPANY.secondaryPhone,
          whatsapp: sData.whatsapp || COMPANY.whatsappNumber,
          email: sData.email || COMPANY.email,
          address: sData.address || COMPANY.address,
          instagram: sData.instagram || COMPANY.instagram,
          youtube: sData.youtube || COMPANY.youtube,
          facebook: sData.facebook || COMPANY.facebook,
        });
      }
    } catch {
      // Graceful local state handling
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin', { replace: true });
  };

  // ==========================================
  // 1. BOOKINGS CRUD
  // ==========================================
  const handleSaveBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isEdit = Boolean(editingBooking);

    const bookingRef = editingBooking?.booking_reference || `SG-${1000 + bookings.length + 1}`;
    const bookingPayload: BookingDB = {
      id: editingBooking?.id || Date.now().toString(),
      booking_reference: bookingRef,
      customer_name: formData.get('customer_name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || undefined,
      pickup_location: formData.get('pickup_location') as string,
      destination: formData.get('destination') as string,
      travel_date: formData.get('travel_date') as string,
      return_date: (formData.get('return_date') as string) || undefined,
      vehicle: formData.get('vehicle') as string,
      package_name: (formData.get('package_name') as string) || undefined,
      passengers: (formData.get('passengers') as string) || '1-4',
      status: (formData.get('status') as BookingDB['status']) || 'Pending',
      notes: (formData.get('notes') as string) || undefined,
      created_at: editingBooking?.created_at || new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured()) {
        if (isEdit) {
          await supabase.from('bookings').update(bookingPayload).eq('id', editingBooking!.id);
        } else {
          await supabase.from('bookings').insert([bookingPayload]);
        }
      }

      if (isEdit) {
        setBookings((prev) => prev.map((b) => (b.id === editingBooking!.id ? bookingPayload : b)));
        showToast('success', `Booking ${bookingRef} updated successfully.`);
      } else {
        setBookings((prev) => [bookingPayload, ...prev]);
        showToast('success', `Booking ${bookingRef} created successfully.`);
      }

      setBookingModalOpen(false);
      setEditingBooking(null);
    } catch {
      showToast('error', 'Failed to save booking. Please try again.');
    }
  };

  const handleDeleteBooking = async (id: string, ref: string) => {
    if (!window.confirm(`Are you sure you want to delete booking #${ref}?`)) return;
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('bookings').delete().eq('id', id);
      }
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (viewingBooking?.id === id) setViewingBooking(null);
      showToast('success', `Booking #${ref} deleted successfully.`);
    } catch {
      showToast('error', 'Failed to delete booking.');
    }
  };

  const handleBookingStatusChange = async (id: string, newStatus: BookingDB['status']) => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
      }
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      if (viewingBooking?.id === id) {
        setViewingBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      showToast('success', `Booking status updated to ${newStatus}.`);
    } catch {
      showToast('error', 'Failed to update status.');
    }
  };

  // ==========================================
  // 2. TOUR PACKAGES CRUD
  // ==========================================
  const handleSavePackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isEdit = Boolean(editingPackage);
    const placesInput = (formData.get('places') as string) || '';
    const placesArray = placesInput
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const packagePayload: TourPackageDB = {
      id: editingPackage?.id || Date.now().toString(),
      name: formData.get('name') as string,
      state: formData.get('state') as string,
      subtitle: (formData.get('subtitle') as string) || '',
      description: formData.get('description') as string,
      places: placesArray,
      image_url:
        (formData.get('image_url') as string) ||
        'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      is_active: formData.get('is_active') === 'true',
      created_at: editingPackage?.created_at || new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured()) {
        if (isEdit) {
          await supabase.from('tour_packages').update(packagePayload).eq('id', editingPackage!.id);
        } else {
          await supabase.from('tour_packages').insert([packagePayload]);
        }
      }

      if (isEdit) {
        setTourPackages((prev) => prev.map((p) => (p.id === editingPackage!.id ? packagePayload : p)));
        showToast('success', `Tour package "${packagePayload.name}" updated.`);
      } else {
        setTourPackages((prev) => [packagePayload, ...prev]);
        showToast('success', `Tour package "${packagePayload.name}" added successfully.`);
      }

      setPackageModalOpen(false);
      setEditingPackage(null);
    } catch {
      showToast('error', 'Failed to save tour package.');
    }
  };

  const handleDeletePackage = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('tour_packages').delete().eq('id', id);
      }
      setTourPackages((prev) => prev.filter((p) => p.id !== id));
      showToast('success', `Package "${name}" deleted.`);
    } catch {
      showToast('error', 'Failed to delete tour package.');
    }
  };

  const handleTogglePackageStatus = async (pkg: TourPackageDB) => {
    const updated = !pkg.is_active;
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('tour_packages').update({ is_active: updated }).eq('id', pkg.id);
      }
      setTourPackages((prev) => prev.map((p) => (p.id === pkg.id ? { ...p, is_active: updated } : p)));
      showToast('info', `Package "${pkg.name}" is now ${updated ? 'Active' : 'Inactive'}.`);
    } catch {
      showToast('error', 'Failed to change package status.');
    }
  };

  // ==========================================
  // 3. VEHICLES & FLEET CRUD
  // ==========================================
  const handleSaveVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isEdit = Boolean(editingVehicle);

    const vehiclePayload: VehicleDB = {
      id: editingVehicle?.id || Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      image_url:
        (formData.get('image_url') as string) ||
        '/vehicles/force-traveller.jpg',
      seating_capacity: (formData.get('seating_capacity') as string) || 'Details available on enquiry',
      status: (formData.get('status') as VehicleDB['status']) || 'Available',
      created_at: editingVehicle?.created_at || new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured()) {
        if (isEdit) {
          await supabase.from('vehicles').update(vehiclePayload).eq('id', editingVehicle!.id);
        } else {
          await supabase.from('vehicles').insert([vehiclePayload]);
        }
      }

      if (isEdit) {
        setVehicles((prev) => prev.map((v) => (v.id === editingVehicle!.id ? vehiclePayload : v)));
        showToast('success', `Vehicle "${vehiclePayload.name}" updated.`);
      } else {
        setVehicles((prev) => [vehiclePayload, ...prev]);
        showToast('success', `Vehicle "${vehiclePayload.name}" added to fleet.`);
      }

      setVehicleModalOpen(false);
      setEditingVehicle(null);
    } catch {
      showToast('error', 'Failed to save vehicle.');
    }
  };

  const handleDeleteVehicle = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from fleet?`)) return;
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('vehicles').delete().eq('id', id);
      }
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      showToast('success', `Vehicle "${name}" removed from fleet.`);
    } catch {
      showToast('error', 'Failed to delete vehicle.');
    }
  };

  const handleVehicleStatusChange = async (id: string, newStatus: VehicleDB['status']) => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('vehicles').update({ status: newStatus }).eq('id', id);
      }
      setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)));
      showToast('info', `Vehicle status updated to ${newStatus}.`);
    } catch {
      showToast('error', 'Failed to update vehicle status.');
    }
  };

  // ==========================================
  // 4. CUSTOMER ENQUIRIES CRUD
  // ==========================================
  const handleSaveEnquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isEdit = Boolean(editingEnquiry);

    const enquiryPayload: EnquiryDB = {
      id: editingEnquiry?.id || Date.now().toString(),
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || undefined,
      route: (formData.get('route') as string) || undefined,
      travel_date: (formData.get('travel_date') as string) || undefined,
      vehicle_required: (formData.get('vehicle_required') as string) || undefined,
      passengers: (formData.get('passengers') as string) || undefined,
      message: (formData.get('message') as string) || undefined,
      status: (formData.get('status') as EnquiryDB['status']) || 'New',
      created_at: editingEnquiry?.created_at || new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured()) {
        if (isEdit) {
          await supabase.from('enquiries').update(enquiryPayload).eq('id', editingEnquiry!.id);
        } else {
          await supabase.from('enquiries').insert([enquiryPayload]);
        }
      }

      if (isEdit) {
        setEnquiries((prev) => prev.map((enq) => (enq.id === editingEnquiry!.id ? enquiryPayload : enq)));
        showToast('success', `Enquiry from ${enquiryPayload.name} updated.`);
      } else {
        setEnquiries((prev) => [enquiryPayload, ...prev]);
        showToast('success', `Enquiry recorded successfully.`);
      }

      setEnquiryModalOpen(false);
      setEditingEnquiry(null);
    } catch {
      showToast('error', 'Failed to save enquiry.');
    }
  };

  const handleDeleteEnquiry = async (id: string, name: string) => {
    if (!window.confirm(`Delete enquiry from ${name}?`)) return;
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('enquiries').delete().eq('id', id);
      }
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      showToast('success', 'Enquiry deleted.');
    } catch {
      showToast('error', 'Failed to delete enquiry.');
    }
  };

  const handleEnquiryStatusChange = async (id: string, newStatus: EnquiryDB['status']) => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('enquiries').update({ status: newStatus }).eq('id', id);
      }
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
      showToast('info', `Enquiry marked as ${newStatus}.`);
    } catch {
      showToast('error', 'Failed to update enquiry status.');
    }
  };

  // ==========================================
  // 5. GALLERY CRUD
  // ==========================================
  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title.trim() || !newGalleryItem.image_url.trim()) {
      showToast('error', 'Please provide an image title and image URL.');
      return;
    }

    const payload: GalleryDB = {
      id: Date.now().toString(),
      title: newGalleryItem.title.trim(),
      image_url: newGalleryItem.image_url.trim(),
      category: newGalleryItem.category,
      description: newGalleryItem.description.trim() || undefined,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured()) {
        await supabase.from('gallery').insert([payload]);
      }
      setGalleryItems((prev) => [payload, ...prev]);
      setGalleryModalOpen(false);
      setNewGalleryItem({ title: '', image_url: '', category: 'Fleet', description: '' });
      showToast('success', `Photo "${payload.title}" added to gallery.`);
    } catch {
      showToast('error', 'Failed to add photo to gallery.');
    }
  };

  const handleDeleteGalleryItem = async (id: string, title: string) => {
    if (!window.confirm(`Delete photo "${title}" from gallery?`)) return;
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('gallery').delete().eq('id', id);
      }
      setGalleryItems((prev) => prev.filter((g) => g.id !== id));
      showToast('success', `Photo "${title}" removed.`);
    } catch {
      showToast('error', 'Failed to delete photo.');
    }
  };

  // ==========================================
  // 6. WEBSITE SETTINGS
  // ==========================================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('website_settings').upsert([
          {
            id: 'default',
            ...settings,
            updated_at: new Date().toISOString(),
          },
        ]);
      }
      showToast('success', 'Website settings saved and updated.');
    } catch {
      showToast('error', 'Failed to save website settings.');
    }
  };

  // Computed Real-Time Counts
  const totalBookingsCount = bookings.length;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const activeFleetCount = vehicles.filter((v) => v.status === 'Available').length;
  const activeTourPackagesCount = tourPackages.filter((p) => p.is_active).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: totalBookingsCount },
    { id: 'tours', label: 'Tour Packages', icon: Compass, badge: activeTourPackagesCount },
    { id: 'vehicles', label: 'Vehicles & Fleet', icon: Car, badge: activeFleetCount },
    { id: 'enquiries', label: 'Customer Enquiries', icon: MessageSquareText, badge: pendingEnquiriesCount },
    { id: 'gallery', label: 'Photo Gallery', icon: Images, badge: galleryItems.length },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer_name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.destination.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.phone.includes(bookingSearch) ||
      b.booking_reference.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      (e.route && e.route.toLowerCase().includes(enquirySearch.toLowerCase())) ||
      e.phone.includes(enquirySearch);
    const matchesStatus = enquiryStatusFilter === 'All' || e.status === enquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-brand-navy-950 text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-brand-navy-900 border-b border-brand-gold-500/20 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-brand-gold-400" />
          <span className="font-serif font-bold text-gold-metallic text-sm">Sri Guru Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-brand-navy-950 border border-slate-700 text-slate-300"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-72 bg-brand-navy-900/95 border-r border-brand-gold-500/20 flex flex-col justify-between p-5 backdrop-blur-xl transition-transform duration-300 shadow-2xl md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
            <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-gold-500 to-brand-gold-200 shadow-gold-sm flex-shrink-0">
              <img
                src="/logo.png"
                alt="Sri Guru Tours and Travels"
                className="w-full h-full object-cover rounded-full bg-brand-navy-950"
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="font-serif font-bold text-white text-base tracking-wide uppercase truncate">
                Sri Guru
              </h2>
              <p className="text-[11px] text-brand-gold-400 font-semibold tracking-wider uppercase truncate">
                Tours & Travels Admin
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-gold-500/20 to-brand-gold-500/5 text-brand-gold-300 border border-brand-gold-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-brand-navy-950/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-brand-gold-500 text-brand-navy-950'
                          : 'bg-brand-navy-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout at Bottom */}
        <div className="pt-5 border-t border-slate-800 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-brand-navy-950 border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-gold-500/20 border border-brand-gold-400/40 flex items-center justify-center text-brand-gold-400 text-xs font-bold uppercase">
              {user?.email ? user.email.charAt(0) : 'A'}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {user?.email || 'srigurutravels111@gmail.com'}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Verified Admin Role
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-brand-navy-900/80 border-b border-brand-gold-500/15 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-bold text-white uppercase tracking-wider font-serif">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-slate-400">
              Sri Guru Tours and Travels • Internal Management Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-300 hover:text-brand-gold-300 text-xs font-medium transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-4 w-px bg-slate-800" />

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-gold-400" />
              <span>Admin: <strong className="text-slate-200">{user?.email || 'srigurutravels111@gmail.com'}</strong></span>
            </div>
          </div>
        </header>

        {/* Tab Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          
          {loadingData ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 text-brand-gold-400 animate-spin" />
              <span className="text-xs font-semibold tracking-wider uppercase">Loading database records...</span>
            </div>
          ) : (
            <>
              {/* ================= TAB 1: OVERVIEW ================= */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Welcome Banner */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-850 to-brand-navy-900 border border-brand-gold-500/30 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase mb-3">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Live Travel Operations</span>
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase">
                          Welcome to Sri Guru <span className="text-gold-metallic">Portal</span>
                        </h2>
                        <p className="text-sm text-slate-300 mt-1 max-w-xl">
                          Manage bookings, track vehicle fleet status, respond to customer enquiries, and update website configuration in real-time.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            setEditingBooking(null);
                            setBookingModalOpen(true);
                          }}
                          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm hover:from-brand-gold-300 hover:to-brand-gold-500 transition-all flex items-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Booking</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('enquiries')}
                          className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-slate-200 bg-brand-navy-950 border border-slate-700 hover:border-brand-gold-400 transition-all"
                        >
                          Enquiries ({pendingEnquiriesCount})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Database Counts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</span>
                        <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400">
                          <CalendarCheck className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{totalBookingsCount}</div>
                      <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>Database records count</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer Enquiries</span>
                        <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
                          <MessageSquareText className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{enquiries.length}</div>
                      <div className="text-xs text-amber-400 mt-2 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{pendingEnquiriesCount} pending follow-up</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Fleet</span>
                        <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                          <Car className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{activeFleetCount}</div>
                      <div className="text-xs text-slate-400 mt-2">
                        {vehicles.length} total registered vehicles
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tour Circuits</span>
                        <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                          <Compass className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{activeTourPackagesCount}</div>
                      <div className="text-xs text-slate-400 mt-2">
                        {tourPackages.length} packages created
                      </div>
                    </div>
                  </div>

                  {/* Recent Bookings & Fleet Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl">
                      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                        <h3 className="font-serif font-bold text-white text-base uppercase">
                          Recent Bookings ({bookings.length})
                        </h3>
                        <button
                          onClick={() => setActiveTab('bookings')}
                          className="text-xs text-brand-gold-400 hover:text-brand-gold-300 font-semibold"
                        >
                          View All →
                        </button>
                      </div>

                      {bookings.length === 0 ? (
                        <div className="py-12 text-center text-slate-500 text-xs">
                          <p>No bookings added yet.</p>
                          <button
                            onClick={() => {
                              setEditingBooking(null);
                              setBookingModalOpen(true);
                            }}
                            className="mt-3 px-4 py-2 rounded-xl bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-300 text-xs font-semibold"
                          >
                            + Add First Booking
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {bookings.slice(0, 4).map((item) => (
                            <div
                              key={item.id}
                              className="p-3.5 rounded-xl bg-brand-navy-950 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-brand-gold-500/30 transition-colors"
                            >
                              <div className="overflow-hidden">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white">{item.customer_name}</span>
                                  <span className="text-[10px] text-brand-gold-400 font-mono">({item.booking_reference})</span>
                                </div>
                                <p className="text-xs text-slate-400 truncate mt-0.5">
                                  {item.pickup_location} → {item.destination} • {item.vehicle}
                                </p>
                              </div>

                              <div className="text-right flex-shrink-0">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                    item.status === 'Confirmed'
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                      : item.status === 'Pending'
                                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                      : item.status === 'Completed'
                                      ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                                      : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                                  }`}
                                >
                                  {item.status}
                                </span>
                                <span className="block text-[11px] text-slate-500 mt-1 font-mono">{item.travel_date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                      <div className="p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                          <h3 className="font-serif font-bold text-white text-base uppercase">
                            Fleet Status ({vehicles.length})
                          </h3>
                          <button
                            onClick={() => {
                              setEditingVehicle(null);
                              setVehicleModalOpen(true);
                            }}
                            className="text-xs text-brand-gold-400 hover:text-brand-gold-300 font-semibold"
                          >
                            + Add
                          </button>
                        </div>

                        {vehicles.length === 0 ? (
                          <div className="py-8 text-center text-slate-500 text-xs">
                            No vehicles added to database yet.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {vehicles.slice(0, 4).map((v) => (
                              <div key={v.id} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={v.image_url}
                                    alt={v.name}
                                    className="w-8 h-8 rounded-lg object-cover border border-slate-700 bg-brand-navy-950"
                                  />
                                  <span className="text-white font-medium">{v.name}</span>
                                </div>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    v.status === 'Available'
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                      : v.status === 'Booked'
                                      ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                      : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                                  }`}
                                >
                                  {v.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-brand-gold-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block font-medium">Customer 24/7 Hotline</span>
                            <span className="text-sm font-bold text-white">{settings.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAB 2: BOOKINGS ================= */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="p-4 sm:p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by customer, ref, route..."
                        value={bookingSearch}
                        onChange={(e) => setBookingSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold-400"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setBookingStatusFilter(st)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            bookingStatusFilter === st
                              ? 'bg-brand-gold-500 text-brand-navy-950 shadow-sm'
                              : 'bg-brand-navy-950 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          {st}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setEditingBooking(null);
                          setBookingModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm hover:from-brand-gold-300 hover:to-brand-gold-500 transition-all flex items-center gap-1.5 ml-auto sm:ml-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Booking</span>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-brand-navy-900/90 border border-slate-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-brand-navy-950 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                          <tr>
                            <th className="px-5 py-4">Booking Ref</th>
                            <th className="px-5 py-4">Customer</th>
                            <th className="px-5 py-4">Route</th>
                            <th className="px-5 py-4">Travel Date</th>
                            <th className="px-5 py-4">Vehicle</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {filteredBookings.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                                {bookings.length === 0
                                  ? 'No bookings found in database. Click "+ Add Booking" to create a new booking record.'
                                  : 'No bookings matching the filter criteria.'}
                              </td>
                            </tr>
                          ) : (
                            filteredBookings.map((b) => (
                              <tr key={b.id} className="hover:bg-brand-navy-950/60 transition-colors">
                                <td className="px-5 py-4 font-mono font-bold text-brand-gold-400 text-xs">
                                  {b.booking_reference}
                                </td>
                                <td className="px-5 py-4">
                                  <div className="font-semibold text-white">{b.customer_name}</div>
                                  <div className="text-xs text-slate-400">{b.phone}</div>
                                </td>
                                <td className="px-5 py-4">
                                  <div className="font-medium text-slate-200">{b.destination}</div>
                                  <div className="text-xs text-slate-400">Pickup: {b.pickup_location}</div>
                                </td>
                                <td className="px-5 py-4 text-xs font-mono text-slate-300">
                                  {b.travel_date}
                                </td>
                                <td className="px-5 py-4 text-xs text-slate-200">
                                  <div>{b.vehicle}</div>
                                  <div className="text-[11px] text-slate-500">{b.passengers}</div>
                                </td>
                                <td className="px-5 py-4">
                                  <select
                                    value={b.status}
                                    onChange={(e) => handleBookingStatusChange(b.id, e.target.value as BookingDB['status'])}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-navy-950 border focus:outline-none ${
                                      b.status === 'Confirmed'
                                        ? 'text-emerald-300 border-emerald-500/40'
                                        : b.status === 'Pending'
                                        ? 'text-amber-300 border-amber-500/40'
                                        : b.status === 'Completed'
                                        ? 'text-blue-300 border-blue-500/40'
                                        : 'text-rose-300 border-rose-500/40'
                                    }`}
                                  >
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="px-5 py-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setViewingBooking(b)}
                                      className="p-1.5 rounded-lg bg-brand-navy-950 hover:bg-brand-navy-800 border border-slate-700 text-slate-300 hover:text-white"
                                      title="View Details"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingBooking(b);
                                        setBookingModalOpen(true);
                                      }}
                                      className="p-1.5 rounded-lg bg-brand-navy-950 hover:bg-brand-navy-800 border border-slate-700 text-slate-300 hover:text-brand-gold-300"
                                      title="Edit Booking"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteBooking(b.id, b.booking_reference)}
                                      className="p-1.5 rounded-lg bg-brand-navy-950 hover:bg-rose-950 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300"
                                      title="Delete Booking"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAB 3: TOUR PACKAGES ================= */}
              {activeTab === 'tours' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg uppercase">
                        Tour Packages ({tourPackages.length})
                      </h3>
                      <p className="text-xs text-slate-400">Manage curated holiday and pilgrimage itineraries</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingPackage(null);
                        setPackageModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 shadow-gold-sm transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Package</span>
                    </button>
                  </div>

                  {tourPackages.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-brand-navy-900/60 border border-slate-800 text-slate-500">
                      <Compass className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                      <p className="text-sm font-medium">No tour packages created in database.</p>
                      <button
                        onClick={() => {
                          setEditingPackage(null);
                          setPackageModalOpen(true);
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-brand-navy-950 border border-brand-gold-500/40 text-brand-gold-300 text-xs font-semibold"
                      >
                        + Create First Tour Package
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tourPackages.map((dest) => (
                        <div
                          key={dest.id}
                          className="rounded-2xl overflow-hidden bg-brand-navy-900 border border-slate-800 shadow-xl flex flex-col justify-between"
                        >
                          <div className="relative h-44 w-full bg-brand-navy-950">
                            <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-transparent to-transparent" />
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-navy-950/80 text-brand-gold-300 text-[11px] font-semibold border border-brand-gold-500/30">
                              {dest.state}
                            </span>
                            <div className="absolute top-3 right-3 flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingPackage(dest);
                                  setPackageModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-brand-navy-950/80 text-slate-300 hover:text-white border border-slate-700"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePackage(dest.id, dest.name)}
                                className="p-1.5 rounded-lg bg-brand-navy-950/80 text-slate-300 hover:text-rose-400 border border-slate-700"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif font-bold text-white text-lg uppercase">{dest.name}</h4>
                              <p className="text-xs text-brand-gold-400 font-medium mb-2">{dest.subtitle}</p>
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{dest.description}</p>
                              
                              {dest.places && dest.places.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {dest.places.map((h, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded bg-brand-navy-950 text-[10px] text-slate-300 border border-slate-800">
                                      {h}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                              <button
                                onClick={() => handleTogglePackageStatus(dest)}
                                className={`font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] ${
                                  dest.is_active
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-900 text-slate-400 border-slate-700'
                                }`}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{dest.is_active ? 'Active on Site' : 'Inactive'}</span>
                              </button>
                              <a
                                href={createWhatsAppUrl(`Enquiring about ${dest.name} tour package.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-gold-400 hover:text-brand-gold-300 font-semibold text-xs"
                              >
                                WhatsApp CTA →
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 4: VEHICLES ================= */}
              {activeTab === 'vehicles' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg uppercase">
                        Fleet Management ({vehicles.length})
                      </h3>
                      <p className="text-xs text-slate-400">Manage vehicle details, features, and operational readiness</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingVehicle(null);
                        setVehicleModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 shadow-gold-sm transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Fleet Vehicle</span>
                    </button>
                  </div>

                  {vehicles.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-brand-navy-900/60 border border-slate-800 text-slate-500">
                      <Car className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                      <p className="text-sm font-medium">No vehicles registered in fleet database.</p>
                      <button
                        onClick={() => {
                          setEditingVehicle(null);
                          setVehicleModalOpen(true);
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-brand-navy-950 border border-brand-gold-500/40 text-brand-gold-300 text-xs font-semibold"
                      >
                        + Add First Fleet Vehicle
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {vehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-5 items-start"
                        >
                          <img
                            src={vehicle.image_url}
                            alt={vehicle.name}
                            className="w-full sm:w-44 h-36 rounded-xl object-cover border border-slate-700 bg-brand-navy-950 flex-shrink-0"
                          />

                          <div className="flex-1 flex flex-col justify-between h-full w-full">
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-300 text-[11px] font-semibold uppercase">
                                  {vehicle.type}
                                </span>
                                
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingVehicle(vehicle);
                                      setVehicleModalOpen(true);
                                    }}
                                    className="p-1 rounded bg-brand-navy-950 text-slate-300 hover:text-white border border-slate-700"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name)}
                                    className="p-1 rounded bg-brand-navy-950 text-slate-300 hover:text-rose-400 border border-slate-700"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              <h4 className="font-serif font-bold text-white text-lg uppercase mt-2">
                                {vehicle.name}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{vehicle.description}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                              <span>{vehicle.seating_capacity}</span>
                              <select
                                value={vehicle.status}
                                onChange={(e) => handleVehicleStatusChange(vehicle.id, e.target.value as VehicleDB['status'])}
                                className={`px-2 py-0.5 rounded text-[11px] font-bold bg-brand-navy-950 border focus:outline-none ${
                                  vehicle.status === 'Available'
                                    ? 'text-emerald-300 border-emerald-500/40'
                                    : vehicle.status === 'Booked'
                                    ? 'text-amber-300 border-amber-500/40'
                                    : 'text-rose-300 border-rose-500/40'
                                }`}
                              >
                                <option value="Available">Available</option>
                                <option value="Booked">Booked</option>
                                <option value="Maintenance">Maintenance</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 5: CUSTOMER ENQUIRIES ================= */}
              {activeTab === 'enquiries' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg uppercase">
                        Customer Enquiries ({enquiries.length})
                      </h3>
                      <p className="text-xs text-slate-400">Website leads and custom booking requests</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search enquiries..."
                          value={enquirySearch}
                          onChange={(e) => setEnquirySearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-xs text-white placeholder-slate-500"
                        />
                      </div>

                      {['All', 'New', 'Contacted', 'Resolved'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setEnquiryStatusFilter(st)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            enquiryStatusFilter === st
                              ? 'bg-brand-gold-500 text-brand-navy-950'
                              : 'bg-brand-navy-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {st}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setEditingEnquiry(null);
                          setEnquiryModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 flex items-center gap-1 ml-auto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Lead</span>
                      </button>
                    </div>
                  </div>

                  {filteredEnquiries.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-brand-navy-900/60 border border-slate-800 text-slate-500 text-xs">
                      No customer enquiries found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredEnquiries.map((enq) => (
                        <div
                          key={enq.id}
                          className="p-5 sm:p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-base font-bold text-white">{enq.name}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  enq.status === 'New'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                    : enq.status === 'Contacted'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                                    : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                }`}
                              >
                                {enq.status}
                              </span>
                            </div>

                            <div className="text-xs text-slate-300">
                              <strong>Phone:</strong> {enq.phone} • {enq.route && <><strong>Route:</strong> {enq.route} • </>}
                              {enq.travel_date && <><strong>Date:</strong> {enq.travel_date}</>}
                            </div>

                            {enq.message && (
                              <p className="text-xs text-slate-400 italic">"{enq.message}"</p>
                            )}

                            {enq.created_at && (
                              <div className="text-[11px] text-slate-500 font-mono">
                                Recorded: {new Date(enq.created_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <select
                              value={enq.status}
                              onChange={(e) => handleEnquiryStatusChange(enq.id, e.target.value as EnquiryDB['status'])}
                              className="px-3 py-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-xs font-semibold text-slate-200"
                            >
                              <option value="New">Mark: New</option>
                              <option value="Contacted">Mark: Contacted</option>
                              <option value="Resolved">Mark: Resolved</option>
                            </select>

                            <a
                              href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                              className="p-2 rounded-xl bg-brand-navy-950 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-white"
                              title="Call Customer"
                            >
                              <Phone className="w-4 h-4 text-brand-gold-400" />
                            </a>

                            <a
                              href={createWhatsAppUrl(`Hi ${enq.name}, regarding your travel enquiry with Sri Guru Tours and Travels:`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            <button
                              onClick={() => {
                                setEditingEnquiry(enq);
                                setEnquiryModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-300 hover:text-white"
                              title="Edit Enquiry"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteEnquiry(enq.id, enq.name)}
                              className="p-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-400 hover:text-rose-400"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 6: GALLERY ================= */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg uppercase">
                        Gallery Manager ({galleryItems.length})
                      </h3>
                      <p className="text-xs text-slate-400">Manage client fleet and travel photographs</p>
                    </div>
                    <button
                      onClick={() => setGalleryModalOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 shadow-gold-sm transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  {galleryItems.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-brand-navy-900/60 border border-slate-800 text-slate-500">
                      <Images className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                      <p className="text-sm font-medium">No gallery items registered in database.</p>
                      <button
                        onClick={() => setGalleryModalOpen(true)}
                        className="mt-4 px-4 py-2 rounded-xl bg-brand-navy-950 border border-brand-gold-500/40 text-brand-gold-300 text-xs font-semibold"
                      >
                        + Add First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {galleryItems.map((item) => (
                        <div
                          key={item.id}
                          className="group rounded-2xl overflow-hidden bg-brand-navy-900 border border-slate-800 shadow-xl"
                        >
                          <div className="relative h-48 w-full bg-brand-navy-950">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-navy-950/80 text-brand-gold-300 text-[10px] font-semibold border border-brand-gold-500/30">
                              {item.category}
                            </span>
                            <button
                              onClick={() => handleDeleteGalleryItem(item.id, item.title)}
                              className="absolute top-3 right-3 p-1.5 rounded-lg bg-brand-navy-950/80 text-slate-300 hover:text-rose-400 border border-slate-700"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h4 className="text-sm font-bold text-white uppercase">{item.title}</h4>
                            {item.description && (
                              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 7: WEBSITE SETTINGS ================= */}
              {activeTab === 'settings' && (
                <div className="max-w-3xl space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg uppercase">
                      Website & Business Settings
                    </h3>
                    <p className="text-xs text-slate-400">Update company contact details, WhatsApp connection, and official social channels</p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={settings.company_name}
                          onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Proprietor Name
                        </label>
                        <input
                          type="text"
                          value={settings.proprietor}
                          onChange={(e) => setSettings({ ...settings, proprietor: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Primary Phone (24/7)
                        </label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Secondary Phone (24/7)
                        </label>
                        <input
                          type="text"
                          value={settings.secondary_phone}
                          onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          WhatsApp Booking Number
                        </label>
                        <input
                          type="text"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          YouTube Channel
                        </label>
                        <div className="relative">
                          <YouTubeIcon className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            value={settings.youtube}
                            onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-gold-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Facebook Page
                        </label>
                        <div className="relative">
                          <FacebookIcon className="w-4 h-4 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            value={settings.facebook}
                            onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-gold-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                          Instagram Profile
                        </label>
                        <div className="relative">
                          <InstagramIcon className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            value={settings.instagram}
                            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-gold-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                        Official Registered Address
                      </label>
                      <textarea
                        rows={2}
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400 resize-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm hover:from-brand-gold-300 hover:to-brand-gold-500 transition-all flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Sync Settings</span>
                      </button>
                      <span className="text-xs text-slate-500">Changes reflect on public site</span>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: ADD / EDIT BOOKING */}
      {/* ============================================================ */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setBookingModalOpen(false);
                setEditingBooking(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-white text-xl uppercase">
                {editingBooking ? `Edit Booking #${editingBooking.booking_reference}` : 'Add New Booking Entry'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Manual booking entry for Sri Guru Tours and Travels</p>
            </div>

            <form onSubmit={handleSaveBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    defaultValue={editingBooking?.customer_name || ''}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    defaultValue={editingBooking?.phone || ''}
                    placeholder="e.g. +91 98401 23456"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Pickup Location *</label>
                  <input
                    type="text"
                    name="pickup_location"
                    required
                    defaultValue={editingBooking?.pickup_location || ''}
                    placeholder="e.g. Chennai Central / Airport"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Destination *</label>
                  <input
                    type="text"
                    name="destination"
                    required
                    defaultValue={editingBooking?.destination || ''}
                    placeholder="e.g. Ooty / Munnar / Tirupati"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Travel Date *</label>
                  <input
                    type="date"
                    name="travel_date"
                    required
                    defaultValue={editingBooking?.travel_date || ''}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Vehicle *</label>
                  <select
                    name="vehicle"
                    defaultValue={editingBooking?.vehicle || 'Force Traveller'}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="Force Traveller">Force Traveller</option>
                    <option value="Passenger Car / SUV">Passenger Car / SUV</option>
                    <option value="SML Mini Bus">SML Mini Bus</option>
                    <option value="Luxury Tourist Bus">Luxury Tourist Bus</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingBooking?.status || 'Pending'}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white font-semibold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Passenger Count</label>
                  <input
                    type="text"
                    name="passengers"
                    defaultValue={editingBooking?.passengers || '1-4 Persons'}
                    placeholder="e.g. 12 Persons"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingBooking?.email || ''}
                    placeholder="customer@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Trip Notes & Tariff Details</label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={editingBooking?.notes || ''}
                  placeholder="e.g. Special pickups, Advance paid, Return timing..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setBookingModalOpen(false);
                    setEditingBooking(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-navy-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ADD / EDIT TOUR PACKAGE */}
      {/* ============================================================ */}
      {packageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setPackageModalOpen(false);
                setEditingPackage(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-white text-xl uppercase">
                {editingPackage ? `Edit Package: ${editingPackage.name}` : 'Add Tour Package'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Configure itinerary and destination details</p>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Destination / Package Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingPackage?.name || ''}
                    placeholder="e.g. Ooty, Munnar, Tirupati"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">State / Region *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    defaultValue={editingPackage?.state || 'Tamil Nadu'}
                    placeholder="e.g. Tamil Nadu / Kerala"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subtitle / Highlight Tag</label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={editingPackage?.subtitle || ''}
                  placeholder="e.g. Queen of Hill Stations / 3 Days 2 Nights"
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  defaultValue={editingPackage?.description || ''}
                  placeholder="Brief summary of sights and travel experience..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Places & Attractions (Comma-separated)</label>
                <input
                  type="text"
                  name="places"
                  defaultValue={editingPackage?.places?.join(', ') || ''}
                  placeholder="e.g. Botanical Garden, Doddabetta, Pykara Lake"
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  defaultValue={editingPackage?.image_url || ''}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Status on Website</label>
                <select
                  name="is_active"
                  defaultValue={editingPackage ? (editingPackage.is_active ? 'true' : 'false') : 'true'}
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white font-semibold"
                >
                  <option value="true">Active (Visible to public)</option>
                  <option value="false">Inactive (Hidden)</option>
                </select>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPackageModalOpen(false);
                    setEditingPackage(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-navy-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: ADD / EDIT VEHICLE */}
      {/* ============================================================ */}
      {vehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setVehicleModalOpen(false);
                setEditingVehicle(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-white text-xl uppercase">
                {editingVehicle ? `Edit Vehicle: ${editingVehicle.name}` : 'Add Fleet Vehicle'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Register vehicle specifications and availability</p>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Vehicle Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingVehicle?.name || ''}
                    placeholder="e.g. Force Traveller 14 Seater"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Vehicle Category / Type *</label>
                  <select
                    name="type"
                    defaultValue={editingVehicle?.type || 'Tempo Traveller'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  >
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="Car / SUV">Car / SUV</option>
                    <option value="Mini Bus">Mini Bus</option>
                    <option value="Luxury Coach">Luxury Coach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  defaultValue={editingVehicle?.description || ''}
                  placeholder="Features, air conditioning, seating comfort..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Seating Capacity</label>
                  <input
                    type="text"
                    name="seating_capacity"
                    defaultValue={editingVehicle?.seating_capacity || 'Details available on enquiry'}
                    placeholder="e.g. 12 + 1 Driver"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingVehicle?.status || 'Available'}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white font-semibold"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Image URL or Local Path</label>
                <input
                  type="text"
                  name="image_url"
                  defaultValue={editingVehicle?.image_url || '/vehicles/force-traveller.jpg'}
                  placeholder="/vehicles/force-traveller.jpg"
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVehicleModalOpen(false);
                    setEditingVehicle(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-navy-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: ADD / EDIT ENQUIRY */}
      {/* ============================================================ */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setEnquiryModalOpen(false);
                setEditingEnquiry(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-white text-xl uppercase">
                {editingEnquiry ? `Edit Lead: ${editingEnquiry.name}` : 'Record New Customer Enquiry'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Lead tracking for call and WhatsApp follow-ups</p>
            </div>

            <form onSubmit={handleSaveEnquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingEnquiry?.name || ''}
                    placeholder="Customer Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    defaultValue={editingEnquiry?.phone || ''}
                    placeholder="+91 90035..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Route / Requirement</label>
                <input
                  type="text"
                  name="route"
                  defaultValue={editingEnquiry?.route || ''}
                  placeholder="e.g. Chennai to Ooty 3 Days Tour"
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Travel Date</label>
                  <input
                    type="date"
                    name="travel_date"
                    defaultValue={editingEnquiry?.travel_date || ''}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingEnquiry?.status || 'New'}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white font-semibold"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Customer Message / Notes</label>
                <textarea
                  name="message"
                  rows={2}
                  defaultValue={editingEnquiry?.message || ''}
                  placeholder="Customer requirements..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEnquiryModalOpen(false);
                    setEditingEnquiry(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-navy-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: ADD PHOTO TO GALLERY */}
      {/* ============================================================ */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-white text-xl uppercase">Add Photo to Gallery</h3>
              <p className="text-xs text-slate-400 mt-1">Add vehicle or travel shot to website gallery</p>
            </div>

            <form onSubmit={handleAddGalleryItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={newGalleryItem.title}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                  placeholder="e.g. Force Traveller on Ooty Hill Route"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category *</label>
                <select
                  value={newGalleryItem.category}
                  onChange={(e) =>
                    setNewGalleryItem({
                      ...newGalleryItem,
                      category: e.target.value as GalleryDB['category'],
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                >
                  <option value="Fleet">Fleet</option>
                  <option value="Travel">Travel</option>
                  <option value="Journeys">Journeys</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={newGalleryItem.image_url}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, image_url: e.target.value })}
                  placeholder="https://... or /vehicles/force-traveller.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={newGalleryItem.description}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                  placeholder="Short caption..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-brand-navy-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 6: VIEW BOOKING DETAILS */}
      {/* ============================================================ */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setViewingBooking(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <span className="p-2 rounded-xl bg-brand-gold-500/20 text-brand-gold-400">
                <CalendarCheck className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-white text-lg uppercase">
                  Booking #{viewingBooking.booking_reference}
                </h3>
                <span className="text-xs text-slate-400">Travel Date: {viewingBooking.travel_date}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-brand-navy-900 border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px]">Customer Name</span>
                  <strong className="text-white text-sm">{viewingBooking.customer_name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Phone</span>
                  <a href={`tel:${viewingBooking.phone}`} className="text-brand-gold-300 hover:underline font-bold">
                    {viewingBooking.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Pickup Location</span>
                  <span className="text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-gold-400" />
                    {viewingBooking.pickup_location}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Destination</span>
                  <span className="text-white font-semibold">{viewingBooking.destination}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Vehicle</span>
                  <span className="text-white">{viewingBooking.vehicle}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Passengers</span>
                  <span className="text-white">{viewingBooking.passengers}</span>
                </div>
              </div>

              {viewingBooking.notes && (
                <div className="p-3 rounded-xl bg-brand-navy-900 border border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Notes:</span>
                  <p className="text-xs text-slate-300 italic">{viewingBooking.notes}</p>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Change Status:</label>
                <select
                  value={viewingBooking.status}
                  onChange={(e) => handleBookingStatusChange(viewingBooking.id, e.target.value as BookingDB['status'])}
                  className="w-full px-3 py-2 rounded-xl bg-brand-navy-900 border border-slate-700 text-white text-xs font-semibold"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-3">
              <a
                href={createWhatsAppUrl(`Hi ${viewingBooking.customer_name}, regarding your Sri Guru Tours booking (${viewingBooking.booking_reference}) for ${viewingBooking.destination}:`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Customer</span>
              </a>
              <button
                onClick={() => setViewingBooking(null)}
                className="py-2.5 px-4 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-800 text-slate-300 font-semibold text-xs border border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
