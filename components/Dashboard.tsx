import React from 'react';
import { 
  User, 
  CreditCard, 
  Plane, 
  Clock 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
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
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-rose-600 text-white rounded-2xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg"
          >
            Keluar
          </button>
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
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height={350}>
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

export default Dashboard;
