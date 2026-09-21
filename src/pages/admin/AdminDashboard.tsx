import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VEHICLES } from '../../data/vehicles';
import { DESTINATIONS } from '../../data/destinations';
import { GALLERY_ITEMS } from '../../data/gallery';
import { COMPANY, createWhatsAppUrl } from '../../data/company';
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
  MessageSquare
} from 'lucide-react';
import { InstagramIcon } from '../../components/Icons';

type TabType = 'overview' | 'bookings' | 'tours' | 'vehicles' | 'enquiries' | 'gallery' | 'settings';

interface BookingItem {
  id: string;
  customerName: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  vehicle: string;
  passengers: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  amountQuote?: string;
}

interface EnquiryItem {
  id: string;
  customerName: string;
  phone: string;
  route: string;
  travelDate: string;
  vehicleRequired: string;
  passengers: string;
  status: 'New' | 'In Progress' | 'Contacted';
  receivedAt: string;
  notes?: string;
}

// Initial structured data for Sri Guru management UI
const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 'SG-1082',
    customerName: 'Karthik Raja',
    phone: '+91 98401 23456',
    pickup: 'Chennai Central',
    destination: 'Ooty & Coonoor',
    date: '2026-09-28',
    vehicle: 'Force Traveller',
    passengers: '12 Persons',
    status: 'Confirmed',
    amountQuote: 'Standard Tariff on Enquiry',
  },
  {
    id: 'SG-1083',
    customerName: 'Senthil Nathan',
    phone: '+91 94440 98765',
    pickup: 'Tambaram, Chennai',
    destination: 'Tirupati Pilgrimage',
    date: '2026-09-25',
    vehicle: 'Passenger Car / SUV',
    passengers: '4 Persons',
    status: 'Confirmed',
    amountQuote: 'Confirmed',
  },
  {
    id: 'SG-1084',
    customerName: 'Anand & Family',
    phone: '+91 97911 34567',
    pickup: 'Chennai Airport (MAA)',
    destination: 'Munnar & Thekkady',
    date: '2026-10-02',
    vehicle: 'Force Traveller',
    passengers: '10 Persons',
    status: 'Pending',
    amountQuote: 'Quote Shared',
  },
  {
    id: 'SG-1085',
    customerName: 'Tech Corp Team Outing',
    phone: '+91 99400 11223',
    pickup: 'OMR, Chennai',
    destination: 'Mahabalipuram & Pondicherry',
    date: '2026-09-22',
    vehicle: 'SML Mini Bus',
    passengers: '22 Persons',
    status: 'Completed',
    amountQuote: 'Completed',
  },
  {
    id: 'SG-1086',
    customerName: 'Priya Sundaram',
    phone: '+91 98844 55667',
    pickup: 'Coimbatore',
    destination: 'Kodaikanal',
    date: '2026-10-10',
    vehicle: 'Passenger Car / SUV',
    passengers: '3 Persons',
    status: 'Pending',
    amountQuote: 'Awaiting Confirmation',
  },
];

const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'ENQ-401',
    customerName: 'Vigneshwaran',
    phone: '+91 90031 88990',
    route: 'Chennai to Munnar 3D/2N',
    travelDate: '2026-10-05',
    vehicleRequired: 'Force Traveller',
    passengers: '9-14 People',
    status: 'New',
    receivedAt: 'Today, 10:30 AM',
    notes: 'Requested push-back seats and family pickup in Anna Nagar.',
  },
  {
    id: 'ENQ-402',
    customerName: 'Meenakshi Amman Group',
    phone: '+91 94432 11002',
    route: 'Madurai & Rameswaram Temple Circuit',
    travelDate: '2026-10-12',
    vehicleRequired: 'SML Mini Bus',
    passengers: '15-25 People',
    status: 'In Progress',
    receivedAt: 'Yesterday, 04:15 PM',
    notes: 'Senior citizen pilgrimage group, flexible morning departure.',
  },
  {
    id: 'ENQ-403',
    customerName: 'Rajesh Subramanian',
    phone: '+91 98410 77665',
    route: 'Chennai Airport to ECR Resort',
    travelDate: '2026-09-30',
    vehicleRequired: 'Passenger Car / SUV',
    passengers: '1-4 People',
    status: 'Contacted',
    receivedAt: '20 Sep 2026',
    notes: 'Quote provided on WhatsApp.',
  },
];

