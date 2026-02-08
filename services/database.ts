import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

// Enable dev mode for development
addRxPlugin(RxDBDevModePlugin);

// Database schema definitions
const paketUmrohSchema = {
  version: 0,
  primaryKey: 'paket_id',
  type: 'object',
  properties: {
    paket_id: {
      type: 'string',
      maxLength: 100
    },
    nama_paket: {
      type: 'string',
      maxLength: 200
    },
    harga_paket: {
      type: 'number'
    },
    durasi_paket: {
      type: 'string',
      maxLength: 50
    },
    maskapai_paket: {
      type: 'string',
      maxLength: 100
    },
    kuota_paket: {
      type: 'number'
    },
    kuota_terpakai: {
      type: 'number',
      default: 0
    },
    kuota_tersisa: {
      type: 'number'
    },
    fasilitas_include: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    fasilitas_exclude: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    nama_hotel: {
      type: 'string',
      maxLength: 200
    },
    itenarary: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' }
        }
      }
    },
    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    updated_at: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: [
    'paket_id',
    'nama_paket',
    'harga_paket',
    'durasi_paket',
    'maskapai_paket',
    'kuota_paket',
    'kuota_tersisa',
    'fasilitas_include',
    'fasilitas_exclude',
    'nama_hotel',
    'itenarary',
    'rating'
  ]
};

const testimoniSchema = {
  version: 0,
  primaryKey: 'testi_id',
  type: 'object',
  properties: {
    testi_id: {
      type: 'string',
      maxLength: 100
    },
    nama_jamaah: {
      type: 'string',
      maxLength: 100
    },
    rating: {
      type: 'number',
      minimum: 1,
      maximum: 5
    },
    testimoni: {
      type: 'string',
      maxLength: 1000
    },
    paket_id: {
      type: 'string',
      maxLength: 100
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    updated_at: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: [
    'testi_id',
    'nama_jamaah',
    'rating',
    'testimoni',
    'paket_id'
  ]
};

const komunitasSchema = {
  version: 0,
  primaryKey: 'commu_id',
  type: 'object',
  properties: {
    commu_id: {
      type: 'string',
      maxLength: 100
    },
    nama_jamaah: {
      type: 'string',
      maxLength: 100
    },
    message: {
      type: 'string',
      maxLength: 2000
    },
    tipe_community: {
      type: 'string',
      enum: ['Tips', 'Pengalaman', 'Doa', 'Tanya']
    },
    parent_id: {
      type: 'string',
      maxLength: 100
    },
    likes: {
      type: 'number',
      default: 0
    },
    comments: {
      type: 'number',
      default: 0
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    updated_at: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: [
    'commu_id',
    'nama_jamaah',
    'message',
    'tipe_community'
  ]
};

// Database instance
let databaseInstance: any = null;

export const initializeDatabase = async () => {
  if (databaseInstance) {
    return databaseInstance;
  }

  try {
    // Create storage with validation
    const storage = wrappedValidateAjvStorage({
      storage: getRxStorageLocalstorage()
    });

    // Create database
    const database = await createRxDatabase({
      name: 'umrahflow_db',
      storage: storage,
      closeDuplicates: true
    });

    // Add collections
    await database.addCollections({
      paket_umroh: {
        schema: paketUmrohSchema
      },
      testimoni: {
        schema: testimoniSchema
      },
      komunitas: {
        schema: komunitasSchema
      }
    });

    databaseInstance = database;
    console.log('RxDB initialized successfully');
    
    return database;
  } catch (error) {
    console.error('Error initializing RxDB:', error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!databaseInstance) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return databaseInstance;
};

// Helper functions for database operations
export const databaseService = {
  // Paket Umroh operations
  async insertPaket(paketData: any) {
    const db = getDatabase();
    const now = new Date().toISOString();
    return await db.paket_umroh.insert({
      ...paketData,
      paket_id: `paket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: now,
      updated_at: now
    });
  },

  async getAllPaket() {
    const db = getDatabase();
    return await db.paket_umroh.find().exec();
  },

  async getPaketById(paketId: string) {
    const db = getDatabase();
    return await db.paket_umroh.findOne({
      selector: { paket_id: paketId }
    }).exec();
  },

  async updatePaket(paketId: string, updateData: any) {
    const db = getDatabase();
    const paket = await this.getPaketById(paketId);
    if (paket) {
      return await paket.patch({
        ...updateData,
        updated_at: new Date().toISOString()
      });
    }
    throw new Error('Paket not found');
  },

  async deletePaket(paketId: string) {
    const db = getDatabase();
    const paket = await this.getPaketById(paketId);
    if (paket) {
      return await paket.remove();
    }
    throw new Error('Paket not found');
  },

  // Testimoni operations
  async insertTestimoni(testimoniData: any) {
    const db = getDatabase();
    const now = new Date().toISOString();
    return await db.testimoni.insert({
      ...testimoniData,
      testi_id: `testi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: now,
      updated_at: now
    });
  },

  async getAllTestimoni() {
    const db = getDatabase();
    return await db.testimoni.find().exec();
  },

  async getTestimoniByPaket(paketId: string) {
    const db = getDatabase();
    return await db.testimoni.find({
      selector: { paket_id: paketId }
    }).exec();
  },

  // Komunitas operations
  async insertKomunitas(komunitasData: any) {
    const db = getDatabase();
    const now = new Date().toISOString();
    return await db.komunitas.insert({
      ...komunitasData,
      commu_id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: now,
      updated_at: now
    });
  },

  async getAllKomunitas() {
    const db = getDatabase();
    return await db.komunitas.find().exec();
  },

  async getKomunitasByTipe(tipe: string) {
    const db = getDatabase();
    return await db.komunitas.find({
      selector: { tipe_community: tipe }
    }).exec();
  },

  async getKomunitasByParent(parentId: string) {
    const db = getDatabase();
    return await db.komunitas.find({
      selector: { parent_id: parentId }
    }).exec();
  }
};

export default databaseService;
