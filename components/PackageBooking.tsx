import React, { useState } from 'react';
import { 
  ArrowRight, 
  Star, 
  Building, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  ChevronDown, 
  MessageCircle, 
  Loader2,
  Users
} from 'lucide-react';
import { Package, Review } from '../types';
import HotelCarousel from './HotelCarousel';

interface PackageBookingProps {
  pkg: Package; 
  onBack: () => void; 
  onComplete: () => void;
  reviews: Review[];
  packages: Package[];
}

const PackageBooking: React.FC<PackageBookingProps> = ({ 
  pkg, 
  onBack, 
  onComplete, 
  reviews, 
  packages 
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    panggilan: '',
    namaLengkap: '',
    whatsapp: '',
    paketUmroh: pkg.id,
    bulanKeberangkatan: ''
  });
  const [errors, setErrors] = useState({
    namaLengkap: '',
    whatsapp: ''
  });

  const validateForm = () => {
    const newErrors = {
      namaLengkap: '',
      whatsapp: ''
    };

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap harus diisi';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp harus diisi';
    } else if (!/^08\d{8,12}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid';
    }

    setErrors(newErrors);
    return !newErrors.namaLengkap && !newErrors.whatsapp;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBooking = () => {
    if (!validateForm()) {
      return;
    }

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
               <div className="flex flex-col md:flex-row gap-8 mb-8">
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
                  </div>
               </div>
               
               {/* Hotel Carousel Integrated After Description */}
               {pkg.hotelImages && pkg.hotelImages.length > 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-10">
                     <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                        <Building className="w-7 h-7 text-emerald-600" /> Galeri Akomodasi
                     </h3>
                     <HotelCarousel images={pkg.hotelImages} captions={pkg.hotelCaptions} />
                  </div>
               )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                     <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Fasilitas Termasuk
                  </h3>
                  <ul className="space-y-4">
                     {pkg.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                     <XCircle className="w-6 h-6 text-rose-500" /> Belum Termasuk
                  </h3>
                  <ul className="space-y-4">
                     {pkg.excluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium opacity-80">
                           <XCircle className="w-4 h-4 text-rose-300 mt-0.5 shrink-0" />
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
               <h3 className="text-xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-emerald-600" /> Rencana Perjalanan
               </h3>
               <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-100 before:to-transparent">
                  {pkg.itinerary.map((step, i) => (
                     <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-500 text-white shadow shadow-emerald-200 absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 font-black text-xs">
                           {step.day}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-6 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                           <h4 className="font-extrabold text-emerald-700 text-sm mb-2 uppercase tracking-widest">Hari Ke-{step.day}</h4>
                           <h5 className="font-bold text-gray-900 text-base mb-2">{step.title}</h5>
                           <p className="text-sm text-gray-600 font-medium leading-relaxed">{step.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm animate-in fade-in duration-700">
               <div className="max-w-3xl mx-auto">
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Rencanakan perjalanan ibadah umroh Anda bersama <span className="text-emerald-600">UmrahFlow</span>.</h2>
                  <p className="text-gray-500 mb-10 text-lg">Isi formulir konsultasi untuk mendapatkan informasi lebih lanjut perihal umroh dan haji Rabbanitour.</p>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="block text-base font-bold text-gray-900">Panggilan</label>
                        <div className="relative">
                           <select 
                             value={formData.panggilan}
                             onChange={(e) => handleInputChange('panggilan', e.target.value)}
                             className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium"
                           >
                              <option value="" disabled selected>Pilih Panggilan</option>
                              <option value="tuan">Tuan</option>
                              <option value="nyonya">Nyonya</option>
                              <option value="nona">Nona</option>
                              <option value="haji">Bapak Haji</option>
                              <option value="hajjah">Ibu Hajjah</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="block text-base font-bold text-gray-900">Nama Lengkap <span className="text-rose-500">*</span></label>
                        <input 
                           type="text" 
                           value={formData.namaLengkap}
                           onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                           placeholder="Nama Lengkap" 
                           className={`w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-gray-900 placeholder:text-gray-300 ${
                             errors.namaLengkap ? 'border-rose-500' : 'border-gray-200'
                           }`}
                        />
                        {errors.namaLengkap && (
                          <p className="text-rose-500 text-sm font-medium">{errors.namaLengkap}</p>
                        )}
                     </div>

                     <div className="space-y-2">
                        <label className="block text-base font-bold text-gray-900">WhatsApp <span className="text-rose-500">*</span></label>
                        <input 
                           type="tel" 
                           value={formData.whatsapp}
                           onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                           placeholder="08123456789" 
                           className={`w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-gray-900 placeholder:text-gray-300 ${
                             errors.whatsapp ? 'border-rose-500' : 'border-gray-200'
                           }`}
                        />
                        {errors.whatsapp && (
                          <p className="text-rose-500 text-sm font-medium">{errors.whatsapp}</p>
                        )}
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="block text-base font-bold text-gray-900">Paket Umroh</label>
                           <div className="relative">
                              <select 
                                value={formData.paketUmroh}
                                onChange={(e) => handleInputChange('paketUmroh', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium"
                              >
                                 <option value="" disabled>Pilih Paket Umroh</option>
                                 {packages.map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                 ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="block text-base font-bold text-gray-900">Rencana Bulan Keberangkatan</label>
                           <div className="relative">
                              <select 
                                value={formData.bulanKeberangkatan}
                                onChange={(e) => handleInputChange('bulanKeberangkatan', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium"
                              >
                                 <option value="" disabled selected>Pilih Bulan Keberangkatan</option>
                                 <option value="jan">Januari 2025</option>
                                 <option value="feb">Februari 2025</option>
                                 <option value="mar">Maret 2025</option>
                                 <option value="apr">April 2025</option>
                                 <option value="mei">Mei 2025</option>
                                 <option value="jun">Juni 2025</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                           </div>
                        </div>
                     </div>

                     <div className="pt-6">
                        <button 
                           onClick={handleBooking}
                           disabled={loading}
                           className="w-full bg-[#00C853] hover:bg-[#00B248] text-white py-4 rounded-xl font-extrabold text-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 transition-all active:scale-95"
                        >
                           {loading ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                           ) : (
                              <>
                                 <MessageCircle className="w-6 h-6 fill-white" />
                                 Konsultasi Sekarang
                              </>
                           )}
                        </button>
                        <p className="mt-4 text-sm italic text-gray-400"><span className="text-rose-500">*</span> Kami menjamin kerahasiaan data Anda.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
               <h3 className="text-xl font-extrabold mb-8 flex items-center gap-3">
                 <Users className="w-7 h-7 text-emerald-600" /> Pengalaman Jamaah
               </h3>
               <div className="space-y-8">
                 {reviews.filter(r => r.packageId === pkg.id).map(review => (
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

export default PackageBooking;