export const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    companyName: COMPANY.name,
    phone: COMPANY.phone,
    whatsapp: COMPANY.whatsappNumber,
    instagram: COMPANY.instagram,
    email: COMPANY.email,
    address: COMPANY.address,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin', { replace: true });
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: bookings.length },
    { id: 'tours', label: 'Tour Packages', icon: Compass, badge: DESTINATIONS.length },
    { id: 'vehicles', label: 'Vehicles & Fleet', icon: Car, badge: VEHICLES.length },
    { id: 'enquiries', label: 'Customer Enquiries', icon: MessageSquareText, badge: enquiries.filter(e => e.status === 'New').length },
    { id: 'gallery', label: 'Photo Gallery', icon: Images, badge: GALLERY_ITEMS.length },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, newStatus: BookingItem['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleEnquiryStatusChange = (enquiryId: string, newStatus: EnquiryItem['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
    );
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-brand-navy-900 border-b border-brand-gold-500/20 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-brand-gold-400" />
          <span className="font-serif font-bold text-gold-metallic text-sm">Sri Guru Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-brand-navy-950 border border-slate-700 text-slate-300"
          aria-label="Toggle Sidebar"
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
                {user?.email || 'Administrator'}
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
              <span>Admin: <strong className="text-slate-200">{user?.email || 'admin'}</strong></span>
            </div>
          </div>
        </header>

        {/* Tab Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          
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
                      Manage bookings, track vehicle fleet status, respond to customer enquiries, and update website configuration.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm hover:from-brand-gold-300 hover:to-brand-gold-500 transition-all"
                    >
                      View Bookings
                    </button>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-slate-200 bg-brand-navy-950 border border-slate-700 hover:border-brand-gold-400 transition-all"
                    >
                      New Enquiries
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</span>
                    <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{bookings.length}</div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active bookings scheduled</span>
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
                    <span>{enquiries.filter(e => e.status === 'New').length} pending follow-up</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Fleet</span>
                    <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                      <Car className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{VEHICLES.length}</div>
                  <div className="text-xs text-slate-400 mt-2">
                    Force Traveller, SUV, Buses
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tour Circuits</span>
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{DESTINATIONS.length}</div>
                  <div className="text-xs text-slate-400 mt-2">
                    South India Destination Routes
                  </div>
                </div>

              </div>

              {/* Two Column Grid: Recent Bookings & Fleet Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 cols: Recent Bookings */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                    <h3 className="font-serif font-bold text-white text-base uppercase">
                      Recent Bookings & Itineraries
                    </h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-brand-gold-400 hover:text-brand-gold-300 font-semibold"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-brand-navy-950 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-brand-gold-500/30 transition-colors"
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{item.customerName}</span>
                            <span className="text-[10px] text-brand-gold-400 font-mono">({item.id})</span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {item.pickup} → {item.destination} • {item.vehicle}
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
                          <span className="block text-[11px] text-slate-500 mt-1 font-mono">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 cols: Quick Contacts & Fleet Status */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Fleet status */}
                  <div className="p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl">
                    <h3 className="font-serif font-bold text-white text-base uppercase mb-4 pb-3 border-b border-slate-800">
                      Fleet Operational Status
                    </h3>
                    <div className="space-y-3">
                      {VEHICLES.map((v) => (
                        <div key={v.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <img src={v.image} alt={v.name} className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                            <span className="text-white font-medium">{v.name}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                            Available
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Hotline card */}
                  <div className="p-5 rounded-2xl bg-brand-navy-900/90 border border-brand-gold-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Customer Hotline</span>
                        <span className="text-sm font-bold text-white">{COMPANY.phone}</span>
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
              
              {/* Filter and Search Bar */}
              <div className="p-4 sm:p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by customer, route, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold-400"
                  />
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        statusFilter === st
                          ? 'bg-brand-gold-500 text-brand-navy-950 shadow-sm'
                          : 'bg-brand-navy-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table */}
              <div className="rounded-2xl bg-brand-navy-900/90 border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-brand-navy-950 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-4">Booking ID</th>
                        <th className="px-5 py-4">Customer Details</th>
                        <th className="px-5 py-4">Route & Destination</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Vehicle</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                            No bookings found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-brand-navy-950/60 transition-colors">
                            <td className="px-5 py-4 font-mono font-bold text-brand-gold-400 text-xs">
                              {b.id}
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-semibold text-white">{b.customerName}</div>
                              <div className="text-xs text-slate-400">{b.phone}</div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-medium text-slate-200">{b.destination}</div>
                              <div className="text-xs text-slate-400">Pickup: {b.pickup}</div>
                            </td>
                            <td className="px-5 py-4 text-xs font-mono text-slate-300">
                              {b.date}
                            </td>
                            <td className="px-5 py-4 text-xs text-slate-200">
                              <div>{b.vehicle}</div>
                              <div className="text-[11px] text-slate-500">{b.passengers}</div>
                            </td>
                            <td className="px-5 py-4">
                              <select
                                value={b.status}
                                onChange={(e) => handleStatusChange(b.id, e.target.value as BookingItem['status'])}
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
                              <button
                                onClick={() => setSelectedBooking(b)}
                                className="px-3 py-1.5 rounded-lg bg-brand-navy-950 hover:bg-brand-navy-800 border border-slate-700 hover:border-brand-gold-400 text-xs font-medium text-slate-200 hover:text-white transition-colors"
                              >
                                View
                              </button>
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
                    Tour Circuits & Packages ({DESTINATIONS.length})
                  </h3>
                  <p className="text-xs text-slate-400">Manage curated holiday and pilgrimage itineraries</p>
                </div>
                <button
                  onClick={() => alert('Tour package editor can be linked to Supabase tour_packages table.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 shadow-gold-sm transition-all"
                >
                  + Add New Package
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DESTINATIONS.map((dest) => (
                  <div
                    key={dest.id}
                    className="rounded-2xl overflow-hidden bg-brand-navy-900 border border-slate-800 shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative h-44 w-full">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-navy-950/80 text-brand-gold-300 text-[11px] font-semibold border border-brand-gold-500/30">
                        {dest.state}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-white text-lg uppercase">{dest.name}</h4>
                        <p className="text-xs text-brand-gold-400 font-medium mb-2">{dest.tag}</p>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{dest.description}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {dest.highlights.map((h, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-brand-navy-950 text-[10px] text-slate-300 border border-slate-800">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active on Website
                        </span>
                        <a
                          href={createWhatsAppUrl(`Enquiring about ${dest.name} tour package.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-gold-400 hover:text-brand-gold-300 font-semibold text-xs"
                        >
                          Preview CTA →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: VEHICLES ================= */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-white text-lg uppercase">
                    Fleet Management ({VEHICLES.length})
                  </h3>
                  <p className="text-xs text-slate-400">Manage vehicle details, features, and operational readiness</p>
                </div>
                <button
                  onClick={() => alert('Vehicle fleet editor can be connected to Supabase vehicles table.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 shadow-gold-sm transition-all"
                >
                  + Add Fleet Vehicle
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VEHICLES.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full sm:w-44 h-36 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-300 text-[11px] font-semibold uppercase">
                            {vehicle.category}
                          </span>
                          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ready
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-white text-lg uppercase mt-1">
                          {vehicle.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{vehicle.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <span>{vehicle.capacityNote}</span>
                        <span className="text-brand-gold-300 font-semibold">{vehicle.pricingNote}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: CUSTOMER ENQUIRIES ================= */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-white text-lg uppercase">
                  Customer Enquiries & WhatsApp Leads ({enquiries.length})
                </h3>
                <p className="text-xs text-slate-400">Direct booking requests submitted by website visitors</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 sm:p-6 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-white">{enq.customerName}</span>
                        <span className="text-xs font-mono text-brand-gold-400">({enq.id})</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            enq.status === 'New'
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                              : enq.status === 'In Progress'
                              ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300">
                        <strong>Route:</strong> {enq.route} • <strong>Date:</strong> {enq.travelDate} • <strong>Vehicle:</strong> {enq.vehicleRequired}
                      </div>

                      {enq.notes && (
                        <p className="text-xs text-slate-400 italic">"{enq.notes}"</p>
                      )}

                      <div className="text-[11px] text-slate-500">
                        Received: {enq.receivedAt}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <select
                        value={enq.status}
                        onChange={(e) => handleEnquiryStatusChange(enq.id, e.target.value as EnquiryItem['status'])}
                        className="px-3 py-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-xs font-semibold text-slate-200"
                      >
                        <option value="New">Mark: New</option>
                        <option value="In Progress">Mark: In Progress</option>
                        <option value="Contacted">Mark: Contacted</option>
                      </select>

                      <a
                        href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                        className="p-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-white"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4 text-brand-gold-400" />
                      </a>

                      <a
                        href={createWhatsAppUrl(`Hi ${enq.customerName}, regarding your travel enquiry for ${enq.route} with Sri Guru Tours and Travels:`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: GALLERY ================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-white text-lg uppercase">
                    Website Gallery Media ({GALLERY_ITEMS.length})
                  </h3>
                  <p className="text-xs text-slate-400">Client vehicles and tour photographs featured on the website</p>
                </div>
                <button
                  onClick={() => alert('Gallery manager can be integrated with Supabase Storage bucket.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 shadow-gold-sm transition-all"
                >
                  + Upload Photo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {GALLERY_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl overflow-hidden bg-brand-navy-900 border border-slate-800 shadow-xl"
                  >
                    <div className="relative h-48 w-full bg-brand-navy-950">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-navy-950/80 text-brand-gold-300 text-[10px] font-semibold border border-brand-gold-500/30">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-white uppercase">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 7: WEBSITE SETTINGS ================= */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="font-serif font-bold text-white text-lg uppercase">
                  Website & Business Settings
                </h3>
                <p className="text-xs text-slate-400">Update company contact details, WhatsApp connection, and social links</p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl space-y-5">
                
                {saveSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Settings successfully saved and synchronized.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.companyName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                      WhatsApp Booking Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                    Instagram Profile URL
                  </label>
                  <div className="relative">
                    <InstagramIcon className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                    Operating Base / Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold-400"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 shadow-gold-sm hover:from-brand-gold-300 hover:to-brand-gold-500 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </main>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-brand-navy-950 border border-brand-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedBooking(null)}
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
                  Booking Details #{selectedBooking.id}
                </h3>
                <span className="text-xs text-slate-400">Scheduled Date: {selectedBooking.date}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-brand-navy-900 border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px]">Customer</span>
                  <strong className="text-white text-sm">{selectedBooking.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Phone</span>
                  <a href={`tel:${selectedBooking.phone}`} className="text-brand-gold-300 hover:underline">
                    {selectedBooking.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Pickup</span>
                  <span className="text-white">{selectedBooking.pickup}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Destination</span>
                  <span className="text-white">{selectedBooking.destination}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Vehicle</span>
                  <span className="text-white">{selectedBooking.vehicle}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Passengers</span>
                  <span className="text-white">{selectedBooking.passengers}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Change Booking Status:
                </label>
                <select
                  value={selectedBooking.status}
                  onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value as BookingItem['status'])}
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
                href={createWhatsAppUrl(`Hi ${selectedBooking.customerName}, this is regarding your Sri Guru Tours booking (${selectedBooking.id}) for ${selectedBooking.destination}:`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Customer</span>
              </a>
              <button
                onClick={() => setSelectedBooking(null)}
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
