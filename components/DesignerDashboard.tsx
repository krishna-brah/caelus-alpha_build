import React from 'react';
import {
  Box,
  Grid,
  Heading,
  VStack,
  Text,
  Progress,
  SimpleGrid,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { Tag } from '../types/tags';
import { TagDisplay } from './TagDisplay';

interface DesignerDashboardProps {
  designerName: string;
  tags: Tag[];
  achievements: {
    totalProjects: number;
    highestTier: string;
    topRatedListings: number;
  };
}

export const DesignerDashboard: React.FC<DesignerDashboardProps> = ({
  designerName,
  tags,
  achievements,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const groupedTags = tags.reduce((acc, tag) => {
    const category = tag.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  return (
    <Box p={6}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>{designerName}'s Dashboard</Heading>
          <Text color="gray.600">Track your progress and achievements</Text>
        </Box>

        {/* Achievements Overview */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack align="start">
              <Text color="gray.500">Total Projects</Text>
              <Heading size="lg">{achievements.totalProjects}</Heading>
            </VStack>
          </Box>
          <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack align="start">
              <Text color="gray.500">Highest Tier</Text>
              <Heading size="lg">{achievements.highestTier}</Heading>
            </VStack>
          </Box>
          <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack align="start">
              <Text color="gray.500">Top Rated Listings</Text>
              <Heading size="lg">{achievements.topRatedListings}</Heading>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Tags Progress */}
        <Box>
          <Heading size="md" mb={4}>Tag Progress</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {Object.entries(groupedTags).map(([category, categoryTags]) => (
              <Box key={category} p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <VStack align="stretch" spacing={4}>
                  <Heading size="sm">{category}</Heading>
                  {categoryTags.map(tag => (
                    <TagDisplay key={tag.id} tag={tag} />
                  ))}
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};