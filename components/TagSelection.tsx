import React, { useState, useEffect } from 'react';
import { Tag, tagCategories, getTagsByCategory } from '@/lib/config/tags';
import { useRouter } from 'next/router';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { CosmicBackground } from './ui/CosmicBackground';

interface TagCardProps {
  tag: Tag;
  selected: boolean;
  onSelect: (tag: Tag) => void;
  image?: string;
}

const TagCard: React.FC<TagCardProps> = ({ tag, selected, onSelect, image }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 ${
        selected 
          ? 'ring-2 ring-cosmic-500 transform scale-105' 
          : 'hover:shadow-lg hover:-translate-y-1'
      }`}
      onClick={() => onSelect(tag)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={tag.value}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/60 to-transparent" />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{tag.value}</CardTitle>
        <CardDescription>{tag.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-cosmic-600">
            Base Threshold: {tag.baseThreshold} projects
          </span>
          {selected && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cosmic-100 text-cosmic-800">
              Selected
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface TagSelectionProps {
  maxSelections?: number;
  onSubmit: (selectedTags: Tag[]) => void;
  initialTags?: string[];
}

export const TagSelection: React.FC<TagSelectionProps> = ({
  maxSelections = 5,
  onSubmit,
  initialTags = [],
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [currentCategory, setCurrentCategory] = useState<keyof typeof tagCategories>('FabricSpecialty');
  const [tagImages, setTagImages] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    // Load images for the current category's tags
    const loadTagImages = async () => {
      const currentTags = getTagsByCategory(currentCategory);
      for (const tag of currentTags) {
        if (!tagImages[tag.id]) {
          try {
            const response = await fetch(`/api/tag-images?tagId=${tag.id}`);
            const images = await response.json();
            if (images && images.length > 0) {
              setTagImages(prev => ({
                ...prev,
                [tag.id]: images[0].src.medium
              }));
            }
          } catch (error) {
            console.error('Error loading image for tag:', tag.id, error);
          }
        }
      }
    };

    loadTagImages();
  }, [currentCategory]);

  const handleTagSelect = (tag: Tag) => {
    setSelectedTags(prev => {
      const isSelected = prev.find(t => t.id === tag.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tag.id);
      }
      if (prev.length >= maxSelections) {
        return prev;
      }
      return [...prev, tag];
    });
  };

  const handleNextCategory = () => {
    const categories = Object.keys(tagCategories) as (keyof typeof tagCategories)[];
    const currentIndex = categories.indexOf(currentCategory);
    if (currentIndex < categories.length - 1) {
      setCurrentCategory(categories[currentIndex + 1]);
    } else {
      onSubmit(selectedTags);
    }
  };

  const currentTags = getTagsByCategory(currentCategory);

  return (
    <CosmicBackground variant="wave" className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cosmic-900 mb-4">
            Select Your {tagCategories[currentCategory]}
          </h1>
          <p className="text-lg text-cosmic-600 mb-8">
            Choose up to {maxSelections} tags that best represent your expertise
            ({selectedTags.length}/{maxSelections} selected)
          </p>
          
          {/* Category Progress */}
          <div className="flex justify-center gap-2 mb-8">
            {Object.keys(tagCategories).map((category) => (
              <div
                key={category}
                className={`w-3 h-3 rounded-full ${
                  category === currentCategory
                    ? 'bg-cosmic-500'
                    : 'bg-cosmic-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTags.map(tag => (
            <TagCard
              key={tag.id}
              tag={tag}
              selected={selectedTags.some(t => t.id === tag.id)}
              onSelect={handleTagSelect}
              image={tagImages[tag.id]}
            />
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            onClick={handleNextCategory}
            disabled={selectedTags.length === 0}
          >
            {currentCategory === 'Style' ? 'Complete' : 'Next Category'}
          </Button>
        </div>
      </div>
    </CosmicBackground>
  );
};