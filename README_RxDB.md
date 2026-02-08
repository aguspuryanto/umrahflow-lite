# RxDB Database Setup for UmrahFlow

## Overview
This application uses RxDB (Reactive Database) for local data storage and management. RxDB provides a reactive, offline-first database solution with real-time synchronization capabilities.

## Database Schema

### 1. Paket Umroh Collection
```typescript
{
  paket_id: string (primary key),
  nama_paket: string,
  harga_paket: number,
  durasi_paket: string,
  maskapai_paket: string,
  kuota_paket: number,
  kuota_terpakai: number,
  kuota_tersisa: number,
  fasilitas_include: string[],
  fasilitas_exclude: string[],
  nama_hotel: string,
  itenarary: { day: number, title: string, description: string }[],
  rating: number,
  created_at: string,
  updated_at: string
}
```

### 2. Testimoni Collection
```typescript
{
  testi_id: string (primary key),
  nama_jamaah: string,
  rating: number (1-5),
  testimoni: string,
  paket_id: string (foreign key),
  created_at: string,
  updated_at: string
}
```

### 3. Komunitas Collection
```typescript
{
  commu_id: string (primary key),
  nama_jamaah: string,
  message: string,
  tipe_community: 'Tips' | 'Pengalaman' | 'Doa' | 'Tanya',
  parent_id: string (optional, for replies),
  likes: number,
  comments: number,
  created_at: string,
  updated_at: string
}
```

## Database Services

### Database Initialization
```typescript
import { initializeDatabase } from './services/database';

// Initialize database when app starts
await initializeDatabase();
```

### CRUD Operations

#### Paket Umroh
```typescript
import { databaseService } from './services/database';

// Create new paket
await databaseService.insertPaket({
  nama_paket: 'Umrah Premium',
  harga_paket: 25000000,
  // ... other fields
});

// Get all paket
const allPaket = await databaseService.getAllPaket();

// Get paket by ID
const paket = await databaseService.getPaketById('paket_123');

// Update paket
await databaseService.updatePaket('paket_123', { harga_paket: 30000000 });

// Delete paket
await databaseService.deletePaket('paket_123');
```

#### Testimoni
```typescript
// Add new testimoni
await databaseService.insertTestimoni({
  nama_jamaah: 'Ahmad',
  rating: 5,
  testimoni: 'Sangat memuaskan!',
  paket_id: 'paket_123'
});

// Get all testimoni
const allTestimoni = await databaseService.getAllTestimoni();

// Get testimoni by paket
const testimoniByPaket = await databaseService.getTestimoniByPaket('paket_123');
```

#### Komunitas
```typescript
// Add new post
await databaseService.insertKomunitas({
  nama_jamaah: 'Siti',
  message: 'Tips untuk ibadah umrah',
  tipe_community: 'Tips'
});

// Get all posts
const allPosts = await databaseService.getAllKomunitas();

// Get posts by type
const tipsPosts = await databaseService.getKomunitasByTipe('Tips');

// Get replies to a post
const replies = await databaseService.getKomunitasByParent('comm_123');
```

## Data Migration

The application includes automatic data migration from the mock constants to the RxDB database:

```typescript
import { migrateData, clearAllData } from './services/migration';

// Migrate existing mock data to database
await migrateData();

// Clear all data (for testing/reset)
await clearAllData();
```

## Features

### Reactive Queries
RxDB provides reactive queries that automatically update your UI when data changes:

```typescript
// Subscribe to changes in real-time
const observable = db.paket_umroh.find().$;
observable.subscribe(paketList => {
  // Update UI when paket data changes
  console.log('Paket list updated:', paketList);
});
```

### Offline-First
All data is stored locally in the browser using localStorage, making the application work offline.

### Schema Validation
All documents are validated against JSON schemas before being saved, ensuring data integrity.

### Dev Mode
In development, RxDB provides additional validation and error checking to help with debugging.

## Storage Engine

The application uses localStorage as the storage engine for simplicity and compatibility. For production use, consider upgrading to:

- **IndexedDB**: Better performance for larger datasets
- **SQLite**: For mobile applications (requires premium RxDB)

## Error Handling

The database service includes comprehensive error handling with fallback to mock data if the database fails to initialize.

## Performance Considerations

- Use pagination for large datasets
- Implement proper indexing for frequently queried fields
- Consider using compression for large text fields
- Regular cleanup of old data to maintain performance

## Future Enhancements

1. **Real-time Sync**: Implement server synchronization
2. **Encryption**: Add client-side encryption for sensitive data
3. **Backup/Restore**: Implement data export/import functionality
4. **Caching**: Add intelligent caching strategies
5. **Analytics**: Track database usage patterns
