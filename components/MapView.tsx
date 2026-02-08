import React, { useState } from 'react';
import { 
  Building, 
  Moon, 
  History, 
  Tent, 
  MapPin, 
  Navigation,
  Filter,
  Map as MapIcon,
  X
} from 'lucide-react';
import { MapLocation } from '../types';
import { MAP_LOCATIONS } from '../constants';

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

export default MapView;
