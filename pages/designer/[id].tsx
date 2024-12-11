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
} from '@chakra-ui/react';
import { DesignerDashboard } from '../../components/DesignerDashboard';
import { TagSelection } from '../../components/TagSelection';
import { Tag } from '../../types/tags';

// Mock data - In a real app, this would come from an API
const mockDesignerData = {
  id: '1',
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
  ] as Tag[],
  achievements: {
    totalProjects: 15,
    highestTier: 'Gold',
    topRatedListings: 5,
  },
};

export default function DesignerProfile() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleTagSubmit = (selectedTags: {
    fabrics: string[];
    clothing: string[];
    styles: string[];
  }) => {
    console.log('Selected tags:', selectedTags);
    // In a real app, this would update the backend
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <Tabs>
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Manage Tags</Tab>
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
              <TagSelection onSubmit={handleTagSubmit} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}