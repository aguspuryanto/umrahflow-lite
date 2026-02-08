import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  Users, 
  Map as MapIcon 
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  return (
    <div className="relative">
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

export default LandingPage;
