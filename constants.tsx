
import { Package, Pilgrim, Post, Review, MapLocation } from './types';

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
    airline: 'Saudi Arabian Airlines',
    hotelMecca: 'Pullman Zamzam (5*)',
    hotelMadinah: 'Dallah Taibah (4*)',
    departureDate: '2024-05-15',
    slots: 45,
    available: 12,
    description: 'Nikmati kekhusyukan ibadah Umrah di bulan Syawal dengan fasilitas hotel bintang 5.',
    features: ['Visa Umrah', 'Tiket PP Ekonomi', 'Makan 3x Sehari', 'Handling & Zamzam'],
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
    airline: 'Turkish Airlines',
    hotelMecca: 'Movenpick (5*)',
    hotelMadinah: 'Frontel Al Harithia (5*)',
    departureDate: '2024-06-10',
    slots: 30,
    available: 5,
    description: 'Perpaduan sempurna antara wisata sejarah Islam di Turki dan ibadah Umrah di Tanah Suci.',
    features: ['City Tour Istanbul', 'Bosphorus Cruise', 'Visa Turkiye & Umrah', 'Guide Berpengalaman'],
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
    airline: 'Saudi Arabian Airlines',
    hotelMecca: 'Swissotel Al Maqam (5*)',
    hotelMadinah: 'Al Aqeeq Madinah (5*)',
    departureDate: '2024-06-05',
    slots: 20,
    available: 8,
    description: 'Haji tanpa antre dengan visa resmi Furoda dan fasilitas premium selama di Arafah & Mina.',
    features: ['Visa Furoda', 'Maktab Premium', 'Tenda Ber-AC', 'Muthawif Khusus'],
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
