import { useState, useEffect } from 'react';
import { Package, Post, Review } from '../types';
import { initializeDatabase } from './database';
import { migrateData } from './migration';
import { loadAllFromDatabase } from './dataLoader';

interface DatabaseState {
  dbInitialized: boolean;
  packages: Package[];
  posts: Post[];
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

export const useDatabase = () => {
  const [state, setState] = useState<DatabaseState>({
    dbInitialized: false,
    packages: [],
    posts: [],
    reviews: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize database and run migrations
        await initializeDatabase();
        await migrateData();
        
        // Load data from database
        const data = await loadAllFromDatabase();
        
        setState({
          dbInitialized: true,
          packages: data.packages,
          posts: data.posts,
          reviews: data.reviews,
          isLoading: false,
          error: null
        });
        
        console.log('Database initialized and data loaded successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
        
        // Fallback to mock data
        try {
          const { PACKAGES, MOCK_POSTS, MOCK_REVIEWS } = await import('../constants');
          
          setState({
            dbInitialized: true,
            packages: PACKAGES,
            posts: MOCK_POSTS,
            reviews: MOCK_REVIEWS,
            isLoading: false,
            error: 'Database failed, using fallback data'
          });
          
          console.log('Using fallback mock data');
        } catch (fallbackError) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to initialize database and fallback data'
          }));
        }
      }
    };

    initializeApp();
  }, []);

  return state;
};
