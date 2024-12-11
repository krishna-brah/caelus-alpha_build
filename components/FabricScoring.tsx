import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { FabricScore } from '../types/tags';

interface FabricScoringProps {
  fabricId: string;
  existingScore?: FabricScore;
  onSubmitScore: (score: Omit<FabricScore, 'ratedByDesigners'>) => void;
  isDesignerQualified: boolean;
}

export const FabricScoring: React.FC<FabricScoringProps> = ({
  fabricId,
  existingScore,
  onSubmitScore,
  isDesignerQualified,
}) => {
  const [qualityRating, setQualityRating] = React.useState(5);
  const [sustainabilityScore, setSustainabilityScore] = React.useState(5);
  const toast = useToast();

  if (!isDesignerQualified) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Text color="red.500">
          Only designers with Diamond or Cosmic tier tags can score fabrics.
        </Text>
      </Box>
    );
  }

  const handleSubmit = () => {
    onSubmitScore({
      qualityRating,
      sustainabilityScore,
      origin: existingScore?.origin || '',
      supplier: existingScore?.supplier || '',
      certifications: existingScore?.certifications || [],
    });

    toast({
      title: 'Score Submitted',
      description: 'Thank you for rating this fabric!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <VStack spacing={6} align="stretch">
        <Box>
          <Text mb={2} fontWeight="bold">Quality Rating</Text>
          <HStack spacing={4}>
            <Slider
              value={qualityRating}
              onChange={setQualityRating}
              min={0}
              max={10}
              step={0.5}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Badge colorScheme="blue">{qualityRating}</Badge>
          </HStack>
        </Box>

        <Box>
          <Text mb={2} fontWeight="bold">Sustainability Score</Text>
          <HStack spacing={4}>
            <Slider
              value={sustainabilityScore}
              onChange={setSustainabilityScore}
              min={0}
              max={10}
              step={0.5}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Badge colorScheme="green">{sustainabilityScore}</Badge>
          </HStack>
        </Box>

        {existingScore && (
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold">Current Statistics:</Text>
            <Text>Origin: {existingScore.origin}</Text>
            <Text>Supplier: {existingScore.supplier}</Text>
            <Text>
              Certifications: {existingScore.certifications.join(', ')}
            </Text>
            <Text>
              Rated by {existingScore.ratedByDesigners} qualified designers
            </Text>
          </VStack>
        )}

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
        >
          Submit Score
        </Button>
      </VStack>
    </Box>
  );
};