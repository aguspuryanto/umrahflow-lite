import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HotelCarouselProps {
  images: string[]; 
  captions?: string[];
}

const HotelCarousel: React.FC<HotelCarouselProps> = ({ images, captions }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[400px] rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 border-white">
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
            <img src={img} className="w-full h-full object-cover" alt="Hotel Room" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10">
              {captions && captions[i] && (
                <p className="text-white text-lg font-bold tracking-tight animate-in slide-in-from-bottom-5">{captions[i]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${index === i ? 'w-8 bg-emerald-500' : 'w-2 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default HotelCarousel;
