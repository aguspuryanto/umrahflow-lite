import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Plane, 
  Calendar, 
  Users, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Package } from '../types';

interface PackageItemProps {
  pkg: Package; 
  onSelect: (p: Package) => void;
}

const PackageItem: React.FC<PackageItemProps> = ({ pkg, onSelect }) => {
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
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group flex flex-col h-full">
      {/* Image Carousel Section with Zoom Hover Effect */}
      <div className="relative h-64 overflow-hidden transition-transform duration-500 group-hover:scale-110">
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
        
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button onClick={prevImage} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextImage} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-10">
          {pkg.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'w-6 bg-emerald-500' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>

        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-emerald-700 shadow-sm uppercase tracking-widest border border-white/20">
            {pkg.type}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold shadow-xl z-10">
          <Star className="w-3.5 h-3.5 fill-white" /> {pkg.rating}
        </div>

        {isFull && (
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-rose-500 text-white px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl animate-pulse">Full Booked</span>
          </div>
        )}
      </div>

      {/* Content Section - Prevent children from scaling with the header */}
      <div className="p-6 flex flex-col flex-1 bg-white relative z-30">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{pkg.airline}</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-1">{pkg.title}</h3>
        </div>

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

        <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Mulai Dari</p>
            <p className="text-2xl font-black text-emerald-600 tracking-tighter leading-none">
              <span className="text-sm font-bold align-top mt-1 mr-0.5">Rp</span>
              {pkg.price.toLocaleString('id-ID').split(',')[0]}
              <span className="text-xs font-bold">jt</span>
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

export default PackageItem;
