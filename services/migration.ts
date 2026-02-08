import { databaseService } from './database';
import { PACKAGES, MOCK_REVIEWS, MOCK_POSTS } from '../constants';

export const migrateData = async () => {
  try {
    console.log('Starting data migration...');
    
    // Migrate Paket Umroh
    await migratePaketUmroh();
    
    // Migrate Testimoni
    await migrateTestimoni();
    
    // Migrate Komunitas
    await migrateKomunitas();
    
    console.log('Data migration completed successfully');
  } catch (error) {
    console.error('Error during data migration:', error);
    throw error;
  }
};

const migratePaketUmroh = async () => {
  console.log('Migrating Paket Umroh...');
  
  // Check if data already exists
  const existingPaket = await databaseService.getAllPaket();
  if (existingPaket.length > 0) {
    console.log('Paket Umroh data already exists, skipping migration');
    return;
  }
  
  for (const pkg of PACKAGES) {
    try {
      await databaseService.insertPaket({
        nama_paket: pkg.title,
        harga_paket: pkg.price * 1000000, // Convert from jt to actual number
        durasi_paket: pkg.duration,
        maskapai_paket: pkg.airline,
        kuota_paket: pkg.slots,
        kuota_terpakai: pkg.slots - pkg.available,
        kuota_tersisa: pkg.available,
        fasilitas_include: pkg.included,
        fasilitas_exclude: pkg.excluded,
        nama_hotel: `${pkg.hotelMecca} & ${pkg.hotelMadinah}`,
        itenarary: pkg.itinerary,
        rating: pkg.rating
      });
      console.log(`Migrated paket: ${pkg.title}`);
    } catch (error) {
      console.error(`Error migrating paket ${pkg.title}:`, error);
    }
  }
};

const migrateTestimoni = async () => {
  console.log('Migrating Testimoni...');
  
  // Check if data already exists
  const existingTestimoni = await databaseService.getAllTestimoni();
  if (existingTestimoni.length > 0) {
    console.log('Testimoni data already exists, skipping migration');
    return;
  }
  
  // Get all paket IDs for reference
  const pakets = await databaseService.getAllPaket();
  const paketMap = new Map();
  pakets.forEach((paket: any) => {
    // Try to match by name or use first paket as fallback
    const originalPkg = PACKAGES.find(p => p.title === paket.nama_paket);
    if (originalPkg) {
      paketMap.set(originalPkg.id, paket.paket_id);
    }
  });
  
  for (const review of MOCK_REVIEWS) {
    try {
      const paketId = paketMap.get(review.packageId) || pakets[0]?.paket_id;
      if (paketId) {
        await databaseService.insertTestimoni({
          nama_jamaah: review.userName,
          rating: review.rating,
          testimoni: review.comment,
          paket_id: paketId
        });
        console.log(`Migrated testimoni from: ${review.userName}`);
      }
    } catch (error) {
      console.error(`Error migrating testimoni from ${review.userName}:`, error);
    }
  }
};

const migrateKomunitas = async () => {
  console.log('Migrating Komunitas...');
  
  // Check if data already exists
  const existingKomunitas = await databaseService.getAllKomunitas();
  if (existingKomunitas.length > 0) {
    console.log('Komunitas data already exists, skipping migration');
    return;
  }
  
  for (const post of MOCK_POSTS) {
    try {
      await databaseService.insertKomunitas({
        nama_jamaah: post.author,
        message: post.content,
        tipe_community: post.category,
        likes: post.likes,
        comments: post.comments
      });
      console.log(`Migrated komunitas post from: ${post.author}`);
    } catch (error) {
      console.error(`Error migrating komunitas post from ${post.author}:`, error);
    }
  }
};

// Function to clear all data (for testing/reset purposes)
export const clearAllData = async () => {
  try {
    console.log('Clearing all data...');
    
    const db = databaseService.getDatabase();
    
    // Clear all collections
    await db.paket_umroh.remove();
    await db.testimoni.remove();
    await db.komunitas.remove();
    
    console.log('All data cleared successfully');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

export default { migrateData, clearAllData };
