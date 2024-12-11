import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FabricScore } from '../types/tags';

interface FabricGalleryProps {
  fabrics: {
    id: string;
    name: string;
    imageUrl: string;
    score: FabricScore;
    supplier: {
      name: string;
      origin: string;
      certifications: string[];
    };
  }[];
  canScore: boolean;
  onScoreFabric: (fabricId: string) => void;
}

export const FabricGallery: React.FC<FabricGalleryProps> = ({
  fabrics,
  canScore,
  onScoreFabric,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Fabric Gallery</Heading>
          <Text color="gray.600">
            Explore our curated collection of high-quality fabrics
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {fabrics.map(fabric => (
            <Box
              key={fabric.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg={bgColor}
              borderColor={borderColor}
            >
              <Image
                src={fabric.imageUrl}
                alt={fabric.name}
                height="200px"
                width="100%"
                objectFit="cover"
              />

              <Box p={4}>
                <VStack align="stretch" spacing={3}>
                  <Heading size="md">{fabric.name}</Heading>

                  <HStack justify="space-between">
                    <Badge colorScheme="blue">
                      Quality: {fabric.score.qualityRating.toFixed(1)}
                    </Badge>
                    <Badge colorScheme="green">
                      Sustainability: {fabric.score.sustainabilityScore.toFixed(1)}
                    </Badge>
                  </HStack>

                  <Box>
                    <Text fontWeight="bold" fontSize="sm">Supplier Details</Text>
                    <Text fontSize="sm">{fabric.supplier.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Origin: {fabric.supplier.origin}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" fontSize="sm">Certifications</Text>
                    <HStack flexWrap="wrap" spacing={2}>
                      {fabric.supplier.certifications.map((cert, index) => (
                        <Badge key={index} colorScheme="purple" variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>

                  <Text fontSize="sm" color="gray.600">
                    Rated by {fabric.score.ratedByDesigners} qualified designers
                  </Text>

                  {canScore && (
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onScoreFabric(fabric.id)}
                    >
                      Score this Fabric
                    </Button>
                  )}
                </VStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};