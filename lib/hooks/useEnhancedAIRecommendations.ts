import { useState, useCallback } from 'react';
import { EnhancedAIService } from '../services/aiEnhanced';

interface UseEnhancedAIRecommendationsProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onProgress?: (progress: number) => void;
}

export function useEnhancedAIRecommendations({
  onSuccess,
  onError,
  onProgress,
}: UseEnhancedAIRecommendationsProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<any>(null);

  const generateComprehensiveAnalysis = useCallback(async (
    fabricId: string,
    analysisType: 'sustainability' | 'technical' | 'style' | 'trend'
  ) => {
    try {
      setLoading(true);
      setError(null);
      onProgress?.(0);

      const analysis = await EnhancedAIService.generateComprehensiveAnalysis(
        fabricId,
        analysisType
      );

      setResults(analysis);
      onSuccess?.(analysis);
      onProgress?.(100);
      return analysis;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Analysis failed');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError, onProgress]);

  const generateDesignSuggestions = useCallback(async (
    fabricId: string,
    designParameters: {
      style: string;
      function: string;
      sustainability_priority: number;
      innovation_level: number;
      market_segment: string;
      price_point: string;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      onProgress?.(0);

      const suggestions = await EnhancedAIService.generateDesignSuggestions(
        fabricId,
        designParameters
      );

      setResults(suggestions);
      onSuccess?.(suggestions);
      onProgress?.(100);
      return suggestions;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Design suggestions failed');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError, onProgress]);

  const generateCustomerRecommendations = useCallback(async (
    fabricId: string,
    customerProfile: {
      style_preferences: string[];
      sustainability_importance: number;
      budget_range: string;
      lifestyle: string[];
      size_preferences: string;
      color_preferences: string[];
      special_requirements?: string[];
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      onProgress?.(0);

      const recommendations = await EnhancedAIService.generateCustomerRecommendations(
        fabricId,
        customerProfile
      );

      setResults(recommendations);
      onSuccess?.(recommendations);
      onProgress?.(100);
      return recommendations;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Customer recommendations failed');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError, onProgress]);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    results,
    generateComprehensiveAnalysis,
    generateDesignSuggestions,
    generateCustomerRecommendations,
    clearResults,
  };
}