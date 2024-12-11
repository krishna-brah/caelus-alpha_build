import React from 'react';
import {
  Badge,
  Box,
  Tooltip,
  HStack,
  Text,
  Progress,
  VStack,
} from '@chakra-ui/react';
import { Tag, TagTier } from '../types/tags';

interface TagDisplayProps {
  tag: Tag;
}

const getTierColor = (tier: TagTier): string => {
  switch (tier) {
    case 'Gold':
      return 'yellow.400';
    case 'Diamond':
      return 'cyan.400';
    case 'Cosmic':
      return 'purple.500';
    default:
      return 'gray.400';
  }
};

const getTierIcon = (tier: TagTier): string => {
  switch (tier) {
    case 'Gold':
      return '🌟';
    case 'Diamond':
      return '💎';
    case 'Cosmic':
      return '🌌';
    default:
      return '⭐';
  }
};

export const TagDisplay: React.FC<TagDisplayProps> = ({ tag }) => {
  const progress = (tag.projectsCompleted / tag.nextTierThreshold) * 100;
  
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={3}
      mb={2}
      bg="white"
      boxShadow="sm"
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Badge
            colorScheme={getTierColor(tag.tier)}
            fontSize="sm"
            px={2}
            py={1}
            borderRadius="full"
          >
            {getTierIcon(tag.tier)} {tag.tier}
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {tag.category}
          </Text>
        </HStack>

        <Text fontWeight="bold">{tag.value}</Text>

        <Tooltip
          label={`${tag.projectsCompleted}/${tag.nextTierThreshold} projects completed`}
          hasArrow
        >
          <Box w="100%">
            <Progress
              value={progress}
              size="sm"
              colorScheme={tag.tier === 'Cosmic' ? 'purple' : 'blue'}
              borderRadius="full"
            />
          </Box>
        </Tooltip>
      </VStack>
    </Box>
  );
};