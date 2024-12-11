import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Heading,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { Tag } from '../types/tags';

interface ListingScore {
  designQuality: number;
  materialUse: number;
  sustainability: number;
  totalReviews: number;
}

interface DesignerListingProps {
  id: string;
  title: string;
  imageUrl: string;
  designer: {
    name: string;
    tags: Tag[];
  };
  score: ListingScore;
  materials: {
    name: string;
    quality: number;
    sustainability: number;
  }[];
  price: number;
  canReview: boolean;
  onReview: (listingId: string) => void;
}

export const DesignerListing: React.FC<DesignerListingProps> = ({
  id,
  title,
  imageUrl,
  designer,
  score,
  materials,
  price,
  canReview,
  onReview,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getTierBadgeProps = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return { colorScheme: 'yellow', icon: '🌟' };
      case 'Diamond':
        return { colorScheme: 'cyan', icon: '💎' };
      case 'Cosmic':
        return { colorScheme: 'purple', icon: '🌌' };
      default:
        return { colorScheme: 'gray', icon: '⭐' };
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
    >
      <Image
        src={imageUrl}
        alt={title}
        height="300px"
        width="100%"
        objectFit="cover"
      />

      <Box p={6}>
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading size="md">{title}</Heading>
            <Text color="gray.600">{designer.name}</Text>
          </Box>

          {/* Designer Tags */}
          <Box>
            <Text fontWeight="bold" mb={2}>Designer Expertise</Text>
            <HStack flexWrap="wrap" spacing={2}>
              {designer.tags.map(tag => {
                const { colorScheme, icon } = getTierBadgeProps(tag.tier);
                return (
                  <Tooltip
                    key={tag.id}
                    label={`${tag.value} - ${tag.tier} Tier`}
                    hasArrow
                  >
                    <Badge colorScheme={colorScheme} px={2} py={1}>
                      {icon} {tag.value}
                    </Badge>
                  </Tooltip>
                );
              })}
            </HStack>
          </Box>

          {/* Scores */}
          <SimpleGrid columns={3} spacing={4}>
            <VStack>
              <Text fontSize="sm" color="gray.600">Design Quality</Text>
              <Badge colorScheme="blue" fontSize="lg">
                {score.designQuality.toFixed(1)}
              </Badge>
            </VStack>
            <VStack>
              <Text fontSize="sm" color="gray.600">Material Use</Text>
              <Badge colorScheme="green" fontSize="lg">
                {score.materialUse.toFixed(1)}
              </Badge>
            </VStack>
            <VStack>
              <Text fontSize="sm" color="gray.600">Sustainability</Text>
              <Badge colorScheme="teal" fontSize="lg">
                {score.sustainability.toFixed(1)}
              </Badge>
            </VStack>
          </SimpleGrid>

          {/* Materials Used */}
          <Box>
            <Text fontWeight="bold" mb={2}>Materials Used</Text>
            <VStack align="stretch" spacing={2}>
              {materials.map((material, index) => (
                <HStack key={index} justify="space-between">
                  <Text fontSize="sm">{material.name}</Text>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue">Q: {material.quality}</Badge>
                    <Badge colorScheme="green">S: {material.sustainability}</Badge>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Box>

          <HStack justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="xl">
              ${price.toFixed(2)}
            </Text>
            {canReview && (
              <Button
                colorScheme="blue"
                onClick={() => onReview(id)}
              >
                Write Review
              </Button>
            )}
          </HStack>

          <Text fontSize="sm" color="gray.600" textAlign="right">
            {score.totalReviews} reviews
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};