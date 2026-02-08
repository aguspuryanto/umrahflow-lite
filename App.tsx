
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  MapPin, 
  User, 
  LayoutDashboard, 
  Search, 
  Moon, 
  Plane, 
  Calendar, 
  MessageCircle,
  X,
  Send,
  Loader2,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  Map as MapIcon,
  Users,
  Heart,
  MessageSquare,
  Share2,
  Star,
  PlusCircle,
  Navigation,
  Info,
  Filter,
  Tent,
  Building,
  History,
  ChevronLeft,
  XCircle,
  ChevronDown
} from 'lucide-react';
import { AppView, Package, Pilgrim, Post, MapLocation, Review } from './types';
import { useDatabase } from './services/useDatabase';
import PackageBooking from './components/PackageBooking';
import PackageItem from './components/PackageItem';
import CommunityView from './components/CommunityView';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import ChatAssistant from './components/ChatAssistant';
import MapView from './components/MapView';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Initialize database and load data using custom hook
  const { dbInitialized, packages, posts, reviews, isLoading, error } = useDatabase();

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setView(AppView.BOOKING);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView(AppView.LANDING);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600">Memuat aplikasi...</p>
          </div>
        </div>
      );
    }

    if (error && !dbInitialized) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Error loading application</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        </div>
      );
    }

    switch (view) {
      case AppView.LANDING:
        return <LandingPage onExplore={() => setView(AppView.PACKAGES)} />;
      case AppView.PACKAGES:
        return (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-16">
               <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-[0.2em] mb-4 block">Eksplorasi Perjalanan</span>
               <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Paket Umrah & Tour Pilihan</h2>
               <p className="text-gray-500 font-medium max-w-xl">Kami menghadirkan paket perjalanan spiritual terbaik dengan standar pelayanan prima.</p>
               <div className="w-16 h-1.5 bg-emerald-600 mt-8 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map((pkg) => (
                <PackageItem key={pkg.id} pkg={pkg} onSelect={handlePackageSelect} />
              ))}
            </div>
          </div>
        );
      case AppView.COMMUNITY:
        return <CommunityView posts={posts} />;
      case AppView.MAP:
        return <MapView />;
      case AppView.DASHBOARD:
        return <Dashboard onLogout={handleLogout} />;
      case AppView.BOOKING:
        return selectedPackage ? (
          <PackageBooking 
            pkg={selectedPackage} 
            onBack={() => setView(AppView.PACKAGES)} 
            onComplete={() => setView(AppView.LANDING)}
            reviews={reviews}
            packages={packages}
          />
        ) : null;
      default:
        return <LandingPage onExplore={() => setView(AppView.PACKAGES)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      <Navbar 
        currentView={view} 
        setView={setView} 
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="animate-in fade-in duration-500">
        {renderContent()}
      </main>

      {showLogin && (
        <LoginPage 
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-3 py-4 flex justify-between items-center z-50 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
        {(isLoggedIn ? [] : [
          { view: AppView.LANDING, icon: Home, label: 'Beranda' },
          { view: AppView.PACKAGES, icon: Plane, label: 'Paket' },
          { view: AppView.COMMUNITY, icon: Users, label: 'Forum' },
          { view: AppView.MAP, icon: MapIcon, label: 'Peta' },
        ]).map((item) => (
          <button 
            key={item.view}
            onClick={() => setView(item.view)} 
            className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${view === item.view ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className={`p-2 rounded-2xl transition-all ${view === item.view ? 'bg-emerald-50 scale-110' : 'bg-transparent'}`}>
              <item.icon className={`w-5 h-5 ${view === item.view ? 'fill-emerald-600/10' : ''}`} />
            </div>
            <span className={`text-[9px] font-extrabold uppercase tracking-widest ${view === item.view ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
          </button>
        ))}
      </div>

      <ChatAssistant />
      
      <footer className="hidden lg:block bg-emerald-950 text-white py-20 mt-20 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-12">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-8">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <Moon className="text-white w-6 h-6 fill-white" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight">Umrah<span className="text-emerald-500">Flow</span></span>
               </div>
               <p className="text-emerald-100/60 max-w-sm leading-relaxed mb-8">Platform manajemen umrah & tour digital terdepan di Indonesia. Melayani dengan hati, mengabdi dengan teknologi.</p>
               <div className="flex gap-4">
                  {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"></div>)}
               </div>
            </div>
            <div>
               <h4 className="font-bold text-lg mb-8">Layanan</h4>
               <ul className="space-y-4 text-sm text-emerald-100/60">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Manajemen Jamaah</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Booking Online</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Pembayaran Digital</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Support 24/7</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-lg mb-8">Perusahaan</h4>
               <ul className="space-y-4 text-sm text-emerald-100/60">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Tentang Kami</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Syarat & Ketentuan</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Kebijakan Privasi</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Hubungi Kami</li>
               </ul>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
