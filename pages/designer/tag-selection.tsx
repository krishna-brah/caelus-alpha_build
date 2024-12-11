import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TagSelection } from '../../components/TagSelection';

export default function DesignerTagSelection() {
  const router = useRouter();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleTagSubmit = (selectedTags: {
    fabrics: string[];
    clothing: string[];
    styles: string[];
  }) => {
    // In a real app, this would save to the backend
    console.log('Selected tags:', selectedTags);
    
    toast({
      title: 'Tags Selected',
      description: 'Your specializations have been saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Redirect to designer dashboard
    router.push('/designer/dashboard');
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading mb={2}>Select Your Specializations</Heading>
            <Text color="gray.600">
              Choose the tags that best represent your expertise and interests.
              You can update these later from your profile.
            </Text>
          </Box>

          <TagSelection onSubmit={handleTagSubmit} />
        </VStack>
      </Container>
    </Box>
  );
}