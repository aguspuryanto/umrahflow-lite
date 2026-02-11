
import { Package, Pilgrim, Post, Review, MapLocation } from './types';
import { 
  LayoutDashboard,
  Users,
  Package as PackageIcon,
  PlaneTakeoff,
  FileText,
  DollarSign,
  CheckCircle,
  Download,
  CreditCard,
  ChartBar
} from 'lucide-react';

export const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'User Management', icon: Users },
  { name: 'Input Paket Umroh', icon: PackageIcon },
  { name: 'Input Maskapai', icon: PlaneTakeoff },
  { name: 'Data Jamaah', icon: FileText },
  { name: 'Pembayaran', icon: DollarSign },
  { name: 'Status Pembayaran', icon: CheckCircle },
  { name: 'Export/Import Data', icon: Download },
  { name: 'Payment Gateway', icon: CreditCard },
  { name: 'Laporan Jamaah', icon: ChartBar },
];

export const PACKAGES: Package[] = [
  {
    id: '1',
    title: 'Umrah Syawal Berkah',
    type: 'Umrah',
    duration: '9 Hari',
    price: 28500000,
    images: [
      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800'
    ],
    hotelImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', // Luxury Lobby
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800', // Mecca Room View
      'https://images.unsplash.com/photo-1551882547-ff43c63fed0c?auto=format&fit=crop&q=80&w=800'  // Madinah Hotel
    ],
    hotelCaptions: [
      'Lobby Mewah Pullman Zamzam Mekkah',
      'Pemandangan Kamar Menghadap Masjidil Haram',
      'Fasilitas Restoran di Hotel Madinah'
    ],
    airline: 'Saudi Arabian Airlines',
    hotelMecca: 'Pullman Zamzam (5*)',
    hotelMadinah: 'Dallah Taibah (4*)',
    departureDate: '2024-05-15',
    slots: 45,
    available: 12,
    description: 'Nikmati kekhusyukan ibadah Umrah di bulan Syawal dengan fasilitas hotel bintang 5.',
    features: ['Visa Umrah', 'Tiket PP Ekonomi', 'Makan 3x Sehari', 'Handling & Zamzam'],
    included: [
      'Tiket Pesawat Saudi Arabian Airlines PP',
      'Visa Umrah & Asuransi Perjalanan',
      'Hotel Bintang 5 (Mecca) & Bintang 4 (Madinah)',
      'Makan 3x Sehari (Menu Indonesia)',
      'Transportasi Bus Full AC Terbaru',
      'Ziarah Kota Madinah & Mekkah',
      'Air Zamzam 5 Liter',
      'Manasik Umrah di Hotel',
      'Muthawif Profesional'
    ],
    excluded: [
      'Biaya Pembuatan Paspor',
      'Kelebihan Bagasi',
      'Pengeluaran Pribadi (Laundry, Telepon, dll)',
      'Suntik Meningitis/Kesehatan Pribadi',
      'Tip Guide/Muthawif'
    ],
    itinerary: [
      { day: 1, title: 'Keberangkatan Jakarta - Jeddah', description: 'Berkumpul di Bandara Soekarno Hatta dan terbang menuju Jeddah.' },
      { day: 2, title: 'Check-in Madinah', description: 'Tiba di Madinah, check-in hotel dan istirahat sebelum ke Masjid Nabawi.' },
      { day: 3, title: 'Ziarah Madinah', description: 'Mengunjungi Masjid Quba, Kebun Kurma, dan Jabal Uhud.' },
      { day: 4, title: 'Madinah - Mekkah (Umrah 1)', description: 'Persiapan Miqat di Bir Ali, menuju Mekkah and melaksanakan Umrah pertama.' },
      { day: 5, title: 'Ibadah Mandiri', description: 'Memperbanyak ibadah di Masjidil Haram.' },
      { day: 6, title: 'Ziarah Mekkah', description: 'Mengunjungi Jabal Tsur, Arafah, Mina, dan Jabal Nur.' },
      { day: 7, title: 'Tawaf Wada', description: 'Pelaksanaan Tawaf perpisahan sebelum meninggalkan Mekkah.' },
      { day: 8, title: 'Jeddah City Tour', description: 'Mengunjungi Masjid Terapung dan Corniche sebelum ke Bandara.' },
      { day: 9, title: 'Tiba di Jakarta', description: 'Insya Allah tiba kembali di tanah air dengan Umrah yang Mabrur.' }
    ],
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '2',
    title: 'Wisata Halal Turkiye + Umrah',
    type: 'Tour',
    duration: '12 Hari',
    price: 35000000,
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512443154448-b39f33878793?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541432901012-a7abc3502314?auto=format&fit=crop&q=80&w=800'
    ],
    hotelImages: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800'
    ],
    hotelCaptions: [
      'Akomodasi Bintang 5 di Istanbul',
      'Kamar Nyaman Movenpick Mekkah'
    ],
    airline: 'Turkish Airlines',
    hotelMecca: 'Movenpick (5*)',
    hotelMadinah: 'Frontel Al Harithia (5*)',
    departureDate: '2024-06-10',
    slots: 30,
    available: 5,
    description: 'Perpaduan sempurna antara wisata sejarah Islam di Turki dan ibadah Umrah di Tanah Suci.',
    features: ['City Tour Istanbul', 'Bosphorus Cruise', 'Visa Turkiye & Umrah', 'Guide Berpengalaman'],
    included: [
      'Tiket Pesawat Turkish Airlines PP',
      'Visa Turki & Visa Umrah',
      'Hotel Bintang 5 di Istanbul, Madinah, Mekkah',
      'Bosphorus Cruise Dinner',
      'Tiket Masuk Museum & Situs Bersejarah',
      'Air Zamzam 5 Liter',
      'Makan Sesuai Jadwal'
    ],
    excluded: [
      'Personal Expenses',
      'Optional Tours (Hot Air Balloon in Cappadocia)',
      'Tipping Guide $5/day',
      'Asuransi Kesehatan Khusus'
    ],
    itinerary: [
      { day: 1, title: 'Jakarta - Istanbul', description: 'Terbang menuju Istanbul.' },
      { day: 2, title: 'Blue Mosque & Hagia Sophia', description: 'Menjelajahi ikon sejarah di Sultanahmet Square.' },
      { day: 3, title: 'Bosphorus Cruise', description: 'Menikmati selat pemisah benua Asia & Eropa.' },
      { day: 4, title: 'Istanbul - Madinah', description: 'Melanjutkan perjalanan menuju Kota Nabi.' },
      { day: 12, title: 'Mekkah - Jeddah - Jakarta', description: 'Kembali ke tanah air melalui Jeddah.' }
    ],
    rating: 4.9,
    reviewCount: 89
  },
  {
    id: '4',
    title: 'Haji Furoda 2024 Direct',
    type: 'Hajj',
    duration: '25 Hari',
    price: 250000000,
    images: [
      'https://images.unsplash.com/photo-1565552136437-020589d81347?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580628396458-9430c559869a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=800'
    ],
    hotelImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800'
    ],
    hotelCaptions: [
      'Swissotel Al Maqam Mekkah',
      'Tenda Premium di Mina'
    ],
    airline: 'Saudi Arabian Airlines',
    hotelMecca: 'Swissotel Al Maqam (5*)',
    hotelMadinah: 'Al Aqeeq Madinah (5*)',
    departureDate: '2024-06-05',
    slots: 20,
    available: 8,
    description: 'Haji tanpa antre dengan visa resmi Furoda dan fasilitas premium selama di Arafah & Mina.',
    features: ['Visa Furoda', 'Maktab Premium', 'Tenda Ber-AC', 'Muthawif Khusus'],
    included: [
      'Visa Haji Furoda Resmi',
      'Tiket Saudi Airlines Direct Class Ekonomi (Upgrade available)',
      'Akomodasi Hotel Bintang 5 Dekat Masjid',
      'Tenda AC di Arafah & Mina (Maktab 111/112)',
      'Makan Buffet 3x Sehari',
      'Bus Antar Kota Full Premium',
      'Perlengkapan Haji Eksklusif'
    ],
    excluded: [
      'DAM (Hadi)',
      'Qurban',
      'Kesehatan Pribadi',
      'Oleh-oleh'
    ],
    itinerary: [
      { day: 1, title: 'Jakarta - Jeddah', description: 'Menuju Jeddah.' },
      { day: 10, title: 'Wukuf Arafah', description: 'Inti ibadah Haji di Padang Arafah.' },
      { day: 25, title: 'Kepulangan', description: 'Selesai rangkaian Haji kembali ke Jakarta.' }
    ],
    rating: 5.0,
    reviewCount: 42
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Ustadz Hanan Attaki',
    avatar: 'https://i.pravatar.cc/150?u=hanan',
    content: 'Alhamdulillah, baru saja menyelesaikan rangkaian Tawaf bersama rombongan Umrah Syawal. Suasana sangat syahdu.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800',
    likes: 1240,
    comments: 89,
    time: '2 jam yang lalu',
    category: 'Pengalaman'
  },
  {
    id: 'p2',
    author: 'Siti Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'Tips untuk jamaah yang akan berangkat: jangan lupa bawa powerbank dan sandal cadangan ya! Pelayanan UmrahFlow oke banget, muthawifnya sabar.',
    likes: 45,
    comments: 12,
    time: '5 jam yang lalu',
    category: 'Tips'
  },
  {
    id: 'p3',
    author: 'Budi Santoso',
    avatar: 'https://i.pravatar.cc/150?u=budi',
    content: 'Berapa rata-rata harga paket umrah ramadhan tahun ini ya? Apakah ada yang punya rekomendasi hotel di Madinah yang dekat pintu 338?',
    likes: 12,
    comments: 24,
    time: '1 hari yang lalu',
    category: 'Tanya'
  }
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', packageId: '1', userName: 'Ahmad Subarjo', rating: 5, comment: 'Hotelnya sangat dekat dengan Masjidil Haram. Makanannya juga cocok selera Indonesia.', date: '2024-01-20' },
  { id: 'r2', packageId: '1', userName: 'Dewi Lestari', rating: 4, comment: 'Handling bandara cepat, tapi busnya agak sedikit telat jemput.', date: '2024-02-01' }
];

