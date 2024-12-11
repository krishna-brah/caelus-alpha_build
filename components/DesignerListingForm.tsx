import React from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';

interface DesignerListingFormProps {
  onSubmit: (listingData: any) => void;
  initialData?: any;
}

export const DesignerListingForm: React.FC<DesignerListingFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || '',
    materials: initialData?.materials || [],
    sustainabilityNotes: initialData?.sustainabilityNotes || '',
  });

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (
    field: string,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={formData.title}
              onChange={e => handleInputChange('title', e.target.value)}
              placeholder="Enter listing title"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <NumberInput
              value={formData.price}
              onChange={(_, value) => handleInputChange('price', value)}
            >
              <NumberInputField placeholder="Enter price" />
            </NumberInput>
          </FormControl>
        </SimpleGrid>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            value={formData.category}
            onChange={e => handleInputChange('category', e.target.value)}
            placeholder="Select category"
          >
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="dresses">Dresses</option>
            <option value="jackets">Jackets</option>
            <option value="wedding">Wedding Wear</option>
            <option value="professional">Professional Wear</option>
            <option value="blouses">Blouses</option>
            <option value="jewelry">Jewelry</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
            placeholder="Enter detailed description"
            rows={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Sustainability Notes</FormLabel>
          <Textarea
            value={formData.sustainabilityNotes}
            onChange={e => handleInputChange('sustainabilityNotes', e.target.value)}
            placeholder="Describe sustainability aspects"
            rows={3}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg">
          {initialData ? 'Update Listing' : 'Create Listing'}
        </Button>
      </VStack>
    </Box>
  );
};