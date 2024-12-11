import React from 'react';
import {
  Box,
  Container,
  Grid,
  HStack,
  VStack,
  Input,
  Select,
  Checkbox,
  Text,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { DesignerListing } from '../components/DesignerListing';

// Mock data - In a real app, this would come from an API
const mockListings = [
  {
    id: '1',
    title: 'Custom Denim Jacket',
    imageUrl: '/mock-images/denim-jacket.jpg',
    designer: {
      name: 'Alex Design',
      tags: [
        {
          id: '1',
          category: 'FabricSpecialty',
          value: 'Denim',
          tier: 'Diamond',
          projectsCompleted: 28,
          nextTierThreshold: 50,
        },
        {
          id: '2',
          category: 'Style',
          value: 'Casual',
          tier: 'Gold',
          projectsCompleted: 12,
          nextTierThreshold: 25,
        },
      ],
    },
    score: {
      designQuality: 9.4,
      materialUse: 9.0,
      sustainability: 8.8,
      totalReviews: 15,
    },
    materials: [
      {
        name: 'Organic Cotton',
        quality: 9.2,
        sustainability: 8.8,
      },
    ],
    price: 299.99,
  },
  // Add more mock listings as needed
];

export default function Marketplace() {
  const [filters, setFilters] = React.useState({
    search: '',
    fabricSpecialty: '',
    clothingType: '',
    style: '',
    minTier: '',
  });

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReview = (listingId: string) => {
    console.log('Review listing:', listingId);
    // In a real app, this would open a review modal
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading mb={2}>Marketplace</Heading>
            <Text color="gray.600">
              Discover unique designs from talented creators
            </Text>
          </Box>

          {/* Filters */}
          <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" borderColor={borderColor}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <Box>
                <Text mb={2}>Search</Text>
                <Input
                  placeholder="Search listings..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </Box>

              <Box>
                <Text mb={2}>Fabric Specialty</Text>
                <Select
                  placeholder="All fabrics"
                  value={filters.fabricSpecialty}
                  onChange={(e) => handleFilterChange('fabricSpecialty', e.target.value)}
                >
                  <option value="Linen">Linen</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Silk">Silk</option>
                  <option value="Wool">Wool</option>
                  <option value="Denim">Denim</option>
                  <option value="Cashmere">Cashmere</option>
                  <option value="Tweed/Hemp">Tweed/Hemp</option>
                  <option value="Recycled">Recycled Materials</option>
                </Select>
              </Box>

              <Box>
                <Text mb={2}>Clothing Type</Text>
                <Select
                  placeholder="All types"
                  value={filters.clothingType}
                  onChange={(e) => handleFilterChange('clothingType', e.target.value)}
                >
                  <option value="Shirts">Shirts</option>
                  <option value="Pants">Pants</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Wedding">Wedding Wear</option>
                  <option value="Professional">Professional Wear</option>
                  <option value="Blouses">Blouses</option>
                  <option value="Jewelry">Jewelry</option>
                </Select>
              </Box>

              <Box>
                <Text mb={2}>Minimum Tier</Text>
                <Select
                  placeholder="Any tier"
                  value={filters.minTier}
                  onChange={(e) => handleFilterChange('minTier', e.target.value)}
                >
                  <option value="Gold">Gold</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Cosmic">Cosmic</option>
                </Select>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Listings Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {mockListings.map(listing => (
              <DesignerListing
                key={listing.id}
                {...listing}
                canReview={true}
                onReview={handleReview}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}