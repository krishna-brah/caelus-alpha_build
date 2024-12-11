import React from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function UserType() {
  const router = useRouter();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  const handleUserTypeSelection = (type: 'consumer' | 'designer') => {
    if (type === 'designer') {
      router.push('/designer/tag-selection');
    } else {
      router.push('/marketplace');
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">Welcome to Caelus</Heading>
          <Text textAlign="center" fontSize="lg">
            Please select how you'll be using our platform
          </Text>

          <VStack spacing={4}>
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBgColor}
              w="100%"
              cursor="pointer"
              _hover={{ shadow: 'md' }}
              onClick={() => handleUserTypeSelection('designer')}
            >
              <VStack spacing={4}>
                <Heading size="md">I'm a Designer</Heading>
                <Text textAlign="center">
                  Create and sell your designs, collaborate with other designers,
                  and build your reputation through our tagging system.
                </Text>
                <Button colorScheme="blue">
                  Continue as Designer
                </Button>
              </VStack>
            </Box>

            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBgColor}
              w="100%"
              cursor="pointer"
              _hover={{ shadow: 'md' }}
              onClick={() => handleUserTypeSelection('consumer')}
            >
              <VStack spacing={4}>
                <Heading size="md">I'm a Consumer</Heading>
                <Text textAlign="center">
                  Discover unique designs, connect with talented designers,
                  and find exactly what you're looking for.
                </Text>
                <Button colorScheme="green">
                  Continue as Consumer
                </Button>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}