export const MAP_LOCATIONS: MapLocation[] = [
  { id: 'l1', name: 'Masjidil Haram', type: 'Mosque', lat: 21.4225, lng: 39.8262, description: 'Titik pusat ibadah Umrah dan Haji.', city: 'Mecca' },
  { id: 'l2', name: 'Pullman Zamzam', type: 'Hotel', lat: 21.4200, lng: 39.8250, description: 'Hotel utama paket Syawal Berkah.', city: 'Mecca' },
  { id: 'l3', name: 'Masjid Nabawi', type: 'Mosque', lat: 24.4672, lng: 39.6111, description: 'Masjid Rasulullah SAW.', city: 'Madinah' },
  { id: 'l4', name: 'Jabal Rahmah', type: 'Historical', lat: 21.3547, lng: 39.9840, description: 'Bukit kasih sayang di Padang Arafah.', city: 'Mecca' },
  { id: 'l5', name: 'Gua Hira', type: 'Historical', lat: 21.4574, lng: 39.8592, description: 'Tempat turunnya wahyu pertama.', city: 'Mecca' },
  { id: 'l6', name: 'Titik Kumpul King Abdul Aziz Gate', type: 'Meeting', lat: 21.4190, lng: 39.8260, description: 'Titik temu rombongan sebelum melaksanakan Thawaf.', city: 'Mecca' },
  { id: 'l7', name: 'Shaza Madinah', type: 'Hotel', lat: 24.4715, lng: 39.6090, description: 'Akomodasi premium dekat gerbang utama Nabawi.', city: 'Madinah' },
  { id: 'l8', name: 'Masjid Quba', type: 'Historical', lat: 24.4392, lng: 39.6172, description: 'Masjid pertama yang dibangun Rasulullah.', city: 'Madinah' },
  { id: 'l9', name: 'Meeting Point Lobby Hotel', type: 'Meeting', lat: 24.4680, lng: 39.6100, description: 'Titik kumpul keberangkatan Ziarah Kota Madinah.', city: 'Madinah' }
];

export const MOCK_PILGRIMS: Pilgrim[] = [
  { id: 'p1', fullName: 'Ahmad Subarjo', passportNumber: 'B1234567', packageId: '1', status: 'Ready', registrationDate: '2024-01-10' },
  { id: 'p2', fullName: 'Siti Aminah', passportNumber: 'B9876543', packageId: '1', status: 'Paid', registrationDate: '2024-01-12' }
];
