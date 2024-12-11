import React from 'react';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
  Button,
  SimpleGrid,
  Heading,
  Text,
} from '@chakra-ui/react';
import { DesignerDashboard } from '../../components/DesignerDashboard';
import { FabricGallery } from '../../components/FabricGallery';
import { DesignerListing } from '../../components/DesignerListing';

// Mock data - In a real app, this would come from an API
const mockDesignerData = {
  name: 'Alex Designer',
  tags: [
    {
      id: '1',
      category: 'FabricSpecialty',
      value: 'Denim',
      tier: 'Gold',
      projectsCompleted: 8,
      nextTierThreshold: 10,
    },
    {
      id: '2',
      category: 'Style',
      value: 'Casual',
      tier: 'Baseline',
      projectsCompleted: 3,
      nextTierThreshold: 10,
    },
  ],
  achievements: {
    totalProjects: 15,
    highestTier: 'Gold',
    topRatedListings: 5,
  },
};

const mockFabrics = [
  {
    id: '1',
    name: 'Organic Cotton',
    imageUrl: '/mock-images/fabric1.jpg',
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
];

const mockListings = [
  {
    id: '1',
    title: 'Sustainable Denim Collection',
    description: 'Contemporary denim designs using eco-friendly materials',
    tags: ['Denim', 'Sustainable', 'Casual'],
    status: 'active',
    created: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Summer Fashion Line',
    description: 'Light and breezy summer wear collection',
    tags: ['Summer', 'Casual', 'Beachwear'],
    status: 'draft',
    created: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Eco-Friendly Activewear',
    description: 'Performance sportswear made from recycled materials',
    tags: ['Activewear', 'Sustainable', 'Performance'],
    status: 'active',
    created: new Date().toISOString(),
  },
];

export default function DesignerDashboardPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleScoreFabric = (fabricId: string) => {
    console.log('Score fabric:', fabricId);
    // In a real app, this would open the scoring modal
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>My Listings</Tab>
            <Tab>Fabric Scoring</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DesignerDashboard
                designerName={mockDesignerData.name}
                tags={mockDesignerData.tags}
                achievements={mockDesignerData.achievements}
              />
            </TabPanel>

            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Heading size="md">My Listings</Heading>
                  <Button colorScheme="blue" leftIcon={<>+</>}>
                    Create New Listing
                  </Button>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {mockListings.map((listing) => (
                    <Box
                      key={listing.id}
                      p={6}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg={useColorModeValue('white', 'gray.800')}
                      shadow="sm"
                      transition="all 0.2s"
                      _hover={{ shadow: 'md' }}
                    >
                      <VStack align="stretch" spacing={3}>
                        <Heading size="sm">{listing.title}</Heading>
                        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                          {listing.description}
                        </Text>
                        <Box>
                          {listing.tags.map((tag) => (
                            <Box
                              key={tag}
                              as="span"
                              mx={1}
                              px={2}
                              py={1}
                              borderRadius="full"
                              fontSize="xs"
                              bg={useColorModeValue('gray.100', 'gray.700')}
                              color={useColorModeValue('gray.600', 'gray.300')}
                            >
                              {tag}
                            </Box>
                          ))}
                        </Box>
                        <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                          Status: {listing.status}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            <TabPanel>
              <FabricGallery
                fabrics={mockFabrics}
                canScore={true}
                onScoreFabric={handleScoreFabric}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}