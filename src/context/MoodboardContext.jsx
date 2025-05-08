// src/context/MoodboardContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const MoodboardContext = createContext();

export function MoodboardProvider({ children }) {
  const [moodboards, setMoodboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Create axios instance with base URL
  const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
  });

  // Add auth token to requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Fetch moodboards from API
  useEffect(() => {
    const fetchMoodboards = async () => {
      try {
        console.log('Fetching moodboards...'); // Debug log
        console.log('Current user:', user); // Debug log
        setIsLoading(true);
        const response = await api.get('/moodboards');
        console.log('Moodboards response:', response.data); // Debug log
        // Handle both possible response structures
        const moodboardsData = response.data.data?.moodboards || response.data.moodboards || [];
        setMoodboards(moodboardsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching moodboards:', err.response || err); // Enhanced error logging
        setError('Failed to load moodboards');
        setMoodboards([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    if (user) { // Only fetch if user is logged in
      fetchMoodboards();
    } else {
      setMoodboards([]);
      setIsLoading(false);
    }
  }, [user]); // Refetch when user changes

  // Function to add a new moodboard
  const addMoodboard = async (name, description = '', isPublic = true) => {
    try {
      const response = await api.post('/moodboards', {
        name,
        description,
        isPublic
      });
      
      console.log('Create moodboard response:', response.data); // Add debug log
      
      // More robust response handling
      let newMoodboard;
      
      // Try to extract the new moodboard from different possible response structures
      if (response.data?.data?.moodboard) {
        newMoodboard = response.data.data.moodboard;
      } else if (response.data?.moodboard) {
        newMoodboard = response.data.moodboard;
      } else if (response.data?.data) {
        // If the moodboard might be the data object itself
        newMoodboard = response.data.data;
      } else {
        // As a fallback, use the entire response data
        // This allows creation to succeed even with unexpected response formats
        newMoodboard = response.data || {
          _id: Date.now().toString(), // Temporary ID in case we don't get one
          name,
          description,
          isPublic,
          outfits: [],
          createdAt: new Date().toISOString()
        };
      }
      
      setMoodboards(prev => [...prev, newMoodboard]);
      return newMoodboard;
    } catch (err) {
      console.error('Error creating moodboard:', err.response || err); // Enhanced error logging
      throw new Error(`Failed to create moodboard: ${err.message || 'Unknown error'}`);
    }
  };

  // Function to update a moodboard
  const updateMoodboard = async (id, updates) => {
    try {
      const response = await api.patch(`/moodboards/${id}`, updates);
      
      // More robust response handling
      let updatedMoodboard;
      
      if (response.data?.data?.moodboard) {
        updatedMoodboard = response.data.data.moodboard;
      } else if (response.data?.moodboard) {
        updatedMoodboard = response.data.moodboard;
      } else if (response.data?.data) {
        updatedMoodboard = response.data.data;
      } else {
        // Fallback to using response data directly
        updatedMoodboard = response.data;
      }
      
      setMoodboards(prev => 
        prev.map(board => 
          board._id === id ? updatedMoodboard : board
        )
      );
      return updatedMoodboard;
    } catch (err) {
      console.error('Error updating moodboard:', err.response || err);
      throw new Error(`Failed to update moodboard: ${err.message || 'Unknown error'}`);
    }
  };

  // Function to delete a moodboard
  const deleteMoodboard = async (id) => {
    try {
      await api.delete(`/moodboards/${id}`);
      setMoodboards(prev => prev.filter(board => board._id !== id));
    } catch (err) {
      console.error('Error deleting moodboard:', err.response || err);
      throw new Error(`Failed to delete moodboard: ${err.message || 'Unknown error'}`);
    }
  };

  // Function to add an outfit to a moodboard
  const addOutfitToMoodboard = async (moodboardId, outfitId, notes = '') => {
    try {
      const response = await api.post(`/moodboards/${moodboardId}/outfits`, {
        outfitId,
        notes
      });
      
      // More robust response handling
      let updatedMoodboard;
      
      if (response.data?.data?.moodboard) {
        updatedMoodboard = response.data.data.moodboard;
      } else if (response.data?.moodboard) {
        updatedMoodboard = response.data.moodboard;
      } else if (response.data?.data) {
        updatedMoodboard = response.data.data;
      } else {
        updatedMoodboard = response.data;
      }
      
      setMoodboards(prev => 
        prev.map(board => 
          board._id === moodboardId ? updatedMoodboard : board
        )
      );
      return updatedMoodboard;
    } catch (err) {
      console.error('Error adding outfit to moodboard:', err.response || err);
      throw new Error(`Failed to add outfit to moodboard: ${err.message || 'Unknown error'}`);
    }
  };

  // Function to remove an outfit from a moodboard
  const removeOutfitFromMoodboard = async (moodboardId, outfitId) => {
    try {
      const response = await api.delete(`/moodboards/${moodboardId}/outfits/${outfitId}`);
      
      // More robust response handling
      let updatedMoodboard;
      
      if (response.data?.data?.moodboard) {
        updatedMoodboard = response.data.data.moodboard;
      } else if (response.data?.moodboard) {
        updatedMoodboard = response.data.moodboard;
      } else if (response.data?.data) {
        updatedMoodboard = response.data.data;
      } else {
        updatedMoodboard = response.data;
      }
      
      setMoodboards(prev => 
        prev.map(board => 
          board._id === moodboardId ? updatedMoodboard : board
        )
      );
      return updatedMoodboard;
    } catch (err) {
      console.error('Error removing outfit from moodboard:', err.response || err);
      throw new Error(`Failed to remove outfit from moodboard: ${err.message || 'Unknown error'}`);
    }
  };

  const value = {
    moodboards,
    isLoading,
    error,
    addMoodboard,
    updateMoodboard,
    deleteMoodboard,
    addOutfitToMoodboard,
    removeOutfitFromMoodboard
  };

  return (
    <MoodboardContext.Provider value={value}>
      {children}
    </MoodboardContext.Provider>
  );
}

export const useMoodboards = () => {
  const context = useContext(MoodboardContext);
  if (!context) {
    throw new Error('useMoodboards must be used within a MoodboardProvider');
  }
  return context;
};