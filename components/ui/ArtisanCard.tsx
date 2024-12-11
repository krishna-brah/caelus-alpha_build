import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.primary.main}11 100%)`,
    borderRadius: '0 0 0 100%',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7))',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'flex-end',
  padding: theme.spacing(2),
  '& > *': {
    transform: 'translateY(20px)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backdropFilter: 'blur(4px)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}));

interface ArtisanCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tag?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({
  title,
  subtitle,
  description,
  image,
  tag,
  onClick,
  children,
}) => {
  return (
    <StyledCard onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default' }}>
      {image && (
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="240"
            image={image}
            alt={title}
          />
          {tag && <StyledChip label={tag} size="small" />}
        </Box>
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
        {children}
      </CardContent>
    </StyledCard>
  );
};