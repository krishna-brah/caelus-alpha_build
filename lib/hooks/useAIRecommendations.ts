import { useState, useCallback } from 'react';
import axios from 'axios';

interface UseAIRecommendationsProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useAIRecommendations({ onSuccess, onError }: UseAIRecommendationsProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  const getRecommendations = useCallback(async ({
    fabricId,
    recommendationType,
    userPreferences,
    sustainabilityDetails,
    stylePreferences,
  }: {
    fabricId?: string;
    recommendationType: 'general' | 'sustainability' | 'styling';
    userPreferences?: {
      sustainability: number;
      comfort: number;
      durability: number;
      price: number;
      useCase: string;
      style: string;
      seasonalNeeds: string[];
      specialRequirements?: string[];
    };
    sustainabilityDetails?: {
      name: string;
      properties: any;
      productionMethod: string;
      currentCertifications: string[];
      lifecycle: {
        rawMaterials: string;
        manufacturing: string;
        usePhase: string;
        endOfLife: string;
      };
    };
    stylePreferences?: {
      season: string;
      occasion: string[];
      style: string;
      colorPreferences: string[];
      sustainabilityPriority: number;
      culturalContext?: string;
      specialConsiderations?: string[];
    };
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/fabrics/advanced-recommendations', {
        fabricId,
        recommendationType,
        userPreferences,
        sustainabilityDetails,
        stylePreferences,
      });

      const result = response.data;
      setRecommendations(result.data);
      onSuccess?.(result.data);
      return result.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get recommendations');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  const getFabricRecommendations = useCallback((userPrefs: Parameters<typeof getRecommendations>[0]['userPreferences']) => {
    return getRecommendations({
      recommendationType: 'general',
      userPreferences: userPrefs,
    });
  }, [getRecommendations]);

  const getSustainabilityAnalysis = useCallback((details: Parameters<typeof getRecommendations>[0]['sustainabilityDetails']) => {
    return getRecommendations({
      recommendationType: 'sustainability',
      sustainabilityDetails: details,
    });
  }, [getRecommendations]);

  const getStylingRecommendations = useCallback((fabricId: string, stylePrefs: Parameters<typeof getRecommendations>[0]['stylePreferences']) => {
    return getRecommendations({
      fabricId,
      recommendationType: 'styling',
      stylePreferences: stylePrefs,
    });
  }, [getRecommendations]);

  return {
    loading,
    error,
    recommendations,
    getRecommendations,
    getFabricRecommendations,
    getSustainabilityAnalysis,
    getStylingRecommendations,
  };
}