
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
  ChevronLeft
} from 'lucide-react';
import { AppView, Package, Pilgrim, Post, MapLocation, Review } from './types';
import { PACKAGES, MOCK_PILGRIMS, MOCK_POSTS, MOCK_REVIEWS, MAP_LOCATIONS } from './constants';
import { askAssistant } from './services/gemini';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// --- Sub-components ---

const Navbar: React.FC<{ currentView: AppView; setView: (v: AppView) => void }> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.LANDING, label: 'Beranda' },
    { view: AppView.PACKAGES, label: 'Paket' },
    { view: AppView.COMMUNITY, label: 'Komunitas' },
    { view: AppView.MAP, label: 'Eksplor Peta' },
    { view: AppView.DASHBOARD, label: 'Admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Moon className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Umrah<span className="text-emerald-600">Flow</span></span>
          </div>
          
          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => setView(item.view)}
                className={`${currentView === item.view ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 border-b-2 border-transparent'} hover:text-emerald-600 font-medium transition-all text-sm py-5`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:block px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
              Masuk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const PackageItem: React.FC<{ pkg: Package; onSelect: (p: Package) => void }> = ({ pkg, onSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isFull = pkg.available === 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % pkg.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + pkg.images.length) % pkg.images.length);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
      {/* Image Carousel Section */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {pkg.images.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={`${pkg.title} ${idx + 1}`} 
              className="w-full h-full object-cover shrink-0" 
            />
          ))}
        </div>
        
        {/* Carousel Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={prevImage} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextImage} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
          {pkg.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'w-6 bg-emerald-500' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-emerald-700 shadow-sm uppercase tracking-widest border border-white/20">
            {pkg.type}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold shadow-xl">
          <Star className="w-3.5 h-3.5 fill-white" /> {pkg.rating}
        </div>

        {isFull && (
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-rose-500 text-white px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl animate-pulse">Full Booked</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{pkg.airline}</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-1">{pkg.title}</h3>
        </div>

        {/* Info Grid (Duration & Stats) */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-5">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Durasi</span>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold">{pkg.duration}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-l border-gray-100 pl-4">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sisa Kuota</span>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold">{pkg.available} <span className="text-[10px] text-gray-400">Pax</span></span>
            </div>
          </div>
        </div>

        {/* Features Preview Section */}
        <div className="mb-6 flex-1">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Fasilitas Utama</span>
          <div className="flex flex-wrap gap-2">
            {pkg.features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/50 rounded-xl text-[10px] font-bold text-emerald-700 border border-emerald-100/50">
                <CheckCircle2 className="w-3 h-3" /> {f}
              </div>
            ))}
            {pkg.features.length > 3 && (
              <div className="px-2 py-1.5 text-[10px] font-bold text-gray-400">+{pkg.features.length - 3} Lainya</div>
            )}
          </div>
        </div>

        {/* Price & CTA Section */}
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Mulai Dari</p>
            <p className="text-2xl font-black text-emerald-600 tracking-tighter leading-none">
              <span className="text-sm font-bold align-top mt-1 mr-0.5">Rp</span>
              {pkg.price.toLocaleString('id-ID').split(',')[0]}
              <span className="text-xs font-bold"> jt</span>
            </p>
          </div>
          <button 
            disabled={isFull}
            onClick={() => onSelect(pkg)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl shadow-emerald-900/10 ${
              isFull 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-1 active:scale-95'
            }`}
          >
            Pilih <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CommunityPost: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  
  const categoryColors = {
    'Tips': 'bg-blue-100 text-blue-700',
    'Pengalaman': 'bg-emerald-100 text-emerald-700',
    'Doa': 'bg-purple-100 text-purple-700',
    'Tanya': 'bg-amber-100 text-amber-700'
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-emerald-100" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${categoryColors[post.category]}`}>
                {post.category}
              </span>
            </div>
            <p className="text-[10px] text-gray-500">{post.time}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-emerald-600 transition-colors"><Share2 className="w-4 h-4" /></button>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>
      {post.image && (
        <div className="rounded-2xl overflow-hidden mb-4 h-56 border border-gray-50">
          <img src={post.image} alt="post content" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
        <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 text-sm transition-all active:scale-95 ${liked ? 'text-red-500' : 'text-gray-500'}`}>
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} /> {post.likes + (liked ? 1 : 0)}
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
          <MessageSquare className="w-4 h-4" /> {post.comments}
        </button>
      </div>
    </div>
  );
};

// --- View Components ---

const CommunityView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');
  const [activeCategory, setActiveCategory] = useState<Post['category'] | 'Semua'>('Semua');

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: 'Jamaah UmrahFlow',
      avatar: 'https://i.pravatar.cc/150?u=current_user',
      content: newPost,
      likes: 0,
      comments: 0,
      time: 'Baru saja',
      category: 'Pengalaman'
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filteredPosts = activeCategory === 'Semua' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Komunitas Jamaah</h1>
        <p className="text-gray-500">Berbagi pengalaman, tips perjalanan, dan inspirasi ibadah.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
        {['Semua', 'Tips', 'Pengalaman', 'Doa', 'Tanya'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:border-emerald-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="flex gap-4">
          <img src="https://i.pravatar.cc/150?u=current_user" className="w-12 h-12 rounded-full border-2 border-emerald-50" alt="avatar" />
          <div className="flex-1">
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Bagikan tips atau cerita perjalanan Anda..."
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"><PlusCircle className="w-5 h-5" /></button>
              </div>
              <button 
                onClick={handleAddPost}
                disabled={!newPost.trim()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all"
              >
                Posting
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map(post => <CommunityPost key={post.id} post={post} />)}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">Belum ada postingan di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MapView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<'Mecca' | 'Madinah'>('Mecca');
  const [activeType, setActiveType] = useState<MapLocation['type'] | 'All'>('All');
  const [activeLoc, setActiveLoc] = useState<MapLocation | null>(null);

  const filteredLocations = MAP_LOCATIONS.filter(l => 
    l.city === selectedCity && (activeType === 'All' || l.type === activeType)
  );

  const typeIcons = {
    'Hotel': <Building className="w-4 h-4" />,
    'Mosque': <Moon className="w-4 h-4" />,
    'Historical': <History className="w-4 h-4" />,
    'Meeting': <Tent className="w-4 h-4" />
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-140px)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Eksplor Peta Perjalanan</h1>
          <p className="text-sm text-gray-500">Panduan lokasi akomodasi, ibadah, dan titik temu.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['Mecca', 'Madinah'] as const).map(city => (
              <button 
                key={city}
                onClick={() => {setSelectedCity(city); setActiveLoc(null);}}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedCity === city ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Hotel', 'Mosque', 'Historical', 'Meeting'].map((type) => (
          <button 
            key={type}
            onClick={() => {setActiveType(type as any); setActiveLoc(null);}}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeType === type ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:border-emerald-200'}`}
          >
            {type === 'All' ? <Filter className="w-3.5 h-3.5" /> : typeIcons[type as MapLocation['type']]}
            {type === 'Meeting' ? 'Titik Temu' : type}
          </button>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {filteredLocations.map(loc => (
            <button 
              key={loc.id}
              onClick={() => setActiveLoc(loc)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${activeLoc?.id === loc.id ? 'bg-emerald-50 border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'bg-white border-gray-100 hover:border-emerald-200 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${loc.type === 'Hotel' ? 'bg-blue-50 text-blue-600' : loc.type === 'Mosque' ? 'bg-emerald-50 text-emerald-600' : loc.type === 'Meeting' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                  {typeIcons[loc.type]}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{loc.type === 'Meeting' ? 'Titik Temu' : loc.type}</span>
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{loc.name}</h4>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{loc.description}</p>
            </button>
          ))}
          {filteredLocations.length === 0 && (
            <div className="text-center py-10 opacity-50">
               <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
               <p className="text-xs">Tidak ada lokasi untuk filter ini.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 bg-[#f3f4f6] rounded-3xl relative overflow-hidden border border-gray-200 shadow-inner flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 pattern-dots"></div>
          
          {/* Schematic Map Representation */}
          <div className="relative w-full h-full p-8 flex flex-col items-center justify-center text-center">
            {filteredLocations.map((loc, idx) => (
               <div 
                 key={loc.id} 
                 style={{ 
                    position: 'absolute', 
                    top: `${15 + (idx * 12) % 70}%`, 
                    left: `${20 + (idx * 18) % 60}%` 
                 }}
                 className="group cursor-pointer"
                 onClick={() => setActiveLoc(loc)}
               >
                 <div className={`p-3 rounded-full shadow-lg border-2 border-white transition-all ${activeLoc?.id === loc.id ? 'bg-emerald-600 text-white scale-125 z-10' : 'bg-white text-emerald-600 hover:scale-110'}`}>
                    {typeIcons[loc.type]}
                 </div>
                 {activeLoc?.id === loc.id && (
                   <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-gray-100 animate-in fade-in zoom-in-95 pointer-events-none">
                      <p className="text-[10px] font-bold text-gray-900">{loc.name}</p>
                   </div>
                 )}
               </div>
            ))}

            {!activeLoc ? (
               <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl max-w-sm border border-white/50">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapIcon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Peta Interaktif</h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">Pilih lokasi di sisi kiri untuk melihat panduan navigasi dan detail informasi tempat.</p>
               </div>
            ) : (
               <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-10 lg:w-96 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-10">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeLoc.type === 'Hotel' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        <MapPin className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{activeLoc.type === 'Meeting' ? 'Titik Kumpul Penting' : activeLoc.type}</p>
                        <h3 className="font-bold text-xl text-gray-900 leading-tight">{activeLoc.name}</h3>
                      </div>
                    </div>
                    <button onClick={() => setActiveLoc(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X className="w-5 h-5" /></button>
                  </div>
                  <p className="text-sm text-gray-600 mb-8 leading-relaxed text-left">{activeLoc.description}</p>
                  <div className="flex gap-4">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${activeLoc.name} ${activeLoc.city}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95"
                    >
                      <Navigation className="w-5 h-5" /> Buka Navigasi
                    </a>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Assalamu\'alaikum! Saya Sahabat Umrah. Ada yang bisa saya bantu terkait keberangkatan Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const botResponse = await askAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl border border-emerald-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Moon className="w-7 h-7 fill-white" />
              </div>
              <div>
                <p className="font-bold text-base">Sahabat Umrah AI</p>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(110,231,183,1)]"></span> Aktif Melayani
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                }`}>
                  {m.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('-') ? 'ml-2 mb-1' : 'mb-2'}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-1.5">
                  <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 bg-white flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanyakan jadwal atau lokasi..."
              className="flex-1 bg-gray-100 border-none rounded-[1.5rem] px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder:text-gray-400"
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg active:scale-90"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-5 rounded-full shadow-2xl hover:shadow-emerald-200 hover:scale-110 transition-all group relative"
        >
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">1</span>
        </button>
      )}
    </div>
  );
};

// --- Main App ---

const LandingPage: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
            alt="Kaaba Mecca"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-emerald-600/30 backdrop-blur-md px-5 py-2 rounded-full border border-emerald-400/30 mb-8 animate-in fade-in slide-in-from-left-5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-50 tracking-wide">PPIU BERIZIN RESMI KEMENAG</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">Ibadah Khusyuk, <br/><span className="text-emerald-400 underline decoration-emerald-500/20 underline-offset-8">Hati Tenang.</span></h1>
            <p className="text-xl text-emerald-100/90 mb-10 leading-relaxed max-w-lg font-medium">
              Ekosistem digital umroh & haji terlengkap di Indonesia. Dari booking paket hingga manajemen komunitas jamaah dalam satu genggaman.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={onExplore}
                className="px-10 py-5 bg-emerald-600 text-white rounded-[1.5rem] font-bold text-lg hover:bg-emerald-700 transition-all flex items-center gap-3 shadow-2xl shadow-emerald-900/50 active:scale-95"
              >
                Cari Paket Umroh <ArrowRight className="w-6 h-6" />
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-[1.5rem] font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-5">Digitalisasi Ibadah Anda</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">Kami mengintegrasikan teknologi terbaik untuk memastikan kenyamanan ibadah Anda dari persiapan hingga kepulangan.</p>
            <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-8 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: CreditCard, title: 'Smart Payment', desc: 'Sistem pembayaran aman terintegrasi dengan berbagai bank dan dompet digital terkemuka.' },
              { icon: Users, title: 'Komunitas Jamaah', desc: 'Berbagi tips, pengalaman, dan doa bersama sesama jamaah dalam forum eksklusif.' },
              { icon: MapIcon, title: 'Navigasi Pintar', desc: 'Peta interaktif untuk panduan lokasi hotel, masjid, dan titik temu rombongan secara akurat.' },
            ].map((feature, i) => (
              <div key={i} className="group bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const chartData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 88 },
    { name: 'Apr', value: 65 },
    { name: 'Mei', value: 78 },
    { name: 'Jun', value: 92 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Manajemen</h1>
          <p className="text-gray-500 font-medium">Optimasi operasional travel dan pantau perkembangan jamaah.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">Ekspor Laporan</button>
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg">Tambah Pendaftaran</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {[
          { label: 'Total Jamaah Terdaftar', value: '1,284', delta: '+12%', icon: User, color: 'emerald' },
          { label: 'Estimasi Pendapatan', value: 'Rp 4.2B', delta: '+5.4%', icon: CreditCard, color: 'blue' },
          { label: 'Paket Terjual', value: '18', delta: 'Bulan Ini', icon: Plane, color: 'amber' },
          { label: 'Dokumen Pending', value: '42', delta: 'Mendesak', icon: Clock, color: 'rose' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${item.color}-50`}>
                <item.icon className={`w-7 h-7 text-${item.color}-600`} />
              </div>
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full bg-${item.color}-50 text-${item.color}-700 tracking-wider uppercase`}>{item.delta}</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Statistik Pendaftaran 2024</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-emerald-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
           <h3 className="text-xl font-bold mb-6">Aktivitas Terkini</h3>
           <div className="space-y-6">
              {[
                { title: 'Pembayaran Diterima', time: '10 menit lalu', desc: 'Ahmad Subarjo - Umrah Syawal' },
                { title: 'Upload Dokumen', time: '2 jam lalu', desc: 'Siti Aminah - Paspor & Foto' },
                { title: 'Paket Baru Ditambah', time: '5 jam lalu', desc: 'Haji Furoda Gelombang 3' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/10 last:border-0">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2"></div>
                   <div>
                      <p className="font-bold text-sm">{act.title}</p>
                      <p className="text-[10px] text-emerald-300 font-medium mb-1">{act.time}</p>
                      <p className="text-xs text-white/60">{act.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all">Lihat Semua Aktivitas</button>
        </div>
      </div>
    </div>
  );
};

const PackageBooking: React.FC<{ pkg: Package; onBack: () => void; onComplete: () => void }> = ({ pkg, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 mb-10 hover:text-emerald-600 transition-all font-extrabold group">
        <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" /> KEMBALI KE DAFTAR PAKET
      </button>

      {step < 3 && (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-5">
               <div className="flex flex-col md:flex-row gap-8 mb-10">
                  <div className="w-full md:w-80 h-52 shrink-0 rounded-[2rem] overflow-hidden border-4 border-emerald-50 shadow-inner">
                    <img src={pkg.images[0]} className="w-full h-full object-cover" alt={pkg.title} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest">{pkg.type}</span>
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                        <Star className="w-4 h-4 fill-amber-500" /> {pkg.rating}
                      </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{pkg.title}</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">{pkg.description}</p>
                    <div className="flex flex-wrap gap-4">
                      {pkg.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-xs font-bold text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
               <h3 className="text-xl font-extrabold mb-8 flex items-center gap-3">
                 <Users className="w-7 h-7 text-emerald-600" /> Pengalaman Jamaah Sebelumnya
               </h3>
               <div className="space-y-8">
                 {MOCK_REVIEWS.filter(r => r.packageId === pkg.id).map(review => (
                   <div key={review.id} className="pb-8 border-b border-gray-100 last:border-0">
                      <div className="flex justify-between items-center mb-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center font-bold text-emerald-700">
                               {review.userName.charAt(0)}
                            </div>
                            <span className="font-bold text-gray-900">{review.userName}</span>
                         </div>
                         <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed font-medium">"{review.comment}"</p>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold mb-8 flex items-center gap-3"><User className="w-7 h-7 text-emerald-600" /> Formulir Pendaftaran</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Nama Depan</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="Contoh: Ahmad" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Nama Belakang</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="Contoh: Subarjo" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="nama@email.com" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-emerald-950 text-white p-10 rounded-[3rem] shadow-2xl sticky top-28 border border-white/5">
              <h3 className="text-xl font-extrabold mb-8 tracking-tight">Rincian Paket</h3>
              <div className="space-y-5 pb-8 border-b border-white/10">
                {[
                  { label: 'Akomodasi', val: 'Hotel Bintang 5' },
                  { label: 'Maskapai', val: pkg.airline },
                  { label: 'Durasi', val: pkg.duration },
                  { label: 'Jadwal', val: pkg.departureDate },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-emerald-400 font-medium">{item.label}</span>
                    <span className="font-bold">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-emerald-400 font-medium">Total Estimasi</span>
                  <span className="text-3xl font-extrabold tracking-tighter">Rp {pkg.price.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] font-extrabold text-lg hover:bg-emerald-400 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Lanjutkan Booking'}
                </button>
                <p className="text-center text-[10px] text-emerald-400/60 mt-6 font-medium uppercase tracking-widest">Aman & Terverifikasi Sistem PPIU</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-16 rounded-[4rem] border border-gray-100 shadow-2xl text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="w-28 h-28 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-emerald-50">
            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Booking Berhasil!</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium">MasyaAllah! Pendaftaran Anda telah kami terima. Perwakilan kami akan segera menghubungi Anda dalam 1x24 jam untuk verifikasi dokumen.</p>
          <div className="space-y-4">
            <button 
              onClick={onComplete}
              className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-extrabold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
            >
              Kembali Ke Beranda
            </button>
            <button className="w-full py-5 bg-gray-50 text-gray-600 rounded-3xl font-extrabold hover:bg-gray-100 transition-all">
              Hubungi CS via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setView(AppView.BOOKING);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
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
              {PACKAGES.map((pkg) => (
                <PackageItem key={pkg.id} pkg={pkg} onSelect={handlePackageSelect} />
              ))}
            </div>
          </div>
        );
      case AppView.COMMUNITY:
        return <CommunityView />;
      case AppView.MAP:
        return <MapView />;
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.BOOKING:
        return selectedPackage ? (
          <PackageBooking 
            pkg={selectedPackage} 
            onBack={() => setView(AppView.PACKAGES)} 
            onComplete={() => setView(AppView.LANDING)} 
          />
        ) : null;
      default:
        return <LandingPage onExplore={() => setView(AppView.PACKAGES)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      <Navbar currentView={view} setView={setView} />
      
      <main className="animate-in fade-in duration-500">
        {renderContent()}
      </main>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-3 py-4 flex justify-between items-center z-50 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
        {[
          { view: AppView.LANDING, icon: Home, label: 'Beranda' },
          { view: AppView.PACKAGES, icon: Plane, label: 'Paket' },
          { view: AppView.COMMUNITY, icon: Users, label: 'Forum' },
          { view: AppView.MAP, icon: MapIcon, label: 'Peta' },
          { view: AppView.DASHBOARD, icon: User, label: 'Admin' },
        ].map((item) => (
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
