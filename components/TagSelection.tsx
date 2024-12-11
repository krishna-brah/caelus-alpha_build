import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Checkbox,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FabricSpecialty, ClothingType, StyleTag } from '../types/tags';

interface TagSelectionProps {
  onSubmit: (selectedTags: {
    fabrics: FabricSpecialty[];
    clothing: ClothingType[];
    styles: StyleTag[];
  }) => void;
}

export const TagSelection: React.FC<TagSelectionProps> = ({ onSubmit }) => {
  const [selectedFabrics, setSelectedFabrics] = React.useState<FabricSpecialty[]>([]);
  const [selectedClothing, setSelectedClothing] = React.useState<ClothingType[]>([]);
  const [selectedStyles, setSelectedStyles] = React.useState<StyleTag[]>([]);
  const toast = useToast();

  const fabricOptions: FabricSpecialty[] = [
    'Linen', 'Cotton', 'Silk', 'Wool', 'Denim',
    'Cashmere', 'Tweed/Hemp', 'Recycled Materials'
  ];

  const clothingOptions: ClothingType[] = [
    'Shirts', 'Pants', 'Dresses', 'Jackets',
    'Wedding Wear', 'Professional Wear', 'Blouses', 'Jewelry'
  ];

  const styleOptions: StyleTag[] = [
    'Formal', 'Vintage', 'Casual', 'Streetwear',
    'Artsy/Experimental', 'Gothic', 'Avant-Garde', 'Minimalist'
  ];

  const handleSubmit = () => {
    if (
      selectedFabrics.length === 0 &&
      selectedClothing.length === 0 &&
      selectedStyles.length === 0
    ) {
      toast({
        title: 'Selection Required',
        description: 'Please select at least one tag from any category',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit({
      fabrics: selectedFabrics,
      clothing: selectedClothing,
      styles: selectedStyles,
    });
  };

  const handleFabricToggle = (fabric: FabricSpecialty) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric)
        ? prev.filter(f => f !== fabric)
        : [...prev, fabric]
    );
  };

  const handleClothingToggle = (clothing: ClothingType) => {
    setSelectedClothing(prev =>
      prev.includes(clothing)
        ? prev.filter(c => c !== clothing)
        : [...prev, clothing]
    );
  };

  const handleStyleToggle = (style: StyleTag) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  return (
    <Box p={6}>
      <SimpleGrid columns={3} spacing={8}>
        <VStack align="start" spacing={4}>
          <Heading size="md">Fabric Specialties</Heading>
          {fabricOptions.map(fabric => (
            <Checkbox
              key={fabric}
              isChecked={selectedFabrics.includes(fabric)}
              onChange={() => handleFabricToggle(fabric)}
            >
              {fabric}
            </Checkbox>
          ))}
        </VStack>

        <VStack align="start" spacing={4}>
          <Heading size="md">Types of Clothes</Heading>
          {clothingOptions.map(clothing => (
            <Checkbox
              key={clothing}
              isChecked={selectedClothing.includes(clothing)}
              onChange={() => handleClothingToggle(clothing)}
            >
              {clothing}
            </Checkbox>
          ))}
        </VStack>

        <VStack align="start" spacing={4}>
          <Heading size="md">Styles</Heading>
          {styleOptions.map(style => (
            <Checkbox
              key={style}
              isChecked={selectedStyles.includes(style)}
              onChange={() => handleStyleToggle(style)}
            >
              {style}
            </Checkbox>
          ))}
        </VStack>
      </SimpleGrid>

      <Button
        mt={8}
        colorScheme="blue"
        onClick={handleSubmit}
      >
        Save Tags
      </Button>
    </Box>
  );
};