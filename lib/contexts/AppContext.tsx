import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tag } from '../../types/tags';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  userType: 'designer' | 'consumer';
  tags: Tag[];
  measurements?: {
    chest: number;
    waist: number;
    hips: number;
    inseam: number;
  };
}

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  isDesignerQualified: boolean;
  aiGeneratedDesigns: any[];
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  styleAnalysis: string | null;
  updateStyleAnalysis: (analysis: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [aiGeneratedDesigns, setAiGeneratedDesigns] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [styleAnalysis, setStyleAnalysis] = useState<string | null>(null);

  // Check if designer has Diamond or Cosmic tier tags
  const isDesignerQualified = !!user?.tags?.some(
    tag => tag.tier === 'Diamond' || tag.tier === 'Cosmic'
  );

  const addToFavorites = (id: string) => {
    setFavorites(prev => [...prev, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  const updateStyleAnalysis = (analysis: string) => {
    setStyleAnalysis(analysis);
  };

  // Mock authentication - replace with real auth in production
  useEffect(() => {
    const mockUser: UserProfile = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      userType: 'designer',
      tags: [
        {
          id: '1',
          category: 'FabricSpecialty',
          value: 'Denim',
          tier: 'Diamond',
          projectsCompleted: 28,
          nextTierThreshold: 50,
        },
      ],
      measurements: {
        chest: 40,
        waist: 34,
        hips: 42,
        inseam: 32,
      },
    };
    setUser(mockUser);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isDesignerQualified,
        aiGeneratedDesigns,
        favorites,
        addToFavorites,
        removeFromFavorites,
        styleAnalysis,
        updateStyleAnalysis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}