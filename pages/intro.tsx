import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Intro() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
              }}
            >
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h1"
                gutterBottom
                sx={{ color: '#1a237e' }}
              >
                Welcome to Caelus
              </Typography>
              
              <Typography variant="h6" paragraph color="text.secondary">
                Revolutionizing sustainable fashion through AI-powered design
                and community collaboration.
              </Typography>

              <Typography paragraph>
                Join our platform to explore innovative designs, connect with
                like-minded creators, and contribute to a more sustainable
                fashion future.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/profile-sort')}
                  sx={{
                    mr: 2,
                    mb: { xs: 2, sm: 0 },
                    background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/our-initiative')}
                >
                  Learn More
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'relative',
              height: '500px',
            }}
          >
            {/* Placeholder for hero image */}
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                }}
              >
                Hero Image Placeholder
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}