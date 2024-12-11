import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Select,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { FabricGallery } from '../components/FabricGallery';

// Mock data - In a real app, this would come from an API
const mockFabrics = [
  {
    id: '1',
    name: 'Organic Cotton',
    imageUrl: '/mock-images/organic-cotton.jpg',
    score: {
      qualityRating: 9.2,
      sustainabilityScore: 8.8,
      origin: 'India',
      supplier: 'EcoThreads Co.',
      certifications: ['Fair Trade', 'Organic'],
      ratedByDesigners: 12,
    },
    supplier: {
      name: 'EcoThreads Co.',
      origin: 'India',
      certifications: ['Fair Trade', 'Organic'],
    },
  },
  // Add more mock fabrics as needed
];

export default function FabricGalleryPage() {
  const [filters, setFilters] = React.useState({
    search: '',
    minQuality: '',
    minSustainability: '',
    certification: '',
  });

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScoreFabric = (fabricId: string) => {
    console.log('Score fabric:', fabricId);
    // In a real app, this would open the scoring modal
  };

  // Mock function - In a real app, this would check the user's designer tags
  const canScoreFabrics = true;

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading mb={2}>Fabric Gallery</Heading>
            <Text color="gray.600">
              Explore and evaluate our curated collection of sustainable fabrics
            </Text>
          </Box>

          {/* Filters */}
          <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" borderColor={borderColor}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <Box>
                <Text mb={2}>Search</Text>
                <Input
                  placeholder="Search fabrics..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </Box>

              <Box>
                <Text mb={2}>Minimum Quality Rating</Text>
                <Select
                  placeholder="Any quality"
                  value={filters.minQuality}
                  onChange={(e) => handleFilterChange('minQuality', e.target.value)}
                >
                  <option value="7">7+</option>
                  <option value="8">8+</option>
                  <option value="9">9+</option>
                </Select>
              </Box>

              <Box>
                <Text mb={2}>Minimum Sustainability Score</Text>
                <Select
                  placeholder="Any sustainability"
                  value={filters.minSustainability}
                  onChange={(e) => handleFilterChange('minSustainability', e.target.value)}
                >
                  <option value="7">7+</option>
                  <option value="8">8+</option>
                  <option value="9">9+</option>
                </Select>
              </Box>

              <Box>
                <Text mb={2}>Certification</Text>
                <Select
                  placeholder="Any certification"
                  value={filters.certification}
                  onChange={(e) => handleFilterChange('certification', e.target.value)}
                >
                  <option value="Fair Trade">Fair Trade</option>
                  <option value="Organic">Organic</option>
                  <option value="Recycled">Recycled</option>
                </Select>
              </Box>
            </SimpleGrid>
          </Box>

          <FabricGallery
            fabrics={mockFabrics}
            canScore={canScoreFabrics}
            onScoreFabric={handleScoreFabric}
          />
        </VStack>
      </Container>
    </Box>
  );
}