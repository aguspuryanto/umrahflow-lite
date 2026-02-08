import { Package, Post, Review } from '../types';
import { databaseService } from './database';

// Transform database package data to app format
export const transformPackageData = (pkg: any): Package => ({
  id: pkg.paket_id,
  title: pkg.nama_paket,
  type: 'Umrah',
  duration: pkg.durasi_paket,
  price: pkg.harga_paket / 1000000, // Convert back to jt
  images: [
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1589179404143-cf9f0d0b6b0d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1589179404143-cf9f0d0b6b0d?auto=format&fit=crop&q=80&w=800'
  ],
  airline: pkg.maskapai_paket,
  hotelMecca: pkg.nama_hotel.split(' & ')[0] || pkg.nama_hotel,
  hotelMadinah: pkg.nama_hotel.split(' & ')[1] || pkg.nama_hotel,
  departureDate: '2025-01-15',
  slots: pkg.kuota_paket,
  available: pkg.kuota_tersisa,
  description: `Paket umrah ${pkg.nama_paket} dengan durasi ${pkg.durasi_paket}`,
  features: pkg.fasilitas_include.slice(0, 5),
  included: pkg.fasilitas_include,
  excluded: pkg.fasilitas_exclude,
  itinerary: pkg.itenarary,
  rating: pkg.rating,
  reviewCount: 0
});

// Transform database post data to app format
export const transformPostData = (post: any): Post => ({
  id: post.commu_id,
  author: post.nama_jamaah,
  avatar: `https://i.pravatar.cc/150?u=${post.commu_id}`,
  content: post.message,
  likes: post.likes || 0,
  comments: post.comments || 0,
  time: 'Baru saja',
  category: post.tipe_community as Post['category']
});

// Transform database review data to app format
export const transformReviewData = (review: any): Review => ({
  id: review.testi_id,
  packageId: review.paket_id,
  userName: review.nama_jamaah,
  rating: review.rating,
  comment: review.testimoni,
  date: new Date().toLocaleDateString('id-ID')
});

// Load packages from database
export const loadPackagesFromDatabase = async (): Promise<Package[]> => {
  try {
    const dbPackages = await databaseService.getAllPaket();
    return dbPackages.map(transformPackageData);
  } catch (error) {
    console.error('Error loading packages from database:', error);
    throw error;
  }
};

// Load posts from database
export const loadPostsFromDatabase = async (): Promise<Post[]> => {
  try {
    const dbPosts = await databaseService.getAllKomunitas();
    return dbPosts.map(transformPostData);
  } catch (error) {
    console.error('Error loading posts from database:', error);
    throw error;
  }
};

// Load reviews from database
export const loadReviewsFromDatabase = async (): Promise<Review[]> => {
  try {
    const dbReviews = await databaseService.getAllTestimoni();
    return dbReviews.map(transformReviewData);
  } catch (error) {
    console.error('Error loading reviews from database:', error);
    throw error;
  }
};

// Load all data from database
export const loadAllFromDatabase = async (): Promise<{
  packages: Package[];
  posts: Post[];
  reviews: Review[];
}> => {
  try {
    const [packages, posts, reviews] = await Promise.all([
      loadPackagesFromDatabase(),
      loadPostsFromDatabase(),
      loadReviewsFromDatabase()
    ]);
    
    return { packages, posts, reviews };
  } catch (error) {
    console.error('Error loading from database:', error);
    throw error;
  }
};
