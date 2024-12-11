import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { AIService } from '../../lib/services/ai';
import {
  BeakerIcon,
  LeafIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface FabricGalleryProps {
  initialFabrics: any[];
}

export const FabricGallery: React.FC<FabricGalleryProps> = ({ initialFabrics }) => {
  const [fabrics, setFabrics] = React.useState(initialFabrics);
  const [selectedFabric, setSelectedFabric] = React.useState<any>(null);
  const [aiRecommendations, setAiRecommendations] = React.useState<any>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    loading,
    error,
    getStylingRecommendations,
    getSustainabilityAnalysis,
  } = useAIRecommendations({
    onSuccess: (data) => {
      setAiRecommendations(data);
    },
    onError: (error) => {
      console.error('AI Recommendation Error:', error);
    },
  });

  const loadAIRecommendations = async (fabricId: string) => {
    try {
      // Get styling recommendations
      const stylingRecommendations = await getStylingRecommendations(fabricId, {
        season: 'all',
        occasion: ['casual', 'formal', 'business'],
        style: 'contemporary',
        colorPreferences: ['neutral', 'earth tones'],
        sustainabilityPriority: 9,
      });

      // Get sustainability analysis
      const sustainabilityAnalysis = await getSustainabilityAnalysis({
        name: selectedFabric.name,
        properties: selectedFabric.properties,
        productionMethod: selectedFabric.productionMethod || 'standard',
        currentCertifications: selectedFabric.certifications,
        lifecycle: {
          rawMaterials: selectedFabric.rawMaterials || 'sustainable sourcing',
          manufacturing: selectedFabric.manufacturing || 'eco-friendly process',
          usePhase: 'consumer use and care',
          endOfLife: 'recyclable/biodegradable',
        },
      });

      setAiRecommendations({
        styling: stylingRecommendations,
        sustainability: sustainabilityAnalysis,
      });
    } catch (error) {
      console.error('Failed to load AI recommendations:', error);
    }
  };

  const FabricCard: React.FC<{
    fabric: any;
    index: number;
  }> = ({ fabric, index }) => {
    const isSelected = selectedFabric?.id === fabric.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card
          variant={isSelected ? 'neon' : 'glass'}
          className="h-full cursor-pointer transition-all duration-300"
          onClick={() => {
            setSelectedFabric(fabric);
            loadAIRecommendations(fabric.id);
          }}
        >
          <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
            <Image
              src={fabric.imageUrl}
              alt={fabric.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center gap-2">
                {fabric.organic && (
                  <span className="px-2 py-1 rounded-full bg-green-500/90 text-white text-xs">
                    Organic
                  </span>
                )}
                {fabric.recycled && (
                  <span className="px-2 py-1 rounded-full bg-blue-500/90 text-white text-xs">
                    Recycled
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-display font-semibold">{fabric.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{ width: `${fabric.sustainabilityScore}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {fabric.sustainabilityScore}/100
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {fabric.description}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1 text-sm">
              <BeakerIcon className="w-4 h-4 text-primary-500" />
              <span>{fabric.waterUsage}L/kg</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <LeafIcon className="w-4 h-4 text-green-500" />
              <span>{fabric.carbonFootprint}kg CO₂/kg</span>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Sustainable Fabric Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our curated collection of eco-friendly fabrics, each carefully
            selected for their minimal environmental impact and superior quality.
          </p>
        </motion.div>

        <Grid columns={{ default: 1, sm: 2, lg: 3 }} gap="6">
          {fabrics.map((fabric, index) => (
            <FabricCard key={fabric.id} fabric={fabric} index={index} />
          ))}
        </Grid>

        {/* AI Recommendations */}
        {selectedFabric && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  AI Styling Recommendations
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Smart suggestions for {selectedFabric.name}
                </p>
              </div>
              {loading && (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
              )}
            </div>

            {aiRecommendations && !loading && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(aiRecommendations).map(([key, value]: [string, any]) => (
                  <Card key={key} variant="minimal" className="p-4">
                    <h4 className="font-display font-semibold mb-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {value}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};