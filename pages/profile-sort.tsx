import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  Palette as DesignerIcon,
  ShoppingBag as ConsumerIcon,
} from '@mui/icons-material';

export default function ProfileSort() {
  const router = useRouter();
  const theme = useTheme();

  const handleProfileSelect = (type: 'designer' | 'consumer') => {
    // In a real app, this would set the user type in the backend
    if (type === 'designer') {
      router.push('/designer/tag-selection');
    } else {
      router.push('/main-hub');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: 'white' }}
          >
            How will you use Caelus?
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Choose your role to get started
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <DesignerIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Designer
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create and sell your designs, collaborate with other designers,
                  and build your reputation through our tagging system.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleProfileSelect('designer')}
                >
                  Continue as Designer
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <ConsumerIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Consumer
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Discover unique designs, connect with talented designers,
                  and find exactly what you're looking for.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleProfileSelect('consumer')}
                >
                  Continue as Consumer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => router.push('/our-initiative')}
            sx={{ color: 'white' }}
          >
            Learn more about Caelus
          </Button>
        </Box>
      </Container>
    </Box>
  );
